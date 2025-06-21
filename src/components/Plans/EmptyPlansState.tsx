
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

interface EmptyPlansStateProps {
  onCreatePlan: () => void;
}

export const EmptyPlansState: React.FC<EmptyPlansStateProps> = ({ onCreatePlan }) => {
  return (
    <Card>
      <CardContent className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Nenhum plano criado ainda</p>
        <p className="text-sm text-gray-400 mb-4">Comece criando seu primeiro plano</p>
        <Button onClick={onCreatePlan} className="bg-red-600 hover:bg-red-700">
          <Plus className="mr-2 h-4 w-4" />
          Criar Primeiro Plano
        </Button>
      </CardContent>
    </Card>
  );
};
