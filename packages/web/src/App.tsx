import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { ApiProvider } from './providers/ApiProvider';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <ApiProvider>
      <Router>
        <AppRouter />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </Router>
    </ApiProvider>
  );
}

export default App;
