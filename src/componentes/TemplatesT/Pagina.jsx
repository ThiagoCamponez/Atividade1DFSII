import Menu from "./Menu";
import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Container style={{ maxWidth: '100%', margin: '0 auto', padding: '0' }}>
                <Cabecalho titulo="Atividade 3 - Desenvolvimento FullStack" />
                <Menu />
                {
                    props.children
                }
                
            </Container>
        </>

    );
}