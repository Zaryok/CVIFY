import { CVData } from '../types';

const STORAGE_KEY = 'cvify_resumes';

/**
 * Verifies that localStorage is working properly
 * @returns True if localStorage is available and working, false otherwise
 */
export function verifyLocalStorage(): boolean {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      console.error('localStorage is not available in this browser environment');
      return false;
    }
    
    // Test writing and reading from localStorage
    const testKey = '_cvify_storage_test';
    localStorage.setItem(testKey, 'test');
    const testValue = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    
    if (testValue !== 'test') {
      console.error('localStorage test failed: could not read test value');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('localStorage test failed with error:', error);
    return false;
  }
}

/**
 * Saves a resume to localStorage
 * @param resume The resume data to save
 * @returns The ID of the saved resume
 */
export function saveResume(resume: CVData): string {
  try {
    if (typeof window === 'undefined') return '';
    
    const existingResumes = getResumes();
    
    // If this resume already exists, update it
    if (resume.id) {
      const updatedResumes = existingResumes.map((r) => 
        r.id === resume.id ? { ...resume, updated_at: new Date().toISOString() } : r
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResumes));
      return resume.id;
    }
    
    // Create a new resume
    const newResume = {
      ...resume,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingResumes, newResume]));
    return newResume.id;
  } catch (error) {
    console.error('Error saving resume to localStorage:', error);
    return '';
  }
}

/**
 * Gets all resumes from localStorage
 * @returns Array of all resumes
 */
export function getResumes(): CVData[] {
  try {
    if (typeof window === 'undefined') return [];
    
    const resumes = localStorage.getItem(STORAGE_KEY);
    return resumes ? JSON.parse(resumes) : [];
  } catch (error) {
    console.error('Error retrieving resumes from localStorage:', error);
    return [];
  }
}

/**
 * Gets a specific resume by ID
 * @param id The ID of the resume to get
 * @returns The resume with the specified ID, or undefined if not found
 */
export function getResumeById(id: string): CVData | undefined {
  try {
    const resumes = getResumes();
    return resumes.find((resume) => resume.id === id);
  } catch (error) {
    console.error('Error retrieving resume by ID from localStorage:', error);
    return undefined;
  }
}

/**
 * Deletes a resume by ID
 * @param id The ID of the resume to delete
 */
export function deleteResumeById(id: string): void {
  try {
    if (typeof window === 'undefined') return;
    
    const resumes = getResumes();
    const updatedResumes = resumes.filter((resume) => resume.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResumes));
  } catch (error) {
    console.error('Error deleting resume from localStorage:', error);
  }
}

/**
 * Generates a random ID for a new resume
 * @returns A random string ID
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
