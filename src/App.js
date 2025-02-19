
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDashboard from './Components/UserDashboard';
import { Provider } from 'react-redux';
import { store } from "./store";

function App() {
  return (
    <>
    <Provider store={store}>
    <UserDashboard/>
    </Provider>
    </>
  );
}

export default App;
