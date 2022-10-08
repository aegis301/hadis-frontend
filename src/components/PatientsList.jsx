// import Patient from "./Patient";
import React from "react";
import { Typography } from "@mui/material";
import axios from "axios";

const PatientsContext = React.createContext();

export default function PatientsList() {
	const [patients, setPatients] = React.useState([]);

	// const fetchPatients = async () => {
	// 	try {
	// 		const response = await axios.get("http://localhost:5000/patients");
	// 		setPatients(response.data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}

	// 	// const response = await axios.get("http://localhost:8000/patient");
	// 	// const patients = await response.json();
	// 	// console.log(patients.data);
	// 	// setPatients(patients.data);
	// };

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
					<Typography key={patient.id} variant="h6">
						Name: {patient.name}
					</Typography>
				);
			})}
		</PatientsContext.Provider>
	);
}
