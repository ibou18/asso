import React from 'react'
import Form from '../components/Form'
import Text from '../components/Text'

const image = "https://picsum.photos/300/300"

const About = () => {
    return (
        <div className="container p-5">
            <h2> A propos </h2>
            <div className="row p-2"> 
                <div className="col"> 
                    <p className="text-start"> {<Text/>} </p>
                </div>
            </div>
            <div className="container">
                <h2> Nous écrire </h2> <br/>
                <div className="row"> 
                    <div className="col-7" style={{ width:"800px"}}>  
                     <Form/>
                    </div>
                    <div className="col"> 
                    <img src={image} alt="logo" width="300" height="300"/> 
                </div>  
                </div>
            </div>
        </div>
    )
}

export default About
