import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Row, Col } from "reactstrap";
// import "react-big-calendar/lib/sass/styles";
// import "react-big-calendar/lib/addons/dragAndDrop/styles";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Prelimanry Meeting",
    allDay: true,
    start: new Date(2020, 11, 25, 10, 0), // 10.00 AM
    end: new Date(2020, 11, 25, 20, 0), // 2.00 PM
  },
  {
    title: "Meeting 1",
    allDay: true,
    start: new Date(2021, 0, 9, 10, 30), // 10.00 AM
    end: new Date(2021, 0, 10, 10, 30), // 2.00 PM
  },
  {
    title: "Hearing 2",
    allDay: false,
    start: new Date(2021, 0, 15, 10, 0), // 10.00 AM
    // new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]])
    end: new Date(2021, 0, 16, 19, 0), // 2.00 PM
  },
  {
    title: "THE END",
    allDay: false,
    start: new Date(2020, 0, 1, 10, 0), // 10.00 AM
    end: new Date(2020, 0, 1, 19, 0), // 2.00 PM
  },
  {
    title: "Event5",
    allDay: false,
    start: new Date(2020, 0, 1, 10, 0), // 10.00 AM
    end: new Date(2020, 0, 1, 19, 0), // 2.00 PM
  },
];

const MyCalendar = () => {
  useEffect(() => {
    console.log("DASHBOARD / SCHEDULER / EVENTS");
  }, []);
  return (
    <Row style={styles.container}>
      <Col>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          // defaultView="agenda"
          style={styles.calendar}
          formats={{
            agendaHeaderFormat: ({ start, end }) => {
              return (
                moment.utc(start).format("DD/MM/YYYY") +
                " - " +
                moment.utc(end).format("DD/MM/YYYY")
              );
            },
          }}
        />
      </Col>
    </Row>
  );
};

const styles = {
  calendar: { height: 500, backgroundColor: "white", margin: "auto 4vh" },
  container: {},
};

export default MyCalendar;
