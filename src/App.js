import React from 'react';
import './App.css';
import DotaTeamContainer from './containers/DotaTeamContainer';
import FollowedTeamsContainer from './containers/FollowedTeamsContainer'
import NavBar from './components/NavBar'
import Login from './components/login'
import Signup from './components/signup'
import { Route, Switch } from 'react-router-dom'

const API_BASE = 'http://localhost:3000/api/v1'
const TeamsAPI = 'http://localhost:3000/api/v1/teams'
//const openDotaKey = '?api_key=' + process.env.REACT_APP_OPEN_DOTA_KEY
const userAPI = 'http://localhost:3000/api/v1/users/'
const TeamFollowerAPI = 'http://localhost:3000/api/v1/team_followers'

class App extends React.Component {

  state = {
    teams: [],
    followedTeams: [],
    currentUser: null
  }

  componentDidMount() {
    fetch(TeamsAPI)
    //fetch(`${openDotaAPI}/teams/${openDotaKey}`)
    .then(response => response.json())
    .then(data => {
      //console.log(data.data)
      this.setState({teams: data.data})
    })

    if(localStorage.user_id){
      fetch(`${API_BASE}/auto_login`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authentication': localStorage.user_id
        }
      }) 
      .then(response => response.json())
      .then(data => {

        this.setUser(data)
      })
    }
  }

  redirectAndGrab = () => {
    fetch(userAPI + this.state.currentUser.data.id) 
      .then(response => response.json())
      .then(data => {

        this.setState({followedTeams: data.included}, this.props.history.push('/myteams'))
      })
  }

  setUser = (user) => {
    this.setState({
      currentUser: user
    }, () => { user ? this.redirectAndGrab() : this.props.history.push('/login')})
  }

  handleFollowTeam = (id) => {
    fetch(TeamFollowerAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authentication': localStorage.user_id
      },
      body: JSON.stringify({
        team_id: id, user_id: this.state.currentUser.data.id
      })
    })
    .then(response => response.json())
    .then(data => {
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
        team_id:id, user_id: this.state.currentUser.data.id
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
      return (
      <div>
        <NavBar currentUser={this.state.currentUser} setUser={this.setUser}/>
        <Switch>
          {this.state.currentUser ? <Route path='/myteams' render={(routerProps) => <FollowedTeamsContainer followedTeams={this.state.followedTeams} handleUnfollowTeam={this.handleUnfollowTeam} currentUser={this.state.currentUser} {...routerProps}/>} /> : ''}
          <Route path='/teams' render={(routerProps) => <DotaTeamContainer teams={this.state.teams} followedTeams={this.state.followedTeams} handleFollowTeam={this.handleFollowTeam} handleUnfollowTeam={this.handleUnfollowTeam} currentUser={this.state.currentUser} {...routerProps}/>} />
          <Route path='/login' render={(routerProps) =><Login  setUser={this.setUser} {...routerProps}/> }/>
          <Route path='/signup' render={(routerProps) =><Signup setUser={this.setUser} {...routerProps}/>}/>
          <Route exact path='/' render={() => <div><h2 className='text-center'>Welcome to FanDota!</h2></div>} />
        </Switch>
      </div>
    )
  }
}

export default App;
