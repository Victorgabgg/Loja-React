import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarrinho } from './CarrinhoContext';
import './App.css';

function Produto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    fetch(`http://localhost:3001/produtos/${id}`)
      .then(res => res.json())
      .then(data => setProduto(data))
      .catch(err => console.error("Erro ao carregar produto:", err));
  }, [id]);

  if (!produto) {
    return <p style={{ padding: '2rem' }}>Carregando...</p>;
  }

  return (
    <div className="container">
      <div className="produto-detalhes">
        <img src={produto.imagem} alt={produto.nome} />
        <div className="info">
          <h2>{produto.nome}</h2>
          <p>{produto.descricao}</p>
          <strong>Preço: R$ {produto.preco.toFixed(2)}</strong>
          <br />
          <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao carrinho</button>
        </div>
      </div>
      <Link to="/">
        <button style={{ marginTop: '1rem' }}>Voltar à Loja</button>
      </Link>
    </div>
  );
}

export default Produto;
