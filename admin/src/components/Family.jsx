import React, { useState, useEffect } from 'react'
import Header from "./Header";
import {app} from "../config";
import FamilyModal from "./FamilyModal";
import {Link} from "react-router-dom";

export default function Family() {
    const [family, setFamily] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)


    const getFamilyMembers = async () => {
        let data = []
        await app.database().ref('family/')
            .on('value', snapshot => {
                snapshot.forEach(item => {
                    data.push(item)
                })
            })
        await setFamily(data)
    }

    useEffect(() => {
        getFamilyMembers()
    }, [loading, modal])

    const deleteFamilyMember = async (id) => {
        await app.database().ref('family/' + id).remove()
        setLoading(!loading)
    }
    return (
        <div>
            <Header/>

            <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center px-6 py-5">
                <div className="title is-4">Семейные древа</div>
                <div className="button is-link" onClick={() => setModal(true)}>Добавить</div>
                { modal ? <FamilyModal modal={modal} setModal={setModal} /> : null }
            </div>

            <div className="usersContainer mb-6">
                <div className="userHeader is-flex is-flex-direction-row">
                    <div className="userHeaderItem column is-3">Ползователь</div>
                    <div className="userHeaderItem column is-3">ФИО родственника</div>
                    <div className="userHeaderItem column is-3">Добавлено</div>
                    <div className="userHeaderItem column is-2">Жалобы</div>
                </div>

                {family ? family.map(item => (
                    <div className="usersInfoContainer is-flex is-flex-direction-row
                            is-align-items-center">
                        {console.log(item)}
                        <div className="column is-3 usersInfoItem">{item.val().family_id}</div>
                        <Link to={`/family-member/${item.val().id}`} className="column is-3 usersInfoItem">{item.val().name + ' ' + item.val().surname}</Link>
                        <div className="column is-3 usersInfoItem">{}</div>
                        <div className="column is-2 usersInfoItem">{}</div>
                        <div className="button is-danger" onClick={() => deleteFamilyMember(item.key)}>Удалить</div>
                    </div>
                )) : null }
            </div>
        </div>
    )
}
