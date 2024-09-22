import FormCadAtividades from "./Formularios/FormCadAtividade";
import Pagina from "../TemplatesT/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaAtividades from "./Tabelas/TabelaAtividades";
import { consultarTodos } from "../../servicos/atividadeService";
import { ContextoUsuarioLogado } from "../../App";
import { Button, Row, Col } from "react-bootstrap";

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
            setListaDeAtividades(resposta.listaAtividades);
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [atualizarTela, exibirTabela, contextoUsuario.usuarioLogado.token]);

    return (
        <div>
            <Pagina>
                <div className="mt-05 mb-05 p-2 text-start">
                    <Row className="align-items-center">
                        <Col>
                            <h2>Cadastro de Atividade Sustentável</h2>
                        </Col>
                        <Col className="text-end"> {/* Alinha o botão no canto direito */}
                            <Button className="mb-3" variant="primary" onClick={() => {
                                setExibirTabela(false);
                            }}>
                                Adicionar
                            </Button>
                        </Col>
                        <hr/>
                    </Row>
                </div>
                {exibirTabela ?
                    <TabelaAtividades listaDeAtividades={listaDeAtividades}
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setAtividadeSelecionada={setAtividadeSelecionada}
                        setAtualizarTela={setAtualizarTela} /> :
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
