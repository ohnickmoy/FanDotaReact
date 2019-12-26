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
        console.log('No idea what to do here yet')
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