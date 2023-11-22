
import { Container, Nav, Navbar } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';

export const Header = () => {

    const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand onClick={() => navigate('/')}>El Buen Sabor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
          <Nav.Link onClick={() => navigate('/Stock')}>Stock</Nav.Link>
          <Nav.Link onClick={() => navigate('/Articulos')}>Articulos</Nav.Link>


        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
