// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Redux Imports
import { useDispatch, useSelector } from "react-redux";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";

// ** Types
import {
  CalendarColors,
  CalendarFiltersType,
  EventType,
} from "src/@types/calendarTypes";

// ** FullCalendar & App Components Imports
import Calendar from "src/views/pages/calendar/Calendar";
import SidebarLeft from "src/views/pages/calendar/SidebarLeft";
import CalendarWrapper from "src/@core/styles/libs/fullcalendar";
import AddEventSidebar from "src/views/pages/calendar/AddEventSidebar";

// ** Third Party
import axios from "axios";

// ** CalendarColors
const calendarsColor: CalendarColors = {
  Diagnostic: "error",
  Reservation: "secondary",
};

const addEvent = () => {
  console.log("add!");
};
const updateEvent = () => {
  console.log("update!");
};
const deleteEvent = () => {
  console.log("delete!");
};

const AppCalendar = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState<null | any>(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false);
  const [addEventSidebarOpen, setAddEventSidebarOpen] =
    useState<boolean>(false);

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);

  const [store, setStore] = useState<any>({
    events: [
      
    ],
    selectedEvent: null,
    selectedCalendars: ["Diagnostic", "Reservation"],
  })


  // ** Hooks
  const { settings } = useSettings();

  // ** Vars
  const leftSidebarWidth = 260;
  const addEventSidebarWidth = 400;
  const { skin, direction } = settings;
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  //   useEffect(() => {
  //     dispatch(fetchEvents(store.selectedCalendars as CalendarFiltersType[]))
  //   }, [dispatch, store.selectedCalendars])

  //   const handleSelect() => {}

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);

  const handleAddEventSidebarToggle = () => {
    console.log(store)
    setAddEventSidebarOpen(!addEventSidebarOpen);
  };

  const handleSelectEvent = (newEvent: EventType) => {
    console.log(newEvent)

    setStore((old:any) => {
      old.selectedEvent = newEvent;
      return old
    })
  }

  useEffect(() => {
    console.log("store chagne", store)
  }, [store])

  useEffect(() => {
    console.log("first", store)
    const fetchEvents = () => {
      axios.get('https://220.68.27.149:8000/get').then(response => {
      // Handle successful response
      console.log('GET request successful');
      console.log(response.data);
      setStore((old:any) => {
        const updatedStore = { ...old };

        updatedStore.events = response.data.map((info:any) => { return {extendedProps : {calendar:info.type} , title: info.name, date: new Date(info.time)} })
        console.log(updatedStore)
        return updatedStore
      })
    })}

    fetchEvents()
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ maxWidth: "800px" }}>
        <CalendarWrapper
          className="app-calendar"
          sx={{
            boxShadow: skin === "bordered" ? 0 : 6,
            ...(skin === "bordered" && {
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }),
          }}
        >
          <Box
            sx={{
              p: 5,
              pb: 0,
              flexGrow: 1,
              borderRadius: 1,
              boxShadow: "none",
              backgroundColor: "background.paper",
              ...(mdAbove
                ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                : {}),
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
              handleSelectEvent={handleSelectEvent}
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
      </Box>
    </Box>
  );
};

export default AppCalendar;