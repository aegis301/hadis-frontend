import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, Typography, TextField } from "@mui/material";

const PatientsContext = React.createContext({
	patients: [],
	fetchPatients: () => {},
});

const columns = [
	{ field: "id", headerName: "ID", width: 100 },
	{ field: "name", headerName: "Name", width: 200 },
	{ field: "age", headerName: "Age", width: 30 },
	{ field: "main_diagnosis", headerName: "Main diagnosis", width: 250 },
	{ field: "date_of_birth", headerName: "Date of birth", width: 100 },
];

function AddPatient() {
	const defaultValues = {
		name: "",
		age: "",
		main_diagnosis: "",
		date_of_birth: "",
	};

	const [newPatient, setNewPatient] = React.useState(defaultValues);
	const { fetchPatients } = React.useContext(PatientsContext);

	// this is not working
	const handleInputChange = (event) => {
		const value = event.target.value;
		setNewPatient({ ...newPatient, [event.target.name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(newPatient);

		axios
			.post("http://localhost:8000/patient", newPatient)
			.then((response) => {
				console.log(response);
				fetchPatients();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="h4">Add patient</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						id="patient-name-input"
						name="name"
						value={newPatient.name}
						type="text"
						label="Name"
						onChange={handleInputChange}
					/>
					<TextField
						id="age-input"
						name="age"
						label="Age"
						type="number"
						value={newPatient.age}
						onChange={handleInputChange}
					/>
					<TextField
						id="main-diagnosis-input"
						name="main_diagnosis"
						label="Main Diagnosis"
						type="text"
						value={newPatient.main_diagnosis}
						onChange={handleInputChange}
					/>
					<TextField
						id="dob-input"
						name="date_of_birth"
						label="Date of Birth"
						type="text"
						value={newPatient.date_of_birth}
						onChange={handleInputChange}
					/>
					<Button variant="contained" color="primary" type="submit">
						Submit
					</Button>
				</form>
			</Grid>
		</Grid>
	);
}

function UpdateTodo({ patient, id }) {
	const [patient, setPatient] = React.useState(patient);
	const { fetchPatients } = React.useContext(PatientsContext);

	const updateTodo = () => {
		axios
			.put(`http://localhost:8000/patient/${id}`, patient)
			.then((response) => {
				console.log(response);
				onClose();
				fetchPatients();
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export default function PatientsList() {
	const [patients, setPatients] = React.useState([]);
	const rows = patients;

	const fetchPatients = async () => {
		axios
			.get("http://localhost:8000/patient")
			.then((response) => {
				setPatients(response.data.payload);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	React.useEffect(() => {
		fetchPatients();
	}, []);

	return (
		<PatientsContext.Provider value={{ patients, fetchPatients }}>
			<Grid container>
				<Grid item xs={12}>
					<div style={{ height: 400 }}>
						<Typography variant="h4" component="h1" gutterBottom>
							Patients
						</Typography>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							checkboxSelection
						/>
					</div>
				</Grid>
			</Grid>
			<Grid container sx={{ mt: 10 }}>
				<Grid item>
					<AddPatient />
				</Grid>
			</Grid>
		</PatientsContext.Provider>
	);
}
