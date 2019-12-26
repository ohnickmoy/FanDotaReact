import React from 'react';
import TeamCard from "../components/TeamCard";

const TestUserAPI = 'http://localhost:3000/api/v1/users/2'

class FollowedTeamsContainer extends React.Component {

    state = {
        myTeams: []
    }

    componentDidMount(){
        fetch(TestUserAPI)
            .then(response => response.json())
            .then(data => {
                //console.log('fetch data in followedTeams',data.included)
                this.setState({myTeams: data.included})
            })
    }

    renderTeams = () => {
        return this.state.myTeams.map((team) => {
            return <TeamCard key={'ftc'+ team.attributes.tag}id={team.id} attributes={team.attributes}/>
        })
    }

    render(){
        //console.log('FOLLOWED TEAMS PROPS', this.props)
        return (
            <div className='container'>
                <div className='row'>
                    {this.renderTeams()}
                </div>
            </div>
        )
    }
}

export default FollowedTeamsContainer;