

export const CalendarEventBox = ({event}) => {

    const { title ,user } = event;

    
  return (
    <>
    <span>{ title }</span>

    <span> - { user.name }</span>
    </>
  )
}
