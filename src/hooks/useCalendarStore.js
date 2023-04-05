import { useDispatch, useSelector } from "react-redux";
import {
  onDeleteEvent,
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents,
} from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent }));
        return;
      }

      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(
        onAddNewEvent({ ...calendarEvent, id: data.eventSaved.id, user })
      );
    } catch(error) {
      console.log(error);
      Swal.fire('Failed to save', error.response.data?.msg, 'error');
    }
  };

  const startDeletingEvent = async() => {

    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());

    } catch (error) {
      console.log(error);
      Swal.fire('Failed to delete', error.response.data?.msg, 'error');
    }
    
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
      console.log("Error cargando eventos");
    }
  };

  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
