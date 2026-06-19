import { Partner, Program, Testimonial, FAQItem } from './types';

export const partners: Partner[] = [
  {
    id: 'mti',
    name: 'Munich Technical Institute',
    type: 'University',
    logoText: 'MTI',
    logoIcon: 'GraduationCap',
    country: 'Germany',
    website: '#',
    description: 'Bavaria’s premier technical research hub, co-designing the systems and algorithms fueling advanced European manufacturing.'
  },
  {
    id: 'susv',
    name: 'Stanford Horizon Collaborations',
    type: 'University',
    logoText: 'SHC',
    logoIcon: 'BookOpen',
    country: 'United States',
    website: '#',
    description: 'Providing frameworks for corporate venture building, Silicon Valley innovation, and agile organizational strategies.'
  },
  {
    id: 'gcerts',
    name: 'Google Career Certifications',
    type: 'Industry Tech',
    logoText: 'Google',
    logoIcon: 'Globe',
    country: 'Global',
    website: '#',
    description: 'Official modular industry-aligned certifications verifying direct practical mastery of operations, UX, and analytics.'
  },
  {
    id: 'aws',
    name: 'AWS Learning Infrastructure',
    type: 'Industry Tech',
    logoText: 'AWS',
    logoIcon: 'Cloud',
    country: 'Global',
    website: '#',
    description: 'Enabling highly scalably engineered distributed structures and hands-on cloud sandboxes for enterprise-scale ops.'
  },
  {
    id: 'aether',
    name: 'Aether Cognitive Systems',
    type: 'Research Lab',
    logoText: 'ÆTHER',
    logoIcon: 'Cpu',
    country: 'Switzerland',
    website: '#',
    description: 'A leading deep-tech intelligence lab contributing frameworks for high-trust language model architectures.'
  }
];

export const programs: Program[] = [
  {
    id: 'ai-intel',
    title: 'AI & Cognitive Engineering',
    subtitle: 'Advanced Enterprise Automation Track',
    description: 'Master practical implementation of agentic AI workflows, retrieval-augmented generation (RAG), and customized corporate models.',
    iconName: 'Cpu',
    salaryIncreaseEstimate: '38%',
    courses: [
      {
        id: 'ai-101',
        title: 'Generative AI Systems Architect',
        duration: '10 Weeks',
        format: 'Hybrid',
        level: 'Intermediate',
        partnerId: 'aether',
        tags: ['AI Agentic', 'RAG Frameworks', 'LLMOps'],
        description: 'Design robust pipeline patterns that couple state-of-the-art foundation models with enterprise knowledge bases while managing bias and hallucination vectors.',
        skillsAcquired: ['Vector Databases', 'LangChain Patterns', 'Semantic Search Tuning']
      },
      {
        id: 'ai-102',
        title: 'Next-Gen Cognitive Orchestration',
        duration: '6 Weeks',
        format: '100% Online',
        level: 'Advanced Leader',
        partnerId: 'susv',
        tags: ['Venture Cap', 'Systemic Shift', 'Ethical Governance'],
        description: 'Formulate an actionable enterprise-wide artificial intelligence roadmap, calculating return-of-investment ratios and addressing complex compliance thresholds.',
        skillsAcquired: ['Ethical Auditing', 'AI Venture Modeling', 'Change Integration']
      }
    ]
  },
  {
    id: 'cloud-cyber',
    title: 'Cloud Defenses & Full-Stack Systems',
    subtitle: 'High-Demand Technical Reskilling',
    description: 'A comprehensive path engineered to transform individuals with non-technical foundations into confident, job-ready cloud operations professionals.',
    iconName: 'Shield',
    salaryIncreaseEstimate: '52%',
    courses: [
      {
        id: 'sec-101',
        title: 'Full-Stack Modern Architecture',
        duration: '16 Weeks',
        format: 'Immersive Bootcamp',
        level: 'Beginner Friendly',
        partnerId: 'aws',
        tags: ['TypeScript', 'Cloud Database', 'API Orchestration'],
        description: 'Gain robust, certified skills building modern applications from scratch. Covers stateful frontends, modular database modeling, and scalable container hosting models.',
        skillsAcquired: ['React & Node', 'NoSQL Datastores', 'Docker Containers']
      },
      {
        id: 'sec-102',
        title: 'Zero-Trust Security Systems & Cloud Ops',
        duration: '12 Weeks',
        format: 'Hybrid',
        level: 'Intermediate',
        partnerId: 'mti',
        tags: ['IAM Controls', 'Security Audits', 'Vulnerability Scan'],
        description: 'Understand operational security models, penetration scanning techniques, server safety paradigms, and how to harden cloud infrastructures against active threat vectors.',
        skillsAcquired: ['Network Security', 'IAM Role Engineering', 'Continuous Deployment Security']
      }
    ]
  },
  {
    id: 'digital-transform',
    title: 'Digital Business Transformation',
    subtitle: 'Strategic Corporate Leadership Track',
    description: 'Equip senior personnel, operations leaders, and startup entrepreneurs with adaptive strategy instruments to drive modern high-velocity growth.',
    iconName: 'TrendingUp',
    salaryIncreaseEstimate: '29%',
    courses: [
      {
        id: 'biz-101',
        title: 'Interactive Analytics & Business Intelligence',
        duration: '8 Weeks',
        format: '100% Online',
        level: 'Beginner Friendly',
        partnerId: 'gcerts',
        tags: ['Data Viz', 'Executive Reporting', 'Product Analytics'],
        description: 'Harness the power of cloud data sets, designing responsive business dynamic control centers and reading critical metric clusters to guide product iterations.',
        skillsAcquired: ['SQL Foundation', 'Data Dashboarding', 'A/B Test Design']
      },
      {
        id: 'biz-102',
        title: 'Modern Product Management & Agility',
        duration: '10 Weeks',
        format: 'Hybrid',
        level: 'Intermediate',
        partnerId: 'susv',
        tags: ['Agile Execution', 'Scrum Orchestration', 'Lean Product'],
        description: 'Refine collaborative leadership structures, steering products from bare inception models to high-scale releases with rapid cycle feedback methodologies.',
        skillsAcquired: ['Figma to Spec Frameworks', 'Agile Roadmap Planning', 'Stakeholder Alignment']
      }
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Elena Rostova',
    role: 'Lead AI Engineer',
    company: 'Veloce Logistics Solutions',
    story: 'After 6 years working in conventional logistics management, I noticed a huge tech shift. The Cloud Defenses & Systems curriculum co-designed with AWS gave me the exact code foundations. Supported by ADMA advisers, I landed my developer role and now direct our intelligent fleet forecasting.',
    programTitle: 'Cloud Defenses & Full-Stack Systems',
    avatarBg: 'bg-cyan-500',
    prevRole: 'Logistics Supervisor'
  },
  {
    id: 't2',
    name: 'Marcus Sterling',
    role: 'Director of AI Strategy',
    company: 'Apex Horizon Capital',
    story: 'We needed to deploy secure generative AI systems but lacked hands-on architecture templates. The AI & Cognitive Engineering track gave us a complete Blueprint. Our teams worked inside private sandbox servers alongside Swiss cognitive scientists, shortening our time-to-market by 8 months.',
    programTitle: 'AI & Cognitive Engineering',
    avatarBg: 'bg-blue-500',
    prevRole: 'Strategic Product Specialist'
  },
  {
    id: 't3',
    name: 'Sophia Chen',
    role: 'Senior Product Manager',
    company: 'Neomart Digital Platforms',
    story: 'Being from standard commercial operations, ADMAs Digital Transformation courses completely updated my data literacy. Transforming standard analytical worksheets into real-time dashboards allowed our marketing division to optimize budget allocations at 4x our previous execution speeds.',
    programTitle: 'Digital Business Transformation',
    avatarBg: 'bg-purple-500',
    prevRole: 'Marketing Coordinator'
  }
];

export const faqItems: FAQItem[] = [
  {
    category: 'Partnerships',
    question: 'How does the partnership model between ADMA Ventures and academic institutions work?',
    answer: 'We build hybrid learning networks. Top university partners co-architect and audit the theoretical curricula, verifying that intellectual standards are met. Google and AWS supply sandbox tools, real-life workflows, and core tooling ecosystems so you build practical knowledge.'
  },
  {
    category: 'Curriculum',
    question: 'What is the absolute difference between upskilling and reskilling programs?',
    answer: 'Upskilling is focused on expanding your existing active skill stack (e.g., adding generative models to a software engineering career). Reskilling aims at pivot transitions, taking non-technical specialists and constructing baseline architectures (e.g., molding logistics leaders into cloud architects).'
  },
  {
    category: 'Job Support',
    question: 'Does ADMA Ventures connect students with hiring networks post-graduation?',
    answer: 'Yes. ADMA Ventures is an active investment and corporate advisory firm. We present outstanding graduates of our technical bootcamps directly to portfolio-backed startups, regional enterprise clients, and institutional partners seeking specialized capabilities.'
  },
  {
    category: 'Admissions',
    question: 'Are there scholarship guidelines or institutional grants available?',
    answer: 'Absolutely. Over 35% of reskilling cohorts receive corporate sponsorship or institutional educational grants through our cooperative network to champion vocational diversity in engineering and analytics.'
  }
];
