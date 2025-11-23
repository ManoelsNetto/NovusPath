// Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getUser, logout, getGamificationData } from '../../services/storage';
import { toast } from 'react-toastify';
import './index.css';

// 1. Configuração com o campo 'show'
const NavbarItensConfig = [
  { 
    label: 'Dashboard', 
    path: '/dashboard', 
    icon: 'bi-speedometer2',
    show: true 
  },
  { 
    label: 'Aprendizagem', 
    path: '/learning', 
    icon: 'bi-mortarboard',
    show: true 
  },
  { 
    label: 'Planejador', 
    path: '/study-planner', 
    icon: 'bi-calendar-check',
    show: true 
  },
  { 
    label: 'Bem-Estar', 
    path: '/wellness', 
    icon: 'bi-heart-pulse',
    show: true 
  },
  { 
    label: 'Vagas', 
    path: '/opportunities', 
    icon: 'bi-briefcase',
    show: false 
  }
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const gamification = getGamificationData();

  const handleLogout = () => {
    logout();
    toast.info('Até logo! Esperamos você em breve.');
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-glass sticky-top py-3">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/dashboard">
          <div className="d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded-circle border border-secondary border-opacity-25 me-2" style={{width: '35px', height: '35px'}}>
            <i className="bi bi-compass-fill text-info fs-5"></i>
          </div>
          <span className="text-white">Novus<span className="text-info">Path</span></span>
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-center gap-1">
            
           
            {NavbarItensConfig
              .filter(item => item.show) // Só passa para o map se show for true
              .map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link 
                    className={`nav-link nav-link-custom ${isActive(item.path)}`} 
                    to={item.path}
                  >
                    <i className={`bi ${item.icon} me-2`}></i>
                    {item.label}
                  </Link>
                </li>
            ))}

          </ul>

          {/* User & Stats Section */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* Gamification Capsule */}
            <div className="gamification-box d-none d-lg-flex" title="Seu progresso atual">
              <span className="badge-neon-level">
                <i className="bi bi-star-fill me-1 text-warning"></i>
                Lvl {gamification.level}
              </span>
              <span className="badge-neon-xp">
                {gamification.xp} XP
              </span>
            </div>
            
            {/* Mobile-only Gamification */}
            <div className="d-lg-none d-flex justify-content-center w-100 mb-3 border border-secondary border-opacity-25 rounded p-2">
                <small className="text-light me-3">Nível {gamification.level}</small>
                <small className="text-info">{gamification.xp} XP</small>
            </div>

            {/* User Dropdown */}
            <div className="dropdown">
                <a 
                    className="d-flex align-items-center text-decoration-none text-light dropdown-toggle" 
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                >
                    <div className="bg-gradient rounded-circle d-flex align-items-center justify-content-center text-white fw-bold border border-white border-opacity-25" style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1, #a855f7)'}}>
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-dark border border-secondary border-opacity-25 shadow-lg glass-panel mt-2">
                    <li><span className="dropdown-header text-secondary">Olá, {user?.username}</span></li>
                    <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person me-2"></i>Meu Perfil</Link></li>
                    <li><hr className="dropdown-divider border-secondary border-opacity-25" /></li>
                    <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i>Sair
                        </button>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}