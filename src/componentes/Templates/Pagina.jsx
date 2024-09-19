import Menu from "./Menu";
import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";
import Rodape from "./Rodape";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="Atividade 3 - Desenvolvimento FullStack" />
                <Menu />
                {
                    props.children
                }
                
            </Container>
        </>

    );
}