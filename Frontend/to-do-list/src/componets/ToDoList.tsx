import { useState } from "react"; // wir importieren aus der Bibiliothek  ein werkzeug von react vergiss nicht {Hook} in klammer zu setzten

//Bauplan/Schablone jedes mal wenn ich Todo anspreche oder haben will müssen sie im folgendem format sein in python währe das ein Dictonary
interface Todo {
	id: number; // <= Perso
	text: string;
	isDone: boolean; // <= is für State wichtig
	category: string;
}
// Function alles kommt hier rein was nicht Universell definiert werden muss wie die Schablone
function ToDoList() {
	// const definieren den wert und funktionieren wie ein Storehaus der text usw speichert const [wert, setwert] = useState(...)
	const [text, setText] = useState<string>(""); // <= wert text hier liest er den akktuellen wert(text) setWert(setText) ändert den wert
	const [items, setItems] = useState<Todo[]>([]); // <= grün ist immer für den Daten typ string ect Todo ist auch ein weil ich es definiert hab
	const [editingId, setEditingId] = useState<number | null>(null); // <= 0 wird benutzut um etwas auf Falsch oder nichts zu setzten
	const [editText, setEditText] = useState<string>(""); // <= zwischen speicher für den wenn ich ein text editere da keine datenbank
	const [openId, setOpenId] = useState<number | null>(null);
	const [inputvalue, setInputValue] = useState<string>("");
	const [listTitle, setListTitle] = useState<string>("Meine To-Do-Liste");

	// hier kommt die Logik vom Code wie er mit den Daten umgehen soll
	// Produktionsmaschine hier wird aus der Schablone das Todo gebaut und zu recht sortiert in ein array
	const handleAdd = () => {
		if (!text.trim()) return; // trim entfernt leerzeichen und ! bricht den comand ab wenn der text leer sein sollte
		const newTodo: Todo = {
			// Gib die Schablone als vorgefertigtes Teil wieder
			id: Date.now(), // <= Id werden benutz um datei zu identifizieren da ich keine datenbank hab nutzt er die Uhrzeit in Millisekunden
			text: text, // <= der text a.k.a der Name vom Todo wird dann als text definiert
			isDone: false, // <= um Task als erledigt zu modifkieren muss man den state von den Todo ändern das geht mir den Boolean und wir setzten es als dafualt False
			category: "Kategorie",
		};
		setItems([...items, newTodo]); // <= nimmt alle alten items(... steht für alle) und stellt eine nue liste an in den fall wahr items aber immer leer
		setText(""); // <= setzt die Input box wieder als leeres Feld nach der benutzung
	};
	// sorgt dafür das ich den state von meinen wert überprüfen kann und austausche zwischen True und False
	const handletoggle = (id: number) => {
		setItems(
			items.map(
				(
					item, // .map such in der liste items und erstellt eine kopie davon
				) => (item.id === id ? { ...item, isDone: !item.isDone } : item), // ? steht für if  True also wenn wahr dann (wenn item.id gleich ist wie id dann ändere den state von False auf True)
			),
		);
	};
	const startEdit = (item: Todo) => {
		// nimmt die schablone für Todos un erstellt eine kopie von der liste
		setEditingId(item.id); // sucht die id um die richtige Todo zu bearbeiten
		setEditText(item.text); // sorgt dafür das wenn man auf das bearbeiten drückt das alte text angezeigt wird statt ein leeres Feld
	};
	const handleSave = (id: number, neuerText: string) => {
		// hier sind 2 werte in der klammer weil er die id: nummber prüfen muss un den text ändern
		setItems(
			// macht es so das der bearbeitete text von der kopierten liste in der echten liste an der richtgen stelle  setzt
			items.map((item) => {
				if (item.id === id) {
					// normale if funktion wenn (..) wahr ist gib des wieder züruck
					return { ...item, text: neuerText };
				}
				return item; // Wichtig: Das muss noch innerhalb der map-Klammer sein! return item gib einfach das was voher drinne wahr wenn das if  Fasle währe
			}),
		);
		setEditingId(null); // bendet den Bearbeitungs modus in dem er den state wieder auf False setzt (null)
	};

	// ist für das Löschen von Todos
	const handleDelete = (id: number) => {
		// Id wird als nummer definiert
		setItems(items.filter((item) => item.id !== id)); // <= Behält alle Items, deren ID nicht der gelöschten ID entspricht. Was übereinstimmt, fliegt raus.
	};
	const handlecategory = (id: number) => {
		if (openId == id) {
			setOpenId(null);
		} else {
			setOpenId(id);
		}
	};

	const handleCategoryChange = (id: number, newCategory: string) => {
		setItems(
			items.map((item) =>
				item.id == id ? { ...item, category: newCategory } : item,
			),
		);
		setOpenId(null);
	};

	// gib den code wieder a.k.a alles was man dann auf der website sieht wie ein Schaufenster
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
									Abrechen
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
													onClick={() => {
														handleCategoryChange(item.id, "📚Schule");
													}}
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
export default ToDoList; // datein müssen dammit is importiert werden können ein export default am ende haben mit den Name der funktion
