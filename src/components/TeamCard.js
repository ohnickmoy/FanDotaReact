import React from 'react'

const TeamCard = (props) => {
    const {attributes} = props;
    //let winPercentage = parseFloat(attributes.wins / (attributes.wins + attributes.losses) * 100).toFixed(1)

    return (
        <div className='col-lg-2 col-md-4 col-sm-6 mb-4'>
            <div className="card h-100 teamlogo">
                <img className='px-1' src={attributes.logo_url} alt={attributes.tag} />
                <div className='card-body'>
                    <h4 className='text-center'>{attributes.name}</h4>
                    {/* <p>Wins: {attributes.wins} - Losses:{attributes.losses}</p> */}
                    {/* <p>Win Percentage: {winPercentage}%</p> */}
                </div>
            </div>
        </div>
    )
}

export default TeamCard