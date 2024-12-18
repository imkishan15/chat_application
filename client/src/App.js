import './App.css';
import { Route } from 'react-router-dom'
import Chat from './Pages/Chat';
import Home from './Pages/Home';

function App() {
  return (
    <div className='App'>
      <Route path='/' component={Home} exact />
      <Route path='/chat' component={Chat} />
    </div>
  );
}

export default App;
