import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Learning from './Pages/Learn';
import TransactionPage from './Pages/TransactionPage';
import DepositPage from './Pages/DepositPage';
import CreatePage from './Pages/Create';
import Analytics from './Pages/Analytics';
import PersonalAssistant from './Pages/PersonalAssitant';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/DepositPage" element={<DepositPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/AI" element={<PersonalAssistant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;