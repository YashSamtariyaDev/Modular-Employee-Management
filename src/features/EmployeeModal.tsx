import type { Employee } from './employeeType';
import Modal from '../components/Modal';
import EmployeeForm from './EmployeeForm';

type Props = {
  open: boolean;
  initialValues?: Partial<Employee>;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSubmit: (values: Employee) => void;
};

export default function EmployeeModal({
  open,
  initialValues,
  mode,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>
          {mode === 'add' ? 'Add Employee' : 'Edit Employee'}
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
          {mode === 'add'
            ? 'Fill in the details to create a new employee.'
            : 'Update the employee details below.'}
        </p>
      </div>

      <EmployeeForm
        initialValues={initialValues ?? {}}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}

