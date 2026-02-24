import { api } from "./client";
import { API_ENDPOINTS } from "../constants/api";
import type { Todo, CreateTodoDto, UpdateTodoDto } from "../types/todo.types";

export const todoService = {
	async getAll(): Promise<Todo[]> {
		return api.get<Todo[]>(API_ENDPOINTS.TODOS);
	},

	async getById(id: number): Promise<Todo> {
		return api.get<Todo>(API_ENDPOINTS.TODO_BY_ID(id));
	},

	async create(data: CreateTodoDto): Promise<Todo> {
		return api.post<Todo>(API_ENDPOINTS.CREATE_TODO, data);
	},

	async update(id: number, data: UpdateTodoDto): Promise<void> {
		return api.put<void>(API_ENDPOINTS.UPDATE_TODO(id), data);
	},

	async delete(id: number): Promise<void> {
		return api.delete(API_ENDPOINTS.DELETE_TODO(id));
	},

	async toggle(id: number, currentTodo: Todo): Promise<void> {
		return this.update(id, {
			text: currentTodo.text,
			is_done: !currentTodo.is_done,
			kategorie: currentTodo.kategorie,
		});
	},
};
