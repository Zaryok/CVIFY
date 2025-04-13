import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'classic-pro',
    name: 'Classic Professional',
    description: 'A timeless template perfect for traditional industries',
    imageUrl: 'https://d.novoresume.com/images/doc/functional-resume-template.png',
    previewUrl: 'https://d.novoresume.com/images/doc/functional-resume-template.png',
    popular: true,
    category: 'Professional',
    features: [
      'Clean and professional layout',
      'Perfect for corporate positions',
      'ATS-optimized structure',
      'Multiple page support'
    ],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true
    }
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean and contemporary design for forward-thinking professionals',
    imageUrl: 'https://d.novoresume.com/images/doc/minimalist-resume-template.png',
    previewUrl: 'https://d.novoresume.com/images/doc/minimalist-resume-template.png',
    category: 'Modern',
    features: [
      'Minimalist design',
      'Emphasis on white space',
      'Modern typography',
      'Skill visualization'
    ],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true
    }
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Stand out with this creative yet professional design',
    imageUrl: 'https://d.novoresume.com/images/doc/creative-resume-template.png',
    previewUrl: 'https://d.novoresume.com/images/doc/creative-resume-template.png',
    category: 'Creative',
    features: [
      'Portfolio integration',
      'Visual skill representation',
      'Project showcase',
      'Custom sections'
    ],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true
    }
  },
  {
    id: 'executive-elegant',
    name: 'Executive Elegant',
    description: 'Sophisticated design for senior professionals and executives',
    imageUrl: 'https://d.novoresume.com/images/doc/executive-resume-template.png',
    previewUrl: 'https://d.novoresume.com/images/doc/executive-resume-template.png',
    popular: true,
    category: 'Professional',
    features: [
      'Executive summary section',
      'Achievement highlights',
      'Board experience layout',
      'Leadership focus'
    ],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true
    }
  },
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    description: 'Modern template optimized for tech industry professionals',
    imageUrl: 'https://d.novoresume.com/images/doc/simple-resume-template.png',
    previewUrl: 'https://d.novoresume.com/images/doc/simple-resume-template.png',
    category: 'Modern',
    features: [
      'Technical skills matrix',
      'Project showcase section',
      'GitHub integration',
      'Code snippet styling'
    ],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true
    }
  },
  {
    id: 'startup-dynamic',
    name: 'Startup Dynamic',
    description: 'Dynamic layout for startup and entrepreneurial professionals',
    imageUrl: 'https://d.novoresume.com/images/doc/modern-resume-template.png',
    previewUrl: 'https://d.novoresume.com/images/doc/modern-resume-template.png',
    category: 'Modern',
    features: [
      'Impact metrics display',
      'Startup timeline',
      'Key achievements focus',
      'Modern infographics'
    ],
    customization: {
      colors: true,
      fonts: true,
      spacing: true,
      sections: true
    }
  }
];