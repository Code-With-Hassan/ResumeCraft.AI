
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

export interface StyleSetting {
  fontSize: number; // in px
  fontFamily: string;
  color: string; // hex color
}

export interface ResumeStyles {
  h1: StyleSetting;
  h2: StyleSetting;
  h3: StyleSetting;
  p: StyleSetting;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string;
  styles: ResumeStyles;
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
