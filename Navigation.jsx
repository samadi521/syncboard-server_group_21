import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">S</span>

          <div>
            <h1>SyncBoard</h1>
            <span>Collaborative Task Management</span>
          </div>
        </NavLink>

        <nav className="main-navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Board
          </NavLink>

          <NavLink
            to="/tasks/new"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            + New Task
          </NavLink>
        </nav>
      </div>
    </header>
  );
}