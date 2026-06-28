import { Partner, Program, Testimonial, FAQItem } from './types';

export const partners: Partner[] = [
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
  }
];

export const programs: Program[] = [
  {
    id: 'finance-crio',
    title: 'Finance & Accounting',
    subtitle: 'Offered by Crio',
    description: 'Build expertise in financial management, strategic planning, taxation, and business decision-making with these globally recognized certifications.',
    iconName: 'TrendingUp',
    salaryIncreaseEstimate: '45%',
    courses: [
      {
        id: 'us-cpa',
        title: 'US CPA (Certified Public Accountant)',
        duration: '12 Months',
        format: 'Online/Hybrid',
        level: 'Offered by Crio',
        partnerId: 'aws', 
        tags: ['US CPA Course', 'CPA Certification', 'US Accounting Course'],
        description: 'Become a globally recognized accounting professional. Learn accounting, auditing, taxation, financial reporting, and business regulations. This certification opens career opportunities in Big 4 firms, MNCs, consulting companies, and global finance organizations.',
        skillsAcquired: ['Accounting', 'Auditing', 'Taxation', 'Financial Reporting']
      },
      {
        id: 'us-cma',
        title: 'US CMA (Certified Management Accountant)',
        duration: '6-9 Months',
        format: 'Online/Hybrid',
        level: 'Offered by Crio',
        partnerId: 'aws',
        tags: ['US CMA Course', 'CMA USA Certification', 'Management Accounting'],
        description: 'The US CMA Course helps you build expertise in financial management, strategic planning, budgeting, performance management, and business decision-making. It is ideal for students and professionals looking for high-paying finance and management careers.',
        skillsAcquired: ['Financial Management', 'Strategic Planning', 'Budgeting']
      },
      {
        id: 'us-ea',
        title: 'US Enrolled Agent (EA)',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Offered by Crio',
        partnerId: 'aws',
        tags: ['Enrolled Agent Course', 'US Taxation', 'IRS EA Certification'],
        description: 'The US Enrolled Agent (EA) Course is a professional certification in US taxation authorized by the IRS. Learn tax preparation, tax planning, tax compliance, and representation of taxpayers. It is perfect for those seeking careers in international taxation and tax consulting.',
        skillsAcquired: ['Tax Preparation', 'Tax Planning', 'Tax Compliance']
      }
    ]
  },
  {
    id: 'top-courses-track',
    title: 'Advanced Tech & Digital Tracks',
    subtitle: 'Top Courses',
    description: 'Master highly demanded tech skills, from cloud infrastructure and full-stack development to AI & Machine Learning. Prepare for the future of work with comprehensive, industry-relevant curriculum.',
    iconName: 'Cpu',
    salaryIncreaseEstimate: '50%',
    courses: [
      {
        id: 'full-stack-web',
        title: 'Full Stack Web Development',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Top Courses',
        partnerId: 'aws',
        tags: ['Web Dev', 'React', 'Node.js', 'Full Stack'],
        description: 'Build complete web applications from scratch. Master front-end technologies like React, HTML/CSS, and back-end architectures with Node.js and databases to become a complete software engineer.',
        skillsAcquired: ['React', 'Node.js', 'Databases', 'API Design']
      },
      {
        id: 'digital-marketing',
        title: 'Digital Marketing Certification',
        duration: '4 Months',
        format: 'Online/Hybrid',
        level: 'Top Courses',
        partnerId: 'gcerts',
        tags: ['SEO', 'Content Marketing', 'Analytics'],
        description: 'Learn to drive growth and user acquisition. Master SEO, social media marketing, paid advertising, and marketing analytics to build comprehensive digital marketing campaigns.',
        skillsAcquired: ['SEO', 'Google Ads', 'Social Media Marketing', 'Analytics']
      },
      {
        id: 'data-analytics',
        title: 'Data Analytics & Visualization',
        duration: '5 Months',
        format: 'Online/Hybrid',
        level: 'Top Courses',
        partnerId: 'gcerts',
        tags: ['Data Science', 'Tableau', 'SQL'],
        description: 'Transform raw data into actionable business insights. Learn SQL, Python for data analysis, and advanced visualization tools like Tableau and PowerBI.',
        skillsAcquired: ['SQL', 'Python', 'Data Visualization', 'Statistical Analysis']
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity Certification',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Top Courses',
        partnerId: 'aws',
        tags: ['Network Security', 'Ethical Hacking', 'InfoSec'],
        description: 'Protect organizations from digital threats. Master network security, ethical hacking, incident response, and risk management to become a certified cybersecurity professional.',
        skillsAcquired: ['Network Defense', 'Penetration Testing', 'Risk Management']
      },
      {
        id: 'cloud-computing',
        title: 'Cloud Computing (AWS, Azure, Google Cloud)',
        duration: '5 Months',
        format: 'Online/Hybrid',
        level: 'Top Courses',
        partnerId: 'aws',
        tags: ['AWS', 'Azure', 'GCP', 'DevOps'],
        description: 'Design, deploy, and manage scalable cloud architectures. Get hands-on experience with the top three cloud providers: AWS, Microsoft Azure, and Google Cloud Platform.',
        skillsAcquired: ['Cloud Architecture', 'AWS/Azure/GCP', 'Infrastructure as Code']
      },
      {
        id: 'ai-ml',
        title: 'Artificial Intelligence & Machine Learning Certification',
        duration: '8 Months',
        format: 'Online/Hybrid',
        level: 'Top Courses',
        partnerId: 'aws',
        tags: ['AI', 'Machine Learning', 'Deep Learning'],
        description: 'Build intelligent systems and predictive models. Dive deep into machine learning algorithms, neural networks, natural language processing, and advanced AI frameworks.',
        skillsAcquired: ['Machine Learning', 'Deep Learning', 'NLP', 'Python']
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
