import React from 'react'
import { sendPasswordResetEmail } from "../config";
import axios from "axios";

export default function Buttons({ disabled, id, email, disable, setDisable }) {

    const disableUser = (id) => {
         axios.put(`https://react-express-corss.herokuapp.com/users/${id}`, {disabled: true})
    }

    const unDisableUser = (id) => {
          axios.put(`https://react-express-corss.herokuapp.com/user/${id}`, {disabled: false})
    }

    const deleteUser = (id) => {
        axios.delete(`https://react-express-corss.herokuapp.com/user-delete/${id}`)
    }

    return (
        <>
            {!disabled ? (
                <button
                    className="button is-warning is-small custom-button"
                    onClick={() => {
                        disableUser(id)
                        setDisable(!disable)
                    }}>
                    Блокировать
                </button>
            ) : (
                <button
                    className="button is-warning is-small custom-button"
                    onClick={() => {
                        unDisableUser(id)
                        setDisable(!disable)
                    }}>
                    Разблокировать
                </button>
            )}
            <button
                  className="button is-success is-small custom-button"
                onClick={() => sendPasswordResetEmail(email)}>
                Сбросить пароль
            </button>

            <button
                className="button is-danger is-small custom-button"
                onClick={() => {
                    deleteUser(id)
                    setDisable(!disable)
                }}>
                Удалить
            </button>
        </>
    )
}
