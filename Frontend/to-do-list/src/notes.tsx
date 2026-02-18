// ============================================================================
// IMPORTS - Bibliotheken die wir brauchen
// ============================================================================

// Zeile 1: Wir importieren { useState } aus der React-Bibliothek
// - "import" = Keyword um etwas von außen zu holen
// - "{ useState }" = Die geschweifte Klammer bedeutet: wir wollen NUR useState, nicht alles von React
// - "from" = Keyword das sagt: von wo holen wir es
// - "react" = Der Name der Bibliothek (muss in package.json installiert sein)
// - Das Semikolon ";" am Ende beendet die Anweisung (wie ein Punkt im Satz)
import { useState } from "react";

// ============================================================================
// INTERFACE - Bauplan für unsere Daten (wie ein Dictionary in Python)
// ============================================================================

// Zeile 8: Wir definieren ein Interface namens "Todo"
// - "interface" = Keyword in TypeScript um einen Datentyp zu definieren
// - "Todo" = Der Name unseres Datentyps (immer Großbuchstabe am Anfang)
// - "{" = Öffnende geschweifte Klammer, hier beginnt die Definition
interface Todo {
	// Zeile 9: Das Todo hat eine "id" die eine Zahl ist
	// - "id:" = Der Name der Eigenschaft, Doppelpunkt trennt Name vom Typ
	// - "number" = TypeScript-Typ für Zahlen (1, 2, 3, 100, -5, 3.14, etc.)
	// - ";" = Beendet diese Eigenschafts-Definition
	id: number; // Eindeutige Identifikationsnummer für jedes Todo

	// Zeile 10: Das Todo hat einen "text" der ein String ist
	// - "text:" = Name der Eigenschaft
	// - "string" = TypeScript-Typ für Text ("Hallo", "Sport", "abc123", etc.)
	text: string; // Der eigentliche Aufgaben-Text den der User eingibt

	// Zeile 11: Das Todo hat "isDone" das ein Boolean ist
	// - "isDone:" = Name der Eigenschaft (camelCase: erster klein, zweiter groß)
	// - "boolean" = TypeScript-Typ für true/false Werte
	isDone: boolean; // Ist die Aufgabe erledigt? true = ja, false = nein

	// Zeile 12: Das Todo hat eine "category" die ein String ist
	// - "category:" = Name der Eigenschaft
	// - "string" = Kann Werte wie "Sport", "IT", "Arbeit" haben
	category: string; // Die Kategorie der Aufgabe (Sport, IT, Schule, etc.)
}
// Schließende geschweifte Klammer beendet die Interface-Definition

// ============================================================================
// HAUPTFUNKTION - Die Komponente die alles enthält
// ============================================================================

// Zeile 17: Wir definieren die Funktion "ToDoList"
// - "function" = Keyword um eine Funktion zu definieren
// - "ToDoList" = Name der Funktion (Großbuchstabe weil es eine React-Komponente ist)
// - "()" = Leere Klammern bedeuten: diese Funktion nimmt keine Parameter
// - "{" = Öffnende geschweifte Klammer, hier beginnt der Funktionskörper
function ToDoList() {
	// ========================================================================
	// STATE - Variablen die sich ändern können und die Komponente neu rendern
	// ========================================================================

	// Zeile 22: State für den Text im Input-Feld (Add-Todo)
	// - "const" = Keyword für eine Konstante (kann nicht neu zugewiesen werden)
	// - "[text, setText]" = Array-Destructuring: wir nehmen zwei Werte aus useState
	//   - "text" = Die Variable die den aktuellen Wert enthält
	//   - "setText" = Die Funktion um den Wert zu ändern
	// - "=" = Zuweisungsoperator
	// - "useState" = React Hook der State erstellt
	// - "<string>" = TypeScript Generic: sagt dass der State ein String ist
	// - '("")' = Anfangswert ist ein leerer String ""
	// - ";" = Beendet die Anweisung
	const [text, setText] = useState<string>("");

	// Zeile 23: State für die Liste aller Todos
	// - "[items, setItems]" = Destructuring wie oben
	// - "useState<Todo[]>" = Der State ist ein Array von Todo-Objekten
	//   - "Todo[]" = Die eckigen Klammern [] bedeuten: ein Array von Todo
	// - "([])" = Anfangswert ist ein leeres Array []
	const [items, setItems] = useState<Todo[]>([]);

	// Zeile 24: State für die ID des Todos das gerade bearbeitet wird
	// - "editingId" = Speichert welches Todo gerade im Edit-Modus ist
	// - "useState<number | null>" = Der Typ ist entweder number ODER null
	//   - "|" = "oder" in TypeScript (Union Type)
	//   - "null" = Bedeutet "nichts" oder "kein Wert"
	// - "(null)" = Anfangswert ist null (nichts wird bearbeitet)
	const [editingId, setEditingId] = useState<number | null>(null);

	// Zeile 25: State für den Text während des Bearbeitens
	// - "editText" = Temporärer Speicher für den Text während man ein Todo bearbeitet
	// - Anfangswert ist "" (leer)
	const [editText, setEditText] = useState<string>("");

	// Zeile 26: State für welches Dropdown gerade offen ist
	// - "openId" = Speichert die ID des Todos dessen Kategorie-Dropdown offen ist
	// - "number | null" = Entweder eine ID oder null (geschlossen)
	const [openId, setOpenId] = useState<number | null>(null);

	// Zeile 27: State für das Custom-Kategorie Input-Feld im Dropdown
	// - "inputvalue" = Speichert was der User als eigene Kategorie eingibt
	const [inputvalue, setInputValue] = useState<string>("");

	// Zeile 28: State für den editierbaren Titel der Liste
	// - "listTitle" = Der Text der H1-Überschrift (kann vom User geändert werden)
	// - Anfangswert ist "Meine To-Do-Liste"
	const [listTitle, setListTitle] = useState<string>("Meine To-Do-Liste");

	// ========================================================================
	// FUNKTIONEN - Die Logik die bestimmt was passiert
	// ========================================================================

	// Zeile 35: Funktion um ein neues Todo hinzuzufügen
	// - "const" = Definiert eine Konstante
	// - "handleAdd" = Name der Funktion (handle + Add = behandle das Hinzufügen)
	// - "=" = Zuweisungsoperator
	// - "() =>" = Arrow Function Syntax
	//   - "()" = Keine Parameter
	//   - "=>" = Pfeil bedeutet "führt aus"
	// - "{" = Beginn des Funktionskörpers
	const handleAdd = () => {
		// Zeile 36: Prüfung ob der Input leer ist
		// - "if" = Bedingung
		// - "!" = Negationsoperator
		// - "text.trim()" = Entfernt Leerzeichen
		// - "return" = Beendet die Funktion
		if (!text.trim()) return;

		// Zeile 37: Erstellen eines neuen Todo-Objekts
		// - "const newTodo: Todo" = Variable vom Typ Todo
		// - "=" = Zuweisung
		// - "{" = Objekt-Literal
		const newTodo: Todo = {
			// Zeile 38: ID des neuen Todos
			// - "Date.now()" = Aktuelle Zeit in Millisekunden
			// - "," = Trennt Eigenschaften
			id: Date.now(),

			// Zeile 39: Text des neuen Todos
			text: text,

			// Zeile 40: Erledigt-Status
			isDone: false,

			// Zeile 41: Kategorie
			category: "Kategorie",
		};

		// Zeile 43: Füge das neue Todo zur Liste hinzu
		// - "setItems" = State-Setter
		// - "[...items, newTodo]" = Neues Array mit allen alten + neuem Todo
		//   - "..." = Spread-Operator
		setItems([...items, newTodo]);

		// Zeile 44: Leere das Input-Feld
		setText("");
	};

	// Zeile 47: Funktion um ein Todo zu togglen (abhaken/abhaken rückgängig)
	// - "(id: number)" = Parameter: die ID des Todos
	const handletoggle = (id: number) => {
		// Zeile 48-50: Map über items und ändere das richtige Todo
		// - ".map()" = Erstellt neues Array
		// - "item.id === id ? {...} : item" = Ternärer Operator
		//   - Wenn IDs gleich: neues Objekt mit geändertem isDone
		//   - Sonst: Todo unverändert
		setItems(
			items.map((item) =>
				item.id === id ? { ...item, isDone: !item.isDone } : item,
			),
		);
	};

	// Zeile 55: Funktion um Edit-Modus zu starten
	const startEdit = (item: Todo) => {
		setEditingId(item.id);
		setEditText(item.text);
	};

	// Zeile 60: Funktion um Änderungen zu speichern
	const handleSave = (id: number, neuerText: string) => {
		setItems(
			items.map((item) => {
				if (item.id === id) {
					return { ...item, text: neuerText };
				}
				return item;
			}),
		);
		setEditingId(null);
	};

	// Zeile 72: Funktion um ein Todo zu löschen
	const handleDelete = (id: number) => {
		// - ".filter()" = Behält nur Todos deren ID nicht gleich id ist
		setItems(items.filter((item) => item.id !== id));
	};

	// Zeile 76: Funktion um Dropdown zu öffnen/schließen
	const handlecategory = (id: number) => {
		if (openId == id) {
			setOpenId(null);
		} else {
			setOpenId(id);
		}
	};

	// Zeile 85: Funktion um Kategorie zu ändern
	const handleCategoryChange = (id: number, newCategory: string) => {
		setItems(
			items.map((item) =>
				item.id == id ? { ...item, category: newCategory } : item,
			),
		);
		setOpenId(null);
	};

	// ========================================================================
	// JSX RETURN - Was auf dem Bildschirm angezeigt wird
	// ========================================================================

	// Zeile 95: Return-Statement
	return (
		<div className="todo-app-container">
			<h1
				contentEditable={true}
				suppressContentEditableWarning={true}
				onBlur={(e) =>
					setListTitle(e.currentTarget.textContent || "Meine To-Do-Liste")
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
					placeholder="Neue Aufgabe..."
				/>
				<button className="btn-save" onClick={handleAdd}>
					Add
				</button>
			</div>

			<ol style={{ padding: 0 }}>
				{items.map((item) => (
					<li key={item.id} className="todo-item">
						{item.id === editingId ? (
							<>
								<input
									type="text"
									value={editText}
									onChange={(e) => setEditText(e.target.value)}
								/>
								<button
									onClick={() => handleSave(item.id, editText)}
									className="btn-save"
								>
									Speichern
								</button>
								<button
									className="btn-cancel"
									onClick={() => setEditingId(null)}
								>
									Abbrechen
								</button>
							</>
						) : (
							<>
								<input
									type="checkbox"
									checked={item.isDone}
									onChange={() => handletoggle(item.id)}
								/>
								<span
									className={`todo-text ${item.isDone ? "completed" : ""}`}
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
											{item.category} <span className="dropdown-arrow">▼</span>
										</button>
										<ul
											className={`dropdown-menu ${openId === item.id ? "show" : ""}`}
										>
											<li>
												<a
													className="dropdown-item"
													onClick={() =>
														handleCategoryChange(item.id, "💼Arbeit")
													}
												>
													💼Arbeit
												</a>
											</li>
											<li>
												<a
													className="dropdown-item"
													onClick={() => handleCategoryChange(item.id, "💻IT")}
												>
													💻IT
												</a>
											</li>
											<li>
												<a
													className="dropdown-item"
													onClick={() =>
														handleCategoryChange(item.id, "🏃Sport")
													}
												>
													🏃Sport
												</a>
											</li>
											<li>
												<a
													className="dropdown-item"
													onClick={() =>
														handleCategoryChange(item.id, "📚Schule")
													}
												>
													📚Schule
												</a>
												<div className="p-2" />
												<input
													type="text"
													className="form-control"
													placeholder="Benutzerdefiniert.."
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
													OK
												</button>
											</li>
										</ul>
									</div>
								</span>
								<button className="action-btn" onClick={() => startEdit(item)}>
									✏️
								</button>
								<button
									className="action-btn delete-btn"
									onClick={() => handleDelete(item.id)}
								>
									🗑️
								</button>
							</>
						)}
					</li>
				))}
			</ol>
		</div>
	);
}

export default ToDoList;
