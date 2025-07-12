const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About MakhoolDesigns
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              A family-owned business dedicated to creating exceptional web experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                MakhoolDesigns was founded with a simple mission: to help businesses 
                succeed online through beautiful, functional web design and development.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                As a family-owned business, we understand the importance of personal 
                relationships and quality work. We treat every project as if it were 
                our own, ensuring attention to detail and care in every aspect.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Our team combines years of experience with the latest technologies 
                to deliver websites that not only look great but perform exceptionally.
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What We Do
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom Web Design
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Web Development
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  E-commerce Solutions
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SEO Optimization
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Maintenance & Support
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Quality First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We never compromise on quality, ensuring every project meets the highest standards.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Personal Touch
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  As a family business, we provide personalized service and build lasting relationships.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We stay current with the latest technologies and trends to deliver modern solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
