import React from "react";
import axios from "axios";
import {
	IconButton,
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

import { Add } from "@mui/icons-material";

export default function AddPatientForm({ fetchPatients }) {
	const defaultValues = {
		name: "",
		age: "",
		main_diagnosis: "",
		date_of_birth: "",
	};
	const [newPatient, setNewPatient] = React.useState(defaultValues);
	const [open, setOpen] = React.useState(false);

	const handleInputChange = (event) => {
		const value = event.target.value;
		setNewPatient({ ...newPatient, [event.target.name]: value });
	};

	const handleSubmit = () => {
		axios
			.post("http://localhost:8000/patient", newPatient)
			.then((response) => {
				console.log(response);
				handleClose();
				fetchPatients(); // seems not to work right now
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleClickOpen = () => {
		setOpen(!open);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton aria-label="add" onClick={() => handleClickOpen()}>
				<Add />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle id="dialog-title">Add patient</DialogTitle>
				<DialogContent>
					<DialogContentText id="dialog-description">
						Add a new patient below:
					</DialogContentText>

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
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							onClick={handleSubmit}
							variant="contained"
							color="primary"
							type="submit"
						>
							Submit
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</div>
	);
}
