import React from 'react';
import TeamCard from "../components/TeamCard";
import TeamPage from '../components/TeamPage'
import { Switch, Route } from 'react-router-dom';
//import TeamsCollection from "../containers/TeamsCollection";

class DotaTeamContainer extends React.Component {

    renderTeams = () => {
        return (
            <div className='row'>
                {this.props.teams.map((team) => {
                    return <TeamCard key={'dtc'+ team.attributes.tag} id={team.id} team={team} followedTeams={this.props.followedTeams} handleFollowTeam={this.props.handleFollowTeam} handleUnfollowTeam={this.props.handleUnfollowTeam}/>
                })}
            </div>
        )
    }

    render(){
        //console.log(this.props)
        return (
            <div className='container'>
                <Switch>
                    <Route path='/teams/:id' render={(routerProps) => <TeamPage {...routerProps} teams={this.props.teams} selectedTeam={{}}/>}/>
                    <Route path='/teams' render={() => this.renderTeams()}/>
                </Switch>
            </div>
        )
    }
}

export default DotaTeamContainer;