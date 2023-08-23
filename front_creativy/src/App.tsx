import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RoutesApp from './Routes';
import ABApolloClient from './Components/ApolloClient';

function App() {
  return (
    <ABApolloClient>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </ABApolloClient>
    
  );
}

export default App;
