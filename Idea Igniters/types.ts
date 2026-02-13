
export interface SubjectDetail {
  name: string;
  difficulty: 'Hard' | 'Medium' | 'Easy';
  lessons: number;
}

export interface Course {
  name: string;
  code: string;
  credits: number;
  description: string;
  topics: string[];
  dailyHoursPerSubject: number; // Clarified from weeklyHours
  difficulty: 'Hard' | 'Medium' | 'Easy';
  recommendedStudyStrategy: string;
  lessonsCount: number;
  estimatedDaysToComplete: number;
  totalSessionHours: number; // New field for total time spending
}

export interface Semester {
  number: number;
  courses: Course[];
}

export interface Curriculum {
  skill: string;
  level: string;
  industryFocus: string;
  dailyHours: number;
  completionGoal: string;
  semesters: Semester[];
  timeDistributionSummary: {
    totalWeeklyHours: number;
    hardSubjectAllocation: string;
    easySubjectAllocation: string;
    estimatedTotalDays: number;
  };
  capstoneProject: {
    title: string;
    description: string;
    outcomes: string[];
  };
}

export interface GeneratorInputs {
  skill: string;
  courseLevel: string;
  subjects: SubjectDetail[];
  dailyHours: number;
  completionGoal: string;
  industryFocus: string;
}

export enum AppSection {
  HOME = 'home',
  GENERATOR = 'generator',
  ABOUT = 'about',
  CONTACT = 'contact'
}
