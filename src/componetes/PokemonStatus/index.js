import './style.css';

function PokemonStatus({ data }) {
    const stats = data.stats;
    const maxStat = 200;

    return (
        <div className="status-container">
            <h3>Status do Pokémon</h3>
            <ul className="status-list">
                {stats.map((stat, index) => {
                    const name = stat.stat.name.toUpperCase();
                    const value = stat.base_stat;
                    const widthPercent = Math.min((value / maxStat) * 100, 100); // Garante máximo de 100%

                    return (
                        <li key={index} className="status-item">
                            <span className="status-name">{name}</span>
                            <div className="status-bar-container">
                                <div
                                    className="status-bar"
                                    style={{ width: `${widthPercent}%` }}
                                ></div>
                            </div>
                            <span className="status-value">{value}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default PokemonStatus;
