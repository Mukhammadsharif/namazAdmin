import { useContext } from 'react'
import { Context } from '../components/BaseContext'

export function useMessage() {
    const { setText, setClassName } = useContext(Context)

    return [
        (text, className) => {
            setText(text)
            setClassName(className || 'is-dark')
        },
        () => {
            setText(null)
            setClassName('')
        },
    ]
}
