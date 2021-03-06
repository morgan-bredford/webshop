import React, { useContext, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext, DispatchContext } from '../contexts/contexts'
import RegisterUser from './RegisterUser'
import { URL } from '../../url'
import axios from 'axios'

const LogIn = () => {
    const dispatch = useContext(DispatchContext)
    const { loggedIn, jwtToken, login_error } = useContext(UserContext)
    const loginRef = useRef(null)
    const registerRef = useRef(null)

    const login = (e) => {
        e.preventDefault()

        const credentials = {email: e.target[0].value, password: e.target[1].value}

        axios
          .post( URL + "/db/login", credentials)
          .then((res) => {
            if(res.data.user[0].admin && res.data.jwtToken){
                dispatch({type: 'jwt', payload: res.data.jwtToken}) 
            }
            dispatch({type: 'login', payload: res.data.user[0]})
          })
          .catch(err => {
            dispatch({type: 'login_failed', payload: 'Felaktigt email eller lösenord'})
            document.querySelector(".login_form_error").style.visibility = 'visible'
          })
    }

    const addAnimation = () => {
        loginRef.current.className = loginRef.current.className+" login_ani"
        registerRef.current.className = registerRef.current.className+" register_ani"
    }
    
    const removeAni = () => {
        loginRef.current.className = "login_form_section"
        registerRef.current.className = "register_form_section"
    }

    return(
        <>
            { jwtToken 
                ? <Redirect to="/admin" /> 
                : loggedIn 
                    ? <Redirect to="/" /> 
                    : null 
            }
            <main className="login_main">
                <section className="login_container">
                    <section ref={loginRef} className="login_form_section">
                        <h2>Välkommen att logga in</h2>
                        <div className="login_form_error"> { login_error && <>Felaktig email eller lösenord</> }</div>
                        <form className="login_form" onSubmit={(e) => login(e)}>
                            <div>
                                <label>Email:</label>
                                <input type="text" name="email" />
                            </div>
                            <div>
                                <label>Lösenord:</label>
                                <input type="text" name="password" />
                            </div>
                            <button style={{width: '6vw', margin: '.6em', marginLeft: '30%'}}>
                                Logga in
                            </button>
                        </form>
                        <span className="login_register_text" onClick={addAnimation}>Har du inget konto? Registrera här.</span>
                    </section>
                    <section ref={registerRef} className="register_form_section">
                        <RegisterUser removeAni={removeAni} />
                    </section>
                </section>
            </main>
        </>
    )
}

export default LogIn