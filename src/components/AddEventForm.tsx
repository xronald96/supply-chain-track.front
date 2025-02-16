import React from "react";
import { useForm } from "react-hook-form";
import { addEvent } from "../services/eventService";

interface AddEventFormProps {
  itemId: string;
  onEventAdded: () => void;
}

interface EventFormData {
  description: string;
  location: string;
  custodian: string;
}

const AddEventForm: React.FC<AddEventFormProps> = ({
  itemId,
  onEventAdded,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAddEvent = async (data: EventFormData) => {
    if (!itemId) {
      setError("Item ID is required to add an event");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const newEvent = await addEvent(
        itemId,
        data.description,
        data.location,
        data.custodian
      );
      console.log("Event added:", newEvent);
      reset();
      onEventAdded();
    } catch (err) {
      setError("Error adding event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit(handleAddEvent)}>
        <div>
          <input
            {...register("description", {
              required: "Event Description is required",
            })}
            placeholder="Event Description"
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("location", {
              required: "Event Location is required",
            })}
            placeholder="Event Location"
          />
          {errors.location && (
            <p style={{ color: "red" }}>{errors.location.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("custodian", {
              required: "Event Custodian is required",
            })}
            placeholder="Event Custodian"
          />
          {errors.custodian && (
            <p style={{ color: "red" }}>{errors.custodian.message}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          Add Event
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddEventForm;
