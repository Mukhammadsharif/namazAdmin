import React, { useState, useEffect } from 'react'
import {Form, Formik} from "formik";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import {app} from "../config";

export default function FamilyModal({ modal, setModal }) {
    const [users, setUsers] = useState([])
    const [familyId, setFamilyId] = useState('')
    const initialValues = { name: '', surname: '', description: '', age: '', birth: '', death: '' }

    const getFamilyMembers = async () => {
        let data = []
        await app.database().ref('users/')
            .on('value', snapshot => {
                snapshot.forEach(item => {
                    if(item.val().email){
                        data.push(item)
                    }
                })
            })
        await setUsers(data)
    }

    useEffect(() => {
        getFamilyMembers()
    }, [])

    const onSubmit = async (data) => {
        const id = uuidv4()
        await app.database().ref('family/').child(id).set({
            id: id,
            name: data.name,
            surname: data.surname,
            description: data.description,
            age: data.age,
            family_id: familyId,
        })
        setModal(!modal)
    }

    return (
        <div className={modal ? "modal is-active" : 'modal'}>
            <div className="modal-background"/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Добавить родственника</p>
                    <button className="delete" aria-label="close" onClick={() => setModal(!modal)}/>
                </header>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {({ setFieldValue, values, handleChange }) => (
                            <>
                                <Form>
                                    <section className="modal-card-body">

                                    <Input
                                        className="input is-link is-focused mb-3"
                                        placeholder="Имя"
                                        name="name"
                                        type="text"
                                        required />

                                    <Input
                                        className="input is-link is-focused mb-3"
                                        placeholder="Фамилия"
                                        name="surname"
                                        type="text"
                                        required />

                                    <Input
                                        className="input is-link is-focused mb-3"
                                        placeholder="Описание"
                                        name="description"
                                        type="text"
                                        required />

                                    <Input
                                        className="input is-link is-focused mb-3"
                                        placeholder="Возрасть"
                                        name="age"
                                        type="number"
                                        required />

                                    {/*<Input*/}
                                    {/*    className="input is-link is-focused mb-3"*/}
                                    {/*    placeholder="Дата рождения"*/}
                                    {/*    name="birth"*/}
                                    {/*    type="date"*/}
                                    {/*    required />*/}

                                    {/*<Input*/}
                                    {/*    className="input is-link is-focused mb-3"*/}
                                    {/*    placeholder="Дата смерти"*/}
                                    {/*    name="death"*/}
                                    {/*    type="date"*/}
                                    {/*    required />*/}

                                    <div className="select">
                                        <select onChange={event => setFamilyId(event.target.value)}>
                                            <option></option>
                                            {users ? users.map(item => (
                                                <option value={item.val().family_id}>{item.val().email}</option>
                                            )) : null}
                                        </select>
                                    </div>
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
