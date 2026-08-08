import React from 'react';
import Navigation from './src/navigation/Navigation';
import './global.css';
import { store } from './src/redux/Store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
