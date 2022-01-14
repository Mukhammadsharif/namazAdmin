import React from 'react'
import { ErrorMessage } from 'formik'

export default function ValidationErrorMessage({ className, name, ...attributes }) {
    return (
        <ErrorMessage
            name={name}
            {...attributes}
            render={(msg) => <div className={`text-danger ${className}`}>{msg}</div>} />
    )
}
