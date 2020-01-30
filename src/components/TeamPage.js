import React from 'react';

const openDotaKey = '?api_key=' + process.env.REACT_APP_OPEN_DOTA_KEY
const dotaBuff = 'https://www.dotabuff.com/matches/'

class TeamPage extends React.Component{
    state = {
        currentTeamMembers: [],
        latestMatches: []
    }

    fetchPlayers = (id) => {
        fetch(`https://api.opendota.com/api/teams/${id}/players/${openDotaKey}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({currentTeamMembers: data.filter(teamMember => teamMember.is_current_team_member === true)})
            })
    }

    fetchLatestMatches = (id) => {
        fetch(`https://api.opendota.com/api/teams/${id}/matches/${openDotaKey}`)
            .then(resp => resp.json())
            .then(data => {
                //console.log(data.slice(0,5))
                this.setState({latestMatches: data.slice(0,5)})
            })
    }

    componentDidMount(){
        let selectedTeam = this.props.teams.find(team => parseInt(team.id) === parseInt(this.props.match.params.id))
        this.fetchPlayers(selectedTeam.attributes.api_id)
        this.fetchLatestMatches(selectedTeam.attributes.api_id)
    }

    renderMatches = () => {
        return <ul className='list-group'>
            {this.state.latestMatches.map((match) => {
                return <li className='list-group-item' key={match.match_id}>
                    <h6>Tournament: {match.league_name}</h6>
                    <p>Opponent: {match.opposing_team_name}</p>
                    <p>Result: { (match.radiant_win === true && match.radiant === true) || (match.radiant_win === false && match.radiant === false) ? 'Win' : 'Loss'}</p>
                    <a href={`${dotaBuff}${match.match_id}`} target="_blank" rel="noopener noreferrer">To DotaBuff Match Info</a>
                </li>
            })}
        </ul>
    }

    renderTeamInfo = (selectedTeam) => {
        let winPercentage = parseFloat(selectedTeam.attributes.wins / 
            (selectedTeam.attributes.wins + selectedTeam.attributes.losses) * 100)
            .toFixed(1)
        return (
            <>
                <div className="row mb-10">
                    <div className='col-2'>
                        <img className='px-1' alt='team logo' src={selectedTeam ? selectedTeam.attributes.logo_url : ''}/>
                    </div>
                    <div className='stats col-3'>
                        <h2>{selectedTeam.attributes.name}</h2>
                        <p>Wins: {selectedTeam.attributes.wins} - Losses: {selectedTeam.attributes.losses}</p>
                        <p>Win Percentage: {winPercentage}%</p>
                    </div>
                </div>
                <div className='row'>
                    <div className="teamMembers col-4">
                        <h3>Current Team Members</h3>
                        <ul className='list-unstyled'>
                            {this.state.currentTeamMembers.map((teamMember) => {
                            return <li key={`${selectedTeam.attributes.tag}.${teamMember.name}`}>{teamMember.name}</li>
                            })}
                        </ul>
                    </div>
                    <div className='col'>
                        <h3>Latest Matches</h3>
                        {this.renderMatches()}
                    </div>
                </div>
            </>
        )
    }

    render(){
        let selectedTeam = this.props.teams.find(team => parseInt(team.id) === parseInt(this.props.match.params.id))
        //console.log(this.state)

        return (
            <div className='teamshow'>
                <div className="mb-20" onClick={() => this.props.history.goBack()}><span role='img' aria-label="back">⬅️ Go Back</span></div>
                {selectedTeam && this.renderTeamInfo(selectedTeam)}
            </div>
        )
    }
}

export default TeamPage