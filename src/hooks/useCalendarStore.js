import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { covertEventsToDates } from "../helpers/convertEventToDate";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";





export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {

    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {


    //va al backend
    if (calendarEvent._id) {
      //actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      //creando

      const { data } = await calendarApi.post('/events', calendarEvent)

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.eventDb.id, user }))
    }
  }
  const startDeletingEvent = async () => {

    dispatch(onDeleteEvent())


  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      console.log(data);
      const events = covertEventsToDates(data.events) 
      console.log(events);
    } catch (error) {
      console.log(error);

    }
  }
  return {
    //propiedades
    events, activeEvent, hasEventSelected: !!activeEvent,

    //metodos
    setActiveEvent, startSavingEvent, startDeletingEvent, startLoadingEvents
  }


}
