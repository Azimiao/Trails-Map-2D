import { useEffect } from 'react';
import './assets/css/App.css';
import StateCache from './assets/StateCache';
import ViewMap from './components/ViewMap';

function App() {

  return (
    <div className="App">
      <ViewMap></ViewMap>
    </div>
  );
}

export default App;