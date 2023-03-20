import "./LoginPage.css";

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="col-md-6 login-form-1">
        <h3> Log in </h3>
        <form>
          <div className="form-group mb-2">
            <input type="text" className="form-control" placeholder="Correo" />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-group mb-2">
            <input type="submit" className="btnSubmit" value="Login" />
          </div>
        </form>
      </div>

      <div className="col-md-6 login-form-2">
        <h3> Create Account </h3>
        <form>
          <div className="form-group mb-2">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="form-group mb-2">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Repita la contraseña"
            />
          </div>

          <div className="form-group mb-2">
            <input type="submit" className="btnSubmit" value="Crear cuenta" />
          </div>
        </form>
      </div>
    </div>
  );
};
