import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Delete, Edit } from "@mui/icons-material";

const PatientsContext = React.createContext({
	patients: [],
	fetchPatients: () => {},
});

// for data grid
// const columns = [
// 	{ field: "id", headerName: "ID", width: 100 },
// 	{ field: "name", headerName: "Name", width: 200 },
// 	{ field: "age", headerName: "Age", width: 30 },
// 	{ field: "main_diagnosis", headerName: "Main diagnosis", width: 250 },
// 	{ field: "date_of_birth", headerName: "Date of birth", width: 100 },
// ];

function AddPatient() {
	const defaultValues = {
		name: "",
		age: "",
		main_diagnosis: "",
		date_of_birth: "",
	};

	const [newPatient, setNewPatient] = React.useState(defaultValues);
	const { fetchPatients } = React.useContext(PatientsContext);

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

function UpdateTodo({ patientToUpdate, id }) {
	const [open, setOpen] = React.useState(false);
	const [patient, setPatient] = React.useState(patientToUpdate);
	const { fetchPatients } = React.useContext(PatientsContext);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const updateTodo = () => {
		axios
			.put(`http://localhost:8000/patient/${id}`, patient)
			.then((response) => {
				console.log(response);
				handleClose();
				fetchPatients();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<IconButton aria-label="edit" onClick={handleClickOpen}>
				<Edit />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Update patient</DialogTitle>
				<DialogContent>
					<DialogContentText>Update the patient below:</DialogContentText>
					<TextField
						id="patient-name-input"
						name="name"
						value={patient.name}
						type="text"
						label="Name"
						onChange={(e) => setPatient({ ...patient, name: e.target.value })}
					/>
					<TextField
						id="age-input"
						name="age"
						label="Age"
						type="number"
						value={patient.age}
						onChange={(e) => setPatient({ ...patient, age: e.target.value })}
					/>
					<TextField
						id="main-diagnosis-input"
						name="main_diagnosis"
						label="Main Diagnosis"
						type="text"
						value={patient.main_diagnosis}
						onChange={(e) =>
							setPatient({ ...patient, main_diagnosis: e.target.value })
						}
					/>
					<TextField
						id="dob-input"
						name="date_of_birth"
						label="Date of Birth"
						type="text"
						value={patient.date_of_birth}
						onChange={(e) =>
							setPatient({ ...patient, date_of_birth: e.target.value })
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="outlined">
						Cancel
					</Button>
					<Button onClick={updateTodo} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default function PatientsList() {
	const [patients, setPatients] = React.useState([]);
	// const rows = patients; // for data grid

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

						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell align="right">Name</TableCell>
										<TableCell align="right">Age</TableCell>
										<TableCell align="right">Main diagnosis</TableCell>
										<TableCell align="right">Date of birth</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{patients.map((patient) => (
										<TableRow
											key={patient.id}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{patient.id}
											</TableCell>
											<TableCell align="right">{patient.name}</TableCell>
											<TableCell align="right">{patient.age}</TableCell>
											<TableCell align="right">
												{patient.main_diagnosis}
											</TableCell>
											<TableCell align="right">
												{patient.date_of_birth}
											</TableCell>
											<TableCell>
												<UpdateTodo
													patientToUpdate={patient}
													id={patient.id}
													fetchPatients={fetchPatients}
												/>
											</TableCell>
											<TableCell>
												<Button>Delete</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</Grid>
			</Grid>
			<Grid container sx={{ mt: 60 }}>
				<Grid item>
					<AddPatient />
				</Grid>
			</Grid>
		</PatientsContext.Provider>
	);
}
