import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople/new">
                New Sales Person
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/new">
                New Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/">
                List of Sales
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/new">
                New Sales Record
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/history">
                Sales Person Sales History
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
