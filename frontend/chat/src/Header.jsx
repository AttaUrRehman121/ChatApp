import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('user');

        navigate('/login');
    };

    const user = localStorage.getItem('user');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
            <Link className="navbar-brand" to="/">
                Patronecs
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    {!user ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav >
    );
};

export default Header;
