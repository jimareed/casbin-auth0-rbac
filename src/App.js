import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Body from './Body';
import { useAuth0 } from "./react-auth0-spa";


const App = () => {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  return (
    <Container className="p-3">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">casbin-auth0-rbac</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          {!isAuthenticated && !loading && (
            <Nav.Link onClick={loginWithRedirect} href="#">Login</Nav.Link>
          )}
          {isAuthenticated && (
            <Nav.Link onClick={logout} href="#">Logout</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Jumbotron>
      <p>Basic RBAC implementation using Casbin and Auth0.</p>
      <Body/>
    </Jumbotron>
  </Container>
  );
}

export default App;
