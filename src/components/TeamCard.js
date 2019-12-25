import React from 'react'

const TeamCard = (props) => {
    const {attributes} = props;

    return (
        <div className='w3-card-4' style={{width:'25%'}}>
            <img src={attributes.logo_url} />
            <div className='w3-container w3-center'>
                <h2>{attributes.name}</h2>
                <p>Wins: {attributes.wins} - Losses:{attributes.losses}</p>
    <p>Win Percentage: {parseFloat(attributes.wins / (attributes.wins + attributes.losses) * 100).toFixed(1)}%</p>
            </div>
        </div>
    )
}

export default TeamCard