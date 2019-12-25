import React from 'react';
import './App.css';
import DotaTeamContainer from './containers/DotaTeamContainer';
import NavBar from './components/NavBar'
import { Route, Switch } from 'react-router-dom'

const TeamsAPI = 'http://localhost:3000/api/v1/teams'
class App extends React.Component {

  state = {
    teams: []
  }

  componentDidMount() {
      fetch(TeamsAPI)
      .then(response => response.json())
      .then(data => {
          this.setState({teams: data.data})
      })
  }

  render() {
      return (
      <div>
        <NavBar />
        <Switch>
          <Route path='/teams' render={(routerProps) => <DotaTeamContainer teams={this.state.teams} {...routerProps}/>} />
          <Route exact path='/' render={() => <div><h2 className='text-center'>Welcome to FanDota!</h2></div>} />
        </Switch>
      </div>
    )
  }
}

export default App;
