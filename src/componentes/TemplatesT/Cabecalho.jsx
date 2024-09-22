export default function Cabecalho(props) {
    return (
        <header className="bg-dark text-white p-1">
            <h2 className="d-flex flex-column align-items-center"> {/* Alinha o conteúdo à esquerda */}
                <span 
                    className="nav-link h3 text-white mt-0 fw-bold fs-1 pb-0 text-start" 
                    style={{ textShadow: '2px 2px 3px rgba(255, 255, 255, 0.8)' }}> {/* Adiciona a sombra branca */}
                    ECOGEST
                </span>
                <span 
                    className="nav-link h1 text-white mb-1 pt-0 fs-6 text-start" 
                    style={{ textShadow: '2px 2px 3px rgba(255, 255, 255, 0.8)' }}> {/* Sombra branca também aplicada */}
                    Inovando o Presente, Preservando o Futuro
                </span>
            </h2>
        </header>
    );
}
