import React from 'react';
import { useCarrinho } from './CarrinhoContext';
import { Link } from 'react-router-dom';
import './App.css';

function Carrinho() {
  const { carrinho, removerDoCarrinho } = useCarrinho();

  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  return (
    <div className="container">
      <h1>Carrinho de Compras</h1>

      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div className="carrinho-lista">
          {carrinho.map((item, index) => (
            <div key={index} className="produto-card">
              <img src={item.imagem} alt={item.nome} />
              <h3>{item.nome}</h3>
              <p>{item.descricao}</p>
              <strong>R$ {item.preco.toFixed(2)}</strong>
              <br />
              <button onClick={() => removerDoCarrinho(item.id)}>Remover</button>
            </div>
          ))}
        </div>
      )}

      <div className="resumo-carrinho">
        <h2>Resumo da Compra</h2>
        <p>Total: <strong>R$ {total.toFixed(2)}</strong></p>
        <button className="btn-finalizar">Finalizar Compra</button>
      </div>

      <Link to="/">
        <button style={{ marginTop: '1rem' }}>Voltar à Loja</button>
      </Link>
    </div>
  );
}

export default Carrinho;
