import React from 'react'
import { Link } from 'react-router-dom'

const TeamCard = (props) => {
    const {logo_url, tag, name} = props.team.attributes
    //let winPercentage = parseFloat(attributes.wins / (attributes.wins + attributes.losses) * 100).toFixed(1)
    //console.log(props)
    return (
        <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
            <div className="card h-100 teamlogo">
                <Link to={`/teams/${props.id}`}>
                    <img className='px-1' src={logo_url} alt={tag} />
                    <div className='card-body'>
                        <h4 className='text-center'>{name}</h4>
                    </div>
                </Link>
                <div className='text-center mb-2'>
                    <button onClick={props.followedTeams.some(team => team.id === props.id) ? ()=>props.handleUnfollowTeam(props.id) : () => props.handleFollowTeam(props.id)}>{
                        props.followedTeams.some(team => team.id === props.id) ? 'Unfollow': 'Follow'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TeamCard