export interface Template {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  previewUrl: string;
  popular?: boolean;
  category: 'Professional' | 'Creative' | 'Modern';
  features: string[];
  customization: {
    colors: boolean;
    fonts: boolean;
    spacing: boolean;
    sections: boolean;
  };
}

export interface CVData {
  id?: string;
  user_id?: string;
  template_id: string;
  title: string;
  content: {
    personal: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      linkedin?: string;
      portfolio?: string;
      github?: string;
    };
    education: Array<{
      school: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    experience: Array<{
      company: string;
      position: string;
      location: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    skills: {
      technical: string;
      soft: string;
      languages: string;
    };
    customSections?: Array<{
      id: string;
      title: string;
      content: string;
    }>;
  };
  styling?: {
    primaryColor: string;
    secondaryColor: string;
    font: string;
    spacing: number;
  };
  created_at?: string;
  updated_at?: string;
}