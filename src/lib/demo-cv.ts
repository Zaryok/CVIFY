import { CVData } from '../types';

export const demoCV: CVData = {
  template_id: 'tech-innovator',
  title: 'Software Developer CV',
  content: {
    personal: {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alexmorgan',
      portfolio: 'github.com/alexmorgan'
    },
    education: [
      {
        school: 'University of California, Berkeley',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2018-09',
        endDate: '2020-05',
        description: '• Specialized in Machine Learning and Distributed Systems\n• Published research paper on distributed computing optimization\n• Teaching Assistant for Advanced Algorithms course'
      },
      {
        school: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2014-09',
        endDate: '2018-05',
        description: '• Dean\'s List all semesters\n• Led Computer Science Society\n• Completed honors thesis on cloud computing architecture'
      }
    ],
    experience: [
      {
        company: 'TechCorp Solutions',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2020-06',
        endDate: 'Present',
        description: '• Led development of microservices architecture serving 1M+ daily users\n• Reduced system latency by 40% through optimization of database queries\n• Mentored 5 junior developers and established best practices documentation\n• Implemented CI/CD pipeline reducing deployment time by 60%'
      },
      {
        company: 'InnovateSoft',
        position: 'Software Engineer',
        location: 'Mountain View, CA',
        startDate: '2018-06',
        endDate: '2020-05',
        description: '• Developed scalable backend services using Node.js and PostgreSQL\n• Improved API response time by 35% through caching implementation\n• Collaborated with product team to launch 3 major features\n• Created automated testing suite achieving 90% code coverage'
      },
      {
        company: 'StartupX',
        position: 'Software Engineering Intern',
        location: 'Palo Alto, CA',
        startDate: '2017-05',
        endDate: '2017-08',
        description: '• Built responsive web applications using React and TypeScript\n• Implemented user authentication system\n• Contributed to open-source projects\n• Participated in agile development process'
      }
    ],
    skills: {
      technical: 'Languages: JavaScript, TypeScript, Python, Java, SQL\nFrameworks: React, Node.js, Express, Next.js\nTools: Git, Docker, Kubernetes, AWS\nDatabases: PostgreSQL, MongoDB, Redis',
      soft: 'Leadership, Problem Solving, Communication, Team Collaboration, Project Management, Agile Methodologies',
      languages: 'English (Native), Spanish (Professional Working Proficiency)'
    },
    customSections: [
      {
        id: 'projects',
        title: 'Notable Projects',
        content: '• Cloud Storage System: Developed distributed file storage system handling 10TB+ data\n• AI Chat Platform: Created real-time chat application with AI integration\n• Open Source Analytics: Contributed to popular analytics library with 1000+ stars on GitHub'
      }
    ]
  },
  styling: {
    primaryColor: '#1a56db',
    secondaryColor: '#4b5563',
    font: 'Inter',
    spacing: 1.2
  }
};