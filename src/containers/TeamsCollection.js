import React from 'react'
import TeamCard from "../components/TeamCard";

class TeamsCollection extends React.Component{

    renderTeams = () => {
        return this.props.teams.map((team) => {
            return <TeamCard id={team.id} attributes={team.attributes}/>
        })
    }

    render(){
        return (
            <div className='w3-container'>
                {this.renderTeams()}
            </div>
        )
    }
}

export default TeamsCollection