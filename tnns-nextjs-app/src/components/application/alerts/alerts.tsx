import React from 'react';

interface AlertFullWidthProps {
  color: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export const AlertFullWidth: React.FC<AlertFullWidthProps> = ({
  color,
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose
}) => {
  const colorClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const buttonClasses = {
    success: 'bg-green-600 hover:bg-green-700 text-white',
    error: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    info: 'bg-blue-600 hover:bg-blue-700 text-white'
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          {description && (
            <div className="mt-1 text-sm">
              {description}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {confirmLabel && onConfirm && (
            <button
              onClick={onConfirm}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${buttonClasses[color]}`}
            >
              {confirmLabel}
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 