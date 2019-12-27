import React from 'react'
import { Link } from 'react-router-dom'

const TeamCard = (props) => {
    // const {attributes} = props.team;
    const {logo_url, tag, name} = props.team.attributes
    //let winPercentage = parseFloat(attributes.wins / (attributes.wins + attributes.losses) * 100).toFixed(1)
    //console.log(props)
    return (
        <div className='col-lg-2 col-md-4 col-sm-6 mb-4'>
            <Link to={`/teams/${props.id}`}>
                <div className="card h-100 teamlogo">
                    <img className='px-1' src={logo_url} alt={tag} />
                    <div className='card-body'>
                        <h4 className='text-center'>{name}</h4>
                        {/* <p>Wins: {attributes.wins} - Losses:{attributes.losses}</p> */}
                        {/* <p>Win Percentage: {winPercentage}%</p> */}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default TeamCard