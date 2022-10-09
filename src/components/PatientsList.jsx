import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const PatientsContext = React.createContext();

const columns = [
	{ field: "id", headerName: "ID", width: 100 },
	{ field: "name", headerName: "Name", width: 200 },
	{ field: "age", headerName: "Age", width: 30 },
	{ field: "main_diagnosis", headerName: "Main diagnosis", width: 250 },
	{ field: "date_of_birth", headerName: "Date of birth", width: 100 },
];

export default function PatientsList() {
	const [patients, setPatients] = React.useState([]);
	const rows = patients;

	React.useEffect(() => {
		axios
			.get("http://localhost:8000/patient")
			.then((response) => {
				setPatients(response.data.payload);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<PatientsContext.Provider value={patients}>
			<div style={{ height: 400, width: "100%" }}>
				<Typography variant="h4" component="h1" gutterBottom>
					{" "}
					Patients{" "}
				</Typography>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
				/>
			</div>
		</PatientsContext.Provider>
	);
}
