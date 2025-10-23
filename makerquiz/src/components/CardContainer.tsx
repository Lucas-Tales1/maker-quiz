import React from 'react';

interface CardContainerProps {
  title?: string;
  children: React.ReactNode;
}

export const CardContainer: React.FC<CardContainerProps> = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    {title && (
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">{title}</h2>
    )}
    {children}
  </div>
);
