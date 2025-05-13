import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useCarrinho } from './CarrinhoContext';


function DetalhesProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    fetch(`http://localhost:3001/produtos/${id}`)
      .then(res => res.json())
      .then(data => setProduto(data));
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{produto.nome}</h2>
      <img src={produto.imagem} alt={produto.nome} style={{ width: 300 }} />
      <p>{produto.descricao}</p>
      <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
      <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao carrinho</button>
      <br />
      <Link to="/">Voltar à loja</Link>
    </div>
  );
}

export default DetalhesProduto;
