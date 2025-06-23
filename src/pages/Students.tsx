
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StudentsTable } from '@/components/Students/StudentsTable';
import { AddStudentDialog } from '@/components/Students/AddStudentDialog';
import { Plus } from 'lucide-react';
import { mockStudents } from '@/data/mockData';
import { Student } from '@/types';
import { toast } from '@/hooks/use-toast';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleEdit = (student: Student) => {
    toast({
      title: "Editar Aluno",
      description: `Funcionalidade de edição para ${student.name} em desenvolvimento.`,
    });
  };

  const handleDelete = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setStudents(students.filter(s => s.id !== studentId));
      toast({
        title: "Aluno removido",
        description: `${student.name} foi removido com sucesso.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gestão de Alunos</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Gerencie todos os alunos da academia
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-gradient-fitness hover:bg-emerald-600">
          <Plus className="mr-2 h-4 w-4" />
          Novo Aluno
        </Button>
      </div>

      <StudentsTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddStudentDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default Students;
