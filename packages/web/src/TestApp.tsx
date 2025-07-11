import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Test App is Working!
        </h1>
        <p className="text-lg text-gray-600">
          If you can see this, React is working correctly.
        </p>
      </div>
    </div>
  );
};

export default TestApp;
