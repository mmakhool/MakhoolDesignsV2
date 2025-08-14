import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './providers/ApiProvider';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ApiProvider>
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
        </ApiProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
