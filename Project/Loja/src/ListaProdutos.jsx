import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useCarrinho } from './CarrinhoContext';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Loja Online</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {produtos.map(produto => (
          <div
            key={produto.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              width: '200px'
            }}
          >
            <Link to={`/produto/${produto.id}`}>
              <img
                src={produto.imagem}
                alt={produto.nome}
                style={{ width: '100%', height: 'auto' }}
              />
            </Link>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <strong>R$ {produto.preco.toFixed(2)}</strong>
            <br />
            <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>
      <Link to="/carrinho">
        <button style={{ marginTop: '1rem' }}>Ir para o Carrinho</button>
      </Link>
    </div>
  );
}

export default ListaProdutos;
