import { ThemeProvider } from '@material-ui/styles';
import './assets/css/App.css';
import ViewMap from './components/ViewMap';
import TrailsTheme from './components/trailsTheme';

function App() {
  return (
    <ThemeProvider theme={TrailsTheme}>
      <div className="App">
        <ViewMap></ViewMap>
      </div>
    </ThemeProvider>
  );
}

export default App;