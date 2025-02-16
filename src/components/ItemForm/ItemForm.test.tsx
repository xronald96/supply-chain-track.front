import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ItemForm from "./ItemForm";
import { createItem, updateItem } from "../../services/itemService";

jest.mock("../../services/itemService", () => ({
  createItem: jest.fn(),
  updateItem: jest.fn(),
}));

describe("ItemForm", () => {
  const mockOnItemCreated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form with initial values when creating an item", () => {
    render(<ItemForm onItemCreated={mockOnItemCreated} />);

    expect(screen.getByPlaceholderText("Item Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Item Color")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Item Price")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Item/i })
    ).toBeInTheDocument();
  });

  test("renders form with initial values when updating an item", () => {
    const initialValues = { id: "1", name: "Item 1", color: "Red", price: 10 };
    render(
      <ItemForm
        isUpdating
        initialValues={initialValues}
        onItemCreated={mockOnItemCreated}
      />
    );

    expect(screen.getByDisplayValue("Item 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Red")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Update Item/i })
    ).toBeInTheDocument();
  });

  test("displays validation errors when form is submitted with empty fields", () => {
    render(<ItemForm onItemCreated={mockOnItemCreated} />);

    fireEvent.click(screen.getByRole("button", { name: /Create Item/i }));

    expect(screen.getByText(/Item name is required/)).toBeInTheDocument();
    expect(screen.getByText(/Item color is required/)).toBeInTheDocument();
    expect(screen.getByText(/Item price is required/)).toBeInTheDocument();
  });

  test("calls createItem function when creating an item", async () => {
    (createItem as jest.Mock).mockResolvedValueOnce({});

    render(<ItemForm onItemCreated={mockOnItemCreated} />);

    fireEvent.change(screen.getByPlaceholderText("Item Name"), {
      target: { value: "New Item" },
    });
    fireEvent.change(screen.getByPlaceholderText("Item Color"), {
      target: { value: "Blue" },
    });
    fireEvent.change(screen.getByPlaceholderText("Item Price"), {
      target: { value: 20 },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Item/i }));

    await waitFor(() => expect(createItem).toHaveBeenCalledTimes(1));
    expect(createItem).toHaveBeenCalledWith("New Item", "Blue", 20);
    expect(mockOnItemCreated).toHaveBeenCalledTimes(1);
  });

  test("calls updateItem function when updating an item", async () => {
    const initialValues = { id: "1", name: "Item 1", color: "Red", price: 10 };
    (updateItem as jest.Mock).mockResolvedValueOnce({});

    render(
      <ItemForm
        isUpdating
        initialValues={initialValues}
        onItemCreated={mockOnItemCreated}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Item Name"), {
      target: { value: "Updated Item" },
    });
    fireEvent.change(screen.getByPlaceholderText("Item Color"), {
      target: { value: "Green" },
    });
    fireEvent.change(screen.getByPlaceholderText("Item Price"), {
      target: { value: 15 },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Item/i }));

    await waitFor(() => expect(updateItem).toHaveBeenCalledTimes(1));
    expect(updateItem).toHaveBeenCalledWith("1", "Updated Item", "Green", 15);
    expect(mockOnItemCreated).toHaveBeenCalledTimes(1);
  });

  test("resets form after successful submit", async () => {
    (createItem as jest.Mock).mockResolvedValueOnce({});

    render(<ItemForm onItemCreated={mockOnItemCreated} />);

    fireEvent.change(screen.getByPlaceholderText("Item Name"), {
      target: { value: "New Item" },
    });
    fireEvent.change(screen.getByPlaceholderText("Item Color"), {
      target: { value: "Blue" },
    });
    fireEvent.change(screen.getByPlaceholderText("Item Price"), {
      target: { value: 20 },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Item/i }));

    await waitFor(() =>
      expect(screen.getByPlaceholderText("Item Name")).toHaveValue("")
    );
    await waitFor(() =>
      expect(screen.getByPlaceholderText("Item Color")).toHaveValue("")
    );
    await waitFor(() =>
      expect(screen.getByPlaceholderText("Item Price")).toHaveValue(0)
    );
  });

  test("displays error message when createItem fails", async () => {
    (createItem as jest.Mock).mockRejectedValueOnce(
      new Error("Error creating item")
    );

    render(<ItemForm onItemCreated={mockOnItemCreated} />);

    fireEvent.change(screen.getByPlaceholderText("Item Name"), {
      target: { value: "New Item" },
    });
    fireEvent.change(screen.getByPlaceholderText("Item Color"), {
      target: { value: "Blue" },
    });
    fireEvent.change(screen.getByPlaceholderText("Item Price"), {
      target: { value: 20 },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Item/i }));

    await screen.findByText("Error creating item");
  });
});
