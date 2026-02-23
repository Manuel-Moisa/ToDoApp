export interface Todo {
	id: number;
	text: string;
	is_done: boolean;
	kategorie: string | null;
	kreiert: string;
	bearbeitet: string;
}

export interface CreateTodoDto {
	text: string;
	kategorie?: string | null;
}

export interface UpdateTodoDto {
	text?: string;
	is_done?: boolean;
	kategorie?: string | null;
}
