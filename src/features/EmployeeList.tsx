import { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/customReduxAction';
import { addEmployee, updateEmployee, fetchEmployeesThunk, removeEmployee } from '../slices/employeeSlice';
import EmployeeCard from './EmployeeCard';
import type { Employee } from './employeeType';
import EmployeeModal from './EmployeeModal';

export default function EmployeeList() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(s => s.employees);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  useEffect(() => { dispatch(fetchEmployeesThunk()); }, [dispatch]);

  const handleAddClick = useCallback(() => {
    setEditing(null);
    setModalOpen(true);
  }, [setEditing, setModalOpen]);

  const handleEdit = useCallback((emp: Employee) => {
    setEditing(emp);
    setModalOpen(true);
  }, [setEditing, setModalOpen]);

  const handleSubmit = useCallback(
    (emp: Employee) => {
      if (editing) {
        dispatch(updateEmployee(emp));
      } else {
        dispatch(addEmployee(emp));
      }
      setModalOpen(false);
    },
    [dispatch, editing],
  );
  const handleDelete = useCallback((id: number) => dispatch(removeEmployee(id)), [dispatch]);

  if (loading) return <div>Loading employees...</div>;
  if (error) return <div style={{ color: 'crimson' }}>Error: {error}</div>;

  return (
    <>
      <div className="employees-header">
        <div>
          <h2 className="section-title">Employees</h2>
          <p className="section-subtitle">
            Fetched from JSONPlaceholder and stored in Redux.
          </p>
        </div>
        <button onClick={handleAddClick}>Add Employee</button>
      </div>

      <div className="employees-grid">
        {list.map(emp => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <EmployeeModal
        open={isModalOpen}
        mode={editing ? 'edit' : 'add'}
        initialValues={editing ?? undefined}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
