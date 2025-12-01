import { memo } from 'react';
import type { Employee } from './employeeType';
import useAuth from '../hooks/authContext';

type Props = { employee: Employee; onEdit: (e: Employee) => void; onDelete: (id: number) => void; };

function EmployeeCard({ employee, onEdit, onDelete }: Props) {
  const { role } = useAuth();
  return (
    <article className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column gap-1">
        <h5 className="card-title mb-1">{employee.name}</h5>
        <div className="text-muted small">{employee.email}</div>
        <div className="text-muted small">{employee.phone}</div>
        <div className="fst-italic text-secondary small">{employee.department}</div>

        <div className="mt-3 d-flex gap-2">
          {role === 'admin' && (
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={() => onEdit(employee)}
            >
              Edit
            </button>
          )}
          {role === 'admin' && (
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(employee.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(EmployeeCard);
