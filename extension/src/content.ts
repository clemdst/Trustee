import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Scoring } from './components/Counter';

// Add TypeScript declaration for the global property
declare global {
  interface Window {
    _updateTrusteeScore?: (score: number) => void;
    updateTrusteeScore?: (score: number) => void;
  }
}

// Global variable to track if the script is already injected
let isInjected = false;
let root: any = null;
let lastProcessedScore: number | null = null;

// Function to handle gauge click
const handleGaugeClick = () => {
  try {
    // Check if we can communicate with the background script
    if (!chrome.runtime.id) {
      console.error('Extension context invalid');
      return;
    }

    // Send message to background script to handle opening the side panel
    chrome.runtime.sendMessage(
      { 
        action: 'OPEN_FRONTEND_PANEL'
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
          return;
        }
        if (response?.success) {
          console.log('Side panel opened successfully');
        } else {
          console.error('Failed to open side panel:', response?.error);
        }
      }
    );
  } catch (error) {
    console.error('Error handling gauge click:', error);
  }
};

// Function to create a custom event for score updates
const createScoreUpdateEvent = (score: number) => {
  return new CustomEvent('trustee-score-update', {
    detail: { score }
  });
};

// Create the update function in the window context
function createUpdateFunction() {
  window._updateTrusteeScore = (score: number) => {
    try {
      window.postMessage({
        type: 'UPDATE_SCORE',
        score: score
      }, '*');
      console.log('Score update sent:', score);
      return true;
    } catch (error) {
      console.error('Error updating score:', error);
      return false;
    }
  };
  
  // Create a proxy to the function for external access
  window.updateTrusteeScore = window._updateTrusteeScore;
}

// Inject the scoring component if not already injected
function injectScoringComponent() {
  if (isInjected) {
    console.log('Component already injected, not injecting again');
    return;
  }

  try {
    // Remove existing counter if present
    const existingCounter = document.getElementById('trustee-counter-root');
    if (existingCounter) {
      existingCounter.remove();
    }

    // Create container for React component
    const container = document.createElement('div');
    container.id = 'trustee-counter-root';
    container.style.cursor = 'pointer';
    container.addEventListener('click', handleGaugeClick);
    document.body.appendChild(container);

    // Render React component
    root = createRoot(container);
    root.render(React.createElement(Scoring));
    
    isInjected = true;
    console.log('Trustee scoring component has been injected');
    
    // Create the update function
    createUpdateFunction();
  } catch (error) {
    console.error('Error injecting scoring component:', error);
  }
}

// Listen for direct messages from the webpage with error handling
window.addEventListener('message', (event) => {
  try {
    if (event.source === window) {
      if (event.data && event.data.type === 'UPDATE_SCORE') {
        const newScore = event.data.score;
        
        if (lastProcessedScore !== newScore) {
          lastProcessedScore = newScore;
          window.postMessage(event.data, '*');
          document.dispatchEvent(createScoreUpdateEvent(newScore));
        }
      }
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
});

// Listen for messages from the popup with error handling
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    if (message.action === 'INJECT_COUNTER') {
      injectScoringComponent();
      sendResponse({ success: true });
    }
    
    if (message.action === 'UPDATE_SCORE') {
      console.log('Received UPDATE_SCORE from popup with score:', message.score);
      
      window.postMessage({
        type: 'UPDATE_SCORE',
        score: message.score
      }, '*');
      
      document.dispatchEvent(createScoreUpdateEvent(message.score));
      
      if (window._updateTrusteeScore) {
        window._updateTrusteeScore(message.score);
      }
      
      sendResponse({ success: true });
    }
  } catch (error: unknown) {
    console.error('Error handling message:', error);
    sendResponse({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
  
  // Return true to indicate we'll send a response asynchronously
  return true;
});

// Initialize when the content script loads
document.addEventListener('DOMContentLoaded', () => {
  createUpdateFunction();
  injectScoringComponent();
});

// Re-initialize on page load
window.addEventListener('load', () => {
  createUpdateFunction();
  injectScoringComponent();
});
