import "./App.css";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import Patient from "./components/Patient";

function App() {
	const [patients, setPatients] = useState([
		{
			id: 1,
			name: "Harry Potter",
			age: 30,
			main_diagnosis: "Headache",
			date_of_birth: "1980-07-31",
		},
		{
			id: 2,
			name: "Hermione Granger",
			age: 25,
			main_diagnosis: "Cat allergy",
			date_of_birth: "1985-09-19",
		},
	]);

	// const [newPatient, setNewPatient] = useState({});

	return (
		<div className="App">
			<React.StrictMode>
				<div>
					<Typography variant="h2">Patients</Typography>
				</div>
				{patients.map((patient) => {
					return (
						<Patient
							key={patient.id}
							name={patient.name}
							age={patient.age}
							main_diagnosis={patient.main_diagnosis}
						/>
					);
				})}
			</React.StrictMode>
		</div>
	);
}

export default App;
