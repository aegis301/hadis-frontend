import React from "react";
import { Typography } from "@mui/material";

export default function Patient(props) {
	return (
		<div>
			<Typography variant="h4">Patient</Typography>
			<Typography variant="h6">Name: {props.name}</Typography>
			<Typography variant="h6">Age: {props.age}</Typography>
			<Typography variant="h6">
				Main diagnosis: {props.main_diagnosis}
			</Typography>
		</div>
	);
}
