// LocalStorage Service para FutureSkills Hub

const STORAGE_KEYS = {
  USER: 'futureskills_user',
  PROFILE: 'futureskills_profile',
  LEARNING: 'futureskills_learning',
  WELLNESS: 'futureskills_wellness',
  OPPORTUNITIES: 'futureskills_opportunities',
  GAMIFICATION: 'futureskills_gamification',
};

// User Authentication
export const saveUser = (email) => {
  const username = email.split('@')[0];
  const user = {
    email,
    username,
    joinedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  return user;
};

export const getUser = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Profile Management
export const saveProfile = (profile) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const getProfile = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (data) return JSON.parse(data);
  
  // Default profile
  return {
    name: '',
    currentRole: '',
    experience: 0,
    skills: [],
    interests: [],
    careerGoals: [],
  };
};

// Learning Progress
export const saveLearningProgress = (progress) => {
  localStorage.setItem(STORAGE_KEYS.LEARNING, JSON.stringify(progress));
};

export const getLearningProgress = () => {
  const data = localStorage.getItem(STORAGE_KEYS.LEARNING);
  if (data) return JSON.parse(data);
  
  return {
    completedCourses: [],
    inProgressCourses: [],
    certificates: [],
    totalHours: 0,
  };
};

// Wellness Data
export const saveWellnessData = (data) => {
  const existing = getWellnessData();
  const updated = {
    ...existing,
    history: [...(existing.history || []), { ...data, date: new Date().toISOString() }],
    currentMood: data.mood,
    currentEnergy: data.energy,
  };
  localStorage.setItem(STORAGE_KEYS.WELLNESS, JSON.stringify(updated));
};

export const getWellnessData = () => {
  const data = localStorage.getItem(STORAGE_KEYS.WELLNESS);
  if (data) return JSON.parse(data);
  
  return {
    history: [],
    currentMood: 5,
    currentEnergy: 5,
  };
};

// Opportunities
export const saveOpportunityApplication = (opportunityId) => {
  const existing = getOpportunityApplications();
  const updated = [...existing, { opportunityId, appliedAt: new Date().toISOString() }];
  localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(updated));
};

export const getOpportunityApplications = () => {
  const data = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
  return data ? JSON.parse(data) : [];
};

// Gamification
export const saveGamificationData = (data) => {
  localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(data));
};

export const getGamificationData = () => {
  const data = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
  if (data) return JSON.parse(data);
  
  return {
    xp: 0,
    level: 1,
    badges: [],
    achievements: [],
    streak: 0,
  };
};

export const addXP = (amount) => {
  const data = getGamificationData();
  const newXP = data.xp + amount;
  const newLevel = Math.floor(newXP / 1000) + 1;
  
  const updated = {
    ...data,
    xp: newXP,
    level: newLevel,
  };
  
  saveGamificationData(updated);
  return updated;
};

export const unlockBadge = (badgeId) => {
  const data = getGamificationData();
  if (!data.badges.includes(badgeId)) {
    const updated = {
      ...data,
      badges: [...data.badges, badgeId],
    };
    saveGamificationData(updated);
    return true;
  }
  return false;
};

// Clear all data
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
