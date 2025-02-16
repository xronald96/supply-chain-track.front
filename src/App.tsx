import React, { useState } from "react";
import { getItemEvents, getLastEvent } from "./services/itemService";
import ItemForm from "./components/ItemForm";
import EventList from "./components/EventList";
import LastEvent from "./components/LastEvent";

const Home: React.FC = () => {
  const [itemId, setItemId] = useState<string>("");
  const [events, setEvents] = useState<any[]>([]);
  const [lastEvent, setLastEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetItemEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedEvents = await getItemEvents(itemId);
      setEvents(fetchedEvents);
    } catch (err) {
      setError("Error fetching item events");
    } finally {
      setLoading(false);
    }
  };

  const handleGetLastEvent = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedLastEvent = await getLastEvent(itemId);
      setLastEvent(fetchedLastEvent);
    } catch (err) {
      setError("Error fetching last event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Supply Chain Tracker</h1>

      <ItemForm
        isUpdating={false}
        onItemCreated={() =>
          console.log("Item created or updated successfully")
        }
      />

      <div>
        <h2>Get Item Events</h2>
        <input
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          placeholder="Item ID"
        />
        <button onClick={handleGetItemEvents}>Get Events</button>
        {loading && <p>Loading...</p>}
        <EventList events={events} />
      </div>

      <div>
        <h2>Get Last Event</h2>
        <button onClick={handleGetLastEvent}>Get Last Event</button>
        {loading && <p>Loading...</p>}
        <LastEvent lastEvent={lastEvent} />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Home;
