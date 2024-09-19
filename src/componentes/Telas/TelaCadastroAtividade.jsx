import { Alert } from "react-bootstrap";
import FormCadAtividades from "./Formularios/FormCadAtividade";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaAtividades from "./Tabelas/TabelaAtividades";
import { consultarTodos } from "../../servicos/atividadeService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroAtividade(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [atividadeSelecionada, setAtividadeSelecionada] = useState({ ativ_id: 0, ativ_nome: "", ativ_cpf: "", ativ_contato: "", ativ_endereco: "", ativ_bairro: "", ativ_numero: "", tipoatividadesust: { id: 0, nome: "" }, ativ_data: "", ativ_horarioInicial: "", ativ_horarioFinal: "", ativ_descricaoCompleta: "" });
    const [listaDeAtividades, setListaDeAtividades] = useState([]);

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token).then((resposta) => {
            setListaDeAtividades(resposta.listaAtividades );
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [atualizarTela, exibirTabela, contextoUsuario.usuarioLogado.token]);
   
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Atividade Sustentável
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaAtividades listaDeAtividades={listaDeAtividades} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setAtividadeSelecionada={setAtividadeSelecionada} 
                                        setAtualizarTela={setAtualizarTela}/> :
                        <FormCadAtividades setExibirTabela={setExibirTabela}
                                         setModoEdicao={setModoEdicao}
                                         modoEdicao={modoEdicao}
                                         setAtividadeSelecionada={setAtividadeSelecionada}
                                         atividadeSelecionada={atividadeSelecionada}
                                         setAtualizarTela={setAtualizarTela} />
                }
            </Pagina>
        </div>
    );

}