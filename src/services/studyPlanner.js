// Study Planner Service - Sistema de Gestão de Estudos Personalizado

const STORAGE_KEY = 'futureskills_study_planner';

// Estrutura de dados
export const getStudyData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  
  return {
    courses: [],
    categories: [],
    studySessions: [],
    settings: {
      dailyHours: 4,
      studyWeekends: false,
      startTime: '09:00',
      endTime: '22:00',
    },
  };
};

export const saveStudyData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Gerenciamento de Categorias
export const addCategory = (name, color) => {
  const data = getStudyData();
  const newCategory = {
    id: Date.now(),
    name,
    color: color || '#667eea',
    createdAt: new Date().toISOString(),
  };
  data.categories.push(newCategory);
  saveStudyData(data);
  return newCategory;
};

export const deleteCategory = (categoryId) => {
  const data = getStudyData();
  data.categories = data.categories.filter(c => c.id !== categoryId);
  // Remove categoria dos cursos
  data.courses = data.courses.map(course => ({
    ...course,
    categoryId: course.categoryId === categoryId ? null : course.categoryId,
  }));
  saveStudyData(data);
};

// Gerenciamento de Cursos
export const addCourse = (courseData) => {
  const data = getStudyData();
  const newCourse = {
    id: Date.now(),
    name: courseData.name,
    categoryId: courseData.categoryId,
    totalHours: parseFloat(courseData.totalHours),
    completedHours: 0,
    deadline: courseData.deadline,
    priority: courseData.priority || 'medium',
    platform: courseData.platform || '',
    notes: courseData.notes || '',
    createdAt: new Date().toISOString(),
    status: 'active', // active, completed, paused
  };
  data.courses.push(newCourse);
  saveStudyData(data);
  
  // Recalcular agenda
  generateStudySchedule();
  
  return newCourse;
};

export const updateCourse = (courseId, updates) => {
  const data = getStudyData();
  const courseIndex = data.courses.findIndex(c => c.id === courseId);
  if (courseIndex !== -1) {
    data.courses[courseIndex] = { ...data.courses[courseIndex], ...updates };
    saveStudyData(data);
    
    // Recalcular agenda se mudou horas ou deadline
    if (updates.totalHours || updates.deadline || updates.status) {
      generateStudySchedule();
    }
  }
};

export const deleteCourse = (courseId) => {
  const data = getStudyData();
  data.courses = data.courses.filter(c => c.id !== courseId);
  data.studySessions = data.studySessions.filter(s => s.courseId !== courseId);
  saveStudyData(data);
};

export const logStudySession = (courseId, hours, date) => {
  const data = getStudyData();
  
  // Adicionar sessão de estudo
  const session = {
    id: Date.now(),
    courseId,
    hours: parseFloat(hours),
    date: date || new Date().toISOString(),
  };
  data.studySessions.push(session);
  
  // Atualizar horas completadas do curso
  const course = data.courses.find(c => c.id === courseId);
  if (course) {
    course.completedHours = (course.completedHours || 0) + parseFloat(hours);
    
    // Marcar como concluído se atingiu total de horas
    if (course.completedHours >= course.totalHours) {
      course.status = 'completed';
      course.completedAt = new Date().toISOString();
    }
  }
  
  saveStudyData(data);
  
  // Recalcular agenda
  generateStudySchedule();
};

// Configurações
export const updateSettings = (settings) => {
  const data = getStudyData();
  data.settings = { ...data.settings, ...settings };
  saveStudyData(data);
  
  // Recalcular agenda
  generateStudySchedule();
};

// Algoritmo de Geração de Agenda Inteligente
export const generateStudySchedule = () => {
  const data = getStudyData();
  const { courses, settings } = data;
  
  // Filtrar apenas cursos ativos
  const activeCourses = courses.filter(c => c.status === 'active');
  
  if (activeCourses.length === 0) {
    data.schedule = { sessions: [], analysis: null };
    saveStudyData(data);
    return;
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Calcular horas restantes por curso
  const coursesWithRemaining = activeCourses.map(course => ({
    ...course,
    remainingHours: Math.max(0, course.totalHours - (course.completedHours || 0)),
    daysUntilDeadline: course.deadline 
      ? Math.ceil((new Date(course.deadline) - today) / (1000 * 60 * 60 * 24))
      : 365,
  }));
  
  // Ordenar por prioridade e deadline
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  coursesWithRemaining.sort((a, b) => {
    if (a.daysUntilDeadline !== b.daysUntilDeadline) {
      return a.daysUntilDeadline - b.daysUntilDeadline;
    }
    return (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
  });
  
  // Calcular dias disponíveis
  const daysPerWeek = settings.studyWeekends ? 7 : 5;
  const dailyHours = settings.dailyHours || 4;
  
  // Gerar agenda
  const schedule = [];
  let currentDate = new Date(today);
  const courseProgress = {};
  
  coursesWithRemaining.forEach(course => {
    courseProgress[course.id] = 0;
  });
  
  // Distribuir horas ao longo dos dias
  let maxDays = 365; // Limite de 1 ano
  let dayCount = 0;
  
  while (dayCount < maxDays) {
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Pular finais de semana se configurado
    if (isWeekend && !settings.studyWeekends) {
      currentDate.setDate(currentDate.getDate() + 1);
      dayCount++;
      continue;
    }
    
    let remainingDailyHours = dailyHours;
    const daySessions = [];
    
    // Distribuir horas entre cursos
    for (const course of coursesWithRemaining) {
      if (remainingDailyHours <= 0) break;
      if (courseProgress[course.id] >= course.remainingHours) continue;
      
      // Verificar se ainda está dentro do prazo
      const courseDaysLeft = course.daysUntilDeadline - dayCount;
      if (courseDaysLeft < 0) continue;
      
      // Calcular horas para este curso hoje
      const hoursNeeded = course.remainingHours - courseProgress[course.id];
      const hoursToday = Math.min(remainingDailyHours, hoursNeeded, 2); // Máximo 2h por curso por dia
      
      if (hoursToday > 0) {
        daySessions.push({
          courseId: course.id,
          courseName: course.name,
          hours: hoursToday,
          date: new Date(currentDate).toISOString(),
        });
        
        courseProgress[course.id] += hoursToday;
        remainingDailyHours -= hoursToday;
      }
    }
    
    if (daySessions.length > 0) {
      schedule.push(...daySessions);
    }
    
    // Verificar se todos os cursos foram concluídos
    const allCompleted = coursesWithRemaining.every(
      course => courseProgress[course.id] >= course.remainingHours
    );
    
    if (allCompleted) break;
    
    currentDate.setDate(currentDate.getDate() + 1);
    dayCount++;
  }
  
  // Análise de viabilidade
  const analysis = analyzeScheduleFeasibility(coursesWithRemaining, schedule, settings);
  
  data.schedule = { sessions: schedule, analysis };
  saveStudyData(data);
  
  return { schedule, analysis };
};

// Análise de Viabilidade
const analyzeScheduleFeasibility = (courses, schedule, settings) => {
  const analysis = {
    totalCourses: courses.length,
    feasibleCourses: [],
    unfeasibleCourses: [],
    requiresWeekends: false,
    suggestedDailyHours: settings.dailyHours,
    totalHoursNeeded: 0,
    estimatedCompletionDate: null,
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  courses.forEach(course => {
    const courseSessions = schedule.filter(s => s.courseId === course.id);
    const scheduledHours = courseSessions.reduce((sum, s) => sum + s.hours, 0);
    
    analysis.totalHoursNeeded += course.remainingHours;
    
    if (courseSessions.length > 0) {
      const lastSession = courseSessions[courseSessions.length - 1];
      const completionDate = new Date(lastSession.date);
      const deadline = new Date(course.deadline);
      
      if (completionDate <= deadline) {
        analysis.feasibleCourses.push({
          id: course.id,
          name: course.name,
          completionDate: completionDate.toISOString(),
          daysUntilCompletion: Math.ceil((completionDate - today) / (1000 * 60 * 60 * 24)),
        });
      } else {
        const daysOverdue = Math.ceil((completionDate - deadline) / (1000 * 60 * 60 * 24));
        analysis.unfeasibleCourses.push({
          id: course.id,
          name: course.name,
          deadline: course.deadline,
          estimatedCompletion: completionDate.toISOString(),
          daysOverdue,
        });
      }
    } else {
      analysis.unfeasibleCourses.push({
        id: course.id,
        name: course.name,
        deadline: course.deadline,
        reason: 'Não foi possível alocar horas suficientes',
      });
    }
  });
  
  // Verificar se precisa de finais de semana
  if (!settings.studyWeekends && analysis.unfeasibleCourses.length > 0) {
    analysis.requiresWeekends = true;
  }
  
  // Sugerir aumento de horas diárias
  if (analysis.unfeasibleCourses.length > 0) {
    const totalDaysAvailable = Math.min(
      ...courses.map(c => c.daysUntilDeadline)
    );
    const daysPerWeek = settings.studyWeekends ? 7 : 5;
    const totalStudyDays = Math.floor((totalDaysAvailable / 7) * daysPerWeek);
    
    if (totalStudyDays > 0) {
      analysis.suggestedDailyHours = Math.ceil(analysis.totalHoursNeeded / totalStudyDays);
    }
  }
  
  // Data estimada de conclusão
  if (schedule.length > 0) {
    const lastSession = schedule[schedule.length - 1];
    analysis.estimatedCompletionDate = lastSession.date;
  }
  
  return analysis;
};

// Estatísticas
export const getStudyStatistics = () => {
  const data = getStudyData();
  const { courses, studySessions } = data;
  
  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.status === 'completed').length;
  const activeCourses = courses.filter(c => c.status === 'active').length;
  
  const totalHoursPlanned = courses.reduce((sum, c) => sum + c.totalHours, 0);
  const totalHoursCompleted = courses.reduce((sum, c) => sum + (c.completedHours || 0), 0);
  
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  
  const recentSessions = studySessions.filter(
    s => new Date(s.date) >= last7Days
  );
  
  const hoursLast7Days = recentSessions.reduce((sum, s) => sum + s.hours, 0);
  
  return {
    totalCourses,
    completedCourses,
    activeCourses,
    totalHoursPlanned,
    totalHoursCompleted,
    completionPercentage: totalHoursPlanned > 0 
      ? Math.round((totalHoursCompleted / totalHoursPlanned) * 100) 
      : 0,
    hoursLast7Days,
    averageHoursPerDay: hoursLast7Days / 7,
  };
};

// Próximas sessões
export const getUpcomingSessions = (days = 7) => {
  const data = getStudyData();
  const { schedule } = data;
  
  if (!schedule || !schedule.sessions) return [];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + days);
  
  return schedule.sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= today && sessionDate <= endDate;
  });
};
