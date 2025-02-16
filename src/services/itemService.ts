import { API_URL } from '../config';

export const createItem = async (name: string, color: string, price: number) => {
	const response = await fetch(`${API_URL}/items`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, color, price }),
	});

	if (!response.ok) {
		throw new Error('Error creating item');
	}

	return response.json();
};

export const updateItem = async (id: string, name: string, color: string, price: number) => {
	const response = await fetch(`${API_URL}/items/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, color, price }),
	});

	if (!response.ok) {
		throw new Error('Error updating item');
	}

	return response.json();
};

export const getItemEvents = async (itemId: string) => {
	const response = await fetch(`${API_URL}/items/${itemId}/events`);

	if (!response.ok) {
		throw new Error('Error fetching item events');
	}

	return response.json();
};

export const getLastEvent = async (itemId: string) => {
	const response = await fetch(`${API_URL}/items/${itemId}/events/l`);

	if (!response.ok) {
		throw new Error('Error fetching last event');
	}

	return response.json();
};
