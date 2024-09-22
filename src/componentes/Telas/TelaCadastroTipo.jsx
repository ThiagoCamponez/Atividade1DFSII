import FormCadTipo from "./Formularios/FormCadTipo";
import Pagina from "../TemplatesT/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaTipos from "./Tabelas/TabelaTipos";
import { consultarTodos } from "../../servicos/tipoService";
import { ContextoUsuarioLogado } from "../../App";
import { Button, Row, Col } from "react-bootstrap";
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
                <div className="mt-05 mb-05 p-2 text-start">             
                    <Row className="align-items-center">
                        <Col>
                            <h2>Cadastro de Tipo de Atividades Sustentáveis</h2>
                        </Col>
                        <Col className="text-end">
                            <Button className="mb-3" variant="primary" onClick={() => {
                                    setExibirTabela(false);
                                }}>
                                Adicionar
                            </Button>
                        </Col>                    
                        <hr />
                    </Row>
                </div>
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