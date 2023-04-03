import { useDispatch, useSelector } from "react-redux";
import {
  onDeleteEvent,
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import { calendarApi } from "../api";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async(calendarEvent) => {
    // TODO: Llegar al backend

    // Todo bien
    if (calendarEvent._id) {
      // Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.eventSaved.id, user }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent() );
  };

  const startLoadingEvents = async() => {
    try {
      const  { data } = await calendarApi.get('/events');
      console.log({data})
    } catch(error) {
      console.log(error);
      console.log('Error cargando eventos');
    }
  }

  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  };
};
