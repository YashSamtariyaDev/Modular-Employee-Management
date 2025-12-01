import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Employee } from '../features/employeeType'
import { fetchEmployees } from '../features/employeeApi'

export const fetchEmployeesThunk = createAsyncThunk<Employee[]>('employees/fetch', async () => {
  return fetchEmployees();
});

type State = { list: Employee[]; loading: boolean; error?: string | null };

const initialState: State = { list: [], loading: false, error: null };

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.list = action.payload
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      const emp = action.payload
      const nextId = emp.id ?? ((state.list.length ? Math.max(...state.list.map(e => e.id)) : 0) + 1)
      state.list.unshift({ ...emp, id: nextId })
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.list.findIndex(e => e.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
    removeEmployee(state, action: PayloadAction<number>) {
      state.list = state.list.filter(e => e.id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmployeesThunk.pending, (state: State) => { state.loading = true; state.error = null; })
      .addCase(fetchEmployeesThunk.fulfilled, (e, a) => { e.loading = false; e.list = a.payload; })
      .addCase(fetchEmployeesThunk.rejected, (e, a) => { e.loading = false; e.error = a.error.message ?? 'Failed'; });
  }
})

export const {
  setEmployees,
  addEmployee,
  updateEmployee,
  removeEmployee,
} = employeeSlice.actions

export const employeeReducer = employeeSlice.reducer
