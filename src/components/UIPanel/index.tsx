import React, { ReactNode, RefObject, useRef, useState } from 'react';
import * as styles from './index.module.scss';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type UIPosition = {
    x: number;
    y: number;
    positionIndex: number;
};

type UIComponent = {
    positionIndex: number;
    component: ReactNode;
};

type UIPanelPropsType = {
    title?: string;
    content: ReactNode;
    classNames?: string;
    position: UIPosition;
    update: (newX: number, newY: number, position: UIPosition) => void;
};

const UIPanel = (props: UIPanelPropsType) => {
    const ref = useRef<HTMLDivElement>(null);
    const [bounds, setBounds] = useState({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    });

    const handleOnStart = (e: any, d: any) => {
        if (d) {
            setBounds({
                left: -d.node.offsetLeft,
                right: window.innerWidth - d.node.offsetWidth,
                top: -d.node.offsetTop,
                bottom: window.innerHeight - d.node.offsetTop - d.node.offsetHeight,
            });
        }
    };

    return (
        <Draggable
            nodeRef={ref as RefObject<HTMLElement>}
            handle=".handle"
            bounds={bounds}
            onStart={handleOnStart}
            onStop={(e: DraggableEvent, data: DraggableData) =>
                props.update(data.x, data.y, props.position)
            }
            defaultPosition={{
                x: props.position.x > 0 ? props.position.x : 0,
                y: props.position.y > 0 ? props.position.y : 0,
            }}
        >
            <div
                ref={ref as RefObject<HTMLDivElement>}
                className={[props?.classNames, styles['ui-panel']].join(' ')}
            >
                <div className={['handle', styles['ui-panel-title-bar']].join(' ')}>
                    <div className={styles['ui-panel-title']}>{props.title}</div>
                    <div className={styles['ui-panel-title-btn-close']}>X</div>
                </div>
                <div>{props.content}</div>
            </div>
        </Draggable>
    );
};

export default UIPanel;

export type { UIPosition, UIComponent };
