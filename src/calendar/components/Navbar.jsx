import { useAuthStore } from "../../hooks";

export const NavBar = () => {

  const { startLogout, user } = useAuthStore();

  return (
    <div
      className="navbar navbar-dark bg-dark px-4"
      style={{ width: "100vw"}}
    >
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; { user.name }
      </span>

      <button 
        className="btn btn-outline-danger"
        onClick={ startLogout }
      >
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};
