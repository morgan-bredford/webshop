import React, { useContext } from 'react';
import { DispatchContext } from '../contexts/contexts'
import { NavLink } from "react-router-dom";

function Menu(props) {
    const dispatch = useContext(DispatchContext)

    const setCategory = category => {
        dispatch({type: 'current_category', payload: category})
        props.setShowMenu(false)
    }

    return (
            <nav className="menubar">
                <ul className="nav_ul menu_nav_ul">
                    <li><h3 className="h3_kategorier">kategorier</h3></li>
                    <NavLink to={{pathname: "/category", search: "?category=frukt"}} className="navlink" onClick={ () => setCategory('frukt') }>
                        <li>frukt</li>
                    </NavLink>
                    <NavLink to={{pathname: "/category", search: "?category=kläder"}} className="navlink" onClick={ () => setCategory('kläder') }>
                        <li>kläder</li>
                    </NavLink>
                    <NavLink to={{pathname: "/category", search: "?category=kök"}} className="navlink" onClick={ () => setCategory('kök') }>
                        <li>kök</li>
                    </NavLink>
                    <NavLink to={{pathname: "/category", search: "?category=möbler"}} className="navlink" onClick={ () => setCategory('möbler') }>
                        <li>möbler</li>
                    </NavLink>
                    <NavLink to={{pathname: "/category", search: "?category=elektronik"}} className="navlink" onClick={ () => setCategory('elektronik') }>
                        <li>elektronik</li>
                    </NavLink>
                </ul>
                <span className="menu_close" onClick={() => props.setShowMenu(false)} >stäng x</span>
            </nav>

    )
}

export default Menu;
