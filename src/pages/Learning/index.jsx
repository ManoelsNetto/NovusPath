// Learning.jsx
import { useState } from 'react';
import Navbar from '../../components/Navbar'; // Ajuste o caminho conforme sua estrutura
import { LEARNING_PATHS } from '../../data/mockData';
import { getLearningProgress, saveLearningProgress, addXP, unlockBadge } from '../../services/storage';
import { toast } from 'react-toastify';
import './index.css';

export default function Learning() {
  const [learning, setLearning] = useState(getLearningProgress());
  const [filter, setFilter] = useState('all');

  // Categorias para gerar os botões de filtro
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'tecnologia', label: 'Tecnologia' },
    { id: 'liderança', label: 'Liderança' },
    { id: 'sustentabilidade', label: 'Sustentabilidade' }
  ];

  const handleStartCourse = (courseId, courseTitle) => {
    if (learning.inProgressCourses.includes(courseId)) {
      toast.info('Você já está fazendo este curso!');
      return;
    }

    const updated = {
      ...learning,
      inProgressCourses: [...learning.inProgressCourses, courseId],
    };

    saveLearningProgress(updated);
    setLearning(updated);
    
    addXP(100);
    if (unlockBadge('first_course')) {
      toast.success('🎉 Badge desbloqueado: Aprendiz!');
    }
    
    toast.success(`Curso "${courseTitle}" iniciado!`);
  };

  const filteredCourses = filter === 'all' 
    ? LEARNING_PATHS 
    : LEARNING_PATHS.filter(c => c.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="learning-wrapper text-light">
      <Navbar />
      
      {/* Luzes de Fundo */}
      <div className="glow-blob glow-1" style={{top: '10%', left: '-10%'}}></div>
      <div className="glow-blob glow-2" style={{bottom: '20%', right: '-10%'}}></div>

      <div className="container py-5 position-relative z-1">
        
        {/* Header da Página */}
        <div className="row mb-5 align-items-end fade-in">
          <div className="col-lg-8">
            <span className="text-info fw-bold text-uppercase tracking-wider small">
              <i className="bi bi-mortarboard me-2"></i>Educação 4.0
            </span>
            <h1 className="display-4 fw-bold mt-2">
              Trilhas de <span className="text-gradient-primary">Aprendizagem</span>
            </h1>
            <p className="lead text-secondary mb-0">
              Cursos adaptativos projetados para desenvolver as competências mais valiosas do mercado futuro.
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-5 fade-in">
          <div className="filter-container justify-content-center justify-content-lg-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`btn filter-pill ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Cursos */}
        <div className="row g-4">
          {filteredCourses.map((course) => {
            const isInProgress = learning.inProgressCourses.includes(course.id);
            const isCompleted = learning.completedCourses.includes(course.id);

            // Ajuste visual para cores hexadecimais no estilo glass
            const iconBgStyle = {
               
               background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}aa 100%)`
            };

            return (
              <div key={course.id} className="col-md-6 col-lg-4 fade-in">
                <div className="course-card-glass p-4">
                  
                  {/* Topo do Card: Ícone e Nível */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="course-icon-wrapper text-white" style={iconBgStyle}>
                      <i className={`bi ${course.icon}`}></i>
                    </div>
                    <span className="badge bg-dark border border-secondary text-secondary rounded-pill px-3">
                      {course.level}
                    </span>
                  </div>
                  
                  {/* Conteúdo Principal */}
                  <div className="mb-auto">
                    <h4 className="fw-bold mb-2 text-white">{course.title}</h4>
                    <p className="text-secondary small mb-0 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Meta Info */}
                    <div className="meta-info">
                      <span><i className="bi bi-clock me-2 text-info"></i>{course.duration}</span>
                      <span><i className="bi bi-layers me-2 text-primary"></i>{course.modules} módulos</span>
                    </div>

                    {/* Skills Tags */}
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {course.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 3 && (
                        <span className="skill-badge text-muted">+{course.skills.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="mt-3">
                    {isCompleted ? (
                      <button className="btn btn-completed w-100 py-2 fw-bold rounded-pill">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Concluído
                      </button>
                    ) : isInProgress ? (
                      <button className="btn btn-outline-light w-100 py-2 fw-bold rounded-pill hover-scale">
                        <i className="bi bi-play-fill me-2"></i>
                        Continuar
                      </button>
                    ) : (
                      <button
                        className="btn btn-gradient w-100 py-2 fw-bold rounded-pill shadow-lg"
                        onClick={() => handleStartCourse(course.id, course.title)}
                      >
                        <i className="bi bi-plus-lg me-2"></i>
                        Iniciar Curso
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State (caso filtro não retorne nada) */}
        {filteredCourses.length === 0 && (
            <div className="text-center py-5">
                <i className="bi bi-search display-1 text-secondary opacity-25"></i>
                <h3 className="text-muted mt-3">Nenhum curso encontrado nesta categoria.</h3>
            </div>
        )}

      </div>
    </div>
  );
}