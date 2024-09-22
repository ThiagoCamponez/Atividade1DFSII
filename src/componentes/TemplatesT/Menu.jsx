import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function Menu(props) {
    return (
        <Navbar expand="lg" className="bg-dark p-2">
            <Container fluid>
                <Navbar.Brand href="#" as={Link} to="/" className='text-white'>Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title={<span className="text-white">Cadastros</span>} id="basic-nav-dropdown" menuVariant="dark">
                            <NavDropdown.Item href="#" as={Link} to="/atividadesustentavel">Atividade Sustentável</NavDropdown.Item>
                            <NavDropdown.Item href="#" as={Link} to="/tipoatividadesust">Tipos de Atividade</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={<span className="text-white">Operações</span>} id="basic-nav-dropdown" menuVariant="dark">
                            <NavDropdown.Item href="#action/3.1">Compra</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Venda</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={<span className="text-white">Relatórios</span>} id="basic-nav-dropdown" menuVariant="dark">
                            <NavDropdown.Item href="#action/3.1">Clientes</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Fornecedores</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Estoque</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Vendas</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Compras</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#home" className='text-white'>Sobre</Nav.Link>
                        <Nav.Link href="#home" className='text-white'>Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
