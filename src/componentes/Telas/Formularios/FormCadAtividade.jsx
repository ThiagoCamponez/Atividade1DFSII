import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import CaixaSelecao from '../../busca/CaixaSelecao';
import { useState, useContext } from 'react';
import { ContextoUsuarioLogado } from '../../../App';
import { alterar, gravar } from '../../../servicos/atividadeService';

export default function FormCadAtividades(props) {

    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [tipoAtividadeSustSelecionada, setTipoAtividadeSustSelecionada] = useState(props.atividadeSelecionada.tipoatividadesust);
    const [atividade, setAtividade] = useState(props.atividadeSelecionada);
    const [validado, setValidado] = useState(false);

    function manipularMudanca(evento){
        setAtividade({
            ...atividade,
            [evento.target.name]: evento.target.value
        });
    }

    function manipularSubmissao(evento){
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;
        if(formulario.checkValidity()){
            const dados = { ...atividade, tipoatividadesust: tipoAtividadeSustSelecionada };
            if(!props.modoEdicao){
                gravar(dados, token).then((resposta) => {
                    alert(resposta.mensagem);
                    if (resposta.status) {
                        props.setExibirTabela(true);    
                    }
                }).catch((erro) => {
                    alert("Erro ao enviar a requisição: " + erro.message);
                });
                
            }
            else{
                alterar(dados, token).then((resposta) => {
                    alert(resposta.mensagem);
                    props.setModoEdicao(false);
                    setAtividade({
                        codigo: 0,
                        nome: "",
                        cpf: "",
                        contato: "",
                        endereco: "",
                        bairro: "",
                        numero:"",
                        tipoatividadesust: {
                            id: 0,
                            nome: ""
                        },
                        data: "",
                        horarioInicial: "",
                        horarioFinal: "",
                        descricaoCompleta:""
                    })
                    props.setAtividadeSelecionada({ 
                        codigo: 0,
                        nome: "",
                        cpf: "",
                        contato: "",
                        endereco: "",
                        bairro: "",
                        numero:"",
                        tipoatividadesust: {
                            id: 0,
                            nome: ""
                        },
                        data: "",
                        horarioInicial: "",
                        horarioFinal: "",
                        descricaoCompleta:""});
                }).catch((erro) => {
                    alert("Erro ao enviar a requisição: " + erro.message);
                });
            }
            setValidado(false);
        }
        else{
            setValidado(true);
        }
        evento.stopPropagation();
        evento.preventDefault();    
    }

    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="id">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="id"
                        name="id"
                        value={atividade.id}
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código da atividade!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12" controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={atividade.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome do atividade!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="cpf">
                    <Form.Label>CPF:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="cpf">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="cpf"
                            name="cpf"
                            aria-describedby="cpf"
                            onChange={manipularMudanca}
                            value={atividade.cpf}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o CPF!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="contato">
                    <Form.Label>Contato:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="contato">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="contato"
                            name="contato"
                            aria-describedby="contato"
                            onChange={manipularMudanca}
                            value={atividade.contato}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o contato!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="endereco">
                    <Form.Label>Endereço:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="endereco">+</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="endereco"
                            name="endereco"
                            aria-describedby="endereco"
                            onChange={manipularMudanca}
                            value={atividade.endereco}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o endereco!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="bairro">
                    <Form.Label>Bairro:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="bairro"
                        name="bairro"
                        value={atividade.bairro}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o bairro!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="numero">
                    <Form.Label>Número:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="numero"
                        name="numero"
                        value={atividade.numero}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o numero!</Form.Control.Feedback>
                </Form.Group>
                <Col md={8}>
                    <Form.Label>Tipo de Atividade Sustentável:</Form.Label>
                    <CaixaSelecao enderecoFonteDados={"http://localhost:4000/tipoatividadesust"} 
                                  campoChave={"id"}
                                  campoExibicao={"nome"}
                                  funcaoSelecao={setTipoAtividadeSustSelecionada}
                                  localLista={"listaTipos"}
                                  tokenAcesso={contextoUsuario.usuarioLogado.token}/>
                </Col>
                <Form.Group as={Col} md="4" controlId="data">
                    <Form.Label>Data:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="data"
                        name="data"
                        value={atividade.data}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a data!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="horarioInicial">
                    <Form.Label>Horário Inicial:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="horarioInicial"
                        name="horarioInicial"
                        value={atividade.horarioInicial}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o horario inicial!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="horarioFinal">
                    <Form.Label>Horário Final:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="horarioFinal"
                        name="horarioFinal"
                        value={atividade.horarioFinal}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o horario final!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="descricaoCompleta">
                    <Form.Label>Descrição Completa:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricaoCompleta"
                        name="descricaoCompleta"
                        value={atividade.descricaoCompleta}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o descricaoCompleta!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? 'Alterar' : 'Cadastrar'}</Button>
                </Col>
                <Col md={{offset:1}}>
                    <Button onClick={()=>{
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>

    );
}