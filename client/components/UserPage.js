import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from 'react-router-dom'
import { UserContext, DispatchContext } from '../contexts/contexts'
import { URL } from '../../url'
import axios from 'axios'

function UserPage() {
    const { email, firstname, lastname, loggedIn } = useContext(UserContext)
    const dispatch = useContext(DispatchContext)
    const [form, setForm] = useState({})
    const onlyLetters = new RegExp(/^[a-zA-Z-åäöÅÄÖ\@\. ]+$/)

    //Inserts user info into the page form 
    useEffect( () => {
        setForm({ email, firstname, lastname })
    },[])

    const handleChange = (e) => {
        if(onlyLetters.test(e.target.value)) setForm({...form, [e.target.name]: e.target.value })
    }

    //Updates the user and saves it 
    const submitHandler = (e) => {
        e.preventDefault()

        axios
            .post( URL + "/db/updateuser", form)
            .then((res) => {
                dispatch({type: 'set_user', payload: form })
            })
            .catch(err => {console.log(err.response.data.message)})
    }

    const logout = () => {
        dispatch({type: 'logout'})
    }

    return (
    <main>
        <br /><br />
        { !loggedIn ? <Redirect to='/' /> : null }
            <div style={{width: '30vw', margin: 'auto'}}>
                <form  className="login_form" onSubmit={submitHandler}>
                    <h1 style={{fontSize: '2vw'}} >Redigera dina uppgifter</h1>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text"
                        name="email"
                        id="email" 
                        defaultValue={form.email}
                        placeholder="email"
                        onChange={handleChange}
                     />
                    <br />
                        
                    {/*<label htmlFor="password">Lösenord:</label>
                    <input
                    type="text"
                    name="password"
                    id="password"
                    defaultValue={form.password}
                    placeholder="lösenord"
                    onChange={handleChange}
                    /> */}
                    <label htmlFor="firstname">Förnamn:</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        defaultValue={form.firstname}
                        placeholder="förnamn"
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="lastname">Efternamn:</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        defaultValue={form.lastname}
                        placeholder="efternamn"
                        onChange={handleChange}
                    />
                    <br />
                    <button style={{width: '6vw',height: '6vw',margin: '2vh auto 0',padding: '0px',fontSize:'.85vw',borderRadius: '50%', cursor: 'pointer'}}>
                        Uppdatera
                    </button>
                </form>
                <br />
                <Link to="/" >
                    <button  onClick={logout}>Logga ut</button>
                </Link>
            </div>
        
    </main>
    )
}

export default UserPage;
