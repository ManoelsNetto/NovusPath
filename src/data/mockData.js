// Mock Data para FutureSkills Hub

export const LEARNING_PATHS = [
  {
    id: 1,
    title: 'IA e Automação Inteligente',
    description: 'Aprenda a trabalhar com IA como parceira, não como ameaça',
    category: 'Tecnologia',
    duration: '40h',
    level: 'Intermediário',
    modules: 12,
    skills: ['Machine Learning', 'Prompt Engineering', 'IA Ética'],
    icon: 'bi-robot',
    color: '#667eea',
  },
  {
    id: 2,
    title: 'Liderança em Ambientes Híbridos',
    description: 'Gerencie equipes remotas e híbridas com excelência',
    category: 'Liderança',
    duration: '30h',
    level: 'Avançado',
    modules: 10,
    skills: ['Gestão Remota', 'Comunicação', 'Empatia'],
    icon: 'bi-people',
    color: '#f093fb',
  },
  {
    id: 3,
    title: 'Economia Verde e Sustentabilidade',
    description: 'Prepare-se para carreiras em setores sustentáveis',
    category: 'Sustentabilidade',
    duration: '35h',
    level: 'Iniciante',
    modules: 8,
    skills: ['ESG', 'Economia Circular', 'Impacto Social'],
    icon: 'bi-tree',
    color: '#4facfe',
  },
  {
    id: 4,
    title: 'Pensamento Crítico e Resolução de Problemas',
    description: 'Desenvolva habilidades essenciais do futuro',
    category: 'Soft Skills',
    duration: '25h',
    level: 'Todos os níveis',
    modules: 7,
    skills: ['Análise', 'Criatividade', 'Tomada de Decisão'],
    icon: 'bi-lightbulb',
    color: '#fa709a',
  },
  {
    id: 5,
    title: 'Saúde Mental e Bem-Estar Corporativo',
    description: 'Cuide da sua saúde mental no trabalho moderno',
    category: 'Bem-Estar',
    duration: '20h',
    level: 'Todos os níveis',
    modules: 6,
    skills: ['Mindfulness', 'Gestão de Estresse', 'Equilíbrio'],
    icon: 'bi-heart-pulse',
    color: '#43e97b',
  },
  {
    id: 6,
    title: 'Transformação Digital para Negócios',
    description: 'Lidere a transformação digital na sua organização',
    category: 'Negócios',
    duration: '45h',
    level: 'Avançado',
    modules: 14,
    skills: ['Inovação', 'Agilidade', 'Cultura Digital'],
    icon: 'bi-graph-up-arrow',
    color: '#ff6b6b',
  },
];

export const OPPORTUNITIES = [
  {
    id: 1,
    title: 'Consultor de IA Ética',
    company: 'TechFuture Inc.',
    type: 'Tempo Integral',
    location: 'Remoto',
    salary: 'R$ 12.000 - R$ 18.000',
    skills: ['IA', 'Ética', 'Consultoria'],
    category: 'green',
    description: 'Ajude empresas a implementar IA de forma ética e responsável',
    icon: 'bi-shield-check',
  },
  {
    id: 2,
    title: 'Designer de Experiência Remota',
    company: 'HybridWorks',
    type: 'Freelance',
    location: 'Híbrido',
    salary: 'R$ 8.000 - R$ 12.000',
    skills: ['UX', 'Design', 'Colaboração'],
    category: 'design',
    description: 'Crie experiências incríveis para equipes remotas',
    icon: 'bi-palette',
  },
  {
    id: 3,
    title: 'Especialista em Transição Verde',
    company: 'GreenPath Solutions',
    type: 'Tempo Integral',
    location: 'São Paulo',
    salary: 'R$ 10.000 - R$ 15.000',
    skills: ['Sustentabilidade', 'ESG', 'Consultoria'],
    category: 'green',
    description: 'Ajude profissionais a transitarem para carreiras sustentáveis',
    icon: 'bi-recycle',
  },
  {
    id: 4,
    title: 'Coach de Bem-Estar Corporativo',
    company: 'MindfulWork',
    type: 'Meio Período',
    location: 'Remoto',
    salary: 'R$ 6.000 - R$ 9.000',
    skills: ['Coaching', 'Saúde Mental', 'Mindfulness'],
    category: 'wellness',
    description: 'Promova saúde mental em ambientes corporativos',
    icon: 'bi-heart',
  },
  {
    id: 5,
    title: 'Arquiteto de Aprendizagem Adaptativa',
    company: 'LearnTech',
    type: 'Tempo Integral',
    location: 'Remoto',
    salary: 'R$ 14.000 - R$ 20.000',
    skills: ['Educação', 'IA', 'Pedagogia'],
    category: 'education',
    description: 'Desenhe experiências de aprendizagem personalizadas com IA',
    icon: 'bi-book',
  },
  {
    id: 6,
    title: 'Facilitador de Colaboração Global',
    company: 'GlobalTeams',
    type: 'Freelance',
    location: 'Internacional',
    salary: 'USD 4.000 - USD 7.000',
    skills: ['Facilitação', 'Comunicação', 'Cultura'],
    category: 'collaboration',
    description: 'Conecte equipes globais e promova colaboração efetiva',
    icon: 'bi-globe',
  },
];

export const BADGES = [
  { id: 'first_login', name: 'Primeiro Passo', icon: 'bi-star', description: 'Fez login pela primeira vez' },
  { id: 'profile_complete', name: 'Perfil Completo', icon: 'bi-person-check', description: 'Completou o perfil' },
  { id: 'first_course', name: 'Aprendiz', icon: 'bi-book', description: 'Iniciou o primeiro curso' },
  { id: 'course_complete', name: 'Dedicado', icon: 'bi-trophy', description: 'Completou um curso' },
  { id: 'wellness_week', name: 'Cuidador', icon: 'bi-heart', description: '7 dias de check-in de bem-estar' },
  { id: 'first_application', name: 'Corajoso', icon: 'bi-send', description: 'Primeira candidatura enviada' },
  { id: 'community_helper', name: 'Colaborador', icon: 'bi-people', description: 'Ajudou a comunidade' },
  { id: 'green_warrior', name: 'Guerreiro Verde', icon: 'bi-tree', description: 'Focado em sustentabilidade' },
];

export const SKILLS_CATEGORIES = [
  { id: 'tech', name: 'Tecnologia', icon: 'bi-cpu', color: '#667eea' },
  { id: 'leadership', name: 'Liderança', icon: 'bi-people', color: '#f093fb' },
  { id: 'creative', name: 'Criatividade', icon: 'bi-palette', color: '#fa709a' },
  { id: 'communication', name: 'Comunicação', icon: 'bi-chat-dots', color: '#4facfe' },
  { id: 'sustainability', name: 'Sustentabilidade', icon: 'bi-tree', color: '#43e97b' },
  { id: 'wellness', name: 'Bem-Estar', icon: 'bi-heart-pulse', color: '#ff6b6b' },
];

export const CAREER_RECOMMENDATIONS = [
  {
    title: 'Especialista em IA Ética',
    growth: '+350%',
    demand: 'Muito Alta',
    description: 'Profissional que garante uso responsável e ético de IA',
    skills: ['IA', 'Ética', 'Governança'],
  },
  {
    title: 'Designer de Experiência Remota',
    growth: '+280%',
    demand: 'Alta',
    description: 'Cria experiências digitais para trabalho remoto/híbrido',
    skills: ['UX', 'Design', 'Psicologia'],
  },
  {
    title: 'Consultor de Transição Verde',
    growth: '+420%',
    demand: 'Muito Alta',
    description: 'Ajuda profissionais e empresas na transição sustentável',
    skills: ['ESG', 'Sustentabilidade', 'Consultoria'],
  },
  {
    title: 'Arquiteto de Aprendizagem com IA',
    growth: '+310%',
    demand: 'Alta',
    description: 'Desenha experiências educacionais personalizadas',
    skills: ['Educação', 'IA', 'Pedagogia'],
  },
];

export const CAREER_DETAILS = {
  0: { // ID correspondente ao index do array do Dashboard
    id: 0,
    title: "Especialista em IA Ética",
    description: "Profissional responsável por garantir que sistemas de Inteligência Artificial sejam desenvolvidos e utilizados de forma responsável, transparente e justa, mitigando vieses e riscos sociais.",
    longDescription: "Como Especialista em IA Ética, você atuará na interseção entre tecnologia, direito e sociologia. Sua missão é auditar algoritmos, definir diretrizes de governança e garantir que as soluções de IA da empresa respeitem regulamentações globais (como a AI Act da UE) e princípios humanos fundamentais.",
    salary: {
      junior: "R$ 8.500",
      senior: "R$ 22.000",
      avg: "R$ 14.500"
    },
    marketGrowth: "+350%",
    openPositions: 1240,
    matchScore: 95,
    matchReasons: ["Seu perfil analítico", "Experiência prévia em Compliance", "Interesse em Tech"],
    skills: [
      { name: "Governança de IA", level: 30, required: 80 },
      { name: "Python para Dados", level: 60, required: 70 },
      { name: "Legislação Digital", level: 20, required: 90 },
      { name: "Detecção de Viés", level: 40, required: 85 }
    ],
    roadmap: [
      { title: "Fundamentos de IA", status: "completed", duration: "20h" },
      { title: "Ética e Viés Algorítmico", status: "in-progress", duration: "40h" },
      { title: "Frameworks de Governança", status: "locked", duration: "35h" },
      { title: "Projeto Prático de Auditoria", status: "locked", duration: "50h" }
    ]
  },
  // Adicione mocks para os outros IDs (1, 2, 3) se necessário para testes
  1: {
    id: 1,
    title: "Designer de Experiência Híbrida",
    description: "Cria experiências digitais fluidas que conectam o mundo físico e digital para ambientes de trabalho remoto e presencial.",
    longDescription: "O Designer de Experiência Híbrida foca em como as pessoas interagem com espaços e tecnologias simultaneamente. Você desenhará jornadas que começam no app e terminam no escritório físico.",
    salary: { junior: "R$ 6.000", senior: "R$ 15.000", avg: "R$ 9.500" },
    marketGrowth: "+280%",
    openPositions: 850,
    matchScore: 88,
    matchReasons: ["Criatividade", "Empatia", "Design Thinking"],
    skills: [
        { name: "UX/UI Design", level: 70, required: 90 },
        { name: "Psicologia Cognitiva", level: 40, required: 80 },
        { name: "Prototipagem VR/AR", level: 10, required: 60 }
    ],
    roadmap: [
        { title: "UX Research Avançado", status: "completed", duration: "30h" },
        { title: "Design para Realidade Mista", status: "locked", duration: "45h" }
    ]
  }
};
