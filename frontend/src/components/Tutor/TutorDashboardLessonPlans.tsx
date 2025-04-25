// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';

const TutorDashboardLessonPlans: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<string>('beginner');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          const mockLessons = generateMockLessons(activeLevel, activeFilter, searchQuery);
          setLessons(mockLessons);
          setTotalPages(Math.ceil(mockLessons.length / 8));
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLoading(false);
      }
    };

    fetchLessons();
  }, [activeLevel, activeFilter, searchQuery, currentPage]);

  const generateMockLessons = (level: string, filter: string, query: string) => {
    const types = ['pdf', 'video', 'link'];
    const mockData = [];
    
    const titles = [
      'Introduction to English Grammar',
      'Conversational Skills Practice',
      'Business English Fundamentals',
      'Academic Writing Techniques',
      'Pronunciation Workshop',
      'Vocabulary Building Strategies',
      'Reading Comprehension Skills',
      'Public Speaking Essentials',
      'English for Travel',
      'Idioms and Expressions Mastery',
      'TOEFL Preparation Guide',
      'English Literature Analysis'
    ];

    for (let i = 1; i <= 24; i++) {
      const type = types[i % 3];
      const title = titles[i % titles.length];
      const lessonLevel = i <= 8 ? 'beginner' : i <= 16 ? 'intermediate' : 'advanced';
      
      if (level !== lessonLevel) continue;
      if (filter !== 'all' && filter !== type) continue;
      if (query && !title.toLowerCase().includes(query.toLowerCase())) continue;

      mockData.push({
        id: i,
        title,
        description: `A comprehensive ${lessonLevel} level resource for improving ${type === 'pdf' ? 'reading and writing' : type === 'video' ? 'listening and speaking' : 'online learning'} skills.`,
        type,
        level: lessonLevel,
        createdAt: new Date(2025, 3, 23 - (i % 10)).toISOString(),
        downloadUrl: type === 'pdf' ? '/sample.pdf' : type === 'video' ? '/sample.mp4' : null,
        content: `Detailed content for ${title}. This is a comprehensive lesson plan that includes objectives, materials, procedures, and assessment methods.`,
        duration: '45 minutes',
        objectives: ['Understand key concepts', 'Practice skills', 'Complete exercises'],
        materials: ['Textbook', 'Worksheets', 'Audio/Video resources'],
      });
    }
    
    return mockData;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleView = (lesson: any) => {
    setSelectedLesson(lesson);
    setShowModal(true);
  };

  const handleDownload = (lesson: any) => {
    if (lesson.downloadUrl) {
      const link = document.createElement('a');
      link.href = lesson.downloadUrl;
      link.download = `${lesson.title}.${lesson.type}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleAssign = (lesson: any) => {
    // Implement assign functionality
    alert(`Assigning lesson: ${lesson.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-2">
        
        <div className="bg-white rounded-lg shadow-sm mb-8 pb-1 pl-2">
        <h1 className="text-xl pt-4 ml-4 sm:mb-0 font-bold text-gray-900">Lesson Plans</h1>
        <p className="text-gray-600 ml-4 ">Browse and manage your teaching materials</p>
          <div className="p-4">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border-none rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Search lesson plans by title or content..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm font-medium text-gray-700 mr-2">Filter by:</span>
              {['all', 'pdf', 'video', 'link'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-button whitespace-nowrap cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter === 'all' ? 'All Types' : (
                    <>
                      <i className={`fas fa-${filter === 'pdf' ? 'file-pdf' : filter === 'video' ? 'video' : 'link'} mr-2`}></i>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </>
                  )}
                </button>
              ))}
            </div>

            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {['beginner', 'intermediate', 'advanced'].map((level) => {
                  const count = generateMockLessons(level, 'all', '').length;
                  return (
                    <button
                      key={level}
                      onClick={() => {
                        setActiveLevel(level);
                        setCurrentPage(1);
                      }}
                      className={`whitespace-nowrap cursor-pointer pb-4 px-1 border-b-2 font-medium text-sm ${
                        activeLevel === level
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                      <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                        activeLevel === level ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : lessons.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {lessons.slice((currentPage - 1) * 8, currentPage * 8).map((lesson) => (
                <div key={lesson.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <div className={`h-40 overflow-hidden ${lesson.type === 'pdf' ? 'bg-red-100' : lesson.type === 'video' ? 'bg-blue-100' : 'bg-green-100'}`}>
                    {lesson.type === 'pdf' && (
                      <img 
                        src={`https://readdy.ai/api/search-image?query=Professional%20document%20with%20text%20and%20diagrams%2C%20red%20cover%20page%2C%20organized%20layout%2C%20educational%20content%2C%20clean%20background%2C%20minimalist%20design%2C%20high%20quality%20rendering&width=400&height=300&seq=${lesson.id}&orientation=landscape`}
                        alt="PDF Document Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                    {lesson.type === 'video' && (
                      <img 
                        src={`https://readdy.ai/api/search-image?query=Video%20tutorial%20screenshot%2C%20person%20teaching%20on%20camera%2C%20educational%20content%2C%20clean%20studio%20background%2C%20professional%20lighting%2C%20high%20quality%20rendering%2C%20blue%20theme&width=400&height=300&seq=${lesson.id + 100}&orientation=landscape`}
                        alt="Video Lesson Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                    {lesson.type === 'link' && (
                      <img 
                        src={`https://readdy.ai/api/search-image?query=Online%20learning%20platform%20interface%2C%20educational%20website%20screenshot%2C%20interactive%20elements%2C%20clean%20minimal%20design%2C%20green%20accents%2C%20digital%20classroom%20environment%2C%20high%20quality%20rendering&width=400&height=300&seq=${lesson.id + 200}&orientation=landscape`}
                        alt="Link Resource Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full mr-2 ${
                        lesson.type === 'pdf' ? 'text-red-800 bg-red-100' : 
                        lesson.type === 'video' ? 'text-blue-800 bg-blue-100' : 
                        'text-green-800 bg-green-100'
                      }`}>
                        <i className={`fas fa-${lesson.type === 'pdf' ? 'file-pdf' : lesson.type === 'video' ? 'video' : 'link'} mr-1`}></i>
                        {lesson.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{lesson.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lesson.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleView(lesson)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer whitespace-nowrap"
                        >
                          <i className="fas fa-eye mr-1"></i> View
                        </button>
                        {lesson.downloadUrl && (
                          <button 
                            onClick={() => handleDownload(lesson)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer whitespace-nowrap"
                          >
                            <i className="fas fa-download mr-1"></i> Download
                          </button>
                        )}
                      </div>
                      {/* <button 
                        onClick={() => handleAssign(lesson)}
                        className="text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2 py-1 rounded-button whitespace-nowrap cursor-pointer"
                      >
                        <i className="fas fa-plus mr-1"></i> Assign
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap cursor-pointer ${
                        currentPage === index + 1
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <i className="fas fa-search text-5xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No lessons found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No results matching "${searchQuery}". Try a different search term.` 
                : `No ${activeLevel} level ${activeFilter !== 'all' ? activeFilter : ''} lessons available.`}
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-button text-indigo-700 bg-indigo-100 hover:bg-indigo-200 whitespace-nowrap cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Lesson Details Modal */}
      {showModal && selectedLesson && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {selectedLesson.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">{selectedLesson.description}</p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Duration</h4>
                          <p className="text-sm text-gray-600">{selectedLesson.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Objectives</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {selectedLesson.objectives.map((objective: string, index: number) => (
                              <li key={index}>{objective}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Materials</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {selectedLesson.materials.map((material: string, index: number) => (
                              <li key={index}>{material}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Content</h4>
                          <p className="text-sm text-gray-600">{selectedLesson.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-button border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDashboardLessonPlans;

