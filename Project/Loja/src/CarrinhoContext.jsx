import { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export const useCarrinho = () => useContext(CarrinhoContext);

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, produto]);
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prevCarrinho) => prevCarrinho.filter(produto => produto.id !== id));
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, produto) => total + produto.preco, 0).toFixed(2);
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, calcularTotal }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
