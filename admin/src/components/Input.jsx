import React, { Fragment } from 'react'
import { Field } from 'formik'
import ValidationErrorMessage from './ValidationErrorMessage'

export default function Input({
    name,
    className,
    type,
    validate,
    component = 'input',
    validateClass = '',
    label,
    ...attributes
}) {
    return (
        <Fragment>
            {label ? <label htmlFor={name}>{label}</label> : null}

            <Field
                className={className}
                type={type || 'text'}
                name={name}
                id={name}
                component={component}
                validate={validate}
                {...attributes} />

            <ValidationErrorMessage className={validateClass} name={name} />
        </Fragment>
    )
}
