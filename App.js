import React from 'react';
import AppNavigatior from './navigation/AppNavigatior';
import ApiContextProvider from './context/ApiContext';

export default function App() {
    return (
      <ApiContextProvider>
          <AppNavigatior />
      </ApiContextProvider>
    );
}


