import React, { useEffect, useState } from 'react'
import axios from "axios"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { Link } from "react-router-dom";
import Buttons from "../components/Buttons";

export default function Users() {
    const [users, setUsers] = useState([])
    const [disable, setDisable] = useState(false)
    const [modal, setModal] = useState(false)

    const getUsersList = async () => {
        let data = []
        await axios.get('https://react-express-corss.herokuapp.com/users').then(response => response.data.forEach(item => {
            if(item.email) {
                data.push(item)
            }
        }))
        await setUsers(data)
    }

    useEffect(() => {
        setTimeout(() => {
            getUsersList()
        }, 500)
    }, [disable])




    return (
        <>
            <Header />

            <div className="is-flex is-flex-direction-row is-justify-content-space-between px-6 mt-6">
                <p className="title is-4">Пользователи: {users ? users.length : 0}</p>
                <button
                    className="button"
                    onClick={() => setModal(!modal)}>
                    Добавить
                </button>
                { modal ? <Modal modal={modal} setModal={setModal}/> : null }
            </div>

            <div className="usersContainer mb-6">
                <div className="userHeader is-flex is-flex-direction-row">
                    <div className="userHeaderItem column is-2">ID</div>
                    <div className="userHeaderItem column is-2">Пользователь</div>
                    <div className="userHeaderItem column is-2">Статус</div>
                    <div className="userHeaderItem column is-2">Телефон</div>
                    <div className="userHeaderItem column is-2">e-mail</div>
                    <div className="userHeaderItem column is-2 ml-4">Действия</div>
                </div>

                {users ? users.map(item => (
                    <div className="usersInfoContainer is-flex is-flex-direction-row
                            is-align-items-center is-justify-content-space-between">
                        <div className="column is-2 usersInfoItem">{item.uid}</div>
                        <Link className="column is-2 usersInfoItem" to={`/user/${item.uid}`}>{item.displayName}</Link>
                        <div className="column is-2 usersInfoItem">Пользователь</div>
                        <div className="column is-2 usersInfoItem">{item.phone ? item.phone : 'Google SignIn'}</div>
                        <div className="column is-2 usersInfoItem">{item.email}</div>
                        <div className="column is-2 usersInfoItem is-flex is-flex-direction-column">
                            <Buttons
                                disabled={item.disabled}
                                id={item.uid}
                                email={item.email}
                                disable={disable}
                                setDisable={setDisable} />
                        </div>
                    </div>
                )) : null }
            </div>
        </>
    )
}
