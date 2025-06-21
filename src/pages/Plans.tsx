
import React from 'react';
import { Button } from '@/components/ui/button';
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

  // Convert mock plan to match expected interface for PlanCard
  const convertPlanForCard = (plan: Plan) => {
    return {
      id: plan.id,
      name: plan.name,
      description: plan.description || '',
      monthly_price: plan.monthlyPrice,
      weekly_classes: plan.weeklyClasses,
      modalities: plan.modalities,
      features: plan.features,
      popular: plan.popular || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
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
          isAdmin ? (
            <PlanCard
              key={plan.id}
              plan={convertPlanForCard(plan)}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ) : (
            <div key={plan.id} className="bg-white rounded-lg shadow-md p-6 border">
              {plan.popular && (
                <div className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                  Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-red-600">
                  R$ {plan.monthlyPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">por mês</p>
              </div>
              <div className="mb-4">
                <p className="font-medium mb-2">Modalidades:</p>
                <div className="flex flex-wrap gap-1">
                  {plan.modalities.map((modality, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {modality}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="font-medium mb-2">Benefícios:</p>
                <ul className="text-sm space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t mb-4">
                <p className="text-sm text-gray-600">
                  {plan.weeklyClasses} aulas por semana
                </p>
              </div>
              <Button 
                onClick={() => handleSelectPlan(plan)}
                className="w-full bg-gradient-fitness hover:bg-emerald-600"
                disabled={plan.id === '2'} // Mock: user has Premium plan
              >
                {plan.id === '2' ? 'Plano Atual' : 'Selecionar Plano'}
              </Button>
            </div>
          )
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
