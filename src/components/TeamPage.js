import React from 'react';

class TeamPage extends React.Component{
    renderTeamInfo = (selectedTeam) => {
        let winPercentage = parseFloat(selectedTeam.attributes.wins / 
            (selectedTeam.attributes.wins + selectedTeam.attributes.losses) * 100)
            .toFixed(1)
        return (
            <>
            <img className='px-1' alt='team logo' src={selectedTeam ? selectedTeam.attributes.logo_url : ''}/>
            <div className='d-inline'>
                <h2>{selectedTeam.attributes.name}</h2>
                <p>Wins: {selectedTeam.attributes.wins} - Losses: {selectedTeam.attributes.losses}</p>
                <p>Win Percentage: {winPercentage}%</p>
            </div>
            </>
        )
    }

    render(){
        let selectedTeam = this.props.teams.find(team => parseInt(team.id) === parseInt(this.props.match.params.id))

        return (
            <div className='teamshow'>
                <div onClick={() => this.props.history.goBack()}><span role='img' aria-label="back">⬅️ Go Back</span></div>
                {selectedTeam && this.renderTeamInfo(selectedTeam)}
            </div>
        )
    }
}

export default TeamPage