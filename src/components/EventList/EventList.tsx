import React from "react";

interface EventListProps {
  events: any[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div>
      <h2>Item Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event.description} - {event.location} - {event.custodian}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found for this item.</p>
      )}
    </div>
  );
};

export default EventList;
