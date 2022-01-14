import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Form, Formik } from "formik";
import Input from "../components/Input";
import Button from "../components/Button";
import { isAuthenticated } from "../utils/auth";
import { signIn } from '../api/api_auth'
import Message from "../components/Message";


export default function SignIn() {
    const navigation = useNavigate()
    const [error, setError] = useState(null)

    if (isAuthenticated()) {
        return <Navigate to="/users" />
    }

    async function onSubmit(data) {
        const { error, user } = await signIn(data.email, data.password)
        if(user) {
            navigation('/users')
        } else {
            setError(error)
        }
    }

    const initialValues = {email: '', password: ''}


    return (
        <div className="is-flex is-justify-content-center is-align-items-center sign-in-container">
            <div className="signInContainer is-flex is-flex-direction-column">
                <div className="is-flex is-flex-direction-column
                                is-align-items-center is-justify-content-space-around">
                    <h1 className="sign-in-title is-3">Войти</h1>
                    <p className="sign-in-subtitle mt-1">Войди и управляй</p>
                </div>

               <Formik initialValues={initialValues} onSubmit={onSubmit}>
                   {({ setFieldValue, values }) => (
                       <Form className="is-flex is-flex-direction-column is-justify-content-space-between">
                            <div className="is-flex is-flex-direction-column px-6 mt-6">
                                <Input
                                    className="input is-danger is-focused"
                                    placeholder="Логин"
                                    name="email"
                                    type="email"/>

                                <Input
                                    className="input is-danger is-focused mt-3"
                                    placeholder="Пароль"
                                    name="password"
                                    type="password"/>
                            </div>

                            <div className="is-flex is-flex-direction-row is-justify-content-space-between mt-4 px-3">
                                <div className="is-flex is-flex-direction-row is-align-items-center">
                                    <input type="checkbox" className="checkbox"/>
                                    <p className="ml-2 description-text">Сохранить мои данные</p>
                                </div>

                                <div>
                                    <p className="description-text">Забыли пароль?</p>
                                </div>
                            </div>

                            <Button
                                className="button is-danger mx-6 mb-3 mt-6"
                                type="submit"
                                text="Войти">
                                Войти
                            </Button>
                       </Form>
                   )}
               </Formik>
            </div>

            { error ? <Message text={error} delay={5}/> : null}
        </div>
    )
}
