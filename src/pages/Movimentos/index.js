import React, { useEffect, useState } from 'react';
import './style.css';

const Movimentos = () => {
  const [todosMovimentos, setTodosMovimentos] = useState([]);
  const [movimentosFiltrados, setMovimentosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [movimentoSelecionado, setMovimentoSelecionado] = useState(null);
  const MOVIMENTOS_POR_PAGINA = 20;

  useEffect(() => {
    const buscarTodosMovimentos = async () => {
      setCarregando(true);
      try {
        const res = await fetch('https://pokeapi.co/api/v2/move?limit=1000');
        const data = await res.json();

        const detalhesPromises = data.results.map(async (move) => {
          const resDetalhe = await fetch(move.url);
          return await resDetalhe.json();
        });

        const detalhes = await Promise.all(detalhesPromises);
        setTodosMovimentos(detalhes);
        setMovimentosFiltrados(detalhes);
      } catch (erro) {
        console.error('Erro ao buscar movimentos:', erro);
      }
      setCarregando(false);
    };

    buscarTodosMovimentos();
  }, []);

  const tiposUnicos = [...new Set(todosMovimentos.map(mov => mov.type.name))].sort();

  useEffect(() => {
    const resultados = todosMovimentos.filter((mov) =>
      mov.name.toLowerCase().includes(busca.toLowerCase()) &&
      (filtroTipo ? mov.type.name === filtroTipo : true)
    );
    setMovimentosFiltrados(resultados);
    setPagina(1);
  }, [busca, filtroTipo, todosMovimentos]);

  const inicio = (pagina - 1) * MOVIMENTOS_POR_PAGINA;
  const fim = inicio + MOVIMENTOS_POR_PAGINA;

  // Ordena tudo antes de paginar:
  const movimentosOrdenados = movimentosFiltrados.sort((a, b) =>
    a.type.name.localeCompare(b.type.name)
  );

  const movimentosPaginados = movimentosOrdenados.slice(inicio, fim);

  const totalPaginas = Math.ceil(movimentosFiltrados.length / MOVIMENTOS_POR_PAGINA);

  return (
    <div>
      {/* Filtros */}
      <div className="filtros_container">

  {/* Filtro de busca */}
  <label className="filtro_item">
    <div className="input_com_botao">
      <input
        type="text"
        placeholder="Buscar movimento..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <button
        className="btn-limpar-filtros"
        onClick={() => setBusca('')}
        title="Limpar busca"
        disabled={!busca}
        aria-label="Limpar busca"
      >
        ×
      </button>
    </div>
  </label>

  {/* Filtro por tipo */}
  <label className="filtro_item">
    <div className="input_com_botao">
      <select
        value={filtroTipo}
        onChange={(e) => setFiltroTipo(e.target.value)}
      >
        <option value="">Todos os tipos</option>
        {tiposUnicos.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </option>
        ))}
      </select>
      <button
        className="btn-limpar-filtros"
        onClick={() => setFiltroTipo('')}
        title="Limpar filtro tipo"
        disabled={!filtroTipo}
        aria-label="Limpar filtro tipo"
      >
        ×
      </button>
    </div>
  </label>

</div>

      {/* Lista ou carregando */}
      {carregando ? (
        <p>Carregando movimentos...</p>
      ) : (
        <>
          <div className="itens_container">
            {movimentosPaginados.length > 0 ? (
              movimentosPaginados.map((mov) => (
                <div
                  key={mov.id}
                  className="item_card"
                  onClick={() => setMovimentoSelecionado(mov)}
                >
                  <p style={{ fontWeight: 'bold' }}>{mov.name}</p>
                  <p style={{ fontSize: '0.85rem', color: '#555' }}>
                    Tipo: {mov.type.name}
                  </p>
                </div>
              ))
            ) : (
              <p>Nenhum movimento encontrado.</p>
            )}
          </div>

          {/* Paginação */}
          {movimentosFiltrados.length > MOVIMENTOS_POR_PAGINA && (
            <div className="paginacao">
              <button onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1}>
                ⬅️ Anterior
              </button>
              <span>
                Página {pagina} de {totalPaginas}
              </span>
              <button
                onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
              >
                Próxima ➡️
              </button>
            </div>
          )}
        </>
      )}

      {/* Detalhes do movimento */}
      {movimentoSelecionado && (
        <div className="detalhes_item">
          <h2>{movimentoSelecionado.name}</h2>
          <p><strong>Tipo:</strong> {movimentoSelecionado.type.name}</p>
          <p><strong>Classe de Dano:</strong> {movimentoSelecionado.damage_class.name}</p>
          <p><strong>Poder:</strong> {movimentoSelecionado.power ?? '—'}</p>
          <p><strong>Precisão:</strong> {movimentoSelecionado.accuracy ?? '—'}</p>
          <p><strong>PP:</strong> {movimentoSelecionado.pp}</p>
          {movimentoSelecionado.effect_entries.length > 0 && (
            <p><strong>Efeito:</strong> {
              movimentoSelecionado.effect_entries[0].effect.replace(
                /\$effect_chance/g,
                movimentoSelecionado.effect_chance ?? ''
              )
            }</p>
          )}
          <button onClick={() => setMovimentoSelecionado(null)} style={{ marginTop: '10px' }}>
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default Movimentos;
