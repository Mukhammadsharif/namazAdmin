import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from "../config";

export default function Header() {
    const navigation = useNavigate()
    const [navTitle, setNavTitle] = useState({ users: false, books: false, promotion: false })

    return (
        <>
            <div className="headerContainer is-flex is-flex-direction-row is-justify-content-space-between px-6 is-align-items-center">
                <p className="fairyTaleText">Намаз</p>
                <p className="headerTitle">Панель администратора</p>
                <button
                    className="button is-link logOutButton customFont"
                    onClick={() => {
                        logout()
                        navigation('/')
                    }}>
                    Выйти
                </button>
            </div>

            <div className="navContainer is-flex is-flex-direction-row px-6 is-align-items-center">
                <Link
                    to="/users"
                    className={navTitle.users ? "customFont ml-6 navItem navItemActive" : "customFont ml-6 navItem"}
                    onClick={() => {
                        setNavTitle({
                            users: true,
                            books: false,
                            promotion: false
                        })
                    }}>
                    Пользователи
                </Link>

                <Link
                    to="/family-tree"
                    className={navTitle.books ? "customFont ml-6 navItem navItemActive" : "customFont ml-6 navItem"}
                    onClick={() => {
                        setNavTitle({
                            users: false,
                            books: true,
                            promotion: false
                        })
                    }}>
                    Семейные древа
                </Link>

                {/*<Link*/}
                {/*    to="/chat"*/}
                {/*    className={navTitle.promotion ? "customFont ml-6 navItem navItemActive" : "customFont ml-6 navItem"}*/}
                {/*    onClick={() => {*/}
                {/*        setNavTitle({*/}
                {/*            users: false,*/}
                {/*            books: false,*/}
                {/*            promotion: true*/}
                {/*        })*/}
                {/*    }}>*/}
                {/*</Link>*/}
            </div>
        </>
    )
}
