import { CVData } from '../types';

interface MetricScore {
  score: number;
  feedback: string;
}

interface Metrics {
  atsCompatibility: MetricScore;
  contentQuality: MetricScore;
  keywordOptimization: MetricScore;
  formatting: MetricScore;
  completeness: MetricScore;
}

export interface ResumeScore {
  score: number;
  metrics: Metrics;
  suggestions: string[];
}

export class AIService {
  static async scoreResume(cvData: CVData): Promise<ResumeScore> {
    const metrics: Metrics = {
      atsCompatibility: this.scoreATSCompatibility(cvData),
      contentQuality: this.scoreContentQuality(cvData),
      keywordOptimization: this.analyzeKeywords(cvData),
      formatting: this.checkFormatting(cvData),
      completeness: this.checkCompleteness(cvData)
    };

    const totalScore = Object.values(metrics).reduce((acc, curr) => acc + curr.score, 0) / Object.keys(metrics).length;
    
    return {
      score: totalScore,
      metrics,
      suggestions: this.generateSuggestions(metrics)
    };
  }

  static async optimizeForATS(cvData: CVData): Promise<CVData> {
    const optimizedCV = { ...cvData };
    
    // Optimize experience descriptions
    optimizedCV.content.experience = optimizedCV.content.experience.map(exp => ({
      ...exp,
      description: this.optimizeDescription(exp.description)
    }));

    // Optimize skills for industry relevance
    optimizedCV.content.skills = this.optimizeSkills(optimizedCV.content.skills);
    
    return optimizedCV;
  }

  static async suggestImprovements(cvData: CVData): Promise<string[]> {
    const suggestions = [];
    
    // Analyze experience descriptions
    cvData.content.experience.forEach(exp => {
      suggestions.push(...this.analyzeExperienceDescription(exp));
    });
    
    // Analyze skills
    suggestions.push(...this.analyzeSkills(cvData.content.skills));
    
    return suggestions;
  }

  private static scoreATSCompatibility(cvData: CVData): MetricScore {
    let score = 1.0;
    const issues: string[] = [];

    // Check for required sections
    if (!cvData.content.personal.email) {
      score -= 0.1;
      issues.push("Missing email");
    }
    if (!cvData.content.experience.length) {
      score -= 0.2;
      issues.push("Missing work experience");
    }

    return {
      score: Math.max(0, score),
      feedback: issues.length ? issues.join(". ") : "Good ATS compatibility"
    };
  }

  private static scoreContentQuality(cvData: CVData): MetricScore {
    let score = 1.0;
    const issues: string[] = [];

    cvData.content.experience.forEach(exp => {
      if (!exp.description.match(/\d+%|\d+x|\$\d+/)) {
        score -= 0.1;
        issues.push(`Add metrics to ${exp.position} role`);
      }
    });

    return {
      score: Math.max(0, score),
      feedback: issues.length ? issues.join(". ") : "Content quality is good"
    };
  }

  private static analyzeKeywords(cvData: CVData): MetricScore {
    const skills = cvData.content.skills.technical.split(',').length;
    let score = skills >= 5 ? 1.0 : 0.8;

    return {
      score,
      feedback: skills < 5 ? "Add more technical skills" : "Good keyword coverage"
    };
  }

  private static checkFormatting(cvData: CVData): MetricScore {
    return {
      score: cvData.styling ? 1.0 : 0.7,
      feedback: cvData.styling ? "Good formatting" : "Consider customizing the styling"
    };
  }

  private static checkCompleteness(cvData: CVData): MetricScore {
    let score = 1.0;
    const missing: string[] = [];

    if (!cvData.content.personal.linkedin) {
      score -= 0.1;
      missing.push("LinkedIn profile");
    }
    if (!cvData.content.personal.portfolio) {
      score -= 0.1;
      missing.push("Portfolio link");
    }

    return {
      score: Math.max(0, score),
      feedback: missing.length ? `Consider adding: ${missing.join(", ")}` : "Profile is complete"
    };
  }

  private static generateSuggestions(metrics: Metrics): string[] {
    return Object.entries(metrics)
      .filter(([_, data]) => data.score < 0.8)
      .map(([_, data]) => data.feedback);
  }

  private static optimizeDescription(description: string): string {
    // Add action verbs if missing
    if (!description.match(/^(Led|Developed|Created|Implemented|Managed)/i)) {
      description = `Led ${description.toLowerCase()}`;
    }
    
    return description;
  }

  private static optimizeSkills(skills: { technical: string; soft: string; languages: string }): typeof skills {
    return {
      ...skills,
      technical: skills.technical.split(',')
        .map(skill => skill.trim())
        .filter(Boolean)
        .join(', '),
      soft: skills.soft.split(',')
        .map(skill => skill.trim())
        .filter(Boolean)
        .join(', ')
    };
  }

  private static analyzeExperienceDescription(experience: { position: string; description: string }): string[] {
    const suggestions: string[] = [];
    
    if (!experience.description.match(/\d+%|\d+x/)) {
      suggestions.push(`Add quantifiable achievements to "${experience.position}" role`);
    }
    
    if (!experience.description.match(/^(Led|Developed|Created|Implemented|Managed)/)) {
      suggestions.push(`Start "${experience.position}" descriptions with strong action verbs`);
    }
    
    return suggestions;
  }

  private static analyzeSkills(skills: { technical: string; soft: string }): string[] {
    const suggestions: string[] = [];
    
    const technicalSkills = skills.technical.split(',').filter(s => s.trim()).length;
    const softSkills = skills.soft.split(',').filter(s => s.trim()).length;
    
    if (technicalSkills < 5) {
      suggestions.push('Add more technical skills to strengthen your profile');
    }
    
    if (softSkills < 3) {
      suggestions.push('Include more soft skills to show well-roundedness');
    }
    
    return suggestions;
  }
}
