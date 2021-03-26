import React, { PureComponent } from 'react';
import Home from 'pages/Home';
import './App.css';

class App extends PureComponent {
  render(): JSX.Element {
    return (
      <div>
        <h1>App component</h1>
        <Home />
      </div>
    );
  }
}

export default App;
