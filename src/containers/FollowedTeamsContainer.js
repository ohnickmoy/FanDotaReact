import React from 'react';
import TeamCard from "../components/TeamCard";
import TeamPage from '../components/TeamPage'
import { Switch, Route } from 'react-router-dom';

//const TestUserAPI = 'http://localhost:3000/api/v1/users/2'

class FollowedTeamsContainer extends React.Component {

    renderTeams = () => {
        return (
            <div className='row'>
                {this.props.followedTeams.map((team) => {
                    return <TeamCard key={'ftc'+ team.attributes.tag} id={team.id} team={team} followedTeams={this.props.followedTeams} handleUnfollowTeam={this.props.handleUnfollowTeam}/>
                })}
            </div>
        )
    }

    render(){
        //console.log('FOLLOWED TEAMS PROPS', this.props)
        return (
            <div className='container'>
                <Switch>
                    <Route path='/teams/:id' render={(routerProps) => <TeamPage {...routerProps} teams={this.state.myTeams} selectedTeam={{}}/>}/>
                    <Route path='/myTeams' render={() => this.renderTeams()}/>
                </Switch>
            </div>
        )
    }
}

export default FollowedTeamsContainer;