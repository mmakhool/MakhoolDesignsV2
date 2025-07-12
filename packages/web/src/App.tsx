import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { ApiProvider } from './providers/ApiProvider';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <ApiProvider>
      <Router>
        <AppRouter />
      </Router>
    </ApiProvider>
  );
}

export default App;
