// Profile.jsx
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { getUser, getProfile, saveProfile, getGamificationData, clearAllData } from '../../services/storage';
import { BADGES } from '../../data/mockData';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function Profile() {
  const user = getUser();
  const gamification = getGamificationData();
  const [profile, setProfile] = useState(getProfile());
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    saveProfile(profile);
    setIsEditing(false);
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleClearData = () => {
    if (window.confirm('ATENÇÃO: Isso apagará todo seu progresso, nível e histórico. Deseja continuar?')) {
      clearAllData();
      toast.info('Dados limpos com sucesso!');
      navigate('/');
    }
  };

  const unlockedBadges = BADGES.filter(badge => gamification.badges.includes(badge.id));
  const lockedBadges = BADGES.filter(badge => !gamification.badges.includes(badge.id));

  return (
    <div className="profile-wrapper text-light">
      <Navbar />
      
      {/* Luzes de Fundo */}
      <div className="glow-blob glow-1" style={{top: '20%', left: '-5%'}}></div>
      <div className="glow-blob glow-2" style={{bottom: '10%', right: '-5%'}}></div>

      <div className="container py-5 position-relative z-1">
        
        {/* Cabeçalho */}
        <div className="row mb-5 fade-in">
          <div className="col-12">
            <h1 className="display-4 fw-bold">Meu <span className="text-gradient-primary">Perfil</span></h1>
            <p className="lead text-secondary">Gerencie suas informações e visualize suas conquistas.</p>
          </div>
        </div>

        <div className="row g-4">
          
          {/* Coluna Esquerda: Identidade & Stats */}
          <div className="col-lg-4 fade-in">
            {/* Card do Usuário */}
            <div className="glass-panel p-4 text-center mb-4">
              <div className="avatar-container mb-4">
                <div className="avatar-inner">
                  {/* Se tiver foto url, usa img, senão usa ícone/inicial */}
                  {user?.username?.charAt(0).toUpperCase() || <i className="bi bi-person-fill"></i>}
                </div>
              </div>
              
              <h3 className="fw-bold mb-1">{profile.name || user?.username || 'Viajante'}</h3>
              <p className="text-info small mb-4">{user?.email}</p>

              {/* Status Bar */}
              <div className="bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary border-opacity-25">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-warning text-dark fw-bold">
                    <i className="bi bi-star-fill me-1"></i> Nível {gamification.level}
                  </span>
                  <span className="text-secondary small">{gamification.xp} XP</span>
                </div>
                <div className="progress" style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <div
                    className="progress-bar bg-gradient-primary"
                    style={{ 
                        width: `${(gamification.xp % 1000) / 10}%`,
                        background: 'linear-gradient(90deg, #6366f1, #a855f7)'
                    }}
                  ></div>
                </div>
                <div className="text-end mt-1">
                  <small className="text-secondary" style={{fontSize: '0.7rem'}}>
                    {1000 - (gamification.xp % 1000)} XP para o próximo nível
                  </small>
                </div>
              </div>
            </div>

            {/* Badges Desbloqueados (Mini Grid) */}
            <div className="glass-panel p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center">
                <i className="bi bi-trophy-fill text-warning me-2"></i> Conquistas
              </h5>
              <div className="row g-3">
                {unlockedBadges.map((badge) => (
                  <div key={badge.id} className="col-4">
                    <div className="text-center" title={badge.description}>
                      <div className="badge-icon-box bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">
                        <i className={`bi ${badge.icon}`}></i>
                      </div>
                      <small className="d-block text-white text-truncate" style={{fontSize: '0.7rem'}}>
                        {badge.name}
                      </small>
                    </div>
                  </div>
                ))}
                {unlockedBadges.length === 0 && (
                  <div className="col-12 text-center py-3">
                    <i className="bi bi-lock text-secondary fs-1 opacity-25"></i>
                    <p className="text-secondary small mt-2">Nenhuma conquista ainda.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário & Bloqueados */}
          <div className="col-lg-8 fade-in">
            
            {/* Formulário de Edição */}
            <div className="glass-panel p-4 p-md-5 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 fw-bold">
                  <i className="bi bi-person-lines-fill me-2 text-primary"></i>
                  Dados Pessoais
                </h4>
                <button
                  className={`btn btn-sm ${isEditing ? 'btn-success' : 'btn-outline-light'} rounded-pill px-3`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  <i className={`bi ${isEditing ? 'bi-check-lg' : 'bi-pencil'} me-2`}></i>
                  {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
                </button>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label text-secondary small">Nome Completo</label>
                  <input
                    type="text"
                    className="form-control form-control-glass"
                    value={profile.name || ''}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Como prefere ser chamado?"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-secondary small">Cargo Atual</label>
                  <input
                    type="text"
                    className="form-control form-control-glass"
                    value={profile.currentRole || ''}
                    onChange={(e) => setProfile({ ...profile, currentRole: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Ex: Estudante, Desenvolvedor..."
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-secondary small">Anos de Experiência</label>
                  <input
                    type="number"
                    className="form-control form-control-glass"
                    value={profile.experience || 0}
                    onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-secondary small">Email (Não editável)</label>
                  <input
                    type="email"
                    className="form-control form-control-glass opacity-50"
                    value={user?.email || ''}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Badges Bloqueados (Lista Detalhada) */}
            {lockedBadges.length > 0 && (
              <div className="glass-panel p-4 mb-4">
                <h5 className="fw-bold mb-4 text-secondary">
                  <i className="bi bi-lock-fill me-2"></i> Próximas Conquistas
                </h5>
                <div className="row g-3">
                  {lockedBadges.map((badge) => (
                    <div key={badge.id} className="col-md-6">
                      <div className="badge-card badge-locked d-flex align-items-center gap-3">
                        <div className="badge-icon-box bg-secondary bg-opacity-10 text-secondary mb-0">
                          <i className={`bi ${badge.icon}`}></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-white mb-1">{badge.name}</h6>
                          <p className="text-secondary small mb-0 lh-sm">{badge.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Zona de Perigo */}
            <div className="danger-zone p-4">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div>
                  <h5 className="text-danger fw-bold mb-1">
                    <i className="bi bi-exclamation-octagon me-2"></i>Zona de Perigo
                  </h5>
                  <p className="text-danger text-opacity-75 small mb-0">
                    A exclusão dos dados é irreversível.
                  </p>
                </div>
                <button className="btn btn-outline-danger btn-sm" onClick={handleClearData}>
                  <i className="bi bi-trash me-2"></i>
                  Apagar Conta e Dados
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}