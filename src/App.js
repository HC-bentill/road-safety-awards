import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './ForgotPassword';

const loading = (
  <Spinner animation = "border" role = "status" >
    <span className="visually-hidden">Loading...</span>
  </Spinner>
)

  

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={loading}>
        <Router>
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/forgotten-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </React.Suspense >
    </div>
  );
}

export default App;
