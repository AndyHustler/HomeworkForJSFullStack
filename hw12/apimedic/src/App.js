import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DiagnosticPage } from './pages/DiagnosticPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/diagnostic" element={<DiagnosticPage />} />
    </Routes>  
  );
}

export default App;
