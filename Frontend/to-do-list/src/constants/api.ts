// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://localhost:7000";

/**
 * Helper function für API Calls
 */
export async function apiRequest<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	// Standard Headers
	const headers: HeadersInit = {
		"Content-Type": "application/json",
		...options.headers,
	};

	try {
		// Mache Request
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			...options,
			headers,
		});

		// Error Handling
		if (!response.ok) {
			const error = await response.json().catch(() => ({
				message: `HTTP ${response.status}`,
			}));
			throw new Error(
				error.message || `Request failed with status ${response.status}`,
			);
		}

		// 204 No Content hat keinen Body
		if (response.status === 204) {
			return undefined as T;
		}

		// Parse JSON Response
		return response.json();
	} catch (error) {
		console.error("API Request failed:", error);
		throw error;
	}
}

// Convenience Methods
export const api = {
	get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: "GET" }),

	post: <T>(endpoint: string, data: unknown) =>
		apiRequest<T>(endpoint, {
			method: "POST",
			body: JSON.stringify(data),
		}),

	put: <T>(endpoint: string, data: unknown) =>
		apiRequest<T>(endpoint, {
			method: "PUT",
			body: JSON.stringify(data),
		}),

	patch: <T>(endpoint: string, data?: unknown) =>
		apiRequest<T>(endpoint, {
			method: "PATCH",
			body: data ? JSON.stringify(data) : undefined,
		}),

	delete: (endpoint: string) =>
		apiRequest<void>(endpoint, { method: "DELETE" }),
};
