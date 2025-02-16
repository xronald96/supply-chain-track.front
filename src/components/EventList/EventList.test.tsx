import React from "react";
import { render, screen } from "@testing-library/react";
import EventList from "./EventList";

describe("EventList", () => {
  test("renders the list of events when events are provided", () => {
    const events = [
      {
        description: "Event 1",
        location: "Location 1",
        custodian: "Custodian 1",
      },
      {
        description: "Event 2",
        location: "Location 2",
        custodian: "Custodian 2",
      },
    ];

    render(<EventList events={events} />);

    expect(
      screen.getByText("Event 1 - Location 1 - Custodian 1")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Event 2 - Location 2 - Custodian 2")
    ).toBeInTheDocument();
  });

  test("renders a message when no events are provided", () => {
    render(<EventList events={[]} />);

    expect(
      screen.getByText("No events found for this item.")
    ).toBeInTheDocument();
  });

  test("renders correctly with one event", () => {
    const events = [
      {
        description: "Event 1",
        location: "Location 1",
        custodian: "Custodian 1",
      },
    ];

    render(<EventList events={events} />);

    expect(
      screen.getByText("Event 1 - Location 1 - Custodian 1")
    ).toBeInTheDocument();
  });
});
