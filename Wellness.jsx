import { useState } from 'react';
import Navbar from './src/components/Navbar';
import { getWellnessData, saveWellnessData, addXP, unlockBadge } from './src/services/storage';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Wellness() {
  const wellnessData = getWellnessData();
  const [energy, setEnergy] = useState(wellnessData.currentEnergy || 5);
  const [mood, setMood] = useState(wellnessData.currentMood || 5);

  const handleSaveCheckIn = () => {
    saveWellnessData({ energy, mood });
    addXP(50);
    
    const history = getWellnessData().history || [];
    if (history.length >= 7) {
      if (unlockBadge('wellness_week')) {
        toast.success('🎉 Badge desbloqueado: Cuidador!');
      }
    }
    
    toast.success('Check-in salvo com sucesso!');
  };

  const getEnergyLabel = (value) => {
    if (value >= 9) return 'Excelente';
    if (value >= 7) return 'Muito Bom';
    if (value >= 5) return 'Bom';
    if (value >= 3) return 'Moderado';
    return 'Baixo';
  };

  const getMoodEmoji = (value) => {
    if (value >= 9) return '😄';
    if (value >= 7) return '🙂';
    if (value >= 5) return '😐';
    if (value >= 3) return '😕';
    return '😢';
  };

  const getBurnoutRisk = () => {
    const avgEnergy = wellnessData.history?.length > 0
      ? wellnessData.history.reduce((sum, item) => sum + item.energy, 0) / wellnessData.history.length
      : energy;

    if (avgEnergy >= 7) return { level: 'Baixo', color: 'success', icon: 'bi-check-circle' };
    if (avgEnergy >= 5) return { level: 'Moderado', color: 'warning', icon: 'bi-exclamation-triangle' };
    return { level: 'Alto', color: 'danger', icon: 'bi-exclamation-octagon' };
  };

  const burnoutRisk = getBurnoutRisk();

  // Prepare chart data
  const chartData = wellnessData.history?.slice(-7).map((item, index) => ({
    day: `Dia ${index + 1}`,
    energia: item.energy,
    humor: item.mood,
  })) || [];

  return (
    <div>
      <Navbar />
      
      <div className="container my-5">
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold">Bem-Estar Mental</h1>
            <p className="lead text-muted">
              Monitore sua saúde mental e previna o burnout
            </p>
          </div>
        </div>

        <div className="row g-4 mb-4">
          {/* Check-in Card */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body p-4">
                <h4 className="card-title mb-4">
                  <i className="bi bi-clipboard-heart me-2" style={{ color: '#f093fb' }}></i>
                  Check-in Diário
                </h4>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Nível de Energia: {getEnergyLabel(energy)} ({energy}/10)
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="1"
                    max="10"
                    value={energy}
                    onChange={(e) => setEnergy(parseInt(e.target.value))}
                  />
                  <div className="d-flex justify-content-between text-muted small">
                    <span>Muito Baixo</span>
                    <span>Excelente</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Humor: {getMoodEmoji(mood)} ({mood}/10)
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="1"
                    max="10"
                    value={mood}
                    onChange={(e) => setMood(parseInt(e.target.value))}
                  />
                  <div className="d-flex justify-content-between text-muted small">
                    <span>😢 Triste</span>
                    <span>😄 Feliz</span>
                  </div>
                </div>

                <button className="btn btn-gradient w-100" onClick={handleSaveCheckIn}>
                  <i className="bi bi-save me-2"></i>
                  Salvar Check-in
                </button>
              </div>
            </div>
          </div>

          {/* Burnout Risk Card */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body p-4">
                <h4 className="card-title mb-4">
                  <i className="bi bi-shield-check me-2" style={{ color: '#4facfe' }}></i>
                  Análise de Burnout
                </h4>

                <div className="text-center mb-4">
                  <i className={`bi ${burnoutRisk.icon}`} style={{ fontSize: '4rem', color: `var(--bs-${burnoutRisk.color})` }}></i>
                  <h3 className={`mt-3 text-${burnoutRisk.color}`}>
                    Risco {burnoutRisk.level}
                  </h3>
                  <p className="text-muted">
                    {burnoutRisk.level === 'Baixo' && 'Continue cuidando do seu bem-estar!'}
                    {burnoutRisk.level === 'Moderado' && 'Atenção: considere fazer mais pausas'}
                    {burnoutRisk.level === 'Alto' && 'Alerta: procure ajuda profissional'}
                  </p>
                </div>

                <div className="alert alert-info">
                  <strong>💡 Dica:</strong> Faça check-ins diários para monitorar sua saúde mental ao longo do tempo.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body p-4">
                  <h4 className="card-title mb-4">
                    <i className="bi bi-graph-up me-2" style={{ color: '#667eea' }}></i>
                    Histórico dos Últimos 7 Dias
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="energia" stroke="#667eea" strokeWidth={2} name="Energia" />
                      <Line type="monotone" dataKey="humor" stroke="#f093fb" strokeWidth={2} name="Humor" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body p-4">
                <h4 className="card-title mb-4">
                  <i className="bi bi-lightbulb me-2" style={{ color: '#fa709a' }}></i>
                  Recomendações Personalizadas
                </h4>
                
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded">
                      <h5><i className="bi bi-pause-circle me-2"></i>Faça Pausas</h5>
                      <p className="text-muted mb-0 small">
                        A cada 90 minutos, faça uma pausa de 10-15 minutos para recarregar
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded">
                      <h5><i className="bi bi-moon-stars me-2"></i>Desconecte-se</h5>
                      <p className="text-muted mb-0 small">
                        Estabeleça limites claros entre trabalho e vida pessoal
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded">
                      <h5><i className="bi bi-heart me-2"></i>Cuide-se</h5>
                      <p className="text-muted mb-0 small">
                        Pratique exercícios, durma bem e mantenha conexões sociais
                      </p>
                    </div>
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
