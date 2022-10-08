import "./App.css";
import React from "react";
import PatientsList from "./components/PatientsList";
import HadisAppBar from "./components/AppBar";

function App() {
	return (
		<div className="App">
			<React.StrictMode>
				<HadisAppBar />
				<div>
					<PatientsList></PatientsList>
				</div>
			</React.StrictMode>
		</div>
	);
}

export default App;
