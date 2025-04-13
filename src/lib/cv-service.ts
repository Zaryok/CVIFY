import { CVData } from '../types';
import { generatePDF } from './pdf-generator';
import { supabase } from './supabase';
import { AIService } from './ai-service';

export class CVService {
  // Create or update CV with AI optimization
  static async saveCV(cvData: CVData): Promise<{ data: CVData | null; error: any }> {
    try {
      // First, optimize the CV content using AI
      const optimizedCV = await AIService.optimizeForATS(cvData);
      
      // Get AI suggestions
      const suggestions = await AIService.suggestImprovements(optimizedCV);
      
      // Score the optimized CV
      const score = await AIService.scoreResume(optimizedCV);
      
      const { id, user_id } = optimizedCV;
      
      if (id) {
        const { data, error } = await supabase
          .from('cvs')
          .update({
            template_id: optimizedCV.template_id,
            title: optimizedCV.title,
            content: optimizedCV.content,
            styling: optimizedCV.styling,
            ai_score: score,
            ai_suggestions: suggestions,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();
        
        return { data, error };
      } else {
        const { data, error } = await supabase
          .from('cvs')
          .insert({
            user_id,
            template_id: optimizedCV.template_id,
            title: optimizedCV.title,
            content: optimizedCV.content,
            styling: optimizedCV.styling,
            ai_score: score,
            ai_suggestions: suggestions,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        return { data, error };
      }
    } catch (error) {
      console.error('Error saving CV:', error);
      return { data: null, error };
    }
  }

  // Generate PDF from CV data with enhanced formatting
  static async generatePDF(cvData: CVData): Promise<Blob> {
    try {
      // First optimize the CV for ATS
      const optimizedCV = await AIService.optimizeForATS(cvData);
      return await generatePDF(optimizedCV);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  // Get CV by ID
  static async getCV(id: string): Promise<{ data: CVData | null; error: any }> {
    const { data, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  }

  // Get all CVs for a user
  static async getUserCVs(userId: string): Promise<{ data: CVData[] | null; error: any }> {
    const { data, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    return { data, error };
  }

  // Delete CV
  static async deleteCV(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('cvs')
      .delete()
      .eq('id', id);
    
    return { error };
  }

  // Get CV score and suggestions
  static async analyzeCV(cvData: CVData): Promise<{ 
    score: number;
    metrics: any;
    suggestions: string[];
  }> {
    try {
      return await AIService.scoreResume(cvData);
    } catch (error) {
      console.error('Error analyzing CV:', error);
      throw error;
    }
  }

  // Validate CV data with enhanced checks
  static validateCVData(cvData: CVData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic validation
    if (!cvData.content.personal.fullName?.trim()) errors.push('Full name is required');
    if (!cvData.content.personal.email?.trim()) errors.push('Email is required');
    if (!cvData.content.personal.phone?.trim()) errors.push('Phone number is required');
    if (!cvData.content.personal.location?.trim()) errors.push('Location is required');

    // Education validation
    if (!cvData.content.education?.length) {
      errors.push('At least one education entry is required');
    } else {
      cvData.content.education.forEach((edu, index) => {
        if (!edu.school?.trim()) errors.push(`School name is required for education entry ${index + 1}`);
        if (!edu.degree?.trim()) errors.push(`Degree is required for education entry ${index + 1}`);
        if (!edu.startDate?.trim()) errors.push(`Start date is required for education entry ${index + 1}`);
      });
    }

    // Experience validation
    if (!cvData.content.experience?.length) {
      errors.push('At least one experience entry is required');
    } else {
      cvData.content.experience.forEach((exp, index) => {
        if (!exp.company?.trim()) errors.push(`Company name is required for experience entry ${index + 1}`);
        if (!exp.position?.trim()) errors.push(`Position is required for experience entry ${index + 1}`);
        if (!exp.description?.trim()) errors.push(`Description is required for experience entry ${index + 1}`);
        if (!exp.startDate?.trim()) errors.push(`Start date is required for experience entry ${index + 1}`);
      });
    }

    // Skills validation with enhanced checks
    if (!cvData.content.skills.technical?.trim() && !cvData.content.skills.soft?.trim()) {
      errors.push('At least one skill category (technical or soft) is required');
    } else {
      const technicalSkills = cvData.content.skills.technical?.split(',').filter(s => s.trim()).length || 0;
      const softSkills = cvData.content.skills.soft?.split(',').filter(s => s.trim()).length || 0;
      
      if (technicalSkills < 3) errors.push('Add at least 3 technical skills');
      if (softSkills < 2) errors.push('Add at least 2 soft skills');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
