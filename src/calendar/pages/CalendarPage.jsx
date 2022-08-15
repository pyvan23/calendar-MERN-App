import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";


import { Navbar } from "../components/Navbar";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessages } from "../../helpers/getMessages";
import { CalendarEventBox } from "../components/CalendarEventBox";
import { useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";



export const CalendarPage = () => {

const {openDateModal,toggleModal} = useUiStore()

const { events,setActiveEvent } = useCalendarStore()

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
     openDateModal()
    //  toggleModal()
  }
  const onSelected = (event) => {
    setActiveEvent(event);

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
      <FabAddNew/>
    </>
  );
};
