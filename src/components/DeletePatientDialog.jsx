import React from "react";
import axios from "axios";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	IconButton,
	DialogActions,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const PatientsContext = React.createContext({
	patients: [],
	fetchPatients: () => {},
});

export default function DeletePatientDialog(patientToDelete) {
	const [open, setOpen] = React.useState(false);
	const patient = patientToDelete.patientToDelete;
	const { fetchPatients } = React.useContext(PatientsContext);

	const handleClickOpen = () => {
		console.log(patient);
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const deletePatient = () => {
		axios
			.delete(`http://localhost:8000/patient/${patient.id}`)
			.then((response) => {
				console.log(patient.id);
				console.log(response);
				handleClose();
				fetchPatients();
			})
			.catch((error) => {
				console.log(patient.patientToDelete);
				console.log(error);
			});
	};

	return (
		<div>
			<IconButton aria-label="delete" onClick={handleClickOpen}>
				<Delete />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle id="dialog-title">Delete patient</DialogTitle>
				<DialogContent>
					<DialogContentText id="dialog-description">
						Are you sure you want to delete this patient?
					</DialogContentText>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={deletePatient}>Delete</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</div>
	);
}
