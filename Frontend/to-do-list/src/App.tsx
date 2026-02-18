import "./App.css";
import ToDoList from "./componets/ToDoList";
function App() {
	return (
		<div className="app-container">
			<h1>MY To-Do-List Website</h1>

			<div className="content-wrapper"></div>
			<div className="todo-section">
				<ToDoList />
			</div>
		</div>
	);
}

export default App;
