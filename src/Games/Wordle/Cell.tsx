import React from 'react';

interface CellProps {
  char: string;
  status: string;
}

const Cell: React.FC<CellProps> = ({ char, status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct':
        return 'bg-green-500';
      case 'present':
        return 'bg-yellow-500';
      case 'absent':
        return 'bg-gray-300';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`w-16 h-16 flex items-center justify-center border ${getStatusColor(status)}`}>
      <span className="text-2xl font-bold">{char}</span>
    </div>
  );
};

export default Cell;
