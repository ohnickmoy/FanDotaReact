import React from 'react';
import './App.css';
import DotaTeamContainer from './containers/DotaTeamContainer';
import FollowedTeamsContainer from './containers/FollowedTeamsContainer'
import NavBar from './components/NavBar'
import Login from './components/login'
import { Route, Switch } from 'react-router-dom'

const TeamsAPI = 'http://localhost:3000/api/v1/teams'
const TestUserAPI = 'http://localhost:3000/api/v1/users/2'
const TeamFollowerAPI = 'http://localhost:3000/api/v1/team_followers'
class App extends React.Component {

  state = {
    teams: [],
    followedTeams: []
    //loggedIn: false
  }

  componentDidMount() {
    fetch(TeamsAPI)
    .then(response => response.json())
    .then(data => {
      this.setState({teams: data.data})
    })

    fetch(TestUserAPI)
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      this.setState({followedTeams: data.included})
    })
  }

  handleFollowTeam = (id) => {
    //console.log('Made it')
    fetch(TeamFollowerAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        team_id: id, user_id: 2
      })
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data.included[0])
      //console.log(this.state.followedTeams)
      let updatedFollowTeams = [...this.state.followedTeams, data.included[0]]
      this.setState({followedTeams: updatedFollowTeams})
    })
  }

  handleUnfollowTeam = (id) => {
    fetch(TeamFollowerAPI + '/unfollow', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        team_id:id, user_id: 2
      })
    })
    .then(response => response.json())
    .then(data => {
      let unfollowedTeamID = data.data.attributes.team_id
      let updatedFollowTeams = this.state.followedTeams.filter(team => parseInt(team.id) !== unfollowedTeamID )
      this.setState({followedTeams: updatedFollowTeams})
    })
  }

  render() {
      console.log('followedTeams from App',this.state.followedTeams)
      return (
      <div>
        <NavBar loggedIn={this.state.loggedIn}/>
        <Switch>
          <Route path='/myteams' render={(routerProps) => <FollowedTeamsContainer followedTeams={this.state.followedTeams} handleUnfollowTeam={this.handleUnfollowTeam} {...routerProps}/>} />
          <Route path='/teams' render={(routerProps) => <DotaTeamContainer teams={this.state.teams} followedTeams={this.state.followedTeams} handleFollowTeam={this.handleFollowTeam} handleUnfollowTeam={this.handleUnfollowTeam} {...routerProps}/>} />
          <Route path='/login' component={Login}/>
          <Route exact path='/' render={() => <div><h2 className='text-center'>Welcome to FanDota!</h2></div>} />
        </Switch>
      </div>
    )
  }
}

export default App;
