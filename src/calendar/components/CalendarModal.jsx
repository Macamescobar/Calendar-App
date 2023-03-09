import { addHours } from "date-fns";
import { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setformValues] = useState({
    title: "Macarena",
    notes: "Munoz",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onInputChanged = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setformValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    console.log("cerrando modal");
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> New Event </h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label> Date and start time</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, "start")}
            className="form-control"
            dateFormat="Pp"
          />
        </div>

        <div className="form-group mb-2">
          <label> Date and end time </label>
          <input className="form-control" placeholder="Fecha inicio" />
          <DatePicker
            minDate={ formValues.start }
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, "end")}
            className="form-control"
            dateFormat="Pp"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
