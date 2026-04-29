import React, { createContext, useState, useContext } from 'react';

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
  const [scammerProfile, setScammerProfile] = useState(null);
  const [sharedChatHistory, setSharedChatHistory] = useState([]);
  const [sharedEdiScore, setSharedEdiScore] = useState(12);
  const [sharedScamsPrevented, setSharedScamsPrevented] = useState(1427);
  const [sharedActiveThreats, setSharedActiveThreats] = useState(0);

  return (
    <GlobalStateContext.Provider value={{ 
      scammerProfile, setScammerProfile, 
      sharedChatHistory, setSharedChatHistory, 
      sharedEdiScore, setSharedEdiScore,
      sharedScamsPrevented, setSharedScamsPrevented,
      sharedActiveThreats, setSharedActiveThreats
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
