
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Plan } from '@/types';

interface PlanCardProps {
  plan: Plan;
  currentPlan?: boolean;
  onSelect?: (plan: Plan) => void;
  isAdmin?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  currentPlan = false,
  onSelect,
  isAdmin = false,
}) => {
  return (
    <Card className={`relative ${currentPlan ? 'ring-2 ring-emerald-500' : ''} ${plan.popular ? 'border-emerald-200' : ''}`}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-fitness text-white">
          Mais Popular
        </Badge>
      )}
      {currentPlan && (
        <Badge className="absolute -top-3 right-4 bg-emerald-500 text-white">
          Seu Plano
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">R$ {plan.monthlyPrice}</span>
          <span className="text-gray-500">/mês</span>
        </div>
        <div className="text-sm text-gray-600">
          {plan.weeklyClasses} aulas por semana
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Modalidades incluídas:</h4>
          <div className="flex flex-wrap gap-1">
            {plan.modalities.map((modality) => (
              <Badge key={modality} variant="secondary" className="text-xs">
                {modality}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Benefícios:</h4>
          <ul className="space-y-1">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <Check className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {!isAdmin && onSelect && (
          <Button
            onClick={() => onSelect(plan)}
            disabled={currentPlan}
            className={currentPlan ? 'opacity-50' : 'bg-gradient-fitness hover:bg-emerald-600'}
            size="sm"
          >
            {currentPlan ? 'Plano Atual' : 'Selecionar Plano'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
