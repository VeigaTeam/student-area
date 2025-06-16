
import { useMemo } from 'react';
import { mockStudents, mockClasses } from '@/data/mockData';

export const useDashboardData = () => {
  const dashboardData = useMemo(() => {
    const activeStudents = mockStudents.filter(s => s.status === 'active').length;
    const todayClasses = mockClasses.filter(c => 
      c.date.toDateString() === new Date().toDateString()
    ).length;
    const monthlyRevenue = mockStudents
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.plan.monthlyPrice, 0);

    return {
      activeStudents,
      todayClasses,
      monthlyRevenue,
    };
  }, []);

  return dashboardData;
};
