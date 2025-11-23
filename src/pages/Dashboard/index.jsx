import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getUser, getGamificationData, getLearningProgress, getWellnessData, addXP, unlockBadge } from '../../services/storage';
import { CAREER_RECOMMENDATIONS } from '../../data/mockData';
import { toast } from 'react-toastify';
import './index.css';

export default function Dashboard() {
  const user = getUser();
  const gamification = getGamificationData();
  const learning = getLearningProgress();
  const wellness = getWellnessData();

  useEffect(() => {
    // Verifica badge de primeiro login
    if (unlockBadge('first_login')) {
      toast.success('🎉 Badge desbloqueado: Primeiro Passo!');
      addXP(50);
    }
  }, []);

  const getWellnessStatus = () => {
    const energy = wellness.currentEnergy || 5;
    if (energy >= 8) return { text: 'Excelente', color: 'success', icon: 'bi-emoji-smile-fill' };
    if (energy >= 6) return { text: 'Bom', color: 'info', icon: 'bi-emoji-neutral-fill' };
    if (energy >= 4) return { text: 'Moderado', color: 'warning', icon: 'bi-emoji-frown-fill' };
    return { text: 'Atenção', color: 'danger', icon: 'bi-emoji-dizzy-fill' };
  };

  const wellnessStatus = getWellnessStatus();

  return (
    <div className="dashboard-wrapper text-light">
      {/* Luzes de Fundo Ambientais */}
      <div className="glow-blob glow-1" style={{ top: '-10%', left: '-5%', opacity: 0.4 }}></div>
      <div className="glow-blob glow-2" style={{ bottom: '10%', right: '-5%', opacity: 0.3 }}></div>

      <Navbar />

      <div className="container py-5 position-relative z-1">

        {/* Header Section */}
        <div className="row align-items-end mb-5 fade-in">
          <div className="col-lg-8">
            <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25 mb-3 px-3 py-2 rounded-pill">
              Dashboard Profissional
            </span>
            <h1 className="display-4 fw-bold mb-2">
              Olá, <span className="text-gradient-primary">{user?.username || 'Visionário'}</span>! 👋
            </h1>
            <p className="lead text-secondary mb-0">
              Aqui está o panorama da sua evolução no NovusPath hoje.
            </p>
          </div>

          {/* XP & Level Widget */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="glass-panel p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-trophy-fill text-warning"></i>
                  <span className="fw-bold">Nível {gamification.level}</span>
                </div>
                <span className="small text-info fw-bold">{gamification.xp % 1000}/1000 XP</span>
              </div>
              <div className="progress progress-glass">
                <div
                  className="progress-bar progress-bar-neon"
                  role="progressbar"
                  style={{ width: `${(gamification.xp % 1000) / 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="row g-4 mb-5 fade-in">
          {/* Cursos Ativos */}
          <div className="col-md-6 col-lg-3">
            <div className="glass-panel p-4 h-100 d-flex align-items-center gap-3">
              <div className="icon-box bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25">
                <i className="bi bi-book-fill"></i>
              </div>
              <div>
                <h3 className="fw-bold mb-0">{learning.inProgressCourses?.length || 0}</h3>
                <small className="text-secondary">Cursos Ativos</small>
              </div>
            </div>
          </div>

          {/* Concluídos */}
          <div className="col-md-6 col-lg-3">
            <div className="glass-panel p-4 h-100 d-flex align-items-center gap-3">
              <div className="icon-box bg-success bg-opacity-25 text-success border border-success border-opacity-25">
                <i className="bi bi-patch-check-fill"></i>
              </div>
              <div>
                <h3 className="fw-bold mb-0">{learning.completedCourses?.length || 0}</h3>
                <small className="text-secondary">Concluídos</small>
              </div>
            </div>
          </div>

          {/* Horas */}
          <div className="col-md-6 col-lg-3">
            <div className="glass-panel p-4 h-100 d-flex align-items-center gap-3">
              <div className="icon-box bg-info bg-opacity-25 text-info border border-info border-opacity-25">
                <i className="bi bi-clock-history"></i>
              </div>
              <div>
                <h3 className="fw-bold mb-0">{learning.totalHours || 0}h</h3>
                <small className="text-secondary">Horas de Foco</small>
              </div>
            </div>
          </div>

          {/* Bem-Estar */}
          <div className="col-md-6 col-lg-3">
            <div className="glass-panel p-4 h-100 d-flex align-items-center gap-3">
              <div
                className={`icon-box bg-${wellnessStatus.color} bg-opacity-25 text-${wellnessStatus.color} border border-${wellnessStatus.color} border-opacity-25`}
              >
                <i className={`bi ${wellnessStatus.icon}`}></i>
              </div>
              <div>
                <h5 className={`fw-bold mb-0 text-${wellnessStatus.color}`}>{wellnessStatus.text}</h5>
                <small className="text-secondary">Bem-Estar</small>
              </div>
            </div>
          </div>
        </div>

        {/* Main Section: IA Advisor & Quick Actions */}
        <div className="row g-4 fade-in">

          {/* Left Column: IA Career Advisor */}
          <div className="col-lg-8">
            <div className="glass-panel p-4 p-md-5 h-100">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-box bg-gradient text-white shadow me-3" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}>
                  <i className="bi bi-stars"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-1">NovusPath AI Advisor</h3>
                  <p className="text-secondary small mb-0">Recomendações de carreira baseadas em IA para o seu perfil</p>
                </div>
              </div>

              <div className="row g-3">
                {CAREER_RECOMMENDATIONS.map((career, index) => (
                  <div key={index} className="col-md-6">
                    <div className="inner-card p-3 h-100 position-relative overflow-hidden">
                      {/* Decorative accent */}
                      <div className="position-absolute top-0 start-0 bottom-0 bg-info" style={{ width: '4px' }}></div>

                      <div className="ps-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold text-white mb-0 text-truncate pe-2" title={career.title}>{career.title}</h6>
                          <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 rounded-pill" style={{ fontSize: '0.65rem' }}>
                            {career.growth}
                          </span>
                        </div>

                        <p className="text-secondary small mb-3 line-clamp-2" style={{ minHeight: '2.5em' }}>
                          {career.description}
                        </p>

                        <div className="d-flex flex-wrap gap-1 mb-3">
                          {career.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="badge bg-dark border border-secondary text-secondary" style={{ fontSize: '0.65rem' }}>
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* LINK CORRIGIDO PARA A NOVA PÁGINA DE DETALHES */}
                        <Link 
                          to={`/career/${index}`} 
                          className="btn btn-sm btn-outline-light w-100 rounded-pill hover-scale" 
                          style={{ fontSize: '0.8rem' }}
                        >
                          Ver Detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4 pt-2 border-top border-secondary border-opacity-25">
                <Link to="/learning" className="text-decoration-none text-info small fw-bold hover-scale d-inline-block">
                  Ver todas as trilhas disponíveis <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-3 h-100">

              {/* Action 1: Cursos */}
              <Link to="/learning" className="text-decoration-none">
                <div className="glass-panel glass-panel-interactive p-4 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-box bg-purple bg-opacity-25 text-white" style={{ background: '#a855f7' }}>
                      <i className="bi bi-mortarboard-fill"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold text-white mb-0">Meus Cursos</h6>
                      <small className="text-secondary">Continuar aprendendo</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-secondary"></i>
                </div>
              </Link>

              {/* Action 2: Bem-Estar */}
              <Link to="/wellness" className="text-decoration-none">
                <div className="glass-panel glass-panel-interactive p-4 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-box bg-pink bg-opacity-25 text-white" style={{ background: '#ec4899' }}>
                      <i className="bi bi-heart-pulse-fill"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold text-white mb-0">Bem-Estar</h6>
                      <small className="text-secondary">Fazer check-in diário</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-secondary"></i>
                </div>
              </Link>

              {/* Action 3: Planner */}
              <Link to="/study-planner" className="text-decoration-none">
                <div className="glass-panel glass-panel-interactive p-4 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-box bg-cyan bg-opacity-25 text-white" style={{ background: '#06b6d4' }}>
                      <i className="bi bi-calendar-check-fill"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold text-white mb-0">Planos</h6>
                      <small className="text-secondary">Agenda inteligente</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-secondary"></i>
                </div>
              </Link>

              {/* Dica Rápida (Estático) */}
              <div className="glass-panel p-4 mt-auto border-warning border-opacity-25 position-relative overflow-hidden">
                 <div className="position-absolute top-0 start-0 w-100 h-100 bg-warning opacity-10"></div>
                 <div className="position-relative z-1 d-flex gap-3">
                    <i className="bi bi-lightbulb-fill text-warning fs-4"></i>
                    <div>
                        <h6 className="fw-bold text-white mb-1">Dica Rápida</h6>
                        <p className="text-secondary small mb-0 lh-sm">
                            O mercado de IA cresce 350%. Confira a trilha de "Ética em IA".
                        </p>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}