import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RoutesApp from './Routes';
import ABApolloClient from './Components/ApolloClient';
import AuthProvider from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ABApolloClient>
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <RoutesApp />
        </BrowserRouter>
      </ABApolloClient>
    </AuthProvider>  
  );
}

export default App;