const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our portfolio of successful web projects and see what we can create for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                E-commerce Platform
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A fully-featured online store with custom payment integration and inventory management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  React
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                  MongoDB
                </span>
              </div>
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Corporate Website
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Professional corporate website with content management system and SEO optimization.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm rounded-full">
                  CMS
                </span>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm rounded-full">
                  SEO
                </span>
              </div>
            </div>
          </div>
          
          {/* Project 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Portfolio Website
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Creative portfolio website with interactive animations and responsive design.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  Vue.js
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                  CSS3
                </span>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm rounded-full">
                  Animations
                </span>
              </div>
            </div>
          </div>
          
          {/* Project 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-red-400 to-orange-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Restaurant Website
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Modern restaurant website with online ordering system and reservation management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  React
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                  Express
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                  PostgreSQL
                </span>
              </div>
            </div>
          </div>
          
          {/* Project 5 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-yellow-400 to-red-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Blog Platform
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Custom blog platform with user management, commenting system, and admin dashboard.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  Django
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                  Python
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                  MySQL
                </span>
              </div>
            </div>
          </div>
          
          {/* Project 6 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                SaaS Application
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Complex SaaS application with multi-tenant architecture and subscription management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  React
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm rounded-full">
                  Redis
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in working with us on your next project?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
