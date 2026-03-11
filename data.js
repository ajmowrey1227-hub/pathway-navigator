// Tech Pathway Navigator — Questions, Careers, Deep-Dives, Resources

const REGIONS = {
  chicago: { id: 'chicago', name: 'Chicago', nameEs: 'Chicago' },
  milwaukee: { id: 'milwaukee', name: 'Milwaukee', nameEs: 'Milwaukee' },
  kansas_city: { id: 'kansas_city', name: 'Kansas City', nameEs: 'Kansas City' },
};

const PATHWAY_DATA = {
  regions: REGIONS,
  steps: [
    {
      id: 'work-style',
      title: 'How do you like to work?',
      options: [
        { id: 'build', label: 'Creating things—apps, websites, or visual designs', scores: { developer: 3, analyst: 0, data: 1, security: 1, cloud: 2, ux: 2, pm: 0, qa: 1, support: 0, webdev: 3, digital: 2, impl: 0, techsupport: 0, dba: 0 } },
        { id: 'solve', label: 'Debugging, troubleshooting, and solving tricky problems', scores: { developer: 2, analyst: 2, data: 2, security: 3, cloud: 2, ux: 1, pm: 1, qa: 3, support: 3, webdev: 2, digital: 0, impl: 2, techsupport: 3, dba: 2 } },
        { id: 'people', label: 'Talking with people, running meetings, and organizing work', scores: { developer: 0, analyst: 3, data: 1, security: 0, cloud: 0, ux: 2, pm: 3, qa: 1, support: 3, webdev: 0, digital: 2, impl: 3, techsupport: 2, dba: 0 } },
        { id: 'analyze', label: 'Digging into data and looking for patterns or trends', scores: { developer: 1, analyst: 2, data: 3, security: 2, cloud: 1, ux: 1, pm: 1, qa: 2, support: 0, webdev: 0, digital: 3, impl: 0, techsupport: 0, dba: 3 } },
      ],
    },
    {
      id: 'day-dream',
      title: "What would your ideal day look like?",
      options: [
        { id: 'code', label: 'Mostly deep-focus time building or designing', scores: { developer: 3, analyst: 0, data: 1, security: 2, cloud: 2, ux: 3, pm: 0, qa: 2, support: 0, webdev: 3, digital: 1, impl: 0, techsupport: 0, dba: 1 } },
        { id: 'meetings', label: 'A lot of collaboration—meetings, demos, and planning', scores: { developer: 0, analyst: 2, data: 0, security: 0, cloud: 0, ux: 1, pm: 3, qa: 0, support: 1, webdev: 0, digital: 1, impl: 3, techsupport: 0, dba: 0 } },
        { id: 'research', label: 'Investigating problems, testing, and improving security/quality', scores: { developer: 1, analyst: 1, data: 2, security: 3, cloud: 1, ux: 0, pm: 0, qa: 3, support: 1, webdev: 1, digital: 2, impl: 0, techsupport: 0, dba: 1 } },
        { id: 'support', label: 'Talking with users and fixing issues hands-on', scores: { developer: 0, analyst: 1, data: 0, security: 1, cloud: 0, ux: 0, pm: 0, qa: 1, support: 3, webdev: 0, digital: 0, impl: 2, techsupport: 3, dba: 0 } },
      ],
    },
    {
      id: 'skills',
      title: "What are you most drawn to right now?",
      options: [
        { id: 'programming', label: 'Programming and building software', scores: { developer: 3, analyst: 0, data: 1, security: 1, cloud: 2, ux: 0, pm: 0, qa: 2, support: 0, webdev: 3, digital: 0, impl: 0, techsupport: 0, dba: 1 } },
        { id: 'data', label: 'Data, spreadsheets, and reporting', scores: { developer: 0, analyst: 2, data: 3, security: 0, cloud: 0, ux: 0, pm: 1, qa: 1, support: 0, webdev: 0, digital: 2, impl: 1, techsupport: 0, dba: 3 } },
        { id: 'design', label: 'Design and user experience', scores: { developer: 0, analyst: 0, data: 0, security: 0, cloud: 0, ux: 3, pm: 0, qa: 0, support: 0, webdev: 1, digital: 2, impl: 0, techsupport: 0, dba: 0 } },
        { id: 'business', label: 'Business needs and requirements', scores: { developer: 0, analyst: 3, data: 1, security: 0, cloud: 0, ux: 1, pm: 3, qa: 0, support: 1, webdev: 0, digital: 1, impl: 3, techsupport: 1, dba: 0 } },
      ],
    },
    {
      id: 'impact',
      title: "How do you want to make an impact?",
      options: [
        { id: 'product', label: 'Ship products users love', scores: { developer: 3, analyst: 1, data: 0, security: 0, cloud: 2, ux: 3, pm: 2, qa: 2, support: 0, webdev: 3, digital: 2, impl: 0, techsupport: 0, dba: 0 } },
        { id: 'decisions', label: 'Help teams make better decisions with data', scores: { developer: 0, analyst: 3, data: 3, security: 0, cloud: 0, ux: 0, pm: 1, qa: 0, support: 0, webdev: 0, digital: 2, impl: 0, techsupport: 0, dba: 3 } },
        { id: 'safe', label: 'Keep systems and data safe', scores: { developer: 0, analyst: 0, data: 0, security: 3, cloud: 1, ux: 0, pm: 0, qa: 1, support: 1, webdev: 0, digital: 0, impl: 0, techsupport: 0, dba: 0 } },
        { id: 'smooth', label: 'Keep things running smoothly for everyone', scores: { developer: 0, analyst: 1, data: 0, security: 1, cloud: 3, ux: 0, pm: 2, qa: 1, support: 3, webdev: 0, digital: 0, impl: 2, techsupport: 3, dba: 0 } },
      ],
    },
    {
      id: 'learning',
      title: "What are you excited to learn?",
      options: [
        { id: 'languages', label: 'Building apps with code (JavaScript, Python, etc.)', scores: { developer: 3, analyst: 0, data: 2, security: 1, cloud: 2, ux: 0, pm: 0, qa: 2, support: 0, webdev: 3, digital: 0, impl: 0, techsupport: 0, dba: 1 } },
        { id: 'tools', label: 'Analyzing data with Excel, SQL, and dashboards', scores: { developer: 0, analyst: 2, data: 3, security: 0, cloud: 0, ux: 0, pm: 1, qa: 1, support: 0, webdev: 0, digital: 2, impl: 1, techsupport: 0, dba: 3 } },
        { id: 'design-tools', label: 'Designing screens in Figma and creating prototypes', scores: { developer: 0, analyst: 0, data: 0, security: 0, cloud: 0, ux: 3, pm: 0, qa: 0, support: 0, webdev: 1, digital: 2, impl: 0, techsupport: 0, dba: 0 } },
        { id: 'infra', label: 'Setting up cloud services and understanding how systems run', scores: { developer: 1, analyst: 0, data: 0, security: 2, cloud: 3, ux: 0, pm: 0, qa: 0, support: 2, webdev: 0, digital: 0, impl: 0, techsupport: 1, dba: 0 } },
      ],
    },
    {
      id: 'entry',
      title: "What feels most achievable for you right now?",
      options: [
        { id: 'code-first', label: 'Getting good at one language and building projects', scores: { developer: 3, analyst: 0, data: 1, security: 1, cloud: 1, ux: 0, pm: 0, qa: 2, support: 0, webdev: 3, digital: 0, impl: 0, techsupport: 0, dba: 0 } },
        { id: 'analysis-first', label: 'Understanding business needs and documenting them', scores: { developer: 0, analyst: 3, data: 1, security: 0, cloud: 0, ux: 0, pm: 2, qa: 0, support: 0, webdev: 0, digital: 1, impl: 3, techsupport: 0, dba: 0 } },
        { id: 'support-first', label: 'Helping users and learning systems from the inside', scores: { developer: 0, analyst: 0, data: 0, security: 0, cloud: 0, ux: 0, pm: 0, qa: 0, support: 3, webdev: 0, digital: 0, impl: 2, techsupport: 3, dba: 0 } },
        { id: 'cert-first', label: 'Earning a certification (e.g., CompTIA, cloud, security)', scores: { developer: 0, analyst: 0, data: 0, security: 2, cloud: 2, ux: 0, pm: 0, qa: 0, support: 2, webdev: 0, digital: 0, impl: 0, techsupport: 0, dba: 0 } },
      ],
    },
    {
      id: 'team-size',
      title: 'What size team do you see yourself in?',
      options: [
        { id: 'small', label: 'Small team (2–5 people) where I wear many hats', scores: { developer: 2, analyst: 0, data: 0, security: 0, cloud: 1, ux: 2, pm: 0, qa: 1, support: 0, webdev: 3, digital: 2, impl: 1, techsupport: 0, dba: 0 } },
        { id: 'medium', label: 'Medium team (5–15) with clear roles and collaboration', scores: { developer: 2, analyst: 2, data: 2, security: 1, cloud: 2, ux: 2, pm: 2, qa: 2, support: 1, webdev: 1, digital: 1, impl: 2, techsupport: 1, dba: 1 } },
        { id: 'large', label: 'Large organization with structured processes', scores: { developer: 1, analyst: 3, data: 2, security: 2, cloud: 2, ux: 0, pm: 3, qa: 2, support: 2, webdev: 0, digital: 0, impl: 2, techsupport: 2, dba: 2 } },
        { id: 'flexible', label: 'Flexible—I can adapt to any environment', scores: { developer: 0, analyst: 0, data: 1, security: 2, cloud: 0, ux: 1, pm: 1, qa: 0, support: 2, webdev: 1, digital: 2, impl: 2, techsupport: 2, dba: 2 } },
      ],
    },
    {
      id: 'pressure',
      title: 'How do you handle deadlines and pressure?',
      options: [
        { id: 'steady', label: 'I prefer steady, predictable work with clear timelines', scores: { developer: 0, analyst: 2, data: 2, security: 1, cloud: 0, ux: 0, pm: 1, qa: 2, support: 2, webdev: 0, digital: 0, impl: 2, techsupport: 2, dba: 2 } },
        { id: 'sprints', label: 'I like short sprints with quick wins and iterations', scores: { developer: 3, analyst: 0, data: 0, security: 0, cloud: 2, ux: 3, pm: 2, qa: 2, support: 0, webdev: 3, digital: 2, impl: 0, techsupport: 0, dba: 0 } },
        { id: 'emergency', label: 'I thrive when fixing urgent issues and responding to incidents', scores: { developer: 0, analyst: 0, data: 0, security: 3, cloud: 2, ux: 0, pm: 0, qa: 0, support: 3, webdev: 0, digital: 0, impl: 0, techsupport: 3, dba: 0 } },
        { id: 'balance', label: 'Mix of both—some routine, some urgency', scores: { developer: 2, analyst: 2, data: 2, security: 1, cloud: 2, ux: 2, pm: 2, qa: 2, support: 1, webdev: 2, digital: 2, impl: 3, techsupport: 1, dba: 2 } },
      ],
    },
    {
      id: 'growth',
      title: 'Where do you want to be in 3–5 years?',
      options: [
        { id: 'technical-lead', label: 'Technical leader or senior individual contributor', scores: { developer: 3, analyst: 0, data: 1, security: 3, cloud: 3, ux: 2, pm: 0, qa: 1, support: 0, webdev: 3, digital: 0, impl: 0, techsupport: 0, dba: 2 } },
        { id: 'people-lead', label: 'Leading teams or managing projects', scores: { developer: 0, analyst: 2, data: 0, security: 0, cloud: 0, ux: 0, pm: 3, qa: 0, support: 1, webdev: 0, digital: 1, impl: 3, techsupport: 0, dba: 0 } },
        { id: 'specialist', label: 'Deep specialist in one area (e.g., security, data, UX)', scores: { developer: 0, analyst: 0, data: 3, security: 2, cloud: 1, ux: 3, pm: 0, qa: 2, support: 0, webdev: 0, digital: 2, impl: 0, techsupport: 0, dba: 3 } },
        { id: 'explore', label: 'Still exploring—I want to try different roles first', scores: { developer: 1, analyst: 2, data: 1, security: 0, cloud: 0, ux: 1, pm: 1, qa: 1, support: 2, webdev: 2, digital: 2, impl: 2, techsupport: 2, dba: 0 } },
      ],
    },
    {
      id: 'environment',
      title: 'What kind of work environment sounds best to you?',
      options: [
        {
          id: 'remote',
          label: 'Remote-first, flexible hours (mostly from home)',
          scores: {
            developer: 2, webdev: 3, data: 2, cloud: 2, security: 1,
            ux: 2, pm: 1, qa: 1, support: 0, techsupport: 1,
            digital: 3, impl: 0, dba: 2, analyst: 1
          }
        },
        {
          id: 'hybrid',
          label: 'Hybrid – some days in the office, some remote',
          scores: {
            developer: 1, webdev: 1, data: 1, cloud: 1, security: 2,
            ux: 1, pm: 2, qa: 2, support: 2, techsupport: 2,
            digital: 1, impl: 2, dba: 1, analyst: 2
          }
        },
        {
          id: 'onsite',
          label: 'Mostly on-site / in-office with the team',
          scores: {
            developer: 0, webdev: 0, data: 0, cloud: 0, security: 1,
            ux: 0, pm: 1, qa: 1, support: 3, techsupport: 3,
            digital: 1, impl: 3, dba: 0, analyst: 1
          }
        },
        {
          id: 'client-facing',
          label: 'Visiting clients and being on the front line',
          scores: {
            developer: 0, webdev: 0, data: 0, cloud: 0, security: 1,
            ux: 1, pm: 2, qa: 0, support: 2, techsupport: 2,
            digital: 2, impl: 3, dba: 0, analyst: 2
          }
        }
      ]
    },
    {
      id: 'problem-type',
      title: 'Which type of problems do you enjoy most?',
      options: [
        {
          id: 'tech-puzzles',
          label: 'Technical puzzles – fixing bugs, making code or systems work',
          scores: {
            developer: 3, webdev: 3, qa: 3, cloud: 2, security: 2,
            support: 1, techsupport: 2, data: 1, dba: 1,
            ux: 0, pm: 0, analyst: 0, impl: 0, digital: 0
          }
        },
        {
          id: 'people-process',
          label: 'People / process problems – miscommunication, broken processes, planning',
          scores: {
            developer: 0, webdev: 0, qa: 0, cloud: 0, security: 0,
            support: 2, techsupport: 2, impl: 3, pm: 3,
            analyst: 2, digital: 1, ux: 1, data: 0, dba: 0
          }
        },
        {
          id: 'data-questions',
          label: 'Data questions – “What is this data telling us?”',
          scores: {
            developer: 0, webdev: 0, qa: 1, cloud: 0, security: 0,
            data: 3, dba: 3, analyst: 3, digital: 2,
            pm: 1, support: 0, techsupport: 0, ux: 0, impl: 0
          }
        },
        {
          id: 'experience-problems',
          label: 'Experience problems – “Why is this confusing or ugly for the user?”',
          scores: {
            ux: 3, webdev: 2, digital: 2, impl: 2,
            developer: 1, pm: 1, analyst: 1,
            data: 0, dba: 0, cloud: 0, security: 0,
            support: 1, techsupport: 1, qa: 1
          }
        }
      ]
    },
    {
      id: 'ambiguity',
      title: 'How do you feel about unclear situations?',
      options: [
        {
          id: 'checklists',
          label: 'I prefer clear instructions and checklists',
          scores: {
            support: 3, techsupport: 3, qa: 3,
            impl: 2, pm: 1,
            developer: 0, webdev: 0, data: 0, cloud: 0, security: 0,
            ux: 0, analyst: 0, digital: 0, dba: 0
          }
        },
        {
          id: 'some-unknowns',
          label: 'I’m okay with some unknowns if I have examples',
          scores: {
            developer: 2, webdev: 2, data: 2, analyst: 2,
            pm: 2, qa: 1, impl: 1,
            support: 1, techsupport: 1, cloud: 1, security: 1, ux: 1, dba: 1, digital: 1
          }
        },
        {
          id: 'figure-out',
          label: 'I like figuring things out from scratch',
          scores: {
            developer: 2, webdev: 2, cloud: 3, security: 3,
            ux: 2, digital: 2,
            analyst: 1, pm: 1,
            data: 1, dba: 1, qa: 0, support: 0, techsupport: 0, impl: 0
          }
        },
        {
          id: 'bring-order',
          label: 'I enjoy jumping into chaos and bringing order',
          scores: {
            pm: 3, impl: 3, security: 2, cloud: 2,
            analyst: 2, digital: 1,
            support: 1, techsupport: 1,
            developer: 1, webdev: 1, data: 1, dba: 1, ux: 1, qa: 1
          }
        }
      ]
    },
    {
      id: 'communication',
      title: 'How comfortable are you with writing and communication?',
      options: [
        {
          id: 'love-writing',
          label: 'I like writing and presenting my ideas',
          scores: {
            analyst: 3, pm: 3, digital: 3,
            ux: 2, data: 2,
            developer: 1, webdev: 1, impl: 2
          }
        },
        {
          id: 'short-updates',
          label: 'I’m okay with short updates and emails',
          scores: {
            developer: 2, webdev: 2, qa: 2, cloud: 2, security: 2,
            impl: 2, analyst: 1, pm: 1,
            support: 1, techsupport: 1
          }
        },
        {
          id: 'hands-on',
          label: 'I’d rather mostly help people hands-on than write a lot',
          scores: {
            support: 3, techsupport: 3, impl: 2,
            security: 1, cloud: 1,
            developer: 0, webdev: 0, qa: 0, data: 0, dba: 0,
            analyst: 0, pm: 0, digital: 0, ux: 0
          }
        },
        {
          id: 'behind-scenes',
          label: 'I prefer to stay behind the scenes and keep things running',
          scores: {
            cloud: 3, dba: 3, security: 2, qa: 2,
            developer: 1, webdev: 1,
            support: 1, techsupport: 1,
            analyst: 0, pm: 0, digital: 0, ux: 0, impl: 0, data: 1
          }
        }
      ]
    },
    {
      id: 'data-comfort',
      title: 'How do you feel about numbers and data?',
      options: [
        {
          id: 'love-data',
          label: 'I enjoy working with numbers and charts',
          scores: {
            data: 3, dba: 3, analyst: 3, digital: 2,
            qa: 1, pm: 1
          }
        },
        {
          id: 'ok-with-tools',
          label: 'I’m okay with basic math if I have tools',
          scores: {
            developer: 1, webdev: 1, qa: 2,
            cloud: 1, security: 1,
            support: 1, techsupport: 1,
            impl: 1, pm: 1
          }
        },
        {
          id: 'prefer-words',
          label: 'I prefer words, people, and visuals over numbers',
          scores: {
            ux: 3, digital: 2, pm: 2, impl: 2,
            support: 2, techsupport: 2,
            developer: 0, webdev: 0, data: 0, dba: 0, analyst: 0
          }
        },
        {
          id: 'open-but-not-main',
          label: 'I’m open to learning data skills but it’s not my main thing',
          scores: {
            developer: 1, webdev: 1, cloud: 1, security: 1,
            qa: 1, impl: 1, support: 1, techsupport: 1,
            analyst: 1, data: 1, dba: 1, digital: 1
          }
        }
      ]
    },
    {
      id: 'values',
      title: 'Right now, what matters most to you in your first tech role?',
      options: [
        {
          id: 'learning-growth',
          label: 'Learning and growth – I want to soak up as much as I can',
          scores: {
            developer: 2, webdev: 2, data: 2, cloud: 2, security: 2,
            ux: 2, qa: 1, analyst: 1, dba: 1
          }
        },
        {
          id: 'stability',
          label: 'Stability and steady income',
          scores: {
            support: 3, techsupport: 3, qa: 2,
            analyst: 2, impl: 2, dba: 1
          }
        },
        {
          id: 'mission',
          label: 'Mission and impact – helping my community',
          scores: {
            digital: 2, ux: 2, analyst: 2,
            security: 2, impl: 2, pm: 1, support: 1
          }
        },
        {
          id: 'leadership',
          label: 'Leadership path – I want to grow into leading people or projects',
          scores: {
            pm: 3, analyst: 2, cloud: 2, security: 2,
            impl: 2, digital: 1, developer: 1, webdev: 1
          }
        }
      ]
    },
  ],

  careers: {
    developer: {
      id: 'developer',
      name: 'Application Developer / Software Developer',
      short: 'Build web and software applications.',
      icon: '💻',
      scores: {}, // filled from steps
    },
    analyst: {
      id: 'analyst',
      name: 'Business Analyst',
      short: 'Bridge business needs and technology solutions.',
      icon: '📋',
      scores: {},
    },
    data: {
      id: 'data',
      name: 'Data Analyst',
      short: 'Turn data into insights and reports.',
      icon: '📊',
      scores: {},
    },
    security: {
      id: 'security',
      name: 'Cybersecurity / Information Security',
      short: 'Protect systems and data from threats.',
      icon: '🔒',
      scores: {},
    },
    cloud: {
      id: 'cloud',
      name: 'Cloud / DevOps Engineer',
      short: 'Build and run systems in the cloud.',
      icon: '☁️',
      scores: {},
    },
    ux: {
      id: 'ux',
      name: 'UX / UI Designer',
      short: 'Design experiences and interfaces users love.',
      icon: '🎨',
      scores: {},
    },
    pm: {
      id: 'pm',
      name: 'Project Manager / Scrum Master',
      short: 'Keep projects on track and teams aligned.',
      icon: '📌',
      scores: {},
    },
    qa: {
      id: 'qa',
      name: 'QA / Software Tester',
      short: 'Ensure quality and find bugs before users do.',
      icon: '✅',
      scores: {},
    },
    support: {
      id: 'support',
      name: 'IT Support / Help Desk',
      short: 'Support users and fix technical issues.',
      icon: '🛠️',
      scores: {},
    },
    webdev: {
      id: 'webdev',
      name: 'Junior Web Developer',
      short: 'Build websites with HTML, CSS, and JavaScript—a great first coding role.',
      icon: '🌐',
      scores: {},
    },
    digital: {
      id: 'digital',
      name: 'Digital Marketing Specialist',
      short: 'Use tech tools for social media, analytics, and online campaigns.',
      icon: '📱',
      scores: {},
    },
    impl: {
      id: 'impl',
      name: 'Implementation Specialist',
      short: 'Onboard clients to software and help them get set up and trained.',
      icon: '🚀',
      scores: {},
    },
    techsupport: {
      id: 'techsupport',
      name: 'Technical Support Specialist',
      short: 'Support customers using software and SaaS products.',
      icon: '📞',
      scores: {},
    },
    dba: {
      id: 'dba',
      name: 'Junior Database Analyst',
      short: 'Work with data, SQL, and databases to support reporting and applications.',
      icon: '🗄️',
      scores: {},
    },
  },

  deepDives: {
    developer: {
      what: 'Application developers design, build, and maintain software and web applications. You write code (e.g., JavaScript, Python, C#), work in frameworks (React, .NET), use APIs and databases, and collaborate with designers and product owners. Many i.c.stars graduates start here.',
      dayToDay: 'Typical days include coding features, fixing bugs, code reviews, standups, and testing. You might work on front-end (what users see), back-end (servers and data), or full-stack (both).',
      howToGetThere: [
        'Complete the i.c.stars program and build at least 2–3 solid projects for your portfolio.',
        'Learn one language deeply (e.g., JavaScript or C#) and one framework (React, Angular, or .NET).',
        'Get comfortable with Git, basic SQL, and REST APIs.',
        'Create a GitHub profile and link it on your resume and LinkedIn.',
        'Apply for junior developer, apprentice, or internship roles; highlight projects and problem-solving.',
        'Consider certifications like Microsoft MTA (Software Development) or free coding certifications (e.g., freeCodeCamp) to show initiative.',
      ],
      salaryRange: 'Entry-level: ~$50k–$75k; with experience: $80k–$120k+ (varies by city and company).',
      salaryByRegion: { chicago: 'Entry-level: ~$55k–$80k; with experience: $85k–$125k+.', milwaukee: 'Entry-level: ~$48k–$70k; with experience: $75k–$110k+.', kansas_city: 'Entry-level: ~$50k–$72k; with experience: $78k–$115k+.' },
    },
    analyst: {
      what: 'Business analysts help organizations solve problems by defining requirements, documenting processes, and bridging communication between business stakeholders and technical teams. You gather needs, write user stories, support testing, and help prioritize what gets built.',
      dayToDay: 'You’ll run meetings, conduct interviews, create requirement documents and user stories, support UAT (user acceptance testing), and work in tools like Jira, Confluence, and Excel.',
      howToGetThere: [
        'Leverage your i.c.stars experience: you already understand both business context and tech delivery.',
        'Get comfortable with requirements gathering, user stories, and basic process mapping.',
        'Learn tools: Jira, Confluence, Excel (pivot tables, basic formulas), and optionally SQL for data checks.',
        'Consider the ECBA (Entry Certificate in Business Analysis) from IIBA or similar entry-level BA credentials.',
        'Highlight any experience coordinating people, documenting processes, or translating business needs on your resume.',
        'Look for titles like Business Analyst, Junior BA, or Associate Product Owner.',
      ],
      salaryRange: 'Entry-level: ~$55k–$75k; with experience: $75k–$100k+.',
      salaryByRegion: { chicago: 'Entry-level: ~$60k–$80k; with experience: $80k–$105k+.', milwaukee: 'Entry-level: ~$52k–$70k; with experience: $70k–$95k+.', kansas_city: 'Entry-level: ~$54k–$72k; with experience: $72k–$98k+.' },
    },
    data: {
      what: 'Data analysts collect, clean, and analyze data to answer business questions. You use SQL, Excel, and tools like Power BI or Tableau to build reports and dashboards, and sometimes Python or R for deeper analysis.',
      dayToDay: 'You write queries, build dashboards, create reports, present findings to stakeholders, and often work with business analysts and developers to define data needs.',
      howToGetThere: [
        'Build a strong foundation in SQL (querying databases) and Excel (pivot tables, formulas, charts).',
        'Learn one visualization tool: Power BI (often used in corporate) or Tableau.',
        'Add basic Python or R for data manipulation and analysis if you have time.',
        'Complete at least one end-to-end project: get data, clean it, analyze, and present in a dashboard or report.',
        'Consider certifications: Google Data Analytics Certificate, Microsoft Power BI certifications, or CompTIA Data+.',
        'Apply for Data Analyst, Reporting Analyst, or Business Intelligence Analyst roles.',
      ],
      salaryRange: 'Entry-level: ~$55k–$75k; with experience: $75k–$100k+.',
      salaryByRegion: { chicago: 'Entry-level: ~$60k–$80k; with experience: $80k–$105k+.', milwaukee: 'Entry-level: ~$52k–$68k; with experience: $70k–$92k+.', kansas_city: 'Entry-level: ~$54k–$70k; with experience: $72k–$96k+.' },
    },
    security: {
      what: 'Cybersecurity professionals protect systems, networks, and data from threats. Roles include security analysts (monitoring and responding to incidents), vulnerability management, and policy and compliance. You need a mix of technical skills and awareness of risks and best practices.',
      dayToDay: 'Tasks can include monitoring alerts, investigating incidents, running vulnerability scans, applying patches, documenting procedures, and working with IT and development teams to harden systems.',
      howToGetThere: [
        'Start with CompTIA Security+ as the most recognized entry-level certification; then consider CySA+ or similar.',
        'Understand networking basics (CompTIA Network+ helps) and how operating systems and cloud services work.',
        'Learn the basics of risk, compliance (e.g., what policies and audits look like), and common attack types.',
        'Practice in home labs or free platforms (TryHackMe, Hack The Box) to show hands-on interest.',
        'Look for Security Analyst, SOC Analyst, or IT Security roles; some companies hire from IT support or help desk.',
      ],
      salaryRange: 'Entry-level: ~$60k–$80k; with experience: $85k–$120k+.',
      salaryByRegion: { chicago: 'Entry-level: ~$65k–$88k; with experience: $90k–$130k+.', milwaukee: 'Entry-level: ~$55k–$72k; with experience: $78k–$108k+.', kansas_city: 'Entry-level: ~$58k–$75k; with experience: $80k–$112k+.' },
    },
    cloud: {
      what: 'Cloud and DevOps engineers build and maintain the infrastructure that runs applications: servers, databases, CI/CD pipelines, and monitoring. You work in clouds like AWS, Azure, or GCP and use tools like Docker, Kubernetes, and Terraform.',
      dayToDay: 'You might configure cloud services, automate deployments, set up monitoring and alerts, and work closely with developers to keep applications running and scalable.',
      howToGetThere: [
        'Get one cloud certification: AWS Certified Cloud Practitioner or Microsoft Azure Fundamentals (AZ-900) to start.',
        'Learn Linux basics, networking, and how web apps are deployed (servers, containers).',
        'Practice with free tiers: AWS Free Tier, Azure free account, or Google Cloud free tier.',
        'Learn basics of CI/CD (e.g., GitHub Actions), and optionally Docker and a bit of Kubernetes.',
        'Consider CompTIA Cloud+ or a vendor-specific associate-level cert (e.g., AWS Solutions Architect Associate) after fundamentals.',
        'Look for Cloud Support, DevOps Associate, or Junior Cloud Engineer roles.',
      ],
      salaryRange: 'Entry-level: ~$60k–$85k; with experience: $90k–$130k+.',
      salaryByRegion: { chicago: 'Entry-level: ~$65k–$90k; with experience: $95k–$135k+.', milwaukee: 'Entry-level: ~$54k–$75k; with experience: $82k–$115k+.', kansas_city: 'Entry-level: ~$56k–$78k; with experience: $85k–$120k+.' },
    },
    ux: {
      what: 'UX/UI designers focus on how products look and feel and how users accomplish tasks. UX covers research, flows, and usability; UI covers visual design, components, and design systems. You create wireframes, prototypes, and high-fidelity mockups.',
      dayToDay: 'You run user research, create user flows and wireframes, design in Figma (or similar), prototype interactions, and collaborate with developers and product managers.',
      howToGetThere: [
        'Learn Figma (or Adobe XD) thoroughly: components, prototyping, and handoff.',
        'Study UX fundamentals: user research, personas, wireframing, usability, and accessibility basics.',
        'Build a portfolio with 3–5 projects: problem, process, and final designs (even for fictional or volunteer projects).',
        'Consider a structured course or certificate: Google UX Design Certificate, or courses from Coursera/LinkedIn Learning.',
        'Understand how developers implement designs (HTML/CSS basics) so you can communicate clearly.',
        'Apply for UX Designer, UI Designer, or Product Designer (entry-level) roles.',
      ],
      salaryRange: 'Entry-level: ~$55k–$75k; with experience: $80k–$110k+.',
      salaryByRegion: { chicago: 'Entry-level: ~$60k–$82k; with experience: $85k–$118k+.', milwaukee: 'Entry-level: ~$50k–$68k; with experience: $72k–$98k+.', kansas_city: 'Entry-level: ~$52k–$70k; with experience: $75k–$102k+.' },
    },
    pm: {
      what: 'Project managers and Scrum Masters keep projects on track: scheduling, scope, and communication. Scrum Masters focus on agile ceremonies, removing blockers, and helping teams improve. Both roles require strong organization and people skills.',
      dayToDay: 'You facilitate standups, retrospectives, and planning; track tasks in Jira or similar; communicate with stakeholders; and help the team stay focused and unblocked.',
      howToGetThere: [
        'Get experience with agile: understand Scrum (roles, ceremonies, artifacts) and Kanban.',
        'Use Jira (or similar) in practice: boards, backlogs, sprints, and reporting.',
        'Consider entry-level certifications: Certified ScrumMaster (CSM), CAPM (Project Management), or PMI-ACP.',
        'Highlight any experience leading meetings, coordinating work, or keeping teams organized from i.c.stars or other roles.',
        'Look for Associate Project Manager, Junior Scrum Master, or Project Coordinator roles.',
      ],
      salaryRange: 'Entry-level: ~$55k–$75k; with experience: $80k–$110k+.',
      salaryByRegion: { chicago: 'Entry-level: ~$58k–$78k; with experience: $83k–$115k+.', milwaukee: 'Entry-level: ~$50k–$68k; with experience: $72k–$98k+.', kansas_city: 'Entry-level: ~$52k–$70k; with experience: $75k–$102k+.' },
    },
    qa: {
      what: 'QA and software testers ensure quality: you design test cases, run manual and automated tests, log bugs, and work with developers to fix issues. You help ship reliable software by finding problems before users do.',
      dayToDay: 'You write and run test cases, perform regression testing, report bugs in Jira or similar, and may write or maintain automated tests (e.g., Selenium, Cypress) as you grow.',
      howToGetThere: [
        'Understand the software development lifecycle and how testing fits in (manual testing first).',
        'Learn to write clear bug reports and test cases; get comfortable with Jira or similar.',
        'Learn basics of test automation: e.g., one tool like Selenium (with Java/JS) or Cypress (JavaScript).',
        'Consider ISTQB Foundation Level or similar QA certification to show fundamentals.',
        'Highlight attention to detail, logic, and any testing or troubleshooting experience on your resume.',
        'Look for QA Analyst, Software Tester, or Test Engineer (entry-level) roles.',
      ],
      salaryRange: 'Entry-level: ~$50k–$70k; with experience: $70k–$95k+.',
      salaryByRegion: { chicago: 'Entry-level: ~$52k–$74k; with experience: $74k–$100k+.', milwaukee: 'Entry-level: ~$46k–$62k; with experience: $62k–$85k+.', kansas_city: 'Entry-level: ~$48k–$64k; with experience: $65k–$88k+.' },
    },
    support: {
      what: 'IT support and help desk professionals help users with technical issues: password resets, software installs, hardware troubleshooting, and access management. It’s a common entry point into tech with room to grow into sysadmin, security, or specialized roles.',
      dayToDay: 'You answer tickets or calls, troubleshoot issues, document solutions, and may work with Active Directory, ticketing systems (ServiceNow, Jira Service Desk), and basic networking.',
      howToGetThere: [
        'Earn CompTIA A+ as the standard entry-level certification for help desk and desktop support.',
        'Learn the basics: Windows (and optionally Mac), Office 365, networking fundamentals, and ticketing.',
        'Get comfortable with remote support tools and basic troubleshooting methodologies.',
        'Consider CompTIA Network+ or a Microsoft certification (e.g., MD-100) to stand out.',
        'Highlight customer service, patience, and any tech support or troubleshooting experience.',
        'Look for Help Desk Technician, IT Support Specialist, or Desktop Support roles.',
      ],
      salaryRange: 'Entry-level: ~$40k–$55k; with experience: $55k–$75k; can lead to higher-paying admin or security roles.',
      salaryByRegion: { chicago: 'Entry-level: ~$45k–$60k; with experience: $60k–$82k+.', milwaukee: 'Entry-level: ~$38k–$50k; with experience: $50k–$68k+.', kansas_city: 'Entry-level: ~$40k–$52k; with experience: $52k–$70k+.' },
    },
    webdev: {
      what: 'Junior web developers build and update websites using HTML, CSS, and JavaScript. You might work on company sites, client projects, or internal tools. This is one of the most accessible first tech roles—no degree required, and you can learn the basics in months. Perfect for i.c.stars interns who enjoy creating and want to code.',
      dayToDay: 'You write and update code, fix layout and styling issues, add simple features and forms, work with designers and senior devs, and test your work in browsers. You’ll use tools like VS Code, Git, and sometimes content management systems (like WordPress) or frameworks (like React) as you grow.',
      howToGetThere: [
        'Complete the i.c.stars program—you’ll already have hands-on experience building web apps.',
        'Master the fundamentals: HTML (structure), CSS (layout, flexbox, responsive design), and JavaScript (DOM, events, basic logic).',
        'Build 2–3 personal or portfolio projects and host them (GitHub Pages, Netlify, or Vercel are free).',
        'Get comfortable with Git: committing, pushing, branching. Put your code on GitHub and link it on your resume.',
        'Learn one framework or library (React is very common) to show you can work in real projects.',
        'Apply for Junior Web Developer, Front-End Developer, or Web Developer (entry-level) roles; highlight your projects.',
      ],
      salaryRange: 'Entry-level: ~$45k–$65k; with experience: $65k–$95k. Great stepping stone to full-stack or application developer.',
      salaryByRegion: { chicago: 'Entry-level: ~$50k–$72k; with experience: $72k–$102k+.', milwaukee: 'Entry-level: ~$42k–$58k; with experience: $58k–$85k+.', kansas_city: 'Entry-level: ~$44k–$62k; with experience: $62k–$90k+.' },
    },
    digital: {
      what: 'Digital marketing specialists use tech tools to run online campaigns, manage social media, track analytics, and help brands grow. You combine creativity with data—posting content, running ads, measuring results, and reporting on what works. No coding required to start, but familiarity with tools and data is key.',
      dayToDay: 'You might create and schedule social posts, set up or run ad campaigns (Facebook, Google, LinkedIn), pull reports from analytics (Google Analytics, social insights), and present results to stakeholders. You’ll use tools like Hootsuite, Meta Business Suite, Google Ads, and Canva.',
      howToGetThere: [
        'Learn the basics: social media platforms (Meta, LinkedIn, X/Twitter), how ads work, and basic analytics.',
        'Get hands-on: run a small campaign for a volunteer project, a side hustle, or even a personal brand.',
        'Take free courses: Google Digital Garage, Meta Blueprint, or HubSpot Academy certifications.',
        'Become comfortable with spreadsheets (Excel or Google Sheets) for reporting and data.',
        'Build a portfolio: screenshots of campaigns, metrics you improved, and content you created.',
        'Apply for Digital Marketing Associate, Social Media Coordinator, or Marketing Specialist roles.',
      ],
      salaryRange: 'Entry-level: ~$40k–$55k; with experience: $55k–$80k. Can grow into content marketing, analytics, or paid media specialist.',
      salaryByRegion: { chicago: 'Entry-level: ~$45k–$60k; with experience: $60k–$88k+.', milwaukee: 'Entry-level: ~$36k–$50k; with experience: $50k–$70k+.', kansas_city: 'Entry-level: ~$38k–$52k; with experience: $52k–$74k+.' },
    },
    impl: {
      what: 'Implementation specialists onboard new clients to software—helping them set up the product, configure settings, and train their teams. You bridge the gap between sales/onboarding and ongoing support. It’s a people-focused tech role: you need to understand the software, explain it clearly, and solve problems as clients get started.',
      dayToDay: 'You conduct kickoff calls, configure accounts and settings, run training sessions (often via Zoom), create documentation or guides, and hand off to support or success teams. You work in the company’s software, CRM, and project tools like Salesforce, Jira, or internal platforms.',
      howToGetThere: [
        'Leverage your i.c.stars experience: you already learn new software quickly and work with diverse stakeholders.',
        'Get comfortable with common business tools: CRMs (Salesforce, HubSpot), project management (Jira, Asana), and video calls.',
        'Practice explaining technical concepts in simple terms—this is core to the role.',
        'Highlight any experience training others, onboarding new users, or walking people through processes.',
        'Look for Implementation Specialist, Onboarding Specialist, Client Success Associate, or Solutions Consultant (entry-level) roles.',
      ],
      salaryRange: 'Entry-level: ~$45k–$60k; with experience: $60k–$85k. Strong path to Customer Success, Solutions Engineering, or Product.',
      salaryByRegion: { chicago: 'Entry-level: ~$50k–$65k; with experience: $65k–$92k+.', milwaukee: 'Entry-level: ~$42k–$55k; with experience: $55k–$76k+.', kansas_city: 'Entry-level: ~$44k–$58k; with experience: $58k–$80k+.' },
    },
    techsupport: {
      what: 'Technical support specialists help customers who use a specific software or SaaS product. Unlike general IT help desk, you focus on one company’s product—answering questions, troubleshooting issues, and guiding users through features. You become an expert in that product and often use ticketing systems, knowledge bases, and chat tools.',
      dayToDay: 'You answer support tickets, chat or email with customers, reproduce and document bugs for engineering, update help articles, and sometimes handle escalations. You’ll use tools like Zendesk, Intercom, Salesforce Service Cloud, or the company’s own support platform.',
      howToGetThere: [
        'Start by using and learning popular software products (Salesforce, Slack, HubSpot, etc.) so you understand how SaaS works.',
        'Get comfortable with ticketing systems and help desk workflows—many companies train on their tools.',
        'Highlight customer service skills: patience, clear communication, and empathy. Tech can be taught; attitude matters a lot.',
        'Consider the HubSpot Support Certification or similar product-specific credentials if you target a specific industry.',
        'Look for Technical Support Representative, Customer Support Specialist, or Software Support roles—especially at SaaS companies.',
      ],
      salaryRange: 'Entry-level: ~$40k–$55k; with experience: $55k–$75k. Can lead to Senior Support, Product Support, or Customer Success.',
      salaryByRegion: { chicago: 'Entry-level: ~$45k–$60k; with experience: $60k–$82k+.', milwaukee: 'Entry-level: ~$36k–$50k; with experience: $50k–$68k+.', kansas_city: 'Entry-level: ~$38k–$52k; with experience: $52k–$70k+.' },
    },
    dba: {
      what: 'Junior database analysts work with data stored in databases: writing SQL queries, building reports, checking data quality, and supporting applications that need data. You’re the bridge between raw data and useful information. This role is ideal if you like structure, logic, and seeing patterns in data without needing heavy programming at first.',
      dayToDay: 'You write SQL to pull data for reports, help developers and analysts get the data they need, validate data accuracy, document tables and fields, and may use tools like SQL Server Management Studio, MySQL Workbench, or cloud data platforms. You’ll work closely with data analysts and developers.',
      howToGetThere: [
        'Build a solid SQL foundation: SELECT, JOINs, WHERE, GROUP BY, aggregations. Practice on free datasets (Kaggle, government data).',
        'Complete the i.c.stars program—you’ll touch databases and data in real projects.',
        'Get familiar with at least one database: Microsoft SQL Server, MySQL, or PostgreSQL are common.',
        'Learn Excel (pivot tables, formulas) for reporting and data checks.',
        'Consider CompTIA Data+ or a database-focused certification to show fundamentals.',
        'Apply for Junior Database Analyst, Data Operations, or SQL Developer (entry-level) roles.',
      ],
      salaryRange: 'Entry-level: ~$50k–$65k; with experience: $65k–$90k. Strong path to Data Analyst, Data Engineer, or Database Administrator.',
      salaryByRegion: { chicago: 'Entry-level: ~$54k–$72k; with experience: $72k–$98k+.', milwaukee: 'Entry-level: ~$46k–$60k; with experience: $60k–$82k+.', kansas_city: 'Entry-level: ~$48k–$64k; with experience: $64k–$86k+.' },
    },
  },

  resources: [
    {
      categoryId: 'learning',
      category: 'Learning & Skills',
      items: [
        { name: 'LinkedIn Learning', desc: 'Thousands of courses on tech, business, and soft skills. Many libraries offer free access.', url: 'https://www.linkedin.com/learning/' },
        { name: 'freeCodeCamp', desc: 'Free coding curriculum (HTML, CSS, JavaScript, Python, and more) with certifications.', url: 'https://www.freecodecamp.org/' },
        { name: 'Codecademy', desc: 'Interactive coding lessons; free and paid tracks for multiple languages.', url: 'https://www.codecademy.com/' },
        { name: 'Microsoft Learn', desc: 'Free learning paths for Azure, Microsoft 365, security, and development.', url: 'https://learn.microsoft.com/en-us/training/' },
        { name: 'Google Career Certificates', desc: 'Data Analytics, UX Design, IT Support, Project Management—affordable and recognized.', url: 'https://grow.google/certificates/' },
      ],
    },
    {
      categoryId: 'certifications',
      category: 'Certifications',
      items: [
        { name: 'CompTIA A+', desc: 'Entry-level IT and help desk. Covers hardware, software, and troubleshooting.', url: 'https://www.comptia.org/certifications/a' },
        { name: 'CompTIA Network+', desc: 'Networking fundamentals. Good before Security+ or cloud roles.', url: 'https://www.comptia.org/certifications/network' },
        { name: 'CompTIA Security+', desc: 'Entry-level cybersecurity. Often required for government and many security roles.', url: 'https://www.comptia.org/certifications/security' },
        { name: 'CompTIA Data+', desc: 'Data analytics and reporting. For data analyst and BI roles.', url: 'https://www.comptia.org/certifications/data' },
        { name: 'CompTIA Cloud+', desc: 'Cloud infrastructure and operations.', url: 'https://www.comptia.org/certifications/cloud' },
        { name: 'AWS Certified Cloud Practitioner', desc: 'Entry-level AWS. Good first step before Solutions Architect.', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/' },
        { name: 'Microsoft Azure Fundamentals (AZ-900)', desc: 'Entry-level Azure. Often free with Microsoft learning challenges.', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/' },
        { name: 'Google Data Analytics Certificate', desc: 'Coursera-based certificate for data analysis and tools.', url: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
        { name: 'Google UX Design Certificate', desc: 'Coursera-based certificate for UX research and design.', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
        { name: 'Certified ScrumMaster (CSM)', desc: 'Scrum Alliance certification for Scrum Masters.', url: 'https://www.scrumalliance.org/get-certified/scrum-master' },
        { name: 'ISTQB Foundation (QA)', desc: 'Foundation-level software testing certification.', url: 'https://www.istqb.org/certification-path-root/foundation-level-2018.html' },
      ],
    },
    {
      categoryId: 'career',
      category: 'Career & Networking',
      items: [
        { name: 'LinkedIn', desc: 'Build your profile, connect with recruiters, and apply for jobs. Essential for tech hiring.', url: 'https://www.linkedin.com/' },
        { name: 'i.c.stars', desc: 'Official site: programs, alumni, and opportunities.', url: 'https://www.icstars.org/' },
        { name: 'Indeed', desc: 'Job search and company reviews.', url: 'https://www.indeed.com/' },
        { name: 'Glassdoor', desc: 'Salaries, reviews, and interview insights.', url: 'https://www.glassdoor.com/' },
      ],
    },
    {
      categoryId: 'practice',
      category: 'Practice & Portfolios',
      items: [
        { name: 'GitHub', desc: 'Host code, contribute to projects, and build a visible portfolio for developers.', url: 'https://github.com/' },
        { name: 'TryHackMe', desc: 'Hands-on cybersecurity labs and learning paths.', url: 'https://tryhackme.com/' },
        { name: 'Hack The Box', desc: 'Cybersecurity challenges and labs (free tier available).', url: 'https://www.hackthebox.com/' },
        { name: 'Figma', desc: 'Design and prototype; free for individuals. Standard for UX/UI.', url: 'https://www.figma.com/' },
      ],
    },
  ],
};
