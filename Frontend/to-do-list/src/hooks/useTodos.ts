import { useState, useEffect } from "react";
import { todoService } from "../api/todoService";
import type { Todo, CreateTodoDto, UpdateTodoDto } from "../types/todo.types";

export function useTodos() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadTodos();
	}, []);

	const loadTodos = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await todoService.getAll();
			setTodos(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load todos");
			console.error("Load todos error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const addTodo = async (dto: CreateTodoDto): Promise<Todo | undefined> => {
		try {
			const newTodo = await todoService.create(dto);
			setTodos((prev) => [...prev, newTodo]);
			return newTodo;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create todo");
			throw err;
		}
	};

	const toggleTodo = async (id: number) => {
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		setTodos((prev) =>
			prev.map((t) => (t.id === id ? { ...t, is_done: !t.is_done } : t)),
		);

		try {
			await todoService.toggle(id, todo);
			await loadTodos();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to toggle todo");
			throw err;
		}
	};

	const updateTodo = async (id: number, dto: UpdateTodoDto) => {
		try {
			await todoService.update(id, dto);
			await loadTodos();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update todo");
			throw err;
		}
	};

	const deleteTodo = async (id: number) => {
		const oldTodos = todos;
		setTodos((prev) => prev.filter((t) => t.id !== id));

		try {
			await todoService.delete(id);
		} catch (err) {
			setTodos(oldTodos);
			setError(err instanceof Error ? err.message : "Failed to delete todo");
			throw err;
		}
	};

	const updateCategory = async (id: number, Kategorie: string | null) => {
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		try {
			await updateTodo(id, {
				text: todo.text,
				is_done: todo.is_done,
				kategorie: Kategorie,
			});
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to update category",
			);
			throw err;
		}
	};

	return {
		todos,
		isLoading,
		error,
		addTodo,
		toggleTodo,
		updateTodo,
		deleteTodo,
		updateCategory,
		reload: loadTodos,
	};
}
