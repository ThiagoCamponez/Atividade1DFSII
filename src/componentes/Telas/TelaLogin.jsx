import { Container } from "react-bootstrap";
import FormLogin from "./Formularios/FormLogin";
import './Formularios/FormLogin.css';

export default function TelaLogin(props){
    return (
        <Container className=' w-50 d-flex align-items-center  justify-content-center vh-100'>
            <FormLogin />
        </Container>
    );
}