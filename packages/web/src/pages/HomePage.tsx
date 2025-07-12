import React from 'react';
import { Link } from 'react-router-dom';

// Temporary constants until shared package import is fixed
const APP_NAME = 'MakhoolDesigns';

const HomePage: React.FC = () => (
  <main className="relative">
    {/* Hero Section */}
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.blue.500/0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.purple.500/0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,theme(colors.pink.500/0.1),transparent_50%)]"></div>
        
        {/* More Visible Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-pulse"></div>
        
        {/* Animated Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse delay-1000"></div>
      </div>
      
      {/* Enhanced Floating Elements - More Visible */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        
        {/* Additional Large Animated Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-glow"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full animate-glow delay-1000"></div>
      </div>

      {/* Floating Geometric Shapes - Simplified and More Visible */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large Circles */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full border-2 border-blue-300/40 animate-float"></div>
        <div className="absolute top-40 right-32 w-20 h-20 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full border-2 border-purple-300/40 animate-float-delay-1"></div>
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full border-2 border-pink-300/40 animate-float-delay-2"></div>
        
        {/* Squares */}
        <div className="absolute top-60 left-16 w-14 h-14 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 border-2 border-cyan-300/40 transform rotate-45 animate-float-delay-3"></div>
        <div className="absolute bottom-20 right-20 w-10 h-10 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 border-2 border-indigo-300/40 transform rotate-12 animate-float"></div>
        
        {/* Triangles */}
        <div className="absolute top-32 right-16 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-blue-400/40 animate-float-delay-1"></div>
        <div className="absolute bottom-40 left-20 w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-purple-400/40 animate-float-delay-2"></div>
        
        {/* Hexagons as larger circles for now */}
        <div className="absolute top-80 left-40 w-8 h-8 bg-gradient-to-br from-pink-400/30 to-orange-400/30 border-2 border-pink-300/40 transform rotate-45 animate-float-delay-3"></div>
        <div className="absolute bottom-60 right-40 w-12 h-12 bg-gradient-to-br from-indigo-400/30 to-blue-400/30 border-2 border-indigo-300/40 transform rotate-12 animate-float"></div>
      </div>

      {/* Enhanced Particle Effect - More Visible */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400/60 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-pink-400/60 rounded-full animate-ping delay-1400"></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-cyan-400/60 rounded-full animate-ping delay-2100"></div>
        <div className="absolute bottom-1/2 right-1/6 w-3 h-3 bg-indigo-400/60 rounded-full animate-ping delay-2800"></div>
        <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-orange-400/60 rounded-full animate-ping delay-3500"></div>
      </div>

      {/* Code-like Background Elements - More Visible */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 text-sm font-mono text-blue-500/40 transform -rotate-12 bg-white/10 dark:bg-gray-800/10 px-2 py-1 rounded">
          &lt;div className="hero"&gt;
        </div>
        <div className="absolute top-40 right-16 text-sm font-mono text-purple-500/40 transform rotate-12 bg-white/10 dark:bg-gray-800/10 px-2 py-1 rounded">
          function welcome() {'{'}
        </div>
        <div className="absolute bottom-32 left-16 text-sm font-mono text-pink-500/40 transform rotate-6 bg-white/10 dark:bg-gray-800/10 px-2 py-1 rounded">
          return &lt;Amazing /&gt;
        </div>
        <div className="absolute bottom-20 right-20 text-sm font-mono text-cyan-500/40 transform -rotate-6 bg-white/10 dark:bg-gray-800/10 px-2 py-1 rounded">
          {'}'} // modern web
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-slide-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-gray-900 dark:text-white">Welcome to</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              {APP_NAME}
            </span>
          </h1>
          
          <p className="mt-8 text-xl sm:text-2xl leading-8 text-gray-700 dark:text-gray-300 max-w-4xl mx-auto font-light">
            Professional web development and design services for modern businesses. 
            We create <span className="font-semibold text-blue-600 dark:text-blue-400">beautiful</span>, 
            <span className="font-semibold text-purple-600 dark:text-purple-400"> functional</span> websites that drive results.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Our Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/contact"
              className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center gap-2"
            >
              Get in Touch
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section className="py-24 bg-white dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What We Do Best
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We combine cutting-edge technology with creative design to deliver exceptional digital experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Web Development Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm5 3a1 1 0 000 2h4a1 1 0 100-2H8z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Web Development</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Modern, responsive websites built with the latest technologies including React, TypeScript, and cutting-edge frameworks
              </p>
            </div>
          </div>

          {/* Design Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">UI/UX Design</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Beautiful, user-friendly designs that convert visitors to customers with intuitive interfaces and engaging experiences
              </p>
            </div>
          </div>

          {/* Performance Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Performance</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Fast, optimized websites that rank well in search engines and provide lightning-fast user experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-blue-100">Projects Completed</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">99%</div>
            <div className="text-blue-100">Client Satisfaction</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">5+</div>
            <div className="text-blue-100">Years Experience</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Support</div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to Transform Your Digital Presence?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Let's work together to create something amazing. Get in touch and let's discuss your next project.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 gap-2"
        >
          Start Your Project
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>
      </div>
    </section>

    {/* Technologies Section */}
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technologies We Love
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We stay ahead of the curve with the latest and greatest development tools and frameworks
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            { name: 'React', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
            { name: 'TypeScript', icon: '🔷', color: 'from-blue-600 to-blue-700' },
            { name: 'Next.js', icon: '▲', color: 'from-gray-800 to-gray-900' },
            { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-green-600' },
            { name: 'TailwindCSS', icon: '🎨', color: 'from-teal-400 to-cyan-500' },
            { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-700 to-indigo-700' },
          ].map((tech) => (
            <div key={tech.name} className="group flex flex-col items-center">
              <div className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                {tech.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tech.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process Section */}
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From concept to launch, we follow a proven process that ensures your project's success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Discovery', description: 'We dive deep into your business goals and requirements', icon: '🔍' },
            { step: '02', title: 'Design', description: 'Creating beautiful, user-centered designs that convert', icon: '🎨' },
            { step: '03', title: 'Development', description: 'Building with clean, scalable code and best practices', icon: '⚡' },
            { step: '04', title: 'Launch', description: 'Deploying your project and providing ongoing support', icon: '🚀' },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl transform rotate-3"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl w-full h-full flex items-center justify-center text-2xl shadow-lg">
                    {item.icon}
                  </div>
                </div>
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
              </div>
              {index < 3 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Preview Section */}
    <section className="py-24 bg-white dark:bg-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.blue.500/0.05),transparent_70%)]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Johnson',
              role: 'CEO, TechStart',
              content: 'MakhoolDesigns transformed our outdated website into a modern, conversion-focused platform. Our leads increased by 300%!',
              avatar: '👩‍💼',
              rating: 5
            },
            {
              name: 'Michael Chen',
              role: 'Founder, EcoSolutions',
              content: 'The team delivered beyond our expectations. The website is fast, beautiful, and perfectly represents our brand.',
              avatar: '👨‍💻',
              rating: 5
            },
            {
              name: 'Emily Rodriguez',
              role: 'Marketing Director, GrowthCo',
              content: 'Professional, responsive, and incredibly skilled. They turned our vision into reality with stunning results.',
              avatar: '👩‍💼',
              rating: 5
            }
          ].map((testimonial, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/reviews"
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 gap-2"
          >
            View All Reviews
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default HomePage;
