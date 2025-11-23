import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Landpage() {
  useEffect(() => {
    // Smooth scroll nativo
    const handleSmoothScroll = (e) => {
      if (e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="landpage text-light position-relative">
      {/* Luzes de fundo ambientais */}
      <div className="glow-blob glow-1"></div>
      <div className="glow-blob glow-2"></div>

      {/* Navigation - Navbar Glass */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-3 glass-card border-0 border-bottom border-secondary border-opacity-25 rounded-0">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center" to="/">
            <i className="bi bi-compass-fill me-2 text-info"></i>
            <span>Novus<span className="text-info">Path</span></span>
          </Link>
          
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto align-items-center gap-lg-3">
              <a className="nav-link text-light fw-medium" href="#features">Recursos</a>
              <a className="nav-link text-light fw-medium" href="#problem">Mercado</a>
              <a className="btn btn-outline-light rounded-pill px-4 btn-sm" href="#demo">
                <i className="bi bi-play-circle me-2"></i>Demo
              </a>
              <Link to="/login" className="btn btn-gradient rounded-pill px-4 btn-sm shadow-lg">
                Acessar Plataforma
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-vh-100 d-flex align-items-center pt-5">
        <div className="container pt-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-3 py-2 rounded-pill mb-4">
                <i className="bi bi-stars me-2"></i> Revolução Profissional 4.0
              </div>
              <h1 className="display-3 fw-bold text-white mb-4 lh-sm">
                Seu <span className="text-gradient-primary">Futuro</span> Começa <br />
                Com Inteligência.
              </h1>
              <p className="lead text-secondary mb-5 fs-5">
                Domine as competências de 2030 com IA, aprendizado adaptativo e foco total no seu bem-estar. O caminho para o topo não precisa ser solitário.
              </p>
              <div className="d-flex gap-3 flex-column flex-sm-row">
                <a href="#features" className="btn btn-gradient btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg">
                  Explorar Agora <i className="bi bi-arrow-right ms-2"></i>
                </a>
                <a href="#demo" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold hover-scale">
                  <i className="bi bi-play-fill me-2"></i> Ver Pitch
                </a>
              </div>
              
              {/* Mini Stats Hero */}
              <div className="row mt-5 border-top border-secondary border-opacity-25 pt-4">
                <div className="col-4">
                  <h4 className="fw-bold text-white mb-0">+350%</h4>
                  <small className="text-secondary">Crescimento IA</small>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold text-white mb-0">24/7</h4>
                  <small className="text-secondary">Mentoria</small>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold text-white mb-0">100%</h4>
                  <small className="text-secondary">Personalizado</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="glass-card p-4 p-md-5 rounded-4 position-relative">
                <div className="position-absolute top-0 end-0 p-3">
                  <i className="bi bi-cpu text-info fs-1 opacity-50"></i>
                </div>
                <i className="bi bi-robot display-1 text-gradient-primary mb-4 d-block"></i>
                <h3 className="text-white fw-bold">IA Career Navigator</h3>
                <p className="text-secondary mb-4">
                  "Com base no seu perfil, identificamos 3 carreiras emergentes com match de 95% para suas habilidades atuais."
                </p>
                
                {/* Simulando UI Card */}
                <div className="bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary border-opacity-25 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-light small">Engenheiro de Prompt</span>
                    <span className="badge bg-success bg-opacity-25 text-success">98% Match</span>
                  </div>
                  <div className="progress" style={{height: '6px'}}>
                    <div className="progress-bar bg-info" role="progressbar" style={{width: '98%'}}></div>
                  </div>
                </div>
                <div className="bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary border-opacity-25">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-light small">Especialista em Ética de IA</span>
                    <span className="badge bg-warning bg-opacity-25 text-warning">85% Match</span>
                  </div>
                  <div className="progress" style={{height: '6px'}}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section (Grid Moderno) */}
      <section id="problem" className="py-5 position-relative">
        <div className="container py-5">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3">O Mercado em <span className="text-warning">Transformação</span></h2>
              <p className="text-secondary lead">Dados alarmantes que definem a necessidade de adaptação imediata.</p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="glass-card p-4 rounded-4 h-100 text-center border-top border-4 border-warning">
                <i className="bi bi-exclamation-triangle text-warning display-4 mb-3 d-block"></i>
                <h2 className="fw-bold text-white">85%</h2>
                <p className="text-secondary">Das profissões de 2030 ainda não existem hoje.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-card p-4 rounded-4 h-100 text-center border-top border-4 border-danger">
                <i className="bi bi-heartbreak text-danger display-4 mb-3 d-block"></i>
                <h2 className="fw-bold text-white">42%</h2>
                <p className="text-secondary">Dos profissionais sofrem com Burnout atualmente.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-card p-4 rounded-4 h-100 text-center border-top border-4 border-info">
                <i className="bi bi-lightning-charge text-info display-4 mb-3 d-block"></i>
                <h2 className="fw-bold text-white">67%</h2>
                <p className="text-secondary">Necessitam de reskilling urgente para não ficarem obsoletos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="text-info fw-bold text-uppercase tracking-wider small">Nossa Solução</span>
            <h2 className="display-4 fw-bold text-white mt-2">Ecossistema <span className="text-gradient-primary">NovusPath</span></h2>
          </div>

          <div className="row g-4">
            {/* Feature Cards com mapeamento manual para controle total do layout */}
            {[
              { icon: 'bi-robot', color: 'text-primary', title: 'IA Navigator', desc: 'Algoritmos preditivos que traçam o caminho ideal para sua carreira.' },
              { icon: 'bi-layers', color: 'text-info', title: 'Skill Builder', desc: 'Trilhas adaptativas que mudam conforme seu ritmo de aprendizado.' },
              { icon: 'bi-heart-pulse', color: 'text-danger', title: 'Wellness Guardian', desc: 'Monitoramento de saúde mental integrado à produtividade.' },
              // { icon: 'bi-briefcase', color: 'text-warning', title: 'Smart Match', desc: 'Conexão direta com vagas que buscam exatamente seu perfil.' },
              // { icon: 'bi-controller', color: 'text-success', title: 'Gamificação', desc: 'Transforme o desenvolvimento profissional em uma jornada RPG.' },
            ].map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="glass-card p-4 h-100 rounded-4">
                  <div className={`rounded-circle bg-dark bg-opacity-50 d-inline-flex p-3 mb-4 border border-secondary border-opacity-25`}>
                    <i className={`bi ${item.icon} ${item.color} fs-2`}></i>
                  </div>
                  <h4 className="text-white fw-bold mb-3">{item.title}</h4>
                  <p className="text-secondary mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo" className="py-5">
        <div className="container">
          <div className="glass-card p-1 rounded-5 overflow-hidden shadow-lg">
            <div className="row g-0 align-items-center">
              <div className="col-lg-7">
                {/* Container da proporção de vídeo (16:9) */}
                <div className="ratio ratio-16x9 bg-black rounded-start-5">
                  <iframe 
                    src="https://www.youtube.com/embed/3HtdhiPbSrI?rel=0" 
                    title="NovusPath Video Pitch" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    style={{ border: 0 }}
                  ></iframe>
                </div>
              </div>
              <div className="col-lg-5 p-5">
                <div className="badge bg-danger text-white mb-3">Assista Agora</div>
                <h3 className="fw-bold text-white mb-3">Em 3 minutos, o futuro.</h3>
                <p className="text-secondary mb-4">
                  Entenda como a metodologia NovusPath une tecnologia de ponta e humanização para revolucionar o mercado de trabalho.
                </p>
                
                <div className="d-flex gap-2 flex-wrap">
                  <span className="badge bg-dark border border-secondary text-secondary rounded-pill px-3 py-2">Inovação</span>
                  <span className="badge bg-dark border border-secondary text-secondary rounded-pill px-3 py-2">IA</span>
                  <span className="badge bg-dark border border-secondary text-secondary rounded-pill px-3 py-2">Futuro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 mt-5">
        <div className="container text-center">
          <div className="glass-card p-5 rounded-5 position-relative overflow-hidden border-0">
            {/* Decorative background element */}
            <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 bg-gradient opacity-25" style={{background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(0,0,0,0) 70%)'}}></div>
            
            <div className="position-relative z-2">
              <h2 className="display-4 fw-bold text-white mb-4">Pronto para decolar?</h2>
              <p className="lead text-secondary mb-5 w-75 mx-auto">
                Junte-se a milhares de profissionais que já estão moldando o amanhã. Comece sua jornada gratuita.
              </p>
              <Link to="/login" className="btn btn-gradient btn-lg rounded-pill px-5 py-3 shadow-lg">
                <i className="bi bi-rocket-takeoff me-2"></i> Criar Conta Gratuita
              </Link>
              <p className="mt-4 small text-secondary">Sem cartão de crédito necessário • Cancelamento a qualquer momento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-top border-secondary border-opacity-10 py-5 bg-dark bg-opacity-50">
        <div className="container">
          <div className="row gy-4 justify-content-between align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h5 className="fw-bold text-white mb-1">NovusPath</h5>
              <p className="text-secondary small mb-0">Global Solution 2025/2 - FIAP</p>
            </div>
            {/*
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex justify-content-center justify-content-md-end gap-3">
                <a href="#" className="text-secondary hover-text-white"><i className="bi bi-github fs-5"></i></a>
                <a href="#" className="text-secondary hover-text-white"><i className="bi bi-linkedin fs-5"></i></a>
                <a href="#" className="text-secondary hover-text-white"><i className="bi bi-instagram fs-5"></i></a>
              </div>
            </div>
            */}
          </div>
        </div>
      </footer>
    </div>
  );
}