export interface Partner {
  id: string;
  name: string;
  type: 'University' | 'Industry Tech' | 'Accreditor' | 'Research Lab';
  logoText: string;
  logoIcon: string;
  country: string;
  website: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  format: string;
  level: string;
  partnerId: string; // references Partner
  tags: string[];
  description: string;
  skillsAcquired: string[];
}

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  courses: Course[];
  salaryIncreaseEstimate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  story: string;
  programTitle: string;
  avatarBg: string;
  prevRole: string; // reskilling specific
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Partnerships' | 'Curriculum' | 'Job Support' | 'Admissions';
}
