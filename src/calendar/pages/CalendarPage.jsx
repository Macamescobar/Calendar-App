import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from "date-fns";

import { NavBar, CalendarEvent, CalendarModal } from "../";
import { localizer, messages } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";



export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    //console.log({event, start, end, isSelected});

    const style = {
      background: '#835af1',
      borderRadius: 4,
      opacity: 0.8,
      color: 'white',
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

  return (
    <>
      <NavBar />

      <Calendar
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh", marginTop: "3rem" }}
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
    </>
  );
};
