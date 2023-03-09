import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from "date-fns";

import { NavBar, CalendarEvent, CalendarModal } from "../";
import { localizer, messages } from "../../helpers";
import { useState } from "react";



const events = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  backgroundColor: 'linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)',
  user: {
    _id: '123',
    name: 'Macarena'
  },
  
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    //console.log({event, start, end, isSelected});

    const style = {
      background: '#835af1',
      borderRadius: 4,
      opacity: 0.8,
      color: 'white',
      width: "50%",
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event })
  }

  const onSelect = ( event ) => {
    console.log({ click: event })
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
