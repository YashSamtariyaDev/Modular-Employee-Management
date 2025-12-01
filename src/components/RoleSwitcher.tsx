import useAuth from '../hooks/authContext';

export default function RoleSwitcher() {
  const { role, toggle } = useAuth();
  return (
    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
      <small>Role: <strong>{role}</strong></small>
      <button onClick={toggle} style={{ padding:'6px' }}>Toggle Role</button>
    </div>
  );
}
