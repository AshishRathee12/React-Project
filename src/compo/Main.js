import React, { useState } from 'react';
import './Pokemon.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Main() {
    let { id } = useParams();


    // for images ===
    const [images, setImages] = useState(null);


    // for information 
    const [info, setInfo] = useState()

    const Api = 'https://pokeapi.co/api/v2/pokemon?limit=124';


    const fetchdata = async () => {
        try {
            const res = await fetch(Api);
            const data = await res.json();
            // console.log(data)
            // console.log(data.results)
            // we have to declare call back function into async funtion to use await inside map method 
            const detaileddata = data.results.map(async (curpokemon) => {
                const res = await fetch(curpokemon.url);
                const data = await res.json();
                // console.log(data)
                return data;
            })

            const detailedResponse = await Promise.all(detaileddata);
            // console.log(detailedResponse[id])
            setInfo(detailedResponse[id]);
            const manyforms = detailedResponse[id].forms.map(async (elem) => {
                // console.log(elem)
                const maping = await fetch(elem.url);
                const data = await maping.json();
                // console.log(data.sprites)
                const images = data.sprites;
                setImages(images);
            })
        } catch (error) {

        }
    }



    // console.log(updatedata)
    useEffect(() => {
        fetchdata();
    }, [])


    if (info) {
        console.log(info)
    }



    if (info) {

        return (
            // 
            <Container>
                <Row>
                    <h1 className='text-center text-success'>{info.name}</h1>
                    <Col xl={4} lg={6} className='mains'>
                        {images ? (<div>
                            <img src={images.back_default} ></img>
                        </div>) : (<div>Loading ...</div>)}

                    </Col>
                    <Col xl={4} lg={6} className='mains'>
                        {images ? (<div>
                            <img src={images.front_default}></img>
                        </div>) : (<div>Loading ...</div>)}
                    </Col>
                    <Col xl={4} lg={6} className='mains'>
                        {images ? (<div>
                            <img src={images.back_shiny}></img>
                        </div>) : (<div>Loading ...</div>)}
                    </Col>
                    <Col xl={4} lg={6} className='mains'>
                        {images ? (<div>
                            <img src={images.front_shiny}></img>
                        </div>) : (<div>Loading ...</div>)}
                    </Col>

                </Row>
                <Row>
                    <Col>
                    <h4 className='bg-success py-2 px-4'>Height:{info.height}</h4>
                    </Col>
                    <Col>
                    <h4 className='bg-primary py-2 px-4'>Width:{info.weight}</h4>
                    </Col>
                    <Col>
                    <h4 className='bg-danger py-2 px-4'>Experience:{info.base_experience}</h4>
                    </Col>
                    <Col>
                    <h4 className='bg-success py-2 px-4'>No. of moves:{info.moves.length}</h4>
                    </Col>
                </Row>
            </Container>

        )



    }
}
