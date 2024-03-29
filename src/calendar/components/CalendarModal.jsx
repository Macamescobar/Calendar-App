import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from "../../hooks";


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

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent  } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setformValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if( !formSubmitted ) return '';

    return( formValues.title.length > 0 )
      ? ''
      : 'is-invalid';
  },[formValues.title, formSubmitted]);

  useEffect(() => {
    if ( activeEvent !== null ) {
      setformValues({ ...activeEvent });
    }
  },[ activeEvent ])

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
    closeDateModal();
  }

  const onSubmit = async( event ) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds( formValues.end, formValues.start );

    if ( isNaN(difference) || difference <= 0 ) {
      Swal.fire( 'Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }

    if ( formValues.title.length <= 0) return;
    
    await startSavingEvent( formValues);
    closeDateModal();
    setFormSubmitted(false);
    
  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose= { onCloseModal  }
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> New Event </h1>
      <hr />
      <form className="container-modal" onSubmit={onSubmit }>
        <div className="form-group mb-2">
          <label> Date and start time</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, "start")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Time"
          />
        </div>

        <div className="form-group mb-2">
          <label> Date and end time </label>
          <DatePicker
            minDate={ formValues.start }
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, "end")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Time"
          />
        </div>
        <hr />
        <div className="form-group mb-2">
          <label>Title and tasks </label>
          <input
            type="text"
            className= {`form-control${ titleClass }`}
            placeholder="Event title"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Description
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Tasks"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Aditional information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save </span>
        </button>
      </form>
    </Modal>
  );
};
