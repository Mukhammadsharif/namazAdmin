import React, { useContext } from 'react'
import { Context } from '../components/common/BaseContext'

export function useModal(component, style, onClose = null) {
    const { setModalComponent } = useContext(Context)

    function showModal(props) {
        const content = React.isValidElement(component) ? component : component(props)
        setModalComponent({ content, onClose, style })
    }

    function hideModal() {
        if (typeof onClose === 'function') {
            onClose()
        }

        setModalComponent(null)
    }

    return [showModal, hideModal]
}
