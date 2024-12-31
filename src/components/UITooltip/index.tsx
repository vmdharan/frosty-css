import React from 'react';
import * as styles from './index.module.scss';
import UIPanel from '../UIPanel';
import UIButton from '../UIButton';

type UITooltipPropsType = {
    title?: string;
    content: string;
};

const UITooltip = (props: UITooltipPropsType) => {
    const panelContent = (
        <>
            <div>{props.content}</div>
            <div style={{ textAlign: 'end' }}>
                <UIButton variant="primary" content="Close" />
            </div>
        </>
    );

    return (
        <>
            <UIPanel
                title={props.title}
                content={panelContent}
                classNames={styles['ui-tooltip']}
            />
        </>
    );
};

export default UITooltip;
