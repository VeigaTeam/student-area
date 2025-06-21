
import React from 'react';
import { Button } from '@/components/ui/button';

interface LogsPaginationProps {
  page: number;
  setPage: (page: number) => void;
  hasMoreLogs: boolean;
}

export const LogsPagination: React.FC<LogsPaginationProps> = ({
  page,
  setPage,
  hasMoreLogs
}) => {
  return (
    <div className="flex justify-between items-center pt-4">
      <Button
        variant="outline"
        onClick={() => setPage(Math.max(0, page - 1))}
        disabled={page === 0}
      >
        Anterior
      </Button>
      
      <span className="text-sm text-gray-600">
        Página {page + 1}
      </span>
      
      <Button
        variant="outline"
        onClick={() => setPage(page + 1)}
        disabled={!hasMoreLogs}
      >
        Próxima
      </Button>
    </div>
  );
};
