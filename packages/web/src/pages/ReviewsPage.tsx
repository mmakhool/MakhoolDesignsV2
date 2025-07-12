const ReviewsPage: React.FC = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      company: "Tech Solutions Inc.",
      rating: 5,
      review: "MakhoolDesigns transformed our online presence completely. The new website is not only beautiful but also incredibly functional. Our conversion rate has increased by 40% since the launch!",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      company: "Chen's Restaurant",
      rating: 5,
      review: "Working with MakhoolDesigns was a fantastic experience. They understood our vision perfectly and delivered beyond our expectations. The online ordering system has been a game-changer for our business.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      company: "Rodriguez Law Firm",
      rating: 5,
      review: "Professional, responsive, and highly skilled. MakhoolDesigns created a website that perfectly represents our law firm's professionalism and expertise. We've received numerous compliments from clients.",
      avatar: "ER"
    },
    {
      name: "David Thompson",
      company: "Thompson Consulting",
      rating: 5,
      review: "The team at MakhoolDesigns is incredible. They took our outdated website and turned it into a modern, SEO-optimized platform that has significantly improved our online visibility.",
      avatar: "DT"
    },
    {
      name: "Lisa Wang",
      company: "Creative Studio",
      rating: 5,
      review: "As a creative professional, I have high standards for design. MakhoolDesigns exceeded all my expectations with their attention to detail and innovative approach to web design.",
      avatar: "LW"
    },
    {
      name: "James Mitchell",
      company: "Mitchell Manufacturing",
      rating: 5,
      review: "The e-commerce platform they built for us is robust and user-friendly. Our online sales have tripled since the new website went live. Highly recommend their services!",
      avatar: "JM"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Client Reviews
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what our satisfied clients have to say about working with MakhoolDesigns.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {review.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {review.company}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{review.review}"
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Join Our Happy Clients?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Let us help you create an amazing web presence that drives results for your business.
          </p>
          <div className="space-x-4">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started Today
            </a>
            <a
              href="/projects"
              className="inline-flex items-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-transparent hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
