import EmployeeList from "./features/EmployeeList";
import "./index.css";
import RoleSwitcher from "./components/RoleSwitcher";
export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <h1 className="title">Employee Management Widget</h1>
          <p className="subtitle">
            Feature-based demo • React + TypeScript • Redux Toolkit • react-hook-form
          </p>
        </div>

        <div>
          <RoleSwitcher />
        </div>
      </header>

      <main className="app-main">
        <EmployeeList />
      </main>

      <footer className="app-footer">
        <small>Tip: Toggle role to show or hide the delete action.</small>
      </footer>
    </div>
  );
}
