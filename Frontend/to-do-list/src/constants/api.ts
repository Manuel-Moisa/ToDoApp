export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api";

export const API_ENDPOINTS = {
	TODOS: "/api/todo",
	TODO_BY_ID: (id: number) => `/api/todo/${id}`,
	CrEATE_TODO: "/api/todo",
	UPDATE_TODO: (id: number) => `/api/todo/${id}`,
	DELETE_TODO: (id: number) => `/api/todo/${id}`,
};
