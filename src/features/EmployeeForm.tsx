import React from 'react';
import { useForm } from 'react-hook-form';
import type { Employee } from './employeeType';

type Props = { initialValues: Partial<Employee>; onSubmit: (v: Employee) => void; onCancel?: () => void; };

export default function EmployeeForm({ initialValues, onSubmit, onCancel }: Props) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset } = 
    useForm<Employee>(
      { defaultValues: 
        { id: initialValues?.id, 
          name: initialValues?.name ?? '', 
          email: initialValues?.email ?? '', 
          phone: initialValues?.phone ?? '', 
          department: initialValues?.department ?? 'Engineering' 
        } as Employee 
      });

  React.useEffect(() => { reset(initialValues as Employee); }, [initialValues, reset]);

  const submit = (data: Employee) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submit)} className="row g-3">
      <div className="col-12">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          {...register('name', { required: 'Name required', minLength: { value: 3, message: 'Min 3 chars' } })}
        />
        {errors.name && <div className="text-danger small mt-1">{errors.name.message}</div>}
      </div>

      <div className="col-12">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          {...register('email', { required: 'Email required', validate: v => /\S+@\S+\.\S+/.test(v) || 'Invalid email' })}
        />
        {errors.email && <div className="text-danger small mt-1">{errors.email.message}</div>}
      </div>

      <div className="col-12">
        <label className="form-label">Phone</label>
        <input
          className="form-control"
          {...register('phone', { required: 'Phone required' })}
        />
        {errors.phone && <div className="text-danger small mt-1">{errors.phone.message}</div>}
      </div>

      <div className="col-12">
        <label className="form-label">Department</label>
        <select
          className="form-select"
          {...register('department', { required: 'Department required' })}
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
        </select>
        {errors.department && <div className="text-danger small mt-1">{errors.department.message}</div>}
      </div>

      <div className="col-12 d-flex justify-content-end gap-2 mt-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => { reset(); onCancel?.(); }}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}
