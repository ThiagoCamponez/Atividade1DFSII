import { Button, Container, Table } from "react-bootstrap";
import { excluir } from "../../../servicos/tipoService";
import { ContextoUsuarioLogado } from "../../../App";
import { useContext } from "react";

export default function TabelaTipos(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    function editarTipo(tipo){
        props.setTipoSelecionado(tipo);
        props.setModoEdicao(true);
        props.setExibirTabela(false);
    }

    function apagarTipo(tipo){
        if (window.confirm("Deseja realmente excluir esta tipo de atividade sustentável?")){
            excluir(tipo, contextoUsuario.usuarioLogado.token).then((resposta)=>{
                if (resposta.status){
                    alert(resposta.mensagem);
                }else{
                    alert(resposta.mensagem);
                }
            }).catch((erro) => {
                alert("Erro ao enviar a requisição:" + erro.message);}
            );
        }
    }
    return (
        <>
            <Container style={{ maxWidth: '100%', margin: '0 auto', padding: '0 15px' }}>
                <Table striped bordered hover text-center style={{ backgroundColor: 'black', color: 'white' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listaDeTipos && props.listaDeTipos.length > 0 ? (
                                props.listaDeTipos.map((tipo) => {
                                    return (
                                        <tr key={tipo.id}>
                                            <td>{tipo.id}</td>
                                            <td>{tipo.nome}</td>
                                            <td className="text-center">
                                                <Button onClick={ ()=>{
                                                    editarTipo(tipo);
                                                }} variant="warning">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                                    </svg>
                                                </Button>{   }<Button onClick={ ()=>{
                                                                                        apagarTipo(tipo)
                                                                                    } 
                                                                            } variant="danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                    </svg>                      
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="13">Nenhuma tipo encontrado</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}