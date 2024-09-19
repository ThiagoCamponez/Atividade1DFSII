import { useState, useContext } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { ContextoUsuarioLogado } from '../../../App';
import { gravar, alterar } from '../../../servicos/tipoService';

export default function FormCadTipo(props) {
    const [tipo, setTipo] = useState(props.tipoSelecionado);
    const [validado, setValidado] = useState(false);
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function manipularMudanca(evento) {
        setTipo({
            ...tipo,
            [evento.target.name]: evento.target.value
        });
    }

    function manipularSubmissao(evento) {
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            if (!props.modoEdicao) {
                gravar(tipo,token).then((resposta) => {
                    alert(resposta.mensagem);
                    props.setExibirTabela(true);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }
            else {
                alterar(tipo, token).then((resposta) => {
                    alert("Atualizado com sucesso!");
                    props.setModoEdicao(false);
                    props.setTipoSelecionado( { id: 0, nome: "" });

                    setValidado(false);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }

        }
        else{
            setValidado(true);
        }

        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Container>
            <Form noValidate onSubmit={manipularSubmissao} validated={validado}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Código:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="id"
                                    name="id"
                                    onChange={manipularMudanca}
                                    value={tipo.id}
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o id do Tipo de Atividade Sustentável!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="nome:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o nome do Tipo de Atividade Sustentável"
                                    id="nome"
                                    name="nome"
                                    onChange={manipularMudanca}
                                    value={tipo.nome}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição do tipo de Atividade Sustentável!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">Confirmar</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

}