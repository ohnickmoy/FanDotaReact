import React from 'react';
import TeamsCollection from "../containers/TeamsCollection";

const TeamsAPI = 'http://localhost:3000/api/v1/teams'
class DotaTeamsPage extends React.Component {

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
        console.log(this.state.teams)
        return (
            <div>
                <TeamsCollection teams={this.state.teams}/>
            </div>
        )
    }
}

export default DotaTeamsPage;