import React, { useEffect, useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pokemon.scss';
import Pokemoncards from './Pokemoncards';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
export default function Pokemon() {

    const [pokemon, setPokemon] = useState([]);
    const [status, setStatus] = useState(true);
    const [error, setError] = useState("");

    const [input, setInput] = useState("")

    const Api = 'https://pokeapi.co/api/v2/pokemon?limit=124';

    const fetchPokemon = async () => {
        try {
            const res = await fetch(Api);
            const data = await res.json();
            // console.log(data.results)
            // we have to declare call back function into async funtion to use await inside map method 
            const detaileddata = data.results.map(async (curpokemon) => {
                const res = await fetch(curpokemon.url);
                const data = await res.json();
                return data;
            })

            const detailedResponse = await Promise.all(detaileddata);
            setPokemon(detailedResponse)
            setStatus(false);
        } catch (error) {
            setStatus(false);
            setError(error);
        }
    }


    useEffect(() => {
        fetchPokemon();
    }, [])



    // search functionality =================
    const handleSearch = pokemon.filter((card) =>
        card.name.toLowerCase().includes(input.toLowerCase())
    );



    if (status) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    if (error) {
        return (
            <>
                <h1>{error.message}</h1>
            </>
        )
    }

    return (
        <Router>
            <section>
                <header>
                    <h1 className='text-center'>Lets Catch Pokemon</h1>
                </header>

                <Routes>
                    <Route path="/" element={<Container >
                        <Row className='gy-4'>
                            <div className='form text-center'>
                                <input type="text" placeholder='Enter Pokemon Name' value={input} onChange={(e) => setInput(e.target.value)} className='w-50'/>
                            </div>
                            {/* {pokemon.map((elem) => { */}
                            {handleSearch.map((elem, index) => {
                                return (
                                    <Pokemoncards key={elem.id} pokemondata={elem} number={index} />
                                )
                            })}
                        </Row>
                    </Container>} />


                    <Route path="/Main/:id" element={<Main />} />
                </Routes>
            </section>
        </Router>
    )
}
