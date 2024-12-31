import React from 'react';
import * as styles from './index.module.scss';

type UIButtonPropsType = {
    variant: UIButtonVariantType;
    content: string;
    classNames?: string;
};

type UIButtonVariantType = 'primary' | 'secondary' | 'text';

const UIButton = (props: UIButtonPropsType) => {
    const btnStyle = (variant: string) => {
        if (variant == 'primary') {
            return styles['ui-button-primary'];
        } else if (variant == 'secondary') {
            return styles['ui-button-secondary'];
        } else {
            return styles['ui-button-text'];
        }
    };

    return (
        <button
            className={[
                props?.classNames,
                styles['ui-button'],
                btnStyle(props.variant),
            ].join(' ')}
        >
            {props.content}
        </button>
    );
};

export default UIButton;
