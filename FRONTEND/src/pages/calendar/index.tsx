// ** React Imports
import { useEffect, useState } from "react";

// ** Server Imports
import server from "src/context/server";

// ** MUI Imports
import {Box, Button} from "@mui/material";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
import { useRouter } from "next/router";

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

  const router = useRouter();


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
      server.get('/get').then(response => {
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
        flexDirection:"column",
        minHeight: "100vh",
        gap:"30px"
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
      <Button
            variant="contained"
            color="error"
            onClick={() => {
              router.push("/home");
            }}
          >
            홈으로
          </Button>
    </Box>
  );
};

export default AppCalendar;