import React, { useState, useEffect } from 'react'
import Header from "../components/Header"
import { useParams } from "react-router-dom";
import {Form, Formik} from "formik";
import {app} from "../config";
import Input from "../components/Input";

export default function FamilyDetail() {
    const { id } = useParams()
    const [uid, setUid] = useState('')
    const [initialValues, setInitialValues] = useState({
        fullname: '',
        name: '',
        surname: '',
        description: '',
        age: '',
        familyMembers: []
    })

    const onSubmit = async (data) => {
        console.log(data)
        await app
            .database()
            .ref('family/')
            .child(uid)
            .set({
                id: id,
                name: data.name,
                surname: data.surname,
                description: data.description,
                age: data.age,
            }).then(r => console.log(r))
    }

    const getFamilyMember = async () => {
        await app.database().ref('family/')
            .orderByChild('id')
            .equalTo(id)
            .on('value', snapshot => {
                snapshot.forEach(item => {
                    setUid(item.key)
                    setInitialValues(prevState => ({
                    ...prevState,
                        name: item.val().name,
                        surname: item.val().surname,
                        fullname: item.val().surname + ' ' + item.val().name,
                        age: item.val().age,
                        description: item.val().description
                    }))
                })
            })
    }

    useEffect(() => {
        getFamilyMember()
    }, [])

    return (
        <div>
            <Header />

            <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
                   {({ handleChange, values }) => (
                       <Form>
                            <div className="columns px-6 py-6">
                                <div className="column">
                                    <div className="title is-4">Семейное древо : {initialValues.fullname}</div>

                                    <Input
                                        className="input is-link is-focused"
                                        placeholder="Имя"
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}/>

                                    <Input
                                        className="input is-link is-focused mt-4"
                                        placeholder="Фамилия"
                                        name="surname"
                                        type="text"
                                        value={values.surname}
                                        onChange={handleChange}/>

                                    <Input
                                        className="input is-link is-focused mt-4"
                                        placeholder="Фамилия"
                                        name="age"
                                        type="number"
                                        value={values.age}
                                        onChange={handleChange}/>

                                    <Input
                                        className="input is-link is-focused mt-4"
                                        placeholder="Описание"
                                        name="description"
                                        type="text"
                                        value={values.description}
                                        onChange={handleChange}/>
                                </div>

                                <div className="column is-flex is-flex-direction-column">
                                    <div className="is-align-self-flex-end mb-2">
                                        <button className="button is-primary mr-2" type={"submit"}>Сохранить</button>
                                        <button className="button is-danger" type={'reset'}>Отменить</button>
                                    </div>
                                </div>
                            </div>
                       </Form>
                   )}
            </Formik>
        </div>
    )
}
