import React from 'react'
import Text from '../components/Text'

const image = "https://picsum.photos/300/300";
console.log(image);

const Accueil = () => {
    return (
        <div className="container justify-content-center">
            <h1 className="container p-5"> Accueil </h1>
            <div className="row p-2"> 
                <div className="col-7"> 
                    <p className="text-start"> {<Text/>} </p>
                </div>
                <div className="col align-content-center m-auto"> 
                    <img src={image} alt="logo" width="300" height="300"/> 
                </div>       
            </div>
            <div className="bg-warning" style={{ height:"200px"}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolore facere iste magnam vel obcaecati molestias corrupti perferendis quis consequuntur dolores ipsam nihil. Reprehenderit sed maiores totam nulla, porro repellat. </div>
        </div>
    )
}

export default Accueil;
