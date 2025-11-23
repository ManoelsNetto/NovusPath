// Wellness.jsx
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { getWellnessData, saveWellnessData, addXP, unlockBadge } from '../../services/storage';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './index.css';

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
    if (value >= 9) return { text: 'Excelente', color: 'text-success' };
    if (value >= 7) return { text: 'Muito Bom', color: 'text-info' };
    if (value >= 5) return { text: 'Bom', color: 'text-primary' };
    if (value >= 3) return { text: 'Moderado', color: 'text-warning' };
    return { text: 'Baixo', color: 'text-danger' };
  };

  const getMoodEmoji = (value) => {
    if (value >= 9) return '🤩';
    if (value >= 7) return '😄';
    if (value >= 5) return '🙂';
    if (value >= 3) return '😕';
    return '😫';
  };

  const getBurnoutRisk = () => {
    const avgEnergy = wellnessData.history?.length > 0
      ? wellnessData.history.reduce((sum, item) => sum + item.energy, 0) / wellnessData.history.length
      : energy;

    if (avgEnergy >= 7) return { level: 'Baixo', color: 'success', colorHex: '#22c55e', icon: 'bi-shield-check' };
    if (avgEnergy >= 5) return { level: 'Moderado', color: 'warning', colorHex: '#eab308', icon: 'bi-shield-exclamation' };
    return { level: 'Alto', color: 'danger', colorHex: '#ef4444', icon: 'bi-shield-x' };
  };

  const burnoutRisk = getBurnoutRisk();

  // Dados para o gráfico
  const chartData = wellnessData.history?.slice(-7).map((item, index) => ({
    day: `Dia ${index + 1}`,
    energia: item.energy,
    humor: item.mood,
  })) || [];

  const energyInfo = getEnergyLabel(energy);

  return (
    <div className="wellness-wrapper text-light">
      <Navbar />
      
      {/* Luzes de Fundo Ambientais */}
      <div className="glow-blob glow-1" style={{top: '10%', left: '20%', background: '#ec4899', opacity: 0.2}}></div>
      <div className="glow-blob glow-2" style={{bottom: '10%', right: '10%', background: '#22c55e', opacity: 0.15}}></div>

      <div className="container py-5 position-relative z-1">
        
        {/* Header */}
        <div className="row mb-5 fade-in">
          <div className="col-lg-8">
            <span className="text-pink fw-bold text-uppercase tracking-wider small" style={{color: '#f472b6'}}>
              <i className="bi bi-heart-pulse me-2"></i>Saúde Mental
            </span>
            <h1 className="display-4 fw-bold mt-2">
              Monitor de <span className="text-gradient-primary">Bem-Estar</span>
            </h1>
            <p className="lead text-secondary">
              Acompanhe sua energia e humor para manter o equilíbrio profissional.
            </p>
          </div>
        </div>

        <div className="row g-4 mb-4">
          
          {/* Card Esquerdo: Check-in */}
          <div className="col-lg-6 fade-in">
            <div className="glass-panel p-4 p-md-5 h-100">
              <div className="d-flex align-items-center mb-4">
                 <div className="icon-box bg-dark bg-opacity-50 text-white border border-secondary border-opacity-25 me-3">
                    <i className="bi bi-sliders"></i>
                 </div>
                 <h3 className="fw-bold mb-0">Check-in Diário</h3>
              </div>

              {/* Slider Energia */}
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-end mb-2">
                    <label className="form-label text-secondary fw-bold mb-0">Nível de Energia</label>
                    <span className={`fw-bold ${energyInfo.color}`}>{energyInfo.text} ({energy}/10)</span>
                </div>
                <input
                  type="range"
                  className="form-range range-neon range-energy"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between text-secondary opacity-50 small mt-2">
                  <span>Exausto</span>
                  <span>Energizado</span>
                </div>
              </div>

              {/* Slider Humor */}
              <div className="mb-5">
                 <div className="d-flex justify-content-between align-items-end mb-2">
                    <label className="form-label text-secondary fw-bold mb-0">Humor Atual</label>
                    <span className="fs-4">{getMoodEmoji(mood)}</span>
                </div>
                <input
                  type="range"
                  className="form-range range-neon range-mood"
                  min="1"
                  max="10"
                  value={mood}
                  onChange={(e) => setMood(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between text-secondary opacity-50 small mt-2">
                  <span>Péssimo</span>
                  <span>Incrível</span>
                </div>
              </div>

              <button 
                className="btn btn-gradient w-100 py-3 fw-bold rounded-pill shadow-lg" 
                onClick={handleSaveCheckIn}
              >
                <i className="bi bi-check-lg me-2"></i>
                Salvar Registro
              </button>
            </div>
          </div>

          {/* Card Direito: Análise de Risco */}
          <div className="col-lg-6 fade-in">
            <div className="glass-panel p-4 p-md-5 h-100 text-center d-flex flex-column justify-content-center">
                <h4 className="text-secondary fw-bold mb-4">Análise de Burnout</h4>
                
                <div 
                    className="burnout-indicator mb-4"
                    style={{
                        borderColor: burnoutRisk.colorHex,
                        color: burnoutRisk.colorHex,
                        boxShadow: `0 0 40px ${burnoutRisk.colorHex}40`
                    }}
                >
                    <i className={`bi ${burnoutRisk.icon}`}></i>
                </div>

                <h2 className="fw-bold text-white mb-2">Risco {burnoutRisk.level}</h2>
                
                <p className="text-secondary w-75 mx-auto mb-4">
                    {burnoutRisk.level === 'Baixo' && 'Ótimo trabalho! Você está mantendo um excelente equilíbrio.'}
                    {burnoutRisk.level === 'Moderado' && 'Atenção: Seus níveis de energia estão oscilando. Tente descansar mais.'}
                    {burnoutRisk.level === 'Alto' && 'Alerta Vermelho: Seus indicadores sugerem exaustão. Priorize sua saúde agora.'}
                </p>

                <div className="bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary border-opacity-25 d-inline-block mx-auto">
                    <small className="text-info"><i className="bi bi-lightbulb-fill me-1"></i> Dica: Check-ins regulares aumentam a precisão.</small>
                </div>
            </div>
          </div>
        </div>

        {/* Gráfico */}
        {chartData.length > 0 && (
          <div className="row mb-5 fade-in">
            <div className="col-12">
              <div className="glass-panel p-4">
                <div className="d-flex align-items-center mb-4">
                    <i className="bi bi-graph-up-arrow text-info me-2 fs-4"></i>
                    <h4 className="fw-bold mb-0">Histórico Recente (7 dias)</h4>
                </div>
                
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12}} 
                        dy={10}
                      />
                      <YAxis 
                        domain={[0, 10]} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12}}
                      />
                      <Tooltip 
                        contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#fff'
                        }}
                        itemStyle={{color: '#fff'}}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="energia" 
                        stroke="#22c55e" 
                        strokeWidth={3} 
                        dot={{fill: '#22c55e', r: 4}}
                        activeDot={{r: 6}}
                        name="Energia" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="humor" 
                        stroke="#a855f7" 
                        strokeWidth={3} 
                        dot={{fill: '#a855f7', r: 4}}
                        activeDot={{r: 6}}
                        name="Humor" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recomendações */}
        <div className="row g-4 fade-in">
          <div className="col-12 mb-2">
            <h4 className="fw-bold text-white"><i className="bi bi-stars text-warning me-2"></i>Recomendações para Você</h4>
          </div>
          
          <div className="col-md-4">
            <div className="rec-card text-center">
              <div className="icon-box bg-info bg-opacity-10 text-info mx-auto mb-3 rounded-circle" style={{width: '60px', height: '60px'}}>
                 <i className="bi bi-cup-hot-fill fs-3"></i>
              </div>
              <h5 className="fw-bold text-white">Micro-Pausas</h5>
              <p className="text-secondary small mb-0">
                A cada 90 min de foco, pare 10 min. Levante-se, hidrate-se e alongue.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="rec-card text-center">
              <div className="icon-box bg-purple bg-opacity-10 text-white mx-auto mb-3 rounded-circle" style={{width: '60px', height: '60px', color: '#a855f7'}}>
                 <i className="bi bi-phone-vibrate-fill fs-3"></i>
              </div>
              <h5 className="fw-bold text-white">Desconexão Digital</h5>
              <p className="text-secondary small mb-0">
                Defina um horário rígido para encerrar o expediente e desligar notificações.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="rec-card text-center">
              <div className="icon-box bg-pink bg-opacity-10 text-white mx-auto mb-3 rounded-circle" style={{width: '60px', height: '60px', color: '#ec4899'}}>
                 <i className="bi bi-people-fill fs-3"></i>
              </div>
              <h5 className="fw-bold text-white">Conexão Social</h5>
              <p className="text-secondary small mb-0">
                Compartilhe seus desafios com um mentor ou colega. Você não está só.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}