import React from "react";

interface LastEventProps {
  lastEvent: any;
}

const LastEvent: React.FC<LastEventProps> = ({ lastEvent }) => {
  return (
    <div>
      <h2>Last Event</h2>
      {lastEvent ? (
        <p>
          {lastEvent.description} - {lastEvent.location} - {lastEvent.custodian}
        </p>
      ) : (
        <p>No last event available for this item.</p>
      )}
    </div>
  );
};

export default LastEvent;
