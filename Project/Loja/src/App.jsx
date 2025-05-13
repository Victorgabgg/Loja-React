import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from './CarrinhoContext';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const produtosPorPagina = 6;

  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

  const handleAdicionar = (produto) => {
    adicionarAoCarrinho(produto);
    setMensagem(`"${produto.nome}" foi adicionado ao carrinho!`);
    setTimeout(() => setMensagem(''), 3000); 
  };

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
  const inicio = (pagina - 1) * produtosPorPagina;
  const fim = inicio + produtosPorPagina;
  const produtosPaginados = produtosFiltrados.slice(inicio, fim);

  return (
    <div className="container">
      <h1>Bem vindo a Tgid Store!</h1>

      {/* Notificação flutuante */}
      {mensagem && (
        <div className="mensagem-carrinho">
          {mensagem}
        </div>
      )}

      <div className="busca">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      <div className="produtos-grid">
        {produtosPaginados.map(produto => (
          <div key={produto.id} className="card">
            <img src={produto.imagem} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <strong>R$ {produto.preco.toFixed(2)}</strong>
            <div className="botoes">
              <Link to={`/produto/${produto.id}`}>
                <button>Ver detalhes</button>
              </Link>
              <button onClick={() => handleAdicionar(produto)}>
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="paginacao">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPagina(i + 1)}
            className={pagina === i + 1 ? 'ativo' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Link to="/carrinho">
        <button className="botao-carrinho">Ir para o Carrinho</button>
      </Link>
    </div>
  );
}

export default App;
