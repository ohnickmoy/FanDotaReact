import React from 'react'

class Login extends React.Component{
    state = {
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(response => {
            if(response.errors){
                alert(response.errors)
            }else{
                console.log(response)
                this.props.setUser(response)
                localStorage.user_id = response.data.attributes.token
            }
        })
    }

    render(){
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <input name='username' value={this.state.username} onChange={this.handleChange} placeholder='Username' />
                    <input name='password' value={this.state.password} onChange={this.handleChange} placeholder='Password' type='password' />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login