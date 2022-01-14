import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Header from "../components/Header"
import { Form, Formik, Field } from "formik";
import Input from "../components/Input";
import {app} from "../config";
import Buttons from "../components/Buttons";

export default function UserDetail() {
    const [user, setUser] = useState([])
    const [disable, setDisable] = useState(false)
    const { id } = useParams()
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'Ползователь',
        contacts: ''
    })


    const getCurrentUser = async () => {
        await app.database().ref('users/')
            .orderByChild('id')
            .equalTo(id)
            .on('value', snapshot => {
                   snapshot.forEach(item => {
                       setUser([...user, item.val()])
                   })
                })
    }


    useEffect(() => {
        getCurrentUser()
    }, [])


    useEffect(() => {
        if(user.length) {
            setInitialValues(prevState => ({
                ...prevState,
                name: user[0].name,
                email: user[0].email,
                phone: user[0].phone,
            }))
        }
    }, [user])

    const onSubmit = async (data) => {
        await app
            .database()
            .ref('users/')
            .child(id)
            .set({
                id: id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                status: data.status,
            }).then(r => console.log(r))
    }

    return (
        <>
            <Header />
            <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
                   {({ handleChange, values }) => (
                       <Form>
                            <div className="columns px-6 py-6">
                                <div className="column is-4">
                                    <div className="title is-4 mb-5">
                                        Ползователь
                                    </div>
                                    <Input
                                        className="input is-link is-focused"
                                        placeholder="Имя"
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}/>

                                    <Input
                                        className="input is-link is-focused mt-4"
                                        placeholder="Email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange} />

                                    <Input
                                        className="input is-link is-focused mt-4"
                                        placeholder="Телефон"
                                        name="phone"
                                        type="text"
                                        value={values.phone}
                                        onChange={handleChange} />

                                    <Input
                                        className="input is-link is-focused mt-4"
                                        placeholder="Статус"
                                        name="status"
                                        type="text"
                                    />

                                    <Input
                                        className="input is-link is-focused mt-4"
                                        placeholder="Дополнительные контактные данные"
                                        name="contacts"
                                        type="text"/>

                                    {user.length ? (
                                        <div className="is-flex is-flex-direction-column mt-4 px-6 is-justify-content-center">
                                            <Buttons
                                                disabled={user[0].disable}
                                                id={user[0].id}
                                                email={user[0].email}
                                                disable={disable}
                                                setDisable={setDisable} />
                                        </div>
                                    ) : null }
                                </div>

                                <div className="column is-8 is-flex is-flex-direction-column">
                                    <div className="is-align-self-flex-end mb-2">
                                        <button className="button is-primary mr-2" type={"submit"}>Сохранить</button>
                                        <button className="button is-danger" type={'reset'}>Отменить</button>
                                    </div>

                                    <div>
                                        <textarea
                                            className="textarea"
                                            cols={100}
                                            rows={7}
                                            placeholder={'Материалы ползователья'}/>

                                        <textarea
                                            className="textarea mt-2"
                                            cols={100}
                                            rows={7}
                                            placeholder={'Жалобы на ползователья'}/>
                                    </div>
                                </div>
                            </div>
                       </Form>
                   )}
            </Formik>
        </>
    )
}
