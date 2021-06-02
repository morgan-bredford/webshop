import React, { useState, useContext } from 'react';
import { UserContext, DispatchContext } from '../contexts/contexts'
import { URL } from '../../url'
import axios from 'axios'

const RegisterUser = (props) => {
    const dispatch = useContext(DispatchContext)
    const { error } = useContext(UserContext)
    const [user, setUser] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: ''
    })
    const onlyLetters = new RegExp(/^[a-zA-Z-åäöÅÄÖ\@\. ]+$/)
    const [formError, setFormError] = useState('')

    const changeHandler = (  { name , value } ) => {
        setUser({...user, [name]: value})
    }

    const validateForm = () => {
        if(user.email && user.password){
            if(!onlyLetters.test(user.email) 
                || !onlyLetters.test(user.password) 
                || (user.firstname && !onlyLetters.test(user.firstname)) 
                || (user.lastname && !onlyLetters.test(user.lastname)) ){
                    setFormError('Vänligen använd bara bokstäver')
                    return false
                }else{
                    return true
                }       
        }else{
            setFormError('Vänligen fyll i både email och lösenord')
            return false
        }        
    }

    const addUser = (e) => {
        e.preventDefault()
        if( validateForm() ){
            dispatch({type: 'register_req'})

            axios
                .post( URL + "/db/registeruser", user)
                .then((res) => {
                    delete user.password
                    dispatch({type: 'register_success', payload: user})
                })
                .catch(err => dispatch({type: 'register_failed', payload: err.response.data.message}))
        }
    }

    return (
        <section >
            <h3 className="register_h3">registrera här</h3>
            <div className="form_error_display">{formError}</div>
            <form className="register_form" onSubmit={e => addUser(e)}>
                <label>Email:</label>
                <input type="text" name="email" onChange={ e => changeHandler(e.target) }/><br />
                <label>Lösenord:</label>
                <input type="password" name="password"  onChange={ e => changeHandler(e.target) }/><br />
                <label>Förnamn:</label>
                <input type="text" name="firstname"  onChange={ e => changeHandler(e.target) }/><br />
                <label>Efternamn:</label>
                <input type="text" name="lastname"  onChange={ e => changeHandler(e.target) }/><br />
                <button style={{margin: '.6em', marginLeft: '30%'}}>Registrera</button>
            </form>
            <span className="register_login_text" onClick={ () => props.removeAni() } >
                Har du redan konto? Logga in här.
            </span>
        </section>
    )
}

export default RegisterUser