import React from 'react';
import TeamCard from "../components/TeamCard";
//import TeamsCollection from "../containers/TeamsCollection";

class DotaTeamContainer extends React.Component {

    renderTeams = () => {
        return this.props.teams.map((team) => {
            return <TeamCard id={team.id} attributes={team.attributes}/>
        })
    }

    render(){
        console.log(this.props)
        return (
            <div className='container'>
                <div className='row'>
                    {this.renderTeams()}
                </div>
            </div>
        )
    }
}

export default DotaTeamContainer;