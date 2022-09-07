import React from 'react'

const ProfilUser = () => {
    return (
        <div className="container mt-2">
            
            <h1 className="container mt-5 pt-3"> 
                <span className="material-icons-round"> account_balance </span> 
             <span style={{ color:"burlywood" }}>  </span> Profil Adhérent : xxxx </h1>
            <select className="form-select">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>

            <div className="container">
                <h2> Présents : </h2>
                <div className="container row p-2 bg-warning" style={{borderRadius:"20px"}}>
                    <div className="col align-center ">
                    <span className="material-icons m-auto p-2 justify-content-center " >  check_circle_outline </span>
                        Ibrahima Diallo  
                    </div> 
                    <div className="col align-center ">
                    <span className="material-icons m-auto p-2 justify-content-center " >  check_circle_outline </span>
                        Mamadou Diallo  
                    </div> 
                    <div className="col align-center ">
                    <span className="material-icons m-auto p-2 justify-content-center " >  check_circle_outline </span>
                        Mamadou Diallo  
                    </div> 
                </div> 
            </div>

            <div className="container-fluid mt-5" >
                <h2> Ordre du jour : </h2>
                <div className="container row p-3 bg-warning " style={{ borderRadius:"20px"}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dignissimos quasi aliquid vel modi eum cumque, aperiam non rerum? Quaerat nisi vel quia officiis explicabo hic cumque saepe laborum atque. Et dicta ratione nihil magni itaque assumenda quidem error minima, temporibus iusto facilis reprehenderit inventore vero, enim eum quos. Laboriosam voluptate nostrum aut illo, natus odio aliquam! Quasi perferendis tempore numquam ab deleniti culpa nobis necessitatibus quibusdam earum amet reprehenderit quia voluptatem alias enim beatae eaque libero laudantium est, eum rem magnam. Eum, quae excepturi vero voluptate veniam minus nesciunt fugit ex facilis, pariatur distinctio illum ipsa nihil veritatis molestias quo praesentium soluta perspiciatis vitae enim harum cumque? Laborum suscipit quibusdam minima qui voluptates laboriosam accusamus totam animi tenetur dolores, sequi consequuntur culpa quae alias, aliquid officia possimus quos quam dolore. Blanditiis, temporibus iure molestias architecto rerum fuga deserunt, sit, dicta amet saepe nihil ab ipsam incidunt error. Corrupti, in?
                </div> 
            </div>
            
            <div className="container-fluid mt-5">
                <h2> Décision du Jour : </h2>
                <div className="container row p-3 bg-warning" style={{borderRadius:"20px"}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum impedit aut error accusantium. Sed magni non aperiam nihil, quas temporibus asperiores neque molestias natus possimus ipsa nostrum, commodi quidem est.
                </div> 
            </div>
            
            <div className="container row mt-2">
                <div className="col m-2 bg-danger align-center" style={{minHeight:"100px",borderRadius:"20px", color:"white"}}>
                    <div className="m-3">
                        <h2> 
                            <span className="material-icons" style={{ fontSize:"25px"}}> account_balance_wallet </span>Total Dépense </h2> <br/>
                        <h3>  - 345,00€</h3>
                    </div>
                </div>
                <div className="col m-2 bg-success align-center" style={{ minHeight:"100px",borderRadius:"20px", color:"white"}}>
                <div className="m-3">
                        <h2>  
                            <span class="material-icons">account_balance</span> Total Versement </h2> <br/>
                        <h3> + 12 532,67€</h3>
                    </div>  

                </div>
            </div>
            <div className="container m-5"> 
                <p> pour plus de détails veuillez contacter le secretaire </p>
            </div> 
        </div>
    )
}

export default ProfilUser
