import React from 'react';
import { createRoot } from 'react-dom/client';
import { Scoring } from './components/Counter';

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'INJECT_COUNTER') {
    // Remove existing counter if present
    const existingCounter = document.getElementById('trustee-counter-root');
    if (existingCounter) {
      existingCounter.remove();
    }

    // Create container for React component
    const container = document.createElement('div');
    container.id = 'trustee-counter-root';
    document.body.appendChild(container);

    // Render React component
    const root = createRoot(container);
    root.render(React.createElement(Scoring));

    sendResponse({ success: true });
  }
});

console.log('This script is running on every webpage.');
