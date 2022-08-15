import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";
import { Navbar } from "../components/Navbar";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessages } from "../../helpers/getMessages";
import { CalendarEventBox } from "../components/CalendarEventBox";
import { useState } from "react";
import { CalendarModal } from "../components/CalendarModal";

const events = [
  {
    title: "cumpleaños del jefe",
    notes: "hay que comprar el pastel",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "ivan",
    },
  },
];

export const CalendarPage = () => {

 const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      background: "#ff894c",
      borderRadius: "1px",
      opacity: 1,
      color: "white",
    };

    return {
      style,
    };
  };
  const onDoubleCilck = (event)=>{
    console.log({doubliClick:event});
  }
  const onSelected = (event) => {
    console.log({onSelected:event})
  }
  const onViewChange = (event) => {
    localStorage.setItem('lastView',event)
    setLastView(event)
  }


  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
          onDoubleClickEvent={onDoubleCilck}
         onSelectEvent={onSelected}
         onView={onViewChange}
      />
      <CalendarModal/>
    </>
  );
};
