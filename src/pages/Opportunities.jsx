import { useState } from 'react';
import Navbar from '../components/Navbar';
import { OPPORTUNITIES } from '../data/mockData';
import { getOpportunityApplications, saveOpportunityApplication, addXP, unlockBadge } from '../services/storage';
import { toast } from 'react-toastify';

export default function Opportunities() {
  const [applications, setApplications] = useState(getOpportunityApplications());
  const [filter, setFilter] = useState('all');

  const handleApply = (opportunityId) => {
    const opportunity = OPPORTUNITIES.find(o => o.id === opportunityId);
    
    if (applications.some(app => app.opportunityId === opportunityId)) {
      toast.info('Você já se candidatou a esta oportunidade!');
      return;
    }

    saveOpportunityApplication(opportunityId);
    setApplications(getOpportunityApplications());
    
    addXP(150);
    if (unlockBadge('first_application')) {
      toast.success('🎉 Badge desbloqueado: Corajoso!');
    }
    
    toast.success(`Candidatura enviada para "${opportunity.title}"!`);
  };

  const filteredOpportunities = filter === 'all'
    ? OPPORTUNITIES
    : OPPORTUNITIES.filter(o => o.category === filter);

  const hasApplied = (opportunityId) => {
    return applications.some(app => app.opportunityId === opportunityId);
  };

  return (
    <div>
      <Navbar />
      
      <div className="container my-5">
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold">Skills Marketplace</h1>
            <p className="lead text-muted">
              Descubra oportunidades alinhadas com o futuro do trabalho
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <div className="btn-group" role="group">
            <button
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              Todas
            </button>
            <button
              className={`btn ${filter === 'green' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('green')}
            >
              <i className="bi bi-tree me-1"></i>
              Empregos Verdes
            </button>
            <button
              className={`btn ${filter === 'wellness' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('wellness')}
            >
              <i className="bi bi-heart me-1"></i>
              Bem-Estar
            </button>
            <button
              className={`btn ${filter === 'education' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('education')}
            >
              <i className="bi bi-book me-1"></i>
              Educação
            </button>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="row g-4">
          {filteredOpportunities.map((opportunity) => {
            const applied = hasApplied(opportunity.id);

            return (
              <div key={opportunity.id} className="col-12">
                <div className="card opportunity-card">
                  <div className="card-body p-4">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <div className="d-flex align-items-start mb-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: '60px',
                              height: '60px',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              color: 'white',
                              fontSize: '1.5rem'
                            }}
                          >
                            <i className={`bi ${opportunity.icon}`}></i>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="mb-1">{opportunity.title}</h4>
                            <p className="text-muted mb-2">
                              <i className="bi bi-building me-2"></i>
                              {opportunity.company}
                            </p>
                            <div>
                              <span className="badge bg-primary me-2">
                                <i className="bi bi-briefcase me-1"></i>
                                {opportunity.type}
                              </span>
                              <span className="badge bg-info me-2">
                                <i className="bi bi-geo-alt me-1"></i>
                                {opportunity.location}
                              </span>
                              <span className="badge bg-success">
                                <i className="bi bi-currency-dollar me-1"></i>
                                {opportunity.salary}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted mb-3">{opportunity.description}</p>

                        <div>
                          <strong className="text-muted small">Habilidades requeridas:</strong>
                          <div className="mt-2">
                            {opportunity.skills.map((skill, idx) => (
                              <span key={idx} className="badge bg-light text-dark me-1 mb-1">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 text-center">
                        {applied ? (
                          <div>
                            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                            <p className="text-success fw-semibold mt-2 mb-0">Candidatura Enviada</p>
                          </div>
                        ) : (
                          <button
                            className="btn btn-gradient btn-lg"
                            onClick={() => handleApply(opportunity.id)}
                          >
                            <i className="bi bi-send me-2"></i>
                            Candidatar-se
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-light">
              <div className="card-body p-4 text-center">
                <h5 className="mb-3">Suas Estatísticas</h5>
                <div className="row">
                  <div className="col-md-4">
                    <h2 className="mb-0">{applications.length}</h2>
                    <p className="text-muted mb-0">Candidaturas Enviadas</p>
                  </div>
                  <div className="col-md-4">
                    <h2 className="mb-0">{OPPORTUNITIES.length}</h2>
                    <p className="text-muted mb-0">Oportunidades Disponíveis</p>
                  </div>
                  <div className="col-md-4">
                    <h2 className="mb-0">
                      {applications.length > 0 ? Math.round((applications.length / OPPORTUNITIES.length) * 100) : 0}%
                    </h2>
                    <p className="text-muted mb-0">Taxa de Engajamento</p>
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
