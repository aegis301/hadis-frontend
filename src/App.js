import "./App.css";
import React from "react";
import PatientsList from "./components/PatientsList";

function App() {
	return (
		<div className="App">
			<React.StrictMode>
				<div>
					<PatientsList></PatientsList>
				</div>
			</React.StrictMode>
		</div>
	);
}

export default App;
