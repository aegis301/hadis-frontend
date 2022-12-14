import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

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

export default function UpdatePatientDialog(patientToUpdate, id) {
	const [open, setOpen] = React.useState(false);
	const [patient, setPatient] = React.useState(patientToUpdate);
	const { fetchPatients } = React.useContext(PatientsContext);

	const handleClickOpen = () => {
		console.log(open);
		console.log(setOpen);
		console.log(patient);
		console.log(setPatient);
		console.log(fetchPatients);

		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const updatePatient = () => {
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
				<DialogTitle id="dialog-title">Update patient</DialogTitle>
				<DialogContent>
					<DialogContentText id="dialog-description">
						Update the patient below:
					</DialogContentText>
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
					<Button onClick={updatePatient} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
