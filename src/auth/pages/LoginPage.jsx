import { useEffect } from "react";
import { useForm ,useAuthStore } from "../../hooks";
import "./LoginPage.css";
import Swal from "sweetalert2";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {

  const { startLogin, errorMessage, startRegister  } = useAuthStore();
  const { loginEmail,loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

  const loginSubmit = ( event ) => {
    event.preventDefault();
    startLogin({email: loginEmail, password: loginPassword});
  }

  const registerSubmit = ( event ) => {
    event.preventDefault();
    if ( registerPassword !== registerPassword2 ) {
      Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error')
    }
    startRegister({name: registerName, email: registerEmail, password: registerPassword });
  }

  useEffect(() => {
    if ( errorMessage !== undefined ){
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage])
  

  return (
    <div className="container">
      <div className="col-md-6 login-form-1">
        <h3> Log in </h3>
        <form onSubmit={ loginSubmit }>
          <div className="form-group mb-2">
            <input type="text" 
              className="form-control" 
              placeholder="Correo" 
              name="loginEmail"
              value={ loginEmail }
              onChange={ onLoginInputChange }
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="loginPassword"
              value={ loginPassword }
              onChange={ onLoginInputChange }
            />
          </div>
          <div className="form-group mb-2">
            <input 
              type="submit" 
              className="btnSubmit" 
              value="Login" 
            />
          </div>
        </form>
      </div>

      <div className="col-md-6 login-form-2">
        <h3> Create Account </h3>
        <form onSubmit={ registerSubmit }>
          <div className="form-group mb-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Name" 
              name="registerName"
              value={ registerName }
              onChange={ onRegisterInputChange }
            />
          </div>
          <div className="form-group mb-2">
            <input 
              type="email" 
              className="form-control" 
              placeholder="Email"
              name="registerEmail"
              value={ registerEmail }
              onChange={ onRegisterInputChange }
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="registerPassword"
              value={ registerPassword }
              onChange={ onRegisterInputChange }
            />
          </div>

          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Repeat password"
              name="registerPassword2"
              value={ registerPassword2}
              onChange={ onRegisterInputChange }
            />
          </div>

          <div className="form-group mb-2">
            <input 
              type="submit" 
              className="btnSubmit" 
              value="Create Account" 
            />
          </div>
        </form>
      </div>
    </div>
  );
};
