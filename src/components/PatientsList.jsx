import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import AddPatientDialog from "./AddPatientDialog";
import DeletePatientDialog from "./DeletePatientDialog";
import UpdatePatientDialog from "./UpdatePatientDialog";

const PatientsContext = React.createContext({
	patients: [],
	fetchPatients: () => {},
});

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
			<AddPatientDialog fetchPatients={fetchPatients}></AddPatientDialog>
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
												<UpdatePatientDialog
													patientToUpdate={patient}
													id={patient.id}
												/>
											</TableCell>
											<TableCell>
												<DeletePatientDialog
													patientToDelete={patient}
													fetchPatients={fetchPatients}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</Grid>
			</Grid>
		</PatientsContext.Provider>
	);
}
