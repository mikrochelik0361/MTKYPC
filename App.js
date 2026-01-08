import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TankList from './components/TankList';
import TankDetail from './components/TankDetail';
import TankForm from './components/TankForm';
import NewsDetail from './components/NewsDetail';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TankList />} />        
        <Route path="/tank/:id" element={<TankDetail />} /> 
        <Route path="/admin" element={<TankForm />} />      
        <Route path="/edit/:id" element={<TankForm />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;