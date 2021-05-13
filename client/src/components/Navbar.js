import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    
    return (
        <nav>
            <div className="nav-wrapper #3e2723 brown darken-4" style={{ padding: '0 2rem' }}>
                <a href="/" className="brand-logo">Иркутская Студенческая Весна</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/news">Новости</NavLink></li>
                    <li><NavLink to="/contacts">Контакты</NavLink></li>
                    <li><NavLink to="/about">О конкурсе</NavLink></li>
                    <li><NavLink to="/competition">Списки</NavLink></li>
                    <li><NavLink to="/report">Отчет</NavLink></li>
                    {/* <li><a className="dropdown-trigger" href="sass.html"><i className="material-icons">search</i></a></li> */}
                    {!auth.isAuthenticated && <li><NavLink to="/auth">Вход/Регистрация</NavLink></li>}
                    {auth.isAuthenticated && <li><a href="/" onClick={logoutHandler}>Выход</a></li>}
                </ul>
            </div>
        </nav>
    )
}