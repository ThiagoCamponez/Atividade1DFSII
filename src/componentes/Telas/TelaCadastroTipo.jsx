import { Alert } from "react-bootstrap";
import FormCadTipo from "./Formularios/FormCadTipo";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaTipos from "./Tabelas/TabelaTipos";
import { consultarTodos } from "../../servicos/tipoService";
import { ContextoUsuarioLogado } from "../../App";
export default function TelaCadastroTipo(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false)
    const [tipoSelecionado, setTipoSelecionado] = useState({ id: 0, nome: "" });    
    const [listaDeTipos, setListaDeTipos] = useState([]);
    
    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token).then((resposta) => {
            setListaDeTipos(resposta.listaTipos);
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [atualizarTela, exibirTabela, contextoUsuario.usuarioLogado.token]);

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Tipo de Atividades Sustentáveis
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaTipos listaDeTipos={listaDeTipos} 
                                     setExibirTabela={setExibirTabela}
                                     setModoEdicao={setModoEdicao} 
                                     setTipoSelecionado={setTipoSelecionado}
                                     setAtualizarTela={setAtualizarTela}/> :
                        <FormCadTipo setExibirTabela={setExibirTabela}
                                     setModoEdicao={setModoEdicao} 
                                     modoEdicao={modoEdicao}
                                     setTipoSelecionado={setTipoSelecionado}
                                     tipoSelecionado={tipoSelecionado}    
                                     setAtualizarTela={setAtualizarTela} />
                }
            </Pagina>
        </div>
    );
}