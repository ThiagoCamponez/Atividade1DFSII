import TelaCadastroAtividade from "./componentes/Telas/TelaCadastroAtividade";
import TelaCadastroTipo from "./componentes/Telas/TelaCadastroTipo";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import TelaLogin from "./componentes/Telas/TelaLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext, useEffect } from "react";

// Contexto de usuário logado
export const ContextoUsuarioLogado = createContext(null);

function App() {

  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "",
    logado: false,
    token: ""
  });

  // Importar o Bootstrap condicionalmente quando o usuário estiver logado
  useEffect(() => {
    if (usuarioLogado.logado) {
      import('bootstrap/dist/css/bootstrap.min.css')
        .then(() => {
          console.log("Bootstrap CSS carregado");
        })
        .catch((error) => console.error("Erro ao carregar Bootstrap CSS", error));
    }
  }, [usuarioLogado.logado]);

  return (
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {!usuarioLogado.logado ? (
        <TelaLogin />
      ) : (
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/atividadesustentavel" element={<TelaCadastroAtividade />} />
              <Route path="/tipoatividadesust" element={<TelaCadastroTipo />} />
              <Route path="/" element={<TelaMenu />} />
              <Route path="*" element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </ContextoUsuarioLogado.Provider>
  );
}

export default App;
