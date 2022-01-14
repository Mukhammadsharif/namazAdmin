import React from 'react'
import {Form, Formik} from "formik";
import Input from "./Input";
import {createUser} from "../api/api_auth";

export default function Modal({ modal, setModal }) {
    const initialValues = { name: '', email: '', phone: '', password: '' }

    const onSubmit = async (data) => {
        await createUser(data.email, data.password)
        setModal(!modal)
    }

    return (
        <div className={modal ? "modal is-active" : 'modal'}>
            <div className="modal-background"/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Добавить пользователя</p>
                    <button className="delete" aria-label="close" onClick={() => setModal(!modal)}/>
                </header>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {({ setFieldValue, values }) => (
                            <>
                                <Form>
                                    <section className="modal-card-body">

                                    <Input
                                        className="input is-link is-focused mb-3"
                                        placeholder="Логин"
                                        name="name"
                                        type="text"/>

                                    <Input
                                        className="input is-link is-focused mb-3"
                                        placeholder="Email"
                                        name="email"
                                        type="email"/>

                                    <Input
                                        className="input is-link is-focused mb-3"
                                        placeholder="Телефон"
                                        name="phone"
                                        type="phone"/>

                                    <Input
                                        className="input is-link is-focused mb-3"
                                        placeholder="Пароль"
                                        name="password"
                                        type="password"/>

                                </section>
                                <footer className="modal-card-foot">
                                    <button
                                        className="button is-success"
                                        type={'submit'}>
                                        Сохранить
                                    </button>
                                    <button
                                        className="button"
                                        onClick={() => {
                                            setModal(!modal)
                                        }}>
                                        Отменить
                                    </button>
                                </footer>

                                </Form>
                            </>
                        )}
                    </Formik>
            </div>
        </div>
    )
}
