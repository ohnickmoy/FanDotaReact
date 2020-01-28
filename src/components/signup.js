import React from 'react';

class Signup extends React.Component{
    state = {
        username: '',
        password: '',
        passwordConfirmation: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.password === this.state.passwordConfirmation){
            fetch('http://localhost:3000/api/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(response => {
                if(response.errors){
                    alert(response.errors)
                }else{
                    this.props.setUser(response)
                    localStorage.user_id = response.data.attributes.token
                }
            })
        } else {
            alert('Oops, passwords do not match. Try again!')
        }
    }

    render(){
        return (
          <div className='container'>
            <form onSubmit={this.handleSubmit}>
              <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
              <input name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" type="password"/>
              <input name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} placeholder="Password Confirmation" type="password"/>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      }
}

export default Signup