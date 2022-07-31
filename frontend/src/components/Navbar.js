import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Workouts Tracker</h2>
        </Link>
        <nav>
          <div className="row">
              <div className="block">
                  <Link to="/login">
                      <h3>Login</h3>
                  </Link>
              </div>
              <div className="block">
                  <Link to="/signup">
                      <h3>Signup</h3>
                  </Link>
              </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar