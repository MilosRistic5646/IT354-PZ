import React from 'react';

const Section = ({ title, content, image, reverse }) => {
  return (
    <div className={`flex items-center ${reverse ? 'flex-row-reverse' : ''} py-12`}>
      <div className="w-1/2 px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-4">{content}</p>
      </div>
      <div className="w-1/2">
        <img src={image} alt={title} className="w-45 h-45 mr-4 rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default Section;
