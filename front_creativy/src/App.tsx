import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RoutesApp from './Routes';
import ABApolloClient from './Components/ApolloClient';
import { Provider } from 'react-redux'
import { store } from './Redux/store';
import AuthProvider from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <ABApolloClient>
          <BrowserRouter>
            <RoutesApp />
          </BrowserRouter>
        </ABApolloClient>
      </Provider>  
    </AuthProvider>  
  );
}

export default App;
