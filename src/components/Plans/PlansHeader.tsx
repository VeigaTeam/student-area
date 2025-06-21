
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

interface PlansHeaderProps {
  onCreatePlan: () => void;
}

export const PlansHeader: React.FC<PlansHeaderProps> = ({ onCreatePlan }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileText className="mr-3 h-6 w-6" />
          Gerenciar Planos
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Crie e gerencie os planos da academia
        </p>
      </div>
      
      <Button onClick={onCreatePlan} className="bg-red-600 hover:bg-red-700">
        <Plus className="mr-2 h-4 w-4" />
        Novo Plano
      </Button>
    </div>
  );
};
