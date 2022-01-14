import React, { createContext, useState } from 'react'
import Message from './Message'
import Modal from './Modal'

export const Context = createContext()

export default function BaseContextWrapper({ children }) {
    const [text, setText] = useState('')
    const [className, setClassName] = useState('')
    const [modalComponent, setModalComponent] = useState({})

    return (
        <Context.Provider value={{ setText, setClassName, setModalComponent }}>
            {children}

            {text ? (
                <Message
                    text={text}
                    className={className}
                    closeMessage={() => setText(null)} />
            ) : null}

            {modalComponent && modalComponent.content ? (
                <Modal
                    isActive
                    modalStyle={modalComponent.style}
                    onClose={() => {
                        if (typeof modalComponent.onClose === 'function') {
                            modalComponent.onClose()
                        }
                        setModalComponent(null)
                    }}>
                    {modalComponent.content}
                </Modal>
            ) : null}
        </Context.Provider>
    )
}
