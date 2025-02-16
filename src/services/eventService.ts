export const addEvent = async (
  itemId: string,
  description: string,
  location: string,
  custodian: string
) => {
  const response = await fetch("http://api.example.com/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, description, location, custodian }),
  });

  if (!response.ok) {
    throw new Error("Error adding event");
  }

  return response.json();
};
