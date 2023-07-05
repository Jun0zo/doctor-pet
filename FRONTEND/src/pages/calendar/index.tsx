// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Types
import { CalendarColors, CalendarFiltersType, EventType } from 'src/types/calendarTypes'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'

// ** CalendarColors
const calendarsColor: CalendarColors = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const addEvent = () => {
  console.log('add!')
}
const updateEvent = () => {
  console.log('update!')
}
const deleteEvent = () => {
  console.log('delete!')
}

const AppCalendar = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState<null | any>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([])

  // ** Hooks
  const { settings } = useSettings()

  // ** Vars
  const leftSidebarWidth = 260
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  //   useEffect(() => {
  //     dispatch(fetchEvents(store.selectedCalendars as CalendarFiltersType[]))
  //   }, [dispatch, store.selectedCalendars])

  //   const handleSelect() => {}

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  const store = {
    events: [
      {
        id: 1,
        url: '',
        title: 'Design Review',
        start: new Date(),
        end: new Date(),
        allDay: false,
        extendedProps: {
          calendar: 'Business'
        }
      }
    ],
    selectedEvent: null,
    selectedCalendars: ['Business']
  }

  return (
    <CalendarWrapper
      className='app-calendar'
      sx={{
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
      }}
    >
      {/* <SidebarLeft
        store={store}
        mdAbove={mdAbove}
        // dispatch={dispatch}
        calendarsColor={calendarsColor}
        leftSidebarOpen={leftSidebarOpen}
        leftSidebarWidth={leftSidebarWidth}
        // handleSelectEvent={handleSelectEvent}
        // handleAllCalendars={handleAllCalendars}
        // handleCalendarsUpdate={handleCalendarsUpdate}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      /> */}
      <Box
        sx={{
          p: 5,
          pb: 0,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
          ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
        }}
      >
        <Calendar
          store={store}
          //   dispatch={dispatch}
          direction={direction}
          // updateEvent={updateEvent}
          calendarApi={calendarApi}
          calendarsColor={calendarsColor}
          setCalendarApi={setCalendarApi}
          //   handleSelectEvent={handleSelectEvent}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </Box>
      <AddEventSidebar
        store={store}
        // dispatch={dispatch}
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        calendarApi={calendarApi}
        drawerWidth={addEventSidebarWidth}
        // handleSelectEvent={handleSelectEvent}
        addEventSidebarOpen={addEventSidebarOpen}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      />
    </CalendarWrapper>
  )
}

export default AppCalendar
