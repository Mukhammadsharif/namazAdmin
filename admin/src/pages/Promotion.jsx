import Header from "../components/Header"
export default function Promotion() {
    const data = [
        {
            published: "24.04.2021",
            expirationDate: "24.04.2021",
            title: "Сказки",
            file: "fdfd.jpg",
            status: "Активен"
        },
        {
            published: "24.04.2021",
            expirationDate: "24.04.2021",
            title: "Сказки",
            file: "fdfd.jpg",
            status: "Активен"
        },
        {
            published: "24.04.2021",
            expirationDate: "24.04.2021",
            title: "Сказки",
            file: "fdfd.jpg",
            status: "Активен"
        },
        {
            published: "24.04.2021",
            expirationDate: "24.04.2021",
            title: "Сказки",
            file: "fdfd.jpg",
            status: "Активен"
        },
        {
            published: "24.04.2021",
            expirationDate: "24.04.2021",
            title: "Сказки",
            file: "fdfd.jpg",
            status: "Активен"
        },
        {
            published: "24.04.2021",
            expirationDate: "24.04.2021",
            title: "Сказки",
            file: "fdfd.jpg",
            status: "Активен"
        },{
            published: "24.04.2021",
            expirationDate: "24.04.2021",
            title: "Сказки",
            file: "fdfd.jpg",
            status: "Активен"
        },{
            published: "24.04.2021",
            expirationDate: "24.04.2021",
            title: "Сказки",
            file: "fdfd.jpg",
            status: "Активен"
        }
    ]
    return (
        <>
            <Header />
            <div className="usersContainer mb-6">
                <div className="userHeader is-flex is-flex-direction-row">
                    <div className="userHeaderItem column is-2">Дата публикации</div>
                    <div className="userHeaderItem column is-2 ml-4">Дата завершения</div>
                    <div className="userHeaderItem column is-2 ml-5">Название</div>
                    <div className="userHeaderItem column is-2 ml-5">Файл</div>
                    <div className="userHeaderItem column is-3 ml-4">Статус</div>
                </div>

                {data ? data.map(item => (
                    <div className="usersInfoContainer is-flex is-flex-direction-row
                            is-align-items-center is-justify-content-space-between">
                        <div className="column is-2 usersInfoItem">{item.published}</div>
                        <div className="column is-2 usersInfoItem">{item.expirationDate}</div>
                        <div className="column is-2 usersInfoItem">{item.title}</div>
                        <div className="column is-2 usersInfoItem">{item.file}</div>
                        <div className="column is-2 usersInfoItem">{item.status}</div>
                        <div className="button is-danger">
                            <p className="usersInfoItem">Блокировать</p>
                        </div>
                    </div>
                )) : null }
            </div>
        </>
    )
}