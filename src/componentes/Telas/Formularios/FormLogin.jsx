import { useContext, useState } from 'react';
import { ContextoUsuarioLogado } from '../../../App';
import { login } from '../../../servicos/loginService';
import './FormLogin.css';
export default function FormLogin(props) {
    const contexto = useContext(ContextoUsuarioLogado);
    const [usuario, setUsuario] = useState({
        usuario: "",
        senha: ""
    });

    function realizarLogin(evento) {
        login(usuario.usuario, usuario.senha).then((resposta) => {
            if (resposta?.status) {
                contexto.setUsuarioLogado({
                    nome: usuario.usuario,
                    logado: true,
                    token: resposta.token,
                });
            }
            else{
                alert(resposta.mensagem);
            }
        }).catch((erro)=>{
            alert(erro.message);
        });
        evento.stopPropagation();
        evento.preventDefault();
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });

    }
    return (
        <div className="login-page">
            <div className="wrapper">
                <form onSubmit={realizarLogin}>
                <h1>ECOGEST</h1>
                <p>Inovando o Presente, Preservando o futuro.</p>
                <div className="input-box">
                    <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="Informe o nome do usuário"
                    value={usuario.nome} 
                    onChange={manipularMudanca}
                    />
                </div>
                <div className="input-box">
                    <input
                    type="password"
                    id='senha'
                    name='senha'
                    placeholder="Informe a senha de acesso."
                    value={usuario.senha}
                    onChange={manipularMudanca}
                    />
                </div>        
                <button type="submit" className="btn">Login</button>
                <div className="register-link">
                    <p>
                    Não tem uma conta? <a href="/register">Crie uma conta</a>
                    </p>
                </div>
                </form>
            </div>
        </div>
        
    );
}