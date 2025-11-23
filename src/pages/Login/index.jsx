// Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveUser } from '../../services/storage';
import { toast } from 'react-toastify';
import './index.css'; // Importe o CSS criado acima
// Certifique-se de importar também o Landpage.css se quiser reutilizar as classes globais como .text-gradient-primary

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para efeito visual de carregamento
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);

    // Simulando um pequeno delay para UX
    setTimeout(() => {
        const user = saveUser(email);
        toast.success(`Bem-vindo de volta, ${user.username}!`);
        setIsLoading(false);
        navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="login-wrapper">
      {/* Botão de Voltar para Home */}
      <Link to="/" className="btn-back">
        <i className="bi bi-arrow-left me-2"></i> Voltar para Home
      </Link>

      {/* Luzes de fundo ambientais (Mesmas da Landpage) */}
      <div className="glow-blob glow-1"></div>
      <div className="glow-blob glow-2" style={{bottom: '-10%', right: '-10%'}}></div>

      <div className="login-card p-4 p-md-5 fade-in">
        <div className="text-center mb-5">
          <div className="mb-3 d-inline-block p-3 rounded-circle bg-dark bg-opacity-50 border border-secondary border-opacity-25 shadow-lg">
             <i className="bi bi-compass-fill fs-1 text-info"></i>
          </div>
          <h2 className="fw-bold text-white">
            Acesse o <span className="text-gradient-primary">NovusPath</span>
          </h2>
          <p className="text-secondary small">
            Sua jornada de evolução profissional continua aqui.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label text-light small fw-semibold ms-1">Email Corporativo ou Pessoal</label>
            <div className="input-icon-wrapper">
                <i className="bi bi-envelope"></i>
                <input
                type="email"
                className="form-control form-control-lg form-control-glass rounded-3"
                id="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                />
            </div>
          </div>

          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-1">
                <label htmlFor="password" class="form-label text-light small fw-semibold ms-1">Senha</label>
                {/*<a href="#" className="text-decoration-none text-info small hover-opacity">Esqueceu?</a>*/}
            </div>
            <div className="input-icon-wrapper">
                <i className="bi bi-lock"></i>
                <input
                type="password"
                className="form-control form-control-lg form-control-glass rounded-3"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-gradient w-100 btn-lg rounded-pill shadow-lg fw-bold mb-4"
            disabled={isLoading}
          >
            {isLoading ? (
                <span><span className="spinner-border spinner-border-sm me-2"></span>Entrando...</span>
            ) : (
                <span><i className="bi bi-box-arrow-in-right me-2"></i> Acessar Plataforma</span>
            )}
          </button>

          <p className="text-center text-danger small mb-0">

            Não precisa de cadastro - apenas entre com qualquer email e senha!

          </p>
        
        {/*
          <p className="text-center text-secondary small mb-0">
            Ainda não tem conta? <a href="#" className="text-info text-decoration-none fw-bold">Criar agora</a>
          </p>
        */}
        </form>

        {/* Rodapé do Card - Features Rápidas */}
        <div className="mt-5 pt-4 border-top border-secondary border-opacity-25">
          <div className="row text-center g-0">
            <div className="col-4 border-end border-secondary border-opacity-10">
              <i className="bi bi-robot text-primary mb-1 d-block fs-5"></i>
              <span className="tiny-text text-secondary opacity-75" style={{fontSize: '0.7rem'}}>IA Advisor</span>
            </div>
            <div className="col-4 border-end border-secondary border-opacity-10">
              <i className="bi bi-graph-up text-success mb-1 d-block fs-5"></i>
              <span className="tiny-text text-secondary opacity-75" style={{fontSize: '0.7rem'}}>Evolução</span>
            </div>
            <div className="col-4">
              <i className="bi bi-shield-check text-warning mb-1 d-block fs-5"></i>
              <span className="tiny-text text-secondary opacity-75" style={{fontSize: '0.7rem'}}>Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}