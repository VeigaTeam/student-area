
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Download } from 'lucide-react';

interface LogsHeaderProps {
  onExport: () => void;
}

export const LogsHeader: React.FC<LogsHeaderProps> = ({ onExport }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <AlertCircle className="mr-3 h-6 w-6" />
          Logs do Sistema
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Monitore atividades e eventos do sistema
        </p>
      </div>
      
      <Button onClick={onExport} variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Exportar CSV
      </Button>
    </div>
  );
};
