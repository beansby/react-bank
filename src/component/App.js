import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import MakeAccount from './MakeAccount';
import AccountInfo from './AccountInfo';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Transfer from './Transfer';
import AccountList from './AccountList';
import AccountBank from './AccountBank';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path='/' element={<Main/>}/>
        <Route exact path='/makeaccount' element={<MakeAccount/>}/>
        <Route exact path='/accountinfo' element={<AccountInfo/>}/>
        <Route exact path='/deposit' element={<Deposit/>}/>
        <Route exact path='/withdraw' element={<Withdraw/>}/>
        <Route exact path='/transfer' element={<Transfer/>}/>
        <Route exact path='/accountlist' element={<AccountList/>}/>
        <Route exact path='/accounts' element={<AccountBank/>}/>
      </Routes>
    </div>
  );
}

export default App;
