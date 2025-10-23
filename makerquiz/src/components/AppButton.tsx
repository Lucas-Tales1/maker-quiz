import React from 'react';
import { Button } from 'primereact/button';

interface AppButtonProps {
  label: string;
  icon?: string;
  color?: 'primary' | 'success' | 'danger' | 'gray';
  onClick?: () => void;
}

export const AppButton: React.FC<AppButtonProps> = ({ label, icon, color = 'primary', onClick }) => {
  const base = '!rounded-full !px-4 !py-2 !border-none font-medium transition-all duration-200';

  const variants: Record<string, string> = {
    primary: '!bg-blue-600 hover:!bg-blue-700 !text-white',
    success: '!bg-emerald-500 hover:!bg-emerald-600 !text-white',
    danger: '!bg-red-500 hover:!bg-red-600 !text-white',
    gray: '!bg-gray-200 hover:!bg-gray-300 !text-gray-800',
  };

  return <Button label={label} icon={icon} onClick={onClick} className={`${base} ${variants[color]}`} />;
};
