
import React from 'react';
import { PlanCard } from '@/components/Plans/PlanCard';
import { mockPlans } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Plan } from '@/types';
import { toast } from '@/hooks/use-toast';

const Plans: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const handleSelectPlan = (plan: Plan) => {
    toast({
      title: "Plano selecionado",
      description: `Redirecionando para contratação do plano ${plan.name}...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Gerenciar Planos' : 'Escolha seu Plano'}
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          {isAdmin 
            ? 'Configure os planos disponíveis para os alunos'
            : 'Encontre o plano perfeito para seus objetivos'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {mockPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlan={!isAdmin && plan.id === '2'} // Mock: user has Premium plan
            onSelect={!isAdmin ? handleSelectPlan : undefined}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      {!isAdmin && (
        <div className="text-center mt-8 p-6 bg-emerald-50 rounded-lg">
          <h3 className="text-lg font-semibold text-emerald-800">
            Precisa de ajuda para escolher?
          </h3>
          <p className="mt-2 text-emerald-600">
            Nossa equipe está pronta para te ajudar a encontrar o plano ideal para seus objetivos.
          </p>
          <Button className="mt-4 bg-gradient-fitness hover:bg-emerald-600">
            Falar com um Consultor
          </Button>
        </div>
      )}
    </div>
  );
};

export default Plans;
