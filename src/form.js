import React, { Component } from 'react';

class Form extends Component {

	constructor(props) {
		super(props)

		this.state = {
			songName: ''
		}
	}

	handlesongNameChange = (event) => {
		this.setState({
			songName: event.target.value,
			songAnswer: 'peaches'
		})
	}

	handleSubmit =(event) => {
		if(this.state.songName==this.state.songAnswer){
    			alert('Congrats!')
		}
	}

	render() {
		const { onSubmit } = this.props;
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
						<label>Username</label>
						<input 
							type="text" 
							value={this.state.songName} 
							onChange={this.handlesongNameChange} 
						/>
				</div>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default Form