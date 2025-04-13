import React, { useState } from 'react';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Search, Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';

// Mock job listings
const mockJobs = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'We are looking for an experienced Frontend Developer with expertise in React, TypeScript, and modern web technologies to join our product team.'
  },
  {
    id: 'job-2',
    title: 'UX/UI Designer',
    company: 'Design Studio',
    location: 'Remote',
    salary: '$90,000 - $110,000',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'Creative design studio seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients in the fintech space.'
  },
  {
    id: 'job-3',
    title: 'Product Manager',
    company: 'GrowthStart',
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Fast-growing startup looking for a product manager to lead our core product development. Experience in SaaS products preferred.'
  },
  {
    id: 'job-4',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Boston, MA',
    salary: '$115,000 - $145,000',
    type: 'Full-time',
    posted: '1 day ago',
    description: 'Join our data science team to develop machine learning models that help businesses make better decisions with their data.'
  },
  {
    id: 'job-5',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'Austin, TX',
    salary: '$125,000 - $155,000',
    type: 'Full-time',
    posted: '4 days ago',
    description: 'We need a skilled DevOps engineer to optimize our cloud infrastructure, implement CI/CD pipelines, and improve system reliability.'
  },
];

export function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm) {
      setFilteredJobs(mockJobs);
      return;
    }
    
    const filtered = mockJobs.filter(
      job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredJobs(filtered);
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Search</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Find job opportunities that match your resume and skills
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for jobs, companies, or keywords"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
        
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Remote Only
          </button>
          <button className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Full-time
          </button>
          <button className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Part-time
          </button>
          <button className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Contract
          </button>
          <button className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Entry Level
          </button>
          <button className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Mid Level
          </button>
          <button className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Senior Level
          </button>
        </div>
        
        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{job.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase size={14} />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
                    
                    <div className="mt-4 text-sm font-medium">
                      <span className="text-green-600 dark:text-green-400">{job.salary}</span>
                    </div>
                  </div>
                  
                  <a
                    href="#"
                    className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
                  >
                    <ExternalLink size={14} />
                    <span>Apply</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <Briefcase size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your search terms or filters to find more opportunities
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
