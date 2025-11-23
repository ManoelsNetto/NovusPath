import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { CAREER_DETAILS } from '../../data/mockData';
import './index.css';

export default function CareerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);

  useEffect(() => {
    // Simula fetch de dados
    const data = CAREER_DETAILS[id];
    if (data) {
      setCareer(data);
    } else {
      // Fallback para o ID 0 se não encontrar (apenas para demo)
      setCareer(CAREER_DETAILS[0]); 
    }
  }, [id]);

  if (!career) return <div className="text-white text-center py-5">Carregando dados da carreira...</div>;

  return (
    <div className="career-details-wrapper text-light">
      <Navbar />
      
      {/* Luzes de Fundo */}
      <div className="glow-blob glow-1" style={{top: '-10%', right: '-10%', background: '#22c55e', opacity: 0.15}}></div>
      <div className="glow-blob glow-2" style={{bottom: '10%', left: '-5%'}}></div>

      <div className="container py-5 position-relative z-1">
        
        {/* Breadcrumb / Back */}
        <button onClick={() => navigate(-1)} className="btn btn-link text-secondary text-decoration-none ps-0 mb-4 hover-white">
          <i className="bi bi-arrow-left me-2"></i> Voltar para Dashboard
        </button>

        {/* Hero Section */}
        <div className="row mb-5 align-items-center">
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill">
                <i className="bi bi-graph-up-arrow me-2"></i>Crescimento: {career.marketGrowth}
              </span>
              <span className="badge bg-dark border border-secondary text-secondary rounded-pill px-3 py-2">
                <i className="bi bi-briefcase me-2"></i>{career.openPositions} Vagas Abertas
              </span>
            </div>
            <h1 className="display-4 fw-bold text-white mb-3">{career.title}</h1>
            <p className="lead text-secondary">{career.description}</p>
          </div>
          <div className="col-lg-4 text-end">
            <div className="glass-panel p-4 d-inline-block text-start w-100 border-primary border-opacity-50">
              <span className="text-uppercase text-primary fw-bold small tracking-wider">Seu Match</span>
              <div className="d-flex align-items-end gap-2 mt-2">
                <h2 className="display-3 fw-bold text-white mb-0 lh-1">{career.matchScore}%</h2>
                <i className="bi bi-stars text-warning fs-3 mb-2"></i>
              </div>
              <p className="text-secondary small mt-3 mb-0">Baseado em suas skills atuais e interesses.</p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          
          {/* Coluna Esquerda: Detalhes e Skills */}
          <div className="col-lg-8 fade-in">
            
            {/* Sobre a Carreira */}
            <div className="glass-panel p-4 p-md-5 mb-4">
              <h4 className="fw-bold mb-4">Sobre a Posição</h4>
              <p className="text-light opacity-75 mb-4">{career.longDescription}</p>
              
              <h5 className="fw-bold mb-3 text-white">Por que combina com você?</h5>
              <div className="d-flex flex-wrap gap-2">
                {career.matchReasons.map((reason, i) => (
                  <span key={i} className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 py-2 px-3">
                    <i className="bi bi-check2-circle me-2"></i>{reason}
                  </span>
                ))}
              </div>
            </div>

            {/* Gap de Skills */}
            <div className="glass-panel p-4 p-md-5 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Análise de Competências</h4>
                <small className="text-secondary">
                  <span className="d-inline-block rounded-circle bg-primary me-1" style={{width:8, height:8}}></span> Você
                  <span className="d-inline-block rounded-circle bg-secondary ms-3 me-1 opacity-50" style={{width:8, height:8}}></span> Mercado
                </small>
              </div>

              <div className="d-flex flex-column gap-4">
                {career.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-bold text-light">{skill.name}</span>
                      <span className="text-secondary small">{skill.level}% / {skill.required}%</span>
                    </div>
                    <div className="skill-track">
                      {/* Barra do Mercado (Requisito) */}
                      <div className="skill-required" style={{width: `${skill.required}%`}}></div>
                      {/* Barra do Usuário */}
                      <div className="skill-user" style={{width: `${skill.level}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap de Aprendizado */}
            <div className="glass-panel p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Plano de Carreira Sugerido</h4>
                <button className="btn btn-sm btn-outline-light rounded-pill">Adicionar ao Planejador</button>
              </div>
              
              <div className="roadmap-container ps-2">
                {career.roadmap.map((step, i) => (
                  <div key={i} className={`roadmap-item ${step.status}`}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className={`fw-bold mb-1 ${step.status === 'locked' ? 'text-secondary' : 'text-white'}`}>
                          {step.title}
                        </h6>
                        <span className="badge bg-dark border border-secondary text-secondary" style={{fontSize: '0.65rem'}}>
                          {step.duration}
                        </span>
                      </div>
                      {step.status === 'completed' && <i className="bi bi-check-circle-fill text-success"></i>}
                      {step.status === 'in-progress' && <i className="bi bi-play-circle-fill text-primary"></i>}
                      {step.status === 'locked' && <i className="bi bi-lock-fill text-secondary opacity-50"></i>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita: Salário e CTA */}
          <div className="col-lg-4 fade-in">
            
            {/* Card Salarial */}
            <div className="glass-panel p-4 mb-4">
              <h5 className="fw-bold mb-4"><i className="bi bi-cash-stack me-2 text-success"></i>Panorama Salarial</h5>
              
              <div className="text-center mb-2">
                <span className="text-secondary small">Média de Mercado</span>
                <h2 className="text-white fw-bold">{career.salary.avg}</h2>
              </div>

              <div className="salary-bar-container">
                <div className="salary-fill" style={{width: '60%'}}></div>
                <div className="salary-marker" style={{left: '20%'}}>Júnior<br/>{career.salary.junior}</div>
                <div className="salary-marker" style={{left: '60%'}}>Média<br/>{career.salary.avg}</div>
                <div className="salary-marker" style={{left: '95%'}}>Sênior<br/>{career.salary.senior}</div>
              </div>
              <div className="mt-5 text-center">
                 <small className="text-secondary fst-italic">Fonte: Glassdoor/LinkedIn 2024</small>
              </div>
            </div>

            {/* CTA Card */}
            <div className="glass-panel p-4 text-center border-info border-opacity-50 position-relative overflow-hidden">
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-info opacity-10"></div>
              
              <div className="position-relative z-1">
                <i className="bi bi-rocket-takeoff-fill display-4 text-info mb-3 d-block"></i>
                <h4 className="fw-bold text-white">Começar Jornada</h4>
                <p className="text-secondary small mb-4">
                  Inicie agora a trilha de "Fundamentos de IA" e dê o primeiro passo.
                </p>
                <button className="btn btn-gradient w-100 py-3 rounded-pill fw-bold shadow-lg hover-scale">
                  Iniciar Trilha Agora
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}