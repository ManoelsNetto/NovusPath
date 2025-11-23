// StudyPlanner.jsx
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import {
  getStudyData,
  addCategory,
  deleteCategory,
  addCourse,
  deleteCourse,
  logStudySession,
  updateSettings,
  getStudyStatistics,
  getUpcomingSessions,
} from '../../services/studyPlanner';
import './index.css';

export default function StudyPlanner() {
  const [activeTab, setActiveTab] = useState('courses');
  const [studyData, setStudyData] = useState(getStudyData());
  const [stats, setStats] = useState(getStudyStatistics());
  
  // Modais/Forms visíveis
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showLogSession, setShowLogSession] = useState(false);

  const refreshData = () => {
    setStudyData(getStudyData());
    setStats(getStudyStatistics());
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addCategory(formData.get('name'), formData.get('color'));
    refreshData();
    setShowAddCategory(false);
    e.target.reset();
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addCourse({
      name: formData.get('name'),
      categoryId: parseInt(formData.get('categoryId')) || null,
      totalHours: formData.get('totalHours'),
      deadline: formData.get('deadline'),
      priority: formData.get('priority'),
      platform: formData.get('platform'),
      notes: formData.get('notes'),
    });
    refreshData();
    setShowAddCourse(false);
    e.target.reset();
  };

  const handleLogSession = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    logStudySession(
      parseInt(formData.get('courseId')),
      formData.get('hours'),
      formData.get('date')
    );
    refreshData();
    setShowLogSession(false);
    e.target.reset();
  };

  const handleUpdateSettings = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateSettings({
      dailyHours: parseFloat(formData.get('dailyHours')),
      studyWeekends: formData.get('studyWeekends') === 'on',
    });
    refreshData();
    alert('Configurações atualizadas! Agenda recalculada.');
  };

  const getCategoryName = (categoryId) => {
    const category = studyData.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Geral';
  };

  const getCategoryColor = (categoryId) => {
    const category = studyData.categories.find(c => c.id === categoryId);
    return category ? category.color : '#94a3b8';
  };

  const upcomingSessions = getUpcomingSessions(7);

  return (
    <div className="planner-wrapper text-light">
      <Navbar />
      
      {/* Luzes de Fundo */}
      <div className="glow-blob glow-1" style={{top: '15%', left: '-10%'}}></div>
      <div className="glow-blob glow-2" style={{bottom: '5%', right: '-10%'}}></div>

      <div className="container py-5 position-relative z-1">
        
        {/* Header */}
        <div className="row mb-5 fade-in">
          <div className="col-12">
            <span className="text-info fw-bold text-uppercase tracking-wider small">
               <i className="bi bi-calendar-range me-2"></i>Organização
            </span>
            <h1 className="display-4 fw-bold mt-2">
              Planejador de <span className="text-gradient-primary">Estudos</span>
            </h1>
            <p className="lead text-secondary">
              Gerencie seus cursos e deixe nossa IA criar a agenda perfeita para você.
            </p>
          </div>
        </div>

        {/* Estatísticas (Glass Panels) */}
        <div className="row g-4 mb-5 fade-in">
          {[
            { icon: 'bi-book', value: stats.activeCourses, label: 'Cursos Ativos', color: 'primary' },
            { icon: 'bi-check-circle', value: stats.completedCourses, label: 'Concluídos', color: 'success' },
            { icon: 'bi-clock-history', value: stats.totalHoursCompleted.toFixed(1) + 'h', label: 'Horas Totais', color: 'info' },
            { icon: 'bi-graph-up', value: stats.completionPercentage + '%', label: 'Progresso Geral', color: 'warning' },
          ].map((stat, idx) => (
            <div key={idx} className="col-md-3">
              <div className="glass-panel p-4 d-flex align-items-center gap-3 h-100">
                <div className={`icon-box bg-${stat.color} bg-opacity-25 text-${stat.color} border border-${stat.color} border-opacity-25`}>
                  <i className={`bi ${stat.icon}`}></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-white">{stat.value}</h3>
                  <small className="text-secondary">{stat.label}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Navigation */}
        <div className="d-flex justify-content-center mb-5 fade-in">
          <ul className="nav nav-pills-custom">
            {[
              { id: 'courses', label: 'Meus Cursos', icon: 'bi-mortarboard' },
              { id: 'schedule', label: 'Agenda Inteligente', icon: 'bi-calendar-check' },
              { id: 'categories', label: 'Categorias', icon: 'bi-tags' },
              { id: 'settings', label: 'Configurações', icon: 'bi-gear' },
            ].map(tab => (
              <li className="nav-item" key={tab.id}>
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`bi ${tab.icon} me-2`}></i>{tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="fade-in">
          
          {/* === TAB: MEUS CURSOS === */}
          {activeTab === 'courses' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold"><i className="bi bi-list-task me-2 text-primary"></i>Gerenciar Cursos</h4>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-success rounded-pill" onClick={() => setShowLogSession(!showLogSession)}>
                    <i className="bi bi-pencil-square me-2"></i>Registrar Estudo
                  </button>
                  <button className="btn btn-gradient rounded-pill" onClick={() => setShowAddCourse(!showAddCourse)}>
                    <i className="bi bi-plus-lg me-2"></i>Novo Curso
                  </button>
                </div>
              </div>

              {/* Formulário: Adicionar Curso */}
              {showAddCourse && (
                <div className="glass-panel p-4 mb-4 border-primary border-opacity-50">
                  <h5 className="fw-bold mb-3">Adicionar Novo Curso</h5>
                  <form onSubmit={handleAddCourse}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-secondary small">Nome do Curso</label>
                        <input type="text" className="form-control form-control-glass" name="name" required placeholder="Ex: React Completo" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-secondary small">Categoria</label>
                        <select className="form-select form-select-glass" name="categoryId">
                          <option value="">Geral</option>
                          {studyData.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-secondary small">Carga Total (h)</label>
                        <input type="number" className="form-control form-control-glass" name="totalHours" required min="1" step="0.5" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-secondary small">Data Limite</label>
                        <input type="date" className="form-control form-control-glass" name="deadline" required />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-secondary small">Prioridade</label>
                        <select className="form-select form-select-glass" name="priority">
                          <option value="medium">Média</option>
                          <option value="high">Alta</option>
                          <option value="low">Baixa</option>
                        </select>
                      </div>
                      <div className="col-12 text-end">
                         <button type="button" className="btn btn-sm btn-link text-secondary me-2" onClick={() => setShowAddCourse(false)}>Cancelar</button>
                         <button type="submit" className="btn btn-primary">Salvar Curso</button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

               {/* Formulário: Registrar Sessão */}
               {showLogSession && (
                <div className="glass-panel p-4 mb-4 border-success border-opacity-50">
                  <h5 className="fw-bold mb-3 text-success">Registrar Sessão de Estudo</h5>
                  <form onSubmit={handleLogSession}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-secondary small">Qual curso você estudou?</label>
                        <select className="form-select form-select-glass" name="courseId" required>
                          <option value="">Selecione...</option>
                          {studyData.courses.filter(c => c.status === 'active').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label text-secondary small">Horas</label>
                        <input type="number" className="form-control form-control-glass" name="hours" required min="0.1" step="0.1" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label text-secondary small">Data</label>
                        <input type="date" className="form-control form-control-glass" name="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                      <div className="col-12 text-end">
                         <button type="button" className="btn btn-sm btn-link text-secondary me-2" onClick={() => setShowLogSession(false)}>Cancelar</button>
                         <button type="submit" className="btn btn-success">Registrar Progresso</button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Grid de Cursos */}
              <div className="row g-4">
                {studyData.courses.length === 0 ? (
                    <div className="col-12 text-center py-5 opacity-50">
                        <i className="bi bi-inbox fs-1 mb-2 d-block"></i>
                        <p>Nenhum curso cadastrado ainda.</p>
                    </div>
                ) : (
                    studyData.courses.map(course => {
                    const progress = course.totalHours > 0 ? Math.min(100, Math.round((course.completedHours / course.totalHours) * 100)) : 0;
                    const catColor = getCategoryColor(course.categoryId);
                    const daysLeft = course.deadline ? Math.ceil((new Date(course.deadline) - new Date()) / (86400000)) : null;

                    return (
                        <div key={course.id} className="col-md-6 col-lg-6">
                        <div className="glass-panel p-4 h-100 position-relative overflow-hidden">
                            {/* Accent Bar */}
                            <div className="position-absolute top-0 start-0 w-100" style={{height: '4px', background: catColor}}></div>
                            
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <h5 className="fw-bold mb-0 text-white">{course.name}</h5>
                                <span className="badge rounded-pill text-dark" style={{backgroundColor: catColor}}>{getCategoryName(course.categoryId)}</span>
                            </div>

                            <div className="mb-3">
                                <div className="d-flex justify-content-between text-secondary small mb-1">
                                    <span>{course.completedHours}h de {course.totalHours}h</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="progress" style={{height: '6px', background: 'rgba(255,255,255,0.1)'}}>
                                    <div className="progress-bar" style={{width: `${progress}%`, background: catColor}}></div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary border-opacity-25">
                                <div className="d-flex gap-2">
                                    {daysLeft !== null && (
                                        <small className={`badge bg-dark border ${daysLeft < 7 ? 'border-danger text-danger' : 'border-success text-success'}`}>
                                            <i className="bi bi-clock me-1"></i>
                                            {daysLeft > 0 ? `${daysLeft} dias` : 'Atrasado'}
                                        </small>
                                    )}
                                    <small className="badge bg-dark border border-secondary text-secondary">
                                        {course.priority === 'high' ? 'Alta' : course.priority === 'medium' ? 'Média' : 'Baixa'}
                                    </small>
                                </div>
                                <button className="btn btn-sm btn-icon text-danger opacity-50 hover-opacity" onClick={() => {if(confirm('Excluir curso?')) { deleteCourse(course.id); refreshData(); }}}>
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                        </div>
                    );
                    })
                )}
              </div>
            </div>
          )}

          {/* === TAB: AGENDA === */}
          {activeTab === 'schedule' && (
            <div>
              <div className="glass-panel p-4 mb-4">
                <h4 className="fw-bold mb-3">Análise de Viabilidade</h4>
                
                {studyData.schedule?.analysis ? (
                   <div>
                        <div className={`alert-glass-${studyData.schedule.analysis.unfeasibleCourses.length === 0 ? 'success' : 'warning'} p-3 rounded-3 mb-3 d-flex align-items-center gap-3`}>
                            <i className={`fs-3 bi ${studyData.schedule.analysis.unfeasibleCourses.length === 0 ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`}></i>
                            <div>
                                <h6 className="fw-bold mb-0">{studyData.schedule.analysis.unfeasibleCourses.length === 0 ? 'Agenda Otimizada!' : 'Atenção Necessária'}</h6>
                                <small>{studyData.schedule.analysis.unfeasibleCourses.length === 0 
                                    ? 'Você conseguirá terminar tudo no prazo com a carga atual.' 
                                    : `${studyData.schedule.analysis.unfeasibleCourses.length} curso(s) correm risco de atraso.`}
                                </small>
                            </div>
                        </div>

                        {studyData.schedule.analysis.unfeasibleCourses.length > 0 && (
                            <div className="mb-4">
                                <h6 className="text-danger fw-bold">Cursos em Risco:</h6>
                                <ul className="list-unstyled">
                                    {studyData.schedule.analysis.unfeasibleCourses.map(c => (
                                        <li key={c.id} className="text-secondary small mb-1">
                                            <i className="bi bi-x-circle text-danger me-2"></i>
                                            {c.name} ({c.daysOverdue} dias de atraso projetado)
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-dark bg-opacity-50 p-3 rounded border border-info border-opacity-25">
                                    <p className="mb-0 text-info small">
                                        <i className="bi bi-lightbulb-fill me-2"></i>
                                        Sugestão: Aumente sua carga para <strong>{studyData.schedule.analysis.suggestedDailyHours}h/dia</strong>.
                                    </p>
                                </div>
                            </div>
                        )}
                   </div>
                ) : <p className="text-secondary">Adicione cursos para gerar a análise.</p>}
              </div>

              <h5 className="mb-3 fw-bold">Próximos 7 Dias</h5>
              <div className="table-responsive">
                <table className="table table-glass">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Curso</th>
                            <th>Meta Diária</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcomingSessions.length > 0 ? upcomingSessions.map((session, i) => (
                            <tr key={i}>
                                <td>
                                    <div className="d-flex flex-column">
                                        <span className="fw-bold text-white">{new Date(session.date).getDate()}/{new Date(session.date).getMonth()+1}</span>
                                        <small className="text-secondary">{['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][new Date(session.date).getDay()]}</small>
                                    </div>
                                </td>
                                <td>{session.courseName}</td>
                                <td>
                                    <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25">
                                        {session.hours}h
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="3" className="text-center py-4 text-secondary">Nenhuma sessão agendada.</td></tr>
                        )}
                    </tbody>
                </table>
              </div>
            </div>
          )}

          {/* === TAB: CATEGORIAS === */}
          {activeTab === 'categories' && (
            <div>
               <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold">Categorias</h4>
                  <button className="btn btn-primary rounded-pill" onClick={() => setShowAddCategory(!showAddCategory)}>
                      <i className="bi bi-plus-lg me-2"></i>Nova Categoria
                  </button>
               </div>

               {showAddCategory && (
                   <div className="glass-panel p-4 mb-4">
                       <form onSubmit={handleAddCategory} className="row g-3 align-items-end">
                           <div className="col-md-6">
                               <label className="form-label text-secondary small">Nome</label>
                               <input type="text" className="form-control form-control-glass" name="name" required placeholder="Ex: Backend" />
                           </div>
                           <div className="col-md-3">
                               <label className="form-label text-secondary small">Cor</label>
                               <input type="color" className="form-control form-control-color w-100 bg-transparent border-secondary" name="color" defaultValue="#6366f1" />
                           </div>
                           <div className="col-md-3">
                               <button type="submit" className="btn btn-success w-100">Criar</button>
                           </div>
                       </form>
                   </div>
               )}

               <div className="row g-3">
                   {studyData.categories.map(cat => (
                       <div key={cat.id} className="col-md-4 col-sm-6">
                           <div className="glass-panel p-3 d-flex justify-content-between align-items-center">
                               <div className="d-flex align-items-center gap-3">
                                   <div style={{width: '20px', height: '20px', borderRadius: '50%', backgroundColor: cat.color}}></div>
                                   <span className="fw-bold text-white">{cat.name}</span>
                               </div>
                               <button className="btn btn-sm btn-icon text-secondary hover-danger" onClick={() => { if(confirm('Excluir categoria?')) { deleteCategory(cat.id); refreshData(); }}}>
                                   <i className="bi bi-x-lg"></i>
                               </button>
                           </div>
                       </div>
                   ))}
               </div>
            </div>
          )}

          {/* === TAB: CONFIGURAÇÕES === */}
          {activeTab === 'settings' && (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="glass-panel p-5">
                        <h4 className="fw-bold mb-4">Preferências de Estudo</h4>
                        <form onSubmit={handleUpdateSettings}>
                            <div className="mb-4">
                                <label className="form-label text-secondary">Quantas horas você pode estudar por dia?</label>
                                <input type="number" className="form-control form-control-glass form-control-lg" name="dailyHours" defaultValue={studyData.settings.dailyHours} min="0.5" max="24" step="0.5" />
                            </div>
                            
                            <div className="form-check form-switch mb-5">
                                <input className="form-check-input" type="checkbox" name="studyWeekends" id="weekendSwitch" defaultChecked={studyData.settings.studyWeekends} />
                                <label className="form-check-label text-white" htmlFor="weekendSwitch">Incluir Finais de Semana na agenda</label>
                            </div>

                            <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold">
                                <i className="bi bi-arrow-repeat me-2"></i>
                                Atualizar e Recalcular Agenda
                            </button>
                        </form>
                    </div>
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}