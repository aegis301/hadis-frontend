// import Patient from "./Patient";
import React from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import Patient from "./Patient";

const PatientsContext = React.createContext();

export default function PatientsList() {
	const [patients, setPatients] = React.useState([]);

	React.useEffect(() => {
		axios
			.get("http://localhost:8000/patient")
			.then((response) => {
				console.log(response.data.payload);
				setPatients(response.data.payload);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<PatientsContext.Provider value={patients}>
			<Typography variant="h3">Patients</Typography>
			{patients.map((patient) => {
				return (
					<Patient
						key={patient.id}
						variant="h6"
						name={patient.name}
						age={patient.age}
						main_diagnosis={patient.main_diagnosis}
						date_of_birth={patient.date_of_birth}
					/>
				);
			})}
		</PatientsContext.Provider>
	);
}
