import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import M from 'materialize-css'
// q@mail.ru - тестовый аккаунт!!!
export const SpecialRegisterPage = () => {

    const auth = useContext(AuthContext)
    const message = useMessage()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_check, setPasswordCheck] = useState('')
    const { loading, request, error, clearError } = useHttp()
    const isOrganizer = true 

    const initSelect = () => {
        const elems = document.querySelectorAll('select')
        M.FormSelect.init(elems)
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(initSelect)

    const pressHandler = async () => {
        try {
            if (password === password_check){
                const data = await request('/api/auth/register', 'POST', {email: email, password: password, isOrganizer})
                message(data.message)
                const data1 = await request('/api/auth/login', 'POST', {email: email, password: password})
                message(data1.message)
                auth.login(data1.token, data1.userId, data1.isOrganizer)
            } else {
                window.M.toast({ html: "Пароли не совпадают. Попробуйте снова." })
            }
        } catch (e) { }
    }

    if (loading) {
        return <Loader />
    }

    const enableCheck = (password, password_check, email) => {
        if (password && password_check && email && !loading) {
            return (false)
        } else {
            return (true)
        }
    }

    document.addEventListener('DOMContentLoaded', initSelect)

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="register-input-field">
                    <p>Email</p>
                    <input
                        placeholder="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p>Пароль</p>
                    <input
                        placeholder="Пароль"
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p>Повторите пароль</p>
                    <input
                        placeholder="Повторите пароль"
                        id="password"
                        type="password"
                        value={password_check}
                        onChange={e => setPasswordCheck(e.target.value)}
                    />
                </div>
                <button className="waves-effect waves-light btn" onClick={pressHandler} disabled={enableCheck(email, password, password_check)}>Зарегистрироваться</button>
            </div>
        </div>
    )
}