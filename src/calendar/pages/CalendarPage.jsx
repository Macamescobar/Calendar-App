import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { localizer, messages } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { useEffect } from "react";



export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { user } = useAuthStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    
    
    const isMyEvent = (user.uid === event.user._id ) || (user.uid === event.user.uid )
    const style = {
      backgroundColor: isMyEvent ? '#835af1' : '#465660',
      borderRadius: 4,
      opacity: 0.8,
      color: 'white',
      height: "4rem",
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    //console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = ( event ) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
      <NavBar />

      <Calendar
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh", marginTop: "3rem"}}
        messages={ messages()}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent = { onSelect }
        onView = { onViewChanged }
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete />
    </>
  );
};
