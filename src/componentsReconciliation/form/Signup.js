import React, { Component } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Input,
	Label,
	Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export class Signup extends Component {
	state = {
		name: "",
		email: "",
		password: "",
	};
	handleSubmit = (e) => {
		e.preventDefault();
		if (
			this.state.name != "" &&
			this.state.email != "" &&
			this.state.password != ""
		) {
			const user = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			};
			axios
				.post("http://localhost:5000/auth/register", user)
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err));
		}
	};

	handleChange = (e) => {
		console.log(e.target);
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	render() {
		return (
			<Container style={styles.formUserContainer}>
				<Row>
					<Col style={styles.center}>
						<Card style={styles.card}>
							<CardBody>
								<Label>Name</Label>
								<Input
									type="text"
									name="name"
									id="name"
									value={this.state.name}
									onChange={this.handleChange}
								/>
								<Label>Email</Label>
								<Input
									type="email"
									name="email"
									id="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
								<Label>Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
								<br />
								<Row>
									<Col style={styles.btnContainer}>
										<Button onClick={this.handleSubmit} style={styles.button}>
											Sign Up
										</Button>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

const styles = {
	center: {
		color: "black",
	},
	formUserContainer: {
		marginTop: "15vh",
		paddingTop: "5vh",
		paddingBottom: "3vh",
		// backgroundColor: "#f6f6f6",
		minHeight: "100vh",
	},
	card: {
		border: "none",
		opacity: 0.7,
		// width: "50%",
	},
	button: {
		backgroundColor: "#008f53",
	},
	btnContainer: {
		textAlign: "right",
	},
};
export default Signup;
