import React from 'react'
import './Pokemon.scss';
import { Col } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './Main';


export default function Pokemoncards({ pokemondata, number }) {
    const link = '/Main/' + number;
    return (
        <Col lg={4} md={6} >
            <Link to={link} as={NavLink}>
                <div className='content '>
                    <div className='card-1 d-flex flex-column justify-content-center align-items-center'>
                        <figure>
                            <img src={pokemondata.sprites.other.dream_world.front_default} alt={pokemondata.name} />
                        </figure>
                        <h3>{pokemondata.name}</h3>
                        <p>{pokemondata.types.map((elem) => elem.type.name).join(", ")}</p>
                    </div>
                    <div className='size d-flex justify-content-between'>
                        <p className='bg-primary py-2 px-3 rounded'>Height:{pokemondata.height}</p>
                        <p className='bg-danger py-2 px-3 rounded'>Weight:{pokemondata.weight}</p>
                        <p className='bg-success py-2 px-3 rounded'>Speed:{pokemondata.stats[5].base_stat}</p>
                    </div>
                </div>
            </Link >
        </Col>
    )
}
