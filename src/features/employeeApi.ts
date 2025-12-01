import axios from 'axios';
import type { Employee } from './employeeType';

export async function fetchEmployees(): Promise<Employee[]> {
  const res = await axios.get<Employee[]>('https://jsonplaceholder.typicode.com/users');
  return res.data.map(mapRawToEmployee) as Employee[];
}

function mapRawToEmployee(u: Employee) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    department: inferDepartment(u),
    company: {
        name: u.company?.name || ''
    },
    username: u.username
  };
}

function inferDepartment(u: Employee) {
  const comp = (u.company?.name || '').toLowerCase();
  const user = (u.username || '').toLowerCase();

  if (/hr|human|people/.test(comp) || /hr|human/.test(user)) return 'HR';
  if (/tech|software|systems|dev|engineer/.test(comp) || /dev|engineer/.test(user)) return 'Engineering';
  if (/group|llc|inc|sales|marketing/.test(comp) || /sales/.test(user)) return 'Sales';
  return 'Engineering';
}
