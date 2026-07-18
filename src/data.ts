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
    id: 'top-courses',
    title: 'Top Courses',
    subtitle: 'Industry Leading Programs',
    description: 'Our most popular and highly demanded courses across all our partners. Master tech, finance, and digital skills to prepare for the future of work.',
    iconName: 'TrendingUp',
    salaryIncreaseEstimate: '50%',
    courses: [
      {
        id: 'full-stack-web',
        title: 'Full Stack Web Development',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'aws',
        tags: ['Web Dev', 'React', 'Node.js', 'Full Stack'],
        description: 'Build complete web applications from scratch. Master front-end technologies like React, HTML/CSS, and back-end architectures with Node.js.',
        skillsAcquired: ['React', 'Node.js', 'Databases', 'API Design']
      },
      {
        id: 'us-cpa',
        title: 'US CPA (Certified Public Accountant)',
        duration: '12 Months',
        format: 'Online/Hybrid',
        level: 'Kcglobed',
        partnerId: 'aws', 
        tags: ['US CPA Course', 'CPA Certification', 'US Accounting'],
        description: 'Become a globally recognized accounting professional. Learn accounting, auditing, taxation, financial reporting, and business regulations.',
        skillsAcquired: ['Accounting', 'Auditing', 'Taxation', 'Reporting']
      },
      {
        id: 'crio-fellow-sde',
        title: 'Fellowship Program in Software Development with AI',
        duration: '9 Months',
        format: 'Online/Hybrid',
        level: 'Crio',
        partnerId: 'aws',
        tags: ['Software Dev', 'AI', 'Fellowship'],
        description: 'A comprehensive fellowship program to master software development integrated with AI tools and techniques.',
        skillsAcquired: ['Software Engineering', 'AI Integration', 'System Design']
      },
      {
        id: 'ai-ml',
        title: 'Artificial Intelligence & Machine Learning Certification',
        duration: '8 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'aws',
        tags: ['AI', 'Machine Learning', 'Deep Learning'],
        description: 'Build intelligent systems and predictive models. Dive deep into machine learning algorithms, neural networks, and NLP.',
        skillsAcquired: ['Machine Learning', 'Deep Learning', 'NLP', 'Python']
      },
      {
        id: 'cloud-computing',
        title: 'Cloud Computing (AWS, Azure, Google Cloud)',
        duration: '5 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'aws',
        tags: ['AWS', 'Azure', 'GCP', 'DevOps'],
        description: 'Design, deploy, and manage scalable cloud architectures. Get hands-on experience with AWS, Azure, and Google Cloud.',
        skillsAcquired: ['Cloud Architecture', 'AWS/Azure/GCP', 'Infrastructure']
      },
      {
        id: 'us-cma',
        title: 'US CMA (Certified Management Accountant)',
        duration: '6-9 Months',
        format: 'Online/Hybrid',
        level: 'Kcglobed',
        partnerId: 'aws',
        tags: ['US CMA', 'Management Accounting', 'Finance'],
        description: 'Build expertise in financial management, strategic planning, budgeting, performance management, and business decision-making.',
        skillsAcquired: ['Financial Management', 'Strategic Planning', 'Budgeting']
      },
      {
        id: 'crio-fellow-data',
        title: 'Fellowship Program in NextGen Data Analytics & Data Science with AI',
        duration: '8 Months',
        format: 'Online/Hybrid',
        level: 'Crio',
        partnerId: 'aws',
        tags: ['Data Science', 'Data Analytics', 'AI'],
        description: 'Master next-generation data science and analytics with cutting-edge AI technologies and real-world projects.',
        skillsAcquired: ['Data Analytics', 'Data Science', 'AI', 'Python']
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity Certification',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'aws',
        tags: ['Network Security', 'Ethical Hacking', 'InfoSec'],
        description: 'Protect organizations from digital threats. Master network security, ethical hacking, incident response, and risk management.',
        skillsAcquired: ['Network Defense', 'Penetration Testing', 'Risk Management']
      }
    ]
  },
  {
    id: 'crio-courses',
    title: 'OFFERED BY CRIO.DO',
    subtitle: 'Advanced Tech Fellowships',
    description: 'Transformative software development, QA, and data science programs engineered to make you a top-tier tech professional.',
    iconName: 'Cpu',
    salaryIncreaseEstimate: '55%',
    courses: [
      {
        id: 'crio-1',
        title: 'Fellowship Program in Software Development with AI',
        duration: '9 Months',
        format: 'Online',
        level: 'Crio',
        partnerId: 'aws',
        tags: ['SDE', 'AI', 'Fellowship'],
        description: 'Master software engineering principles while leveraging AI for enhanced development workflows and complex problem-solving.',
        skillsAcquired: ['Backend Dev', 'System Architecture', 'AI Workflows']
      },
      {
        id: 'crio-2',
        title: 'Fellowship Program in QA Automation with AI (SDET)',
        duration: '6 Months',
        format: 'Online',
        level: 'Crio',
        partnerId: 'aws',
        tags: ['QA', 'Automation', 'SDET'],
        description: 'Become a highly skilled Software Development Engineer in Test (SDET) with advanced AI automation techniques.',
        skillsAcquired: ['Test Automation', 'Selenium', 'AI Testing']
      },
      {
        id: 'crio-3',
        title: 'Fellowship Program in NextGen Data Analytics & Data Science with AI',
        duration: '8 Months',
        format: 'Online',
        level: 'Crio',
        partnerId: 'gcerts',
        tags: ['Data Analytics', 'Data Science', 'AI'],
        description: 'Comprehensive training in modern data processing, predictive modeling, and analytics using AI.',
        skillsAcquired: ['Data Modeling', 'Machine Learning', 'Python']
      },
      {
        id: 'crio-4',
        title: 'Fellowship Program in System Design',
        duration: '4 Months',
        format: 'Online',
        level: 'Crio',
        partnerId: 'aws',
        tags: ['System Design', 'Architecture'],
        description: 'Learn to design highly scalable, reliable, and performant software systems for millions of users.',
        skillsAcquired: ['Scalability', 'Microservices', 'Distributed Systems']
      },
      {
        id: 'crio-5',
        title: 'SkillIQ Full Stack Development Program',
        duration: '6 Months',
        format: 'Online',
        level: 'Crio',
        partnerId: 'aws',
        tags: ['Full Stack', 'Web', 'SkillIQ'],
        description: 'An intensive Full Stack Web Development program focusing on MERN stack and industry best practices.',
        skillsAcquired: ['MongoDB', 'Express', 'React', 'Node.js']
      },
      {
        id: 'crio-6',
        title: 'SkillIQ Data Analytics & Data Science Program',
        duration: '6 Months',
        format: 'Online',
        level: 'Crio',
        partnerId: 'gcerts',
        tags: ['Data Science', 'Analytics', 'SkillIQ'],
        description: 'Kickstart your career in data with rigorous hands-on practice in SQL, Python, and data visualization tools.',
        skillsAcquired: ['SQL', 'Data Viz', 'Statistical Analysis']
      },
      {
        id: 'crio-7',
        title: 'Crio SkillIQ Gen-AI Powered QA Automation Program',
        duration: '5 Months',
        format: 'Online',
        level: 'Crio',
        partnerId: 'aws',
        tags: ['Gen-AI', 'QA Automation', 'SkillIQ'],
        description: 'Leverage Generative AI to automate QA processes, create test scripts, and maintain high software quality.',
        skillsAcquired: ['Gen-AI', 'QA', 'Automated Testing']
      }
    ]
  },
  {
    id: 'kcglobed-courses',
    title: 'OFFERED BY KC GlobED',
    subtitle: 'Finance & Accounting Certifications',
    description: 'Globally recognized credentials in accounting and finance to accelerate your career in top financial organizations.',
    iconName: 'Layers',
    salaryIncreaseEstimate: '45%',
    courses: [
      {
        id: 'kcg-1',
        title: 'US CPA (Certified Public Accountant)',
        duration: '12 Months',
        format: 'Online/Hybrid',
        level: 'Kcglobed',
        partnerId: 'aws', 
        tags: ['CPA', 'Accounting', 'Taxation'],
        description: 'Become a globally recognized accounting professional. Learn accounting, auditing, taxation, financial reporting, and business regulations.',
        skillsAcquired: ['Accounting', 'Auditing', 'Taxation', 'Reporting']
      },
      {
        id: 'kcg-2',
        title: 'US CMA (Certified Management Accountant)',
        duration: '6-9 Months',
        format: 'Online/Hybrid',
        level: 'Kcglobed',
        partnerId: 'aws',
        tags: ['CMA', 'Management', 'Finance'],
        description: 'Build expertise in financial management, strategic planning, budgeting, performance management, and business decision-making.',
        skillsAcquired: ['Financial Management', 'Strategic Planning', 'Budgeting']
      },
      {
        id: 'kcg-3',
        title: 'US Enrolled Agent (EA)',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Kcglobed',
        partnerId: 'aws',
        tags: ['Enrolled Agent', 'Taxation', 'IRS'],
        description: 'A professional certification in US taxation authorized by the IRS. Learn tax preparation, planning, and compliance.',
        skillsAcquired: ['Tax Preparation', 'Tax Planning', 'Tax Compliance']
      }
    ]
  },
  {
    id: 'skilledura-courses',
    title: 'Offered by Skilledura',
    subtitle: 'Digital Mastery Programs',
    description: 'Future-proof your career with comprehensive courses spanning web development, cybersecurity, cloud, and digital marketing.',
    iconName: 'Shield',
    salaryIncreaseEstimate: '50%',
    courses: [
      {
        id: 'skill-1',
        title: 'Full Stack Web Development',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'aws',
        tags: ['Web Dev', 'React', 'Node.js', 'Full Stack'],
        description: 'Build complete web applications from scratch. Master front-end technologies like React, HTML/CSS, and back-end architectures with Node.js.',
        skillsAcquired: ['React', 'Node.js', 'Databases', 'API Design']
      },
      {
        id: 'skill-2',
        title: 'Digital Marketing Certification',
        duration: '4 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'gcerts',
        tags: ['SEO', 'Marketing', 'Analytics'],
        description: 'Learn to drive growth and user acquisition. Master SEO, social media marketing, paid advertising, and marketing analytics.',
        skillsAcquired: ['SEO', 'Google Ads', 'Social Media', 'Analytics']
      },
      {
        id: 'skill-3',
        title: 'Data Analytics & Visualization',
        duration: '5 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'gcerts',
        tags: ['Data Science', 'Tableau', 'SQL'],
        description: 'Transform raw data into actionable business insights. Learn SQL, Python for data analysis, and advanced visualization tools.',
        skillsAcquired: ['SQL', 'Python', 'Data Viz', 'Statistical Analysis']
      },
      {
        id: 'skill-4',
        title: 'Cybersecurity Certification',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'aws',
        tags: ['Network Security', 'Hacking', 'InfoSec'],
        description: 'Protect organizations from digital threats. Master network security, ethical hacking, incident response, and risk management.',
        skillsAcquired: ['Network Defense', 'Penetration Testing', 'Risk Management']
      },
      {
        id: 'skill-5',
        title: 'Cloud Computing (AWS, Azure, Google Cloud)',
        duration: '5 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'aws',
        tags: ['AWS', 'Azure', 'GCP', 'Cloud'],
        description: 'Design, deploy, and manage scalable cloud architectures. Get hands-on experience with the top three cloud providers.',
        skillsAcquired: ['Cloud Architecture', 'AWS/Azure/GCP', 'Infrastructure']
      },
      {
        id: 'skill-6',
        title: 'Artificial Intelligence & Machine Learning Certification',
        duration: '8 Months',
        format: 'Online/Hybrid',
        level: 'Skilledura',
        partnerId: 'aws',
        tags: ['AI', 'Machine Learning', 'Deep Learning'],
        description: 'Build intelligent systems and predictive models. Dive deep into machine learning algorithms, neural networks, and advanced AI frameworks.',
        skillsAcquired: ['Machine Learning', 'Deep Learning', 'NLP', 'Python']
      }
    ]
  },
  {
    id: 'skill-lync-courses',
    title: 'Offered by Skill-lync',
    subtitle: 'Core Engineering Programs',
    description: 'Specialized programs focusing on core engineering disciplines including mechanical, electrical, aerospace, and software.',
    iconName: 'Cpu',
    salaryIncreaseEstimate: '50%',
    courses: [
      {
        id: 'sl-1',
        title: 'Mechanical Engineering',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skill-lync',
        partnerId: 'aws',
        tags: ['Mechanical', 'Design'],
        description: 'Advanced mechanical engineering concepts and practical applications.',
        skillsAcquired: ['Mechanical Design', 'CAD']
      },
      {
        id: 'sl-2',
        title: 'Electrical / EV Engineering',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skill-lync',
        partnerId: 'aws',
        tags: ['EV', 'Electrical'],
        description: 'Deep dive into electric vehicles and electrical engineering systems.',
        skillsAcquired: ['EV Architecture', 'Power Electronics']
      },
      {
        id: 'sl-3',
        title: 'Embedded Systems',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skill-lync',
        partnerId: 'aws',
        tags: ['Embedded', 'IoT'],
        description: 'Learn to design and program robust embedded systems.',
        skillsAcquired: ['Microcontrollers', 'C/C++']
      },
      {
        id: 'sl-4',
        title: 'Civil Engineering',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skill-lync',
        partnerId: 'aws',
        tags: ['Civil', 'Design'],
        description: 'Modern civil engineering practices and software tools.',
        skillsAcquired: ['Structural Analysis', 'AutoCAD']
      },
      {
        id: 'sl-5',
        title: 'Electrical Engineering',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skill-lync',
        partnerId: 'aws',
        tags: ['Electrical', 'Systems'],
        description: 'Core electrical engineering fundamentals and advanced applications.',
        skillsAcquired: ['Circuit Design', 'Systems']
      },
      {
        id: 'sl-6',
        title: 'Computer Science / Software',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skill-lync',
        partnerId: 'aws',
        tags: ['CS', 'Software'],
        description: 'Foundational and advanced computer science and software engineering.',
        skillsAcquired: ['Programming', 'Software Dev']
      },
      {
        id: 'sl-7',
        title: 'Data Analytics & Data Science',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skill-lync',
        partnerId: 'aws',
        tags: ['Data Science', 'Analytics'],
        description: 'Master data analysis, visualization, and predictive modeling.',
        skillsAcquired: ['Python', 'SQL', 'Analytics']
      },
      {
        id: 'sl-8',
        title: 'Aerospace Engineering',
        duration: '6 Months',
        format: 'Online/Hybrid',
        level: 'Skill-lync',
        partnerId: 'aws',
        tags: ['Aerospace', 'Engineering'],
        description: 'Advanced aerospace engineering concepts, aerodynamics, and propulsion.',
        skillsAcquired: ['Aerodynamics', 'Design']
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
    avatarBg: 'bg-blue-800',
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
