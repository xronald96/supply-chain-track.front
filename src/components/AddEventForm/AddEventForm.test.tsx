import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddEventForm from "./AddEventForm";
import { addEvent } from "../../services/eventService";

jest.mock("../../services/eventService", () => ({
  addEvent: jest.fn(),
}));

describe("AddEventForm", () => {
  const mockOnEventAdded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with initial values", () => {
    render(<AddEventForm itemId="1" onEventAdded={mockOnEventAdded} />);

    expect(
      screen.getByPlaceholderText("Event Description")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Event Location")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Event Custodian")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Add Event/i })
    ).toBeInTheDocument();
  });

  test("displays validation errors when the form is submitted with empty fields", async () => {
    render(<AddEventForm itemId="1" onEventAdded={mockOnEventAdded} />);

    const button = screen.getByRole("button", { name: /Add Event/i });

    fireEvent.click(button);

    expect(
      await screen.findByText("Event Description is required")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Event Location is required")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Event Custodian is required")
    ).toBeInTheDocument();
  });

  test("calls addEvent function and clears the form on successful submission", async () => {
    (addEvent as jest.Mock).mockResolvedValueOnce({});

    render(<AddEventForm itemId="1" onEventAdded={mockOnEventAdded} />);

    fireEvent.change(screen.getByPlaceholderText("Event Description"), {
      target: { value: "Event 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Event Location"), {
      target: { value: "Location 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Event Custodian"), {
      target: { value: "Custodian 1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Event/i }));

    await waitFor(() => expect(addEvent).toHaveBeenCalledTimes(1));

    expect(addEvent).toHaveBeenCalledWith(
      "1",
      "Event 1",
      "Location 1",
      "Custodian 1"
    );

    expect(screen.getByPlaceholderText("Event Description")).toHaveValue("");
    expect(screen.getByPlaceholderText("Event Location")).toHaveValue("");
    expect(screen.getByPlaceholderText("Event Custodian")).toHaveValue("");

    expect(mockOnEventAdded).toHaveBeenCalledTimes(1);
  });

  test("displays error when addEvent fails", async () => {
    (addEvent as jest.Mock).mockRejectedValueOnce(
      new Error("Error adding event")
    );

    render(<AddEventForm itemId="1" onEventAdded={mockOnEventAdded} />);

    fireEvent.change(screen.getByPlaceholderText("Event Description"), {
      target: { value: "Event 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Event Location"), {
      target: { value: "Location 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Event Custodian"), {
      target: { value: "Custodian 1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Event/i }));

    expect(await screen.findByText("Error adding event")).toBeInTheDocument();
  });

  test("displays error if itemId is not provided", async () => {
    render(<AddEventForm itemId="" onEventAdded={mockOnEventAdded} />);

    fireEvent.change(screen.getByPlaceholderText("Event Description"), {
      target: { value: "Event 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Event Location"), {
      target: { value: "Location 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Event Custodian"), {
      target: { value: "Custodian 1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Event/i }));

    await screen.findByText("Item ID is required to add an event");
  });
});
