import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarrinhoProvider } from './CarrinhoContext'; 
import App from './App.jsx';
import Produto from './Produto.jsx';
import Carrinho from './Carrinho.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CarrinhoProvider> {}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  </CarrinhoProvider>
);
