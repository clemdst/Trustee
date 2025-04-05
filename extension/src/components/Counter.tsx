import React, { useState, useEffect } from 'react';

export const Scoring: React.FC = () => {
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#ffffff',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    zIndex: 9999,
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    color: '#333'
  };

  return (
    <div style={containerStyle}>
      Hello {seconds}
    </div>
  );
};

