import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { covertEventsToDates } from "../helpers/convertEventToDate";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state => state.calendar)

  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {

    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {

    try {

      if (calendarEvent.id) {
        //actualizando
        calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }
      //creando

      const { data } = await calendarApi.post('/events', calendarEvent)

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.eventDb.id, user }))


    } catch (error) {

     Swal.fire('error in saving', error.response.data.msg,'error')

    }

  }
  const startDeletingEvent = async () => {

    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
     dispatch(onDeleteEvent())
      
    } catch (error) {
      Swal.fire('deleting error', error.response.data.msg, 'error');
    }


  }

  const startLoadingEvents = async () => {

    try {

      const { data } = await calendarApi.get('/events')

      const events = covertEventsToDates(data.events)

      dispatch(onLoadEvents(events))

    } catch (error) {
      console.log('error loading');

    }
  }
  return {
    //propiedades
    events, activeEvent, hasEventSelected: !!activeEvent,

    //metodos
    setActiveEvent, startSavingEvent, startDeletingEvent, startLoadingEvents
  }


}
