import React from 'react'

export default function Button({
    text, onClick, loading, toolTip, iconStyle, style, disable = false, className, icon, type = 'button', ...rest
}) {
    return (
        <button
            onClick={onClick}
            type={type}
            title={toolTip}
            style={style}
            disabled={disable}
            className={className}
            {...rest}>

            {loading ? (
                <span className="spinner-border spinner-border-sm loading-button" />
            ) : null}

            {icon ? (
                <ion-icon
                    style={{ position: 'relative', top: 3, marginRight: 3, ...iconStyle }}
                    size="small"
                    name={icon} />
            ) : null }

            {text}
        </button>
    )
}
