import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";





export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state=>state.calendar)

  const setActiveEvent = (calendarEvent) =>{

    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async( calendarEvent ) =>{
    //va al backend
    if(calendarEvent._id){
      //actualizando
      dispatch(onUpdateEvent({...calendarEvent}))
    }else{
      //creando
      dispatch(onAddNewEvent( {...calendarEvent, _id: new Date} ))
    }
  }
  const startDeletingEvent = async()=>{
    dispatch(onDeleteEvent())
  }
   
  return {
    //propiedades
    events,activeEvent,hasEventSelected:!!activeEvent,

    //metodos
    setActiveEvent,startSavingEvent,startDeletingEvent
  }
   
  
}
