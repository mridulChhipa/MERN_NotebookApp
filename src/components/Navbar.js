import { Link, useLocation } from 'react-router-dom'
import logo from '../Logo.png'

export default function Navbar() {
    var location = useLocation()

    return (
        <nav className="navbar sticky-top navbar-light navbar-expand-lg bg-white border-bottom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className='me-2' style={{
                        height: '25px',
                    }} src={logo} alt = "Logo"/>
                    <span style={{
                        fontWeight: 900,
                    }}>Y</span>
                    <span style={{
                        fontWeight: 900,
                        fontSize: 15
                    }}>ummy </span> 
                    <span style={{
                        fontWeight: 900,
                    }}>N</span>
                    <span style={{
                        fontWeight: 900,
                        fontSize: 15
                    }}>OTEBOOK</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <Link className={`nav-link  ${location.pathname === "/" ? " active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item ">
                            <Link className={`nav-link  ${location.pathname === "/about" ? " active" : ""}`} aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="d-flex py-1">
                        <Link className='btn btn-primary mx-2' to="/login">Login</Link>
                        <Link className='btn btn-primary' to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
