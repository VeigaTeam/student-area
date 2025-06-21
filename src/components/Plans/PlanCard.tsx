
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Star } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Plan = Tables<'plans'>;

interface PlanCardProps {
  plan: Plan;
  onEdit: (plan: Plan) => void;
  onDelete: (id: string) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit, onDelete }) => {
  return (
    <Card className="relative">
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-red-600 text-white">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {plan.name}
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(plan)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(plan.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">
              R$ {plan.monthly_price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">por mês</p>
          </div>
          
          <div>
            <p className="font-medium mb-2">Modalidades:</p>
            <div className="flex flex-wrap gap-1">
              {plan.modalities.map((modality, index) => (
                <Badge key={index} variant="secondary">
                  {modality}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
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
          
          <div className="pt-2 border-t">
            <p className="text-sm text-gray-600">
              {plan.weekly_classes} aulas por semana
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
