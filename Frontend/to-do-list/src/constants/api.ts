export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5113/api";

export const API_ENDPOINTS = {
	TODOS: "/api/Todo",
	TODO_BY_ID: (id: number) => `/api/Todo/${id}`,
	CREATE_TODO: "/api/Todo",
	UPDATE_TODO: (id: number) => `/api/Todo/${id}`,
	DELETE_TODO: (id: number) => `/api/Todo/${id}`,
};
