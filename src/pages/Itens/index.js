import React, { useEffect, useState } from 'react';
import './style.css';

const Itens = () => {
  const [todosItens, setTodosItens] = useState([]);
  const [itensFiltrados, setItensFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const ITENS_POR_PAGINA = 20;

  useEffect(() => {
    const buscarTodosItens = async () => {
      setCarregando(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/item?limit=1000`);
        const data = await res.json();

        const detalhesPromises = data.results.map(async (item) => {
          const resItem = await fetch(item.url);
          return await resItem.json();
        });

        const detalhes = await Promise.all(detalhesPromises);
        setTodosItens(detalhes);
        setItensFiltrados(detalhes);
      } catch (erro) {
        console.error('Erro ao buscar itens:', erro);
      }
      setCarregando(false);
    };

    buscarTodosItens();
  }, []);

  useEffect(() => {
    const resultados = todosItens.filter((item) =>
      item.name.toLowerCase().includes(busca.toLowerCase())
    );
    setItensFiltrados(resultados);
    setPagina(1);
  }, [busca, todosItens]);

  const inicio = (pagina - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const itensPaginados = itensFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(itensFiltrados.length / ITENS_POR_PAGINA);

  return (
    <div>
      {/* 🔍 Filtros com seu estilo reutilizável */}
      <div className="filtros_container">
        <label>
          <input
            type="text"
            placeholder="Buscar item..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </label>

          <button
            className="btn-limpar-filtros"
            onClick={() => setBusca('')}
            title="Limpar busca"
            disabled={!busca}
          >
            ×
          </button>
      </div>

      {carregando ? (
        <p>Carregando itens...</p>
      ) : (
        <>
          <div className="itens_container">
            {itensPaginados.map((item) => (
              <div
                key={item.id}
                className="item_card"
                onClick={() => setItemSelecionado(item)}
              >
                <img
                  src={item.sprites?.default}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          <div className="paginacao">
            <button onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1}>
              ⬅️ Anterior
            </button>
            <span>Página {pagina} de {totalPaginas}</span>
            <button onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas}>
              Próxima ➡️
            </button>
          </div>
        </>
      )}

      {itemSelecionado && (
        <div className="detalhes_item">
          <h2>{itemSelecionado.name}</h2>
          <img src={itemSelecionado.sprites?.default} alt={itemSelecionado.name} />
          <p><strong>Categoria:</strong> {itemSelecionado.category.name}</p>
          <p><strong>Cost:</strong> {itemSelecionado.cost}</p>
          {itemSelecionado.effect_entries.length > 0 && (
            <p><strong>Efeito:</strong> {itemSelecionado.effect_entries[0].effect}</p>
          )}
          <button onClick={() => setItemSelecionado(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default Itens;
