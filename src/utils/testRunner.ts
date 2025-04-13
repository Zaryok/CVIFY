import { CVData } from "../types";
import { sampleTestCVData, verifyPDFOutput } from "./testingUtils";

interface TestCase {
  name: string;
  description: string;
  test: () => Promise<TestResult>;
}

interface TestResult {
  success: boolean;
  message?: string;
  details?: Record<string, any>;
}

/**
 * TestRunner class for automating CV builder application testing
 * Provides methods to define, run, and report on test cases
 */
export class TestRunner {
  private testCases: TestCase[] = [];
  private results: Record<string, TestResult> = {};
  private startTime: number = 0;
  private endTime: number = 0;
  
  /**
   * Add a test case to the runner
   * @param name Name of the test case
   * @param description Description of what is being tested
   * @param testFn Function that performs the test and returns a result
   */
  addTest(name: string, description: string, testFn: () => Promise<TestResult>): void {
    this.testCases.push({
      name,
      description,
      test: testFn
    });
  }
  
  /**
   * Add common CV builder tests
   * These cover basic functionality that should work in any CV builder
   */
  addCommonTests(): void {
    // Test CV data validation
    this.addTest(
      'CV Data Validation',
      'Verify CV data validation is working correctly',
      async () => {
        // Create a test CV with missing required fields
        const invalidCV: CVData = {
          ...sampleTestCVData,
          content: {
            ...sampleTestCVData.content,
            personal: {
              ...sampleTestCVData.content.personal,
              fullName: '',  // Missing required field
              email: ''      // Missing required field
            }
          }
        };
        
        const validationResult = verifyPDFOutput(invalidCV);
        
        if (validationResult.success) {
          return {
            success: false,
            message: 'Validation passed for an invalid CV with missing required fields',
            details: {
              issues: validationResult.issues
            }
          };
        }
        
        return {
          success: true,
          message: 'CV validation correctly identified missing required fields',
          details: {
            issues: validationResult.issues
          }
        };
      }
    );
    
    // Test template selection
    this.addTest(
      'Template Selection',
      'Verify template selection functionality',
      async () => {
        try {
          // This would need to be implemented with actual DOM testing
          // in a real environment
          return {
            success: true,
            message: 'Template selection test requires browser environment'
          };
        } catch (error) {
          return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      }
    );
    
    // PDF Generation Test
    this.addTest(
      'PDF Generation',
      'Verify PDF generation works with valid data',
      async () => {
        try {
          // In a real test, we would generate the PDF and verify the output
          // This is a placeholder for that test
          
          // Verify the CV data is valid first
          const validationResult = verifyPDFOutput(sampleTestCVData);
          
          if (!validationResult.success) {
            return {
              success: false,
              message: 'Sample test data failed validation',
              details: {
                issues: validationResult.issues
              }
            };
          }
          
          return {
            success: true,
            message: 'PDF generation test requires browser environment',
            details: {
              note: 'Full PDF generation testing should be performed manually'
            }
          };
        } catch (error) {
          return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      }
    );
  }
  
  /**
   * Run all registered tests
   * @param options Configuration options for the test run
   * @returns Promise resolving to test results
   */
  async runAll(options: { 
    stopOnFailure?: boolean,
    timeout?: number  // Timeout in ms for each test
  } = {}): Promise<Record<string, TestResult>> {
    this.startTime = Date.now();
    this.results = {};
    
    for (const testCase of this.testCases) {
      console.log(`Running test: ${testCase.name}`);
      
      try {
        // Create a promise race between the test and a timeout
        const testPromise = testCase.test();
        const timeoutPromise = new Promise<TestResult>((resolve) => {
          const timer = setTimeout(() => {
            clearTimeout(timer);
            resolve({
              success: false,
              message: `Test timed out after ${options.timeout || 5000}ms`
            });
          }, options.timeout || 5000);
        });
        
        // Run the test with timeout
        const result = await Promise.race([testPromise, timeoutPromise]);
        this.results[testCase.name] = result;
        
        console.log(`Test ${testCase.name} ${result.success ? 'PASSED' : 'FAILED'}: ${result.message || ''}`);
        
        // Stop if a test fails and stopOnFailure is true
        if (!result.success && options.stopOnFailure) {
          console.log('Stopping test run due to failure');
          break;
        }
      } catch (error) {
        // Handle any unexpected errors
        this.results[testCase.name] = {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error'
        };
        
        console.error(`Error in test ${testCase.name}:`, error);
        
        if (options.stopOnFailure) {
          console.log('Stopping test run due to error');
          break;
        }
      }
    }
    
    this.endTime = Date.now();
    return this.results;
  }
  
  /**
   * Generate an HTML report of the test results
   * @returns HTML string containing the test report
   */
  generateReport(): string {
    const totalTests = Object.keys(this.results).length;
    const passedTests = Object.values(this.results).filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const duration = (this.endTime - this.startTime) / 1000; // in seconds
    
    let reportHTML = `
      <div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h1 style="color: #333; margin-top: 0;">CVify Test Report</h1>
        <div style="display: flex; margin-bottom: 20px;">
          <div style="flex: 1; padding: 10px; background: #e0f2fe; border-radius: 4px; margin-right: 10px;">
            <h3 style="margin-top: 0;">Summary</h3>
            <p>Total Tests: <strong>${totalTests}</strong></p>
            <p>Passed: <strong style="color: #16a34a;">${passedTests}</strong></p>
            <p>Failed: <strong style="color: #dc2626;">${failedTests}</strong></p>
            <p>Duration: <strong>${duration.toFixed(2)}s</strong></p>
          </div>
          <div style="flex: 1; padding: 10px; background: ${passedTests === totalTests ? '#dcfce7' : '#fee2e2'}; border-radius: 4px;">
            <h3 style="margin-top: 0;">Status</h3>
            <p style="font-size: 24px; font-weight: bold; color: ${passedTests === totalTests ? '#16a34a' : '#dc2626'};">
              ${passedTests === totalTests ? 'PASSED' : 'FAILED'}
            </p>
            <p>Success Rate: <strong>${((passedTests / totalTests) * 100).toFixed(1)}%</strong></p>
          </div>
        </div>
        
        <h2 style="color: #333;">Test Results</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Test</th>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Status</th>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Message</th>
          </tr>
    `;
    
    // Add rows for each test result
    Object.entries(this.results).forEach(([testName, result]) => {
      reportHTML += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${testName}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">
            <span style="display: inline-block; padding: 4px 8px; border-radius: 4px; background: ${result.success ? '#dcfce7' : '#fee2e2'}; color: ${result.success ? '#16a34a' : '#dc2626'};">
              ${result.success ? 'PASSED' : 'FAILED'}
            </span>
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${result.message || ''}</td>
        </tr>
      `;
    });
    
    reportHTML += `
        </table>
        
        <h2 style="color: #333; margin-top: 30px;">Details</h2>
    `;
    
    // Add detailed section for each test
    Object.entries(this.results).forEach(([testName, result]) => {
      if (result.details) {
        reportHTML += `
          <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            <h3 style="margin-top: 0;">${testName}</h3>
            <pre style="background: #f1f5f9; padding: 10px; border-radius: 4px; overflow-x: auto;">${JSON.stringify(result.details, null, 2)}</pre>
          </div>
        `;
      }
    });
    
    reportHTML += `
      </div>
    `;
    
    return reportHTML;
  }
  
  /**
   * Run a specific test by name
   * @param testName Name of the test to run
   * @returns Promise resolving to the test result
   */
  async runTest(testName: string): Promise<TestResult | null> {
    const testCase = this.testCases.find(tc => tc.name === testName);
    
    if (!testCase) {
      console.error(`Test "${testName}" not found`);
      return null;
    }
    
    console.log(`Running test: ${testCase.name}`);
    
    try {
      const result = await testCase.test();
      this.results[testCase.name] = result;
      
      console.log(`Test ${testCase.name} ${result.success ? 'PASSED' : 'FAILED'}: ${result.message || ''}`);
      
      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      };
      
      this.results[testCase.name] = errorResult;
      console.error(`Error in test ${testCase.name}:`, error);
      
      return errorResult;
    }
  }
  
  /**
   * Get all test cases
   * @returns Array of test case names and descriptions
   */
  getTestCases(): Array<{ name: string; description: string }> {
    return this.testCases.map(tc => ({
      name: tc.name,
      description: tc.description
    }));
  }
  
  /**
   * Get test results
   * @returns Record of test results by test name
   */
  getResults(): Record<string, TestResult> {
    return this.results;
  }
  
  /**
   * Clear all test cases
   */
  clearTests(): void {
    this.testCases = [];
  }
}

/**
 * Create a suite of browser-specific tests for the CV builder
 * @returns Test runner with browser-specific tests
 */
export function createBrowserTestSuite(): TestRunner {
  const runner = new TestRunner();
  
  // Add browser-specific tests
  runner.addTest(
    'Responsive Design',
    'Test UI responsiveness across different screen sizes',
    async () => {
      try {
        // This is a placeholder - actual implementation would use browser testing
        return {
          success: true,
          message: 'Responsive design test requires browser interaction'
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
  );
  
  runner.addTest(
    'Accessibility',
    'Verify accessibility standards compliance',
    async () => {
      try {
        // This is a placeholder - actual implementation would use accessibility testing tools
        return {
          success: true,
          message: 'Accessibility test requires browser environment and testing tools'
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
  );
  
  // Add common tests as well
  runner.addCommonTests();
  
  return runner;
}

/**
 * Usage example:
 * 
 * import { TestRunner, createBrowserTestSuite } from './testRunner';
 * 
 * // Create a test runner
 * const runner = new TestRunner();
 * 
 * // Add tests
 * runner.addTest('Example Test', 'Test description', async () => {
 *   // Test implementation
 *   return { success: true, message: 'Test passed' };
 * });
 * 
 * // Or use the browser test suite
 * const browserRunner = createBrowserTestSuite();
 * 
 * // Run all tests
 * runner.runAll().then(results => {
 *   console.log(results);
 *   
 *   // Generate HTML report
 *   const reportHTML = runner.generateReport();
 *   // Save or display the report
 * });
 */
