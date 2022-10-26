import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';
import SalesPersonForm from './SalesPersonForm';
import SalesRecordForm from './SalesRecordForm';
import SalesHistoryList from './SalesHistoryList';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople/new" element={<SalesPersonForm />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/sales/" element={<SalesList />} />
          <Route path="/sales/new" element={<SalesRecordForm />} />
          <Route path="/sales/history" element={<SalesHistoryList />} />
          <Route path="/automobiles/" element={<AutomobileList />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
