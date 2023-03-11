
export const NavBar = () => {
  return (
    <div
      className="navbar navbar-dark bg-dark px-4"
      style={{ width: "100vw"}}
    >
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; Macarena
      </span>

      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};
