import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import type { Todo } from "../../types/todo.types";

function ToDoList() {
	const {
		todos,
		isLoading,
		error,
		addTodo,
		toggleTodo,
		updateTodo,
		deleteTodo,
		updateCategory,
	} = useTodos();

	const [text, setText] = useState("");
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editingText, setEditingText] = useState<string>("");
	const [openId, setOpenId] = useState<number | null>(null);
	const [inputvalue, setInputValue] = useState<string>("");
	const [listTitle, setListTitle] = useState<string>("Meine To-Do Liste");

	const handleAdd = async () => {
		if (text.trim() === "") return;

		try {
			await addTodo({
				text: text.trim(),
				kategorie: "Kategorie",
			});
			setText("");
		} catch (err) {
			alert("Fehler beim speichern: Bitte versuche es erneut.");
			console.error("Add error:", err);
		}
	};

	const handletoggle = async (id: number) => {
		try {
			await toggleTodo(id);
		} catch (err) {
			console.error("Toggle failed:", err);
		}
	};

	const startEdit = (item: Todo) => {
		setEditingId(item.id);
		setEditingText(item.text);
	};

	const handleSave = async (id: number, neuerText: string) => {
		try {
			const todo = todos.find((t) => t.id === id);
			if (!todo) return;

			await updateTodo(id, {
				text: neuerText,
				is_done: todo.is_done,
				kategorie: todo.kategorie,
			});
			setEditingId(null);
		} catch (err) {
			alert("Fehler beim Speichern: ");
			console.error("Save error:", err);
		}
	};

	const handleDelete = async (id: number) => {
		if (!confirm("Todo wirklich löschen?")) return;

		try {
			await deleteTodo(id);
		} catch (err) {
			alert("Fehler beim Löschen: ");
			console.error("Delete error:", err);
		}
	};

	const handlecategory = (id: number) => {
		if (openId === id) {
			setOpenId(null);
		} else {
			setOpenId(id);
		}
	};

	const handleCategoryChange = async (id: number, newCategory: string) => {
		try {
			await updateCategory(id, newCategory);
			setOpenId(null);
		} catch (err) {
			alert("Fehler beim Aktualisieren der Kategorie: ");
			console.error("Category update error:", err);
		}
	};

	if (isLoading) {
		return (
			<div className="todo-app-container">
				<div className="loading">
					<div className="spinner"></div>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="todo-app-container">
				<div className="error-message">
					<h3>Fehler beim Laden der Todos</h3>
					<p>{error}</p>
					<button onClick={() => window.location.reload()}>
						Seite neu laden
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="todo-app-container">
			<h1
				contentEditable={true}
				suppressContentEditableWarning={true}
				onBlur={(e) =>
					setListTitle(e.currentTarget.textContent || "Meine To-Do Liste")
				}
				style={{ outline: "none", cursor: "text" }}
			>
				{listTitle}
			</h1>

			<div className="add-todo-section">
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && handleAdd()}
					placeholder="Neues To-Do eingeben..."
				/>
				<button className="btn-save" onClick={handleAdd}>
					Add
				</button>
			</div>

			<ol style={{ padding: 0 }}>
				{todos.map((item) => (
					<li key={item.id} className="todo-item">
						{item.id === editingId ? (
							<>
								<input
									type="text"
									value={editingText}
									onChange={(e) => setEditingText(e.target.value)}
								/>
								<button
									onClick={() => handleSave(item.id, editingText)}
									className="btn-save"
								>
									Save
								</button>
								<button
									className="btn-cancel"
									onClick={() => setEditingId(null)}
								>
									Cancel
								</button>
							</>
						) : (
							<>
								<input
									type="checkbox"
									checked={item.is_done}
									onChange={() => handletoggle(item.id)}
								/>
								<span
									className={`todo-text ${item.is_done ? "completed" : ""}`}
									onClick={() => handletoggle(item.id)}
								>
									{item.text}
								</span>

								<span>
									<div className="dropdown-container">
										<button
											className="category-btn"
											onClick={() => handlecategory(item.id)}
										>
											{item.kategorie || "Kategorie"}{" "}
											<span className="dropdown-arrow">▼</span>
										</button>
										<ul
											className={`dropdown-menu ${openId === item.id ? "show" : ""}`}
										>
											<li>
												<a
													className="dropdown-item"
													onClick={() =>
														handleCategoryChange(item.id, "Arbeit")
													}
												>
													Arbeit
												</a>
											</li>
											<li>
												<a
													className="dropdown-item"
													onClick={() => handleCategoryChange(item.id, "IT")}
												>
													IT
												</a>
											</li>
											<li>
												<a
													className="dropdown-item"
													onClick={() => handleCategoryChange(item.id, "Sport")}
												>
													Sport
												</a>
											</li>
											<li>
												<a
													className="dropdown-item"
													onClick={() =>
														handleCategoryChange(item.id, "Schule")
													}
												>
													Schule
												</a>
												<div className="p-2" />
												<input
													type="text"
													className="form-control"
													placeholder="Custom..."
													value={inputvalue}
													onChange={(e) => setInputValue(e.target.value)}
												/>
												<button
													onClick={() => {
														if (inputvalue.trim() !== "") {
															handleCategoryChange(item.id, inputvalue);
															setInputValue("");
														}
													}}
												>
													Ok
												</button>
											</li>
										</ul>
									</div>
								</span>
								<button className="action-btn" onClick={() => startEdit(item)}>
									Edit
								</button>
								<button
									className="action-btn delete-btn"
									onClick={() => handleDelete(item.id)}
								>
									Delete
								</button>
							</>
						)}
					</li>
				))}
			</ol>

			{todos.length === 0 && (
				<div className="empty-state">
					<p>Keine Todos vorhanden. Füge dein erstes Todo hinzu!</p>
				</div>
			)}
		</div>
	);
}
export default ToDoList;
