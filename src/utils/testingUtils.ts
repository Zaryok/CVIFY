import { CVData } from "../types";

/**
 * Testing utility for CVify application
 * This module provides functions to generate test data and verify application functionality
 */

/**
 * Sample test data that can be used to populate the CV wizard
 * This provides realistic data for each section of the CV
 */
export const sampleTestCVData: CVData = {
  id: "test-cv-id",
  template_id: "template-1",
  title: "Software Engineer CV - Test Data",
  content: {
    personal: {
      fullName: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexjohnson",
      portfolio: "alexjohnson.dev"
    },
    education: [
      {
        school: "Stanford University",
        degree: "Master of Science",
        field: "Computer Science",
        startDate: "09/2018",
        endDate: "05/2020",
        description: "• Specialized in Artificial Intelligence and Machine Learning\n• Thesis: 'Deep Learning Approaches to Natural Language Processing'\n• GPA: 3.9/4.0\n• Teaching Assistant for Introduction to Algorithms"
      },
      {
        school: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Engineering",
        startDate: "09/2014",
        endDate: "05/2018",
        description: "• Minor in Mathematics\n• Dean's List (7 semesters)\n• Senior Project: Developed an IoT system for energy consumption monitoring"
      }
    ],
    experience: [
      {
        company: "Google",
        position: "Software Engineer",
        location: "Mountain View, CA",
        startDate: "06/2020",
        endDate: "Present",
        description: "• Developed and maintained critical components of Google Cloud Platform, resulting in a 15% improvement in system performance\n• Led a team of 5 engineers to rebuild the authentication service, reducing login failures by 40%\n• Implemented automated CI/CD pipelines that reduced deployment time by 60%\n• Collaborated with product managers to define feature roadmaps and technical specifications"
      },
      {
        company: "Salesforce",
        position: "Software Engineering Intern",
        location: "San Francisco, CA",
        startDate: "05/2019",
        endDate: "08/2019",
        description: "• Designed and implemented RESTful APIs for the Analytics platform\n• Optimized database queries, improving response time by 35%\n• Created data visualization components using React and D3.js\n• Participated in agile development processes including daily standups and sprint planning"
      },
      {
        company: "UC Berkeley Research Lab",
        position: "Research Assistant",
        location: "Berkeley, CA",
        startDate: "01/2017",
        endDate: "05/2018",
        description: "• Conducted research on computer vision algorithms for autonomous vehicles\n• Published two papers in international conferences\n• Implemented and tested object detection algorithms using TensorFlow and PyTorch\n• Collaborated with a multidisciplinary team of researchers"
      }
    ],
    skills: {
      technical: "Programming Languages: Python, JavaScript, TypeScript, Java, C++, SQL\nFrameworks & Libraries: React, Node.js, Express, Django, TensorFlow, PyTorch\nTools & Platforms: Git, Docker, Kubernetes, AWS, GCP, Azure\nDatabase: PostgreSQL, MongoDB, Redis\nOther: RESTful APIs, GraphQL, CI/CD, Microservices, Agile Methodologies",
      soft: "• Leadership & Team Management\n• Problem Solving & Critical Thinking\n• Communication & Collaboration\n• Project Management\n• Adaptability & Fast Learning",
      languages: "English (Native), Spanish (Fluent), Mandarin (Intermediate)"
    },
    customSections: [
      {
        id: "projects",
        title: "Projects",
        content: "Personal Portfolio Website (2022)\n• Designed and developed a responsive portfolio website using React, Next.js, and Tailwind CSS\n• Implemented a custom CMS for easy content updates\n\nOpen Source Contribution - TensorFlow (2021)\n• Contributed to TensorFlow's documentation and examples\n• Fixed bugs related to model serving in TensorFlow Extended (TFX)\n\nSmartHome IoT System (2019)\n• Built a complete IoT system using Raspberry Pi, Arduino, and custom sensors\n• Created a mobile app for remote monitoring and control using React Native"
      },
      {
        id: "certifications",
        title: "Certifications",
        content: "• AWS Certified Solutions Architect - Associate (2022)\n• Google Cloud Professional Data Engineer (2021)\n• Machine Learning Specialization - Stanford Online (2020)"
      }
    ]
  },
  styling: {
    primaryColor: "#1a56db",
    secondaryColor: "#4b5563",
    font: "Helvetica",
    spacing: 1.15
  },
  created_at: "2023-01-15T12:00:00Z",
  updated_at: "2023-03-10T15:30:00Z"
};

/**
 * Generates a testing data set for a specific CV section
 * @param section The section to generate test data for
 * @returns Sample test data for the specified section
 */
export const generateTestDataForSection = (section: keyof CVData['content']): any => {
  return sampleTestCVData.content[section];
};

/**
 * Utility function to populate all form fields in the wizard
 * This can be called from the browser console to quickly fill in all fields for testing
 */
export const populateAllFormFields = (): void => {
  console.log("Populating all form fields with test data...");
  // This function will be extended to actually populate the form
  // It would need to interact with the DOM or component state
  
  // Example instruction for manual testing:
  console.log("To use this in a component, call this function and then use the return data to update your component state");
};

/**
 * Function to verify PDF generation results
 * @param cvData The CV data used to generate the PDF
 * @returns An object containing validation results
 */
export const verifyPDFOutput = (cvData: CVData): { success: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  // Check for required fields
  if (!cvData.content.personal.fullName) issues.push("Missing full name");
  if (!cvData.content.personal.email) issues.push("Missing email");
  if (!cvData.content.personal.phone) issues.push("Missing phone");
  if (!cvData.content.personal.location) issues.push("Missing location");
  
  // Check for at least one entry in education and experience
  if (cvData.content.education.length === 0) issues.push("No education entries");
  if (cvData.content.experience.length === 0) issues.push("No experience entries");
  
  // Check education entries
  cvData.content.education.forEach((edu, index) => {
    if (!edu.school) issues.push(`Education #${index + 1}: Missing school`);
    if (!edu.degree) issues.push(`Education #${index + 1}: Missing degree`);
    if (!edu.startDate) issues.push(`Education #${index + 1}: Missing start date`);
  });
  
  // Check experience entries
  cvData.content.experience.forEach((exp, index) => {
    if (!exp.company) issues.push(`Experience #${index + 1}: Missing company`);
    if (!exp.position) issues.push(`Experience #${index + 1}: Missing position`);
    if (!exp.startDate) issues.push(`Experience #${index + 1}: Missing start date`);
  });
  
  return {
    success: issues.length === 0,
    issues
  };
};

/**
 * Tracking test progress across all features
 * @param features Object containing test status for each feature
 * @returns HTML string that can be used to display current test status
 */
export const generateTestReport = (features: Record<string, boolean>): string => {
  let reportHTML = '<div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">';
  reportHTML += '<h2 style="color: #333;">CVify Testing Report</h2>';
  reportHTML += '<table style="width: 100%; border-collapse: collapse;">';
  reportHTML += '<tr><th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Feature</th><th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Status</th></tr>';
  
  Object.entries(features).forEach(([feature, passed]) => {
    reportHTML += `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${feature}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">
        <span style="display: inline-block; padding: 4px 8px; border-radius: 4px; background: ${passed ? '#d1fae5' : '#fee2e2'}; color: ${passed ? '#065f46' : '#b91c1c'};">
          ${passed ? 'PASSED' : 'FAILED'}
        </span>
      </td>
    </tr>`;
  });
  
  reportHTML += '</table>';
  reportHTML += '</div>';
  
  return reportHTML;
};

/**
 * UI testing utility to verify responsive design
 * Call this from console to highlight potential responsive issues
 */
export const testResponsiveness = (): void => {
  console.log("Testing responsiveness of UI elements...");
  
  // Add temporary outline to all interactive elements
  const styleElement = document.createElement('style');
  styleElement.id = 'cvify-test-styles';
  styleElement.textContent = `
    button, input, select, textarea, a {
      outline: 2px solid rgba(59, 130, 246, 0.5) !important;
    }
    
    @media (max-width: 768px) {
      .responsive-test {
        background-color: rgba(239, 68, 68, 0.1) !important;
      }
    }
  `;
  document.head.appendChild(styleElement);
  
  // Add class to all potential containers
  document.querySelectorAll('div').forEach(div => {
    if (div.children.length > 0 && getComputedStyle(div).display !== 'none') {
      div.classList.add('responsive-test');
    }
  });
  
  console.log("Added temporary responsive testing styles. Resize window to see potential issues.");
  console.log("To remove testing styles, call cleanupResponsivenessTest()");
};

/**
 * Cleanup function for responsiveness test
 */
export const cleanupResponsivenessTest = (): void => {
  document.getElementById('cvify-test-styles')?.remove();
  document.querySelectorAll('.responsive-test').forEach(el => {
    el.classList.remove('responsive-test');
  });
  console.log("Removed responsive testing styles.");
};
