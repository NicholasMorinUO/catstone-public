import Link from 'next/link'
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'


export default function CustomNavbar() {
  return (
    <Navbar bg="#2461FF" variant="dark" expand="lg" style={{
      zIndex: 1000,
    }}>

      <Navbar.Brand>
        <div className='logo'>
          <h2>CatMaps</h2>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto my-2 my-lg-0" >
          <Link className='link' href="/">Home</Link>
          <Link className='link' href="/About">About</Link>
          <Link className='link' href="https://www.oscatr.ca/" target='_blank'>OSCatR</Link>
          <Link className='link' href={"https://service.sheltermanager.com/asmservice?account=oscatr&method=online_form_html&formid=26https://service.sheltermanager.com/asmservice?account=oscatr&method=online_form_html&formid=26"} target="_blank">
            Found a cat?
          </Link>
        </Nav>
      </Navbar.Collapse>

      <Link className='login' href="https://service.sheltermanager.com/asmlogin" target='_blank'>SM Login</Link>
    </Navbar>
  )
}
