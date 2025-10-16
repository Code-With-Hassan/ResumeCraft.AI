export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  website: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string;
}

export interface Template {
  id: string;
  name: string;
  isPremium: boolean;
  markdown: string;
  style?: string;
}

export type ATSCheckResult = {
  atsCompatibilityScore: number;
  suggestions: string[];
} | null;
