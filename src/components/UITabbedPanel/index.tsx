import React, { ReactNode, useCallback, useState } from 'react';
import UIPanel, { UIPosition } from '../UIPanel';
import * as styles from './index.module.scss';
import UIButton from '../UIButton';

type UITabbedPanelPropsType = {
    title?: string;
    tabs: UITabbedPanelContentPropsType[];
    position: UIPosition;
    update: (newX: number, newY: number, position: UIPosition) => void;
};

type UITabbedPanelContentPropsType = {
    title: string;
    content: ReactNode;
};

const UITabbedPanel = (props: UITabbedPanelPropsType) => {
    const [activeTab, setActiveTab] = useState(0);

    const panelContent = useCallback(
        () => (
            <>
                <div className={styles['ui-tabbed-panel']}>
                    <div className={styles['ui-tabbed-panel-header']}>
                        {props.tabs.map((tab, index) => (
                            <button
                                key={tab.title}
                                onClick={() => setActiveTab(index)}
                                className={
                                    index === activeTab
                                        ? styles[
                                              'ui-tabbed-panel-header-button-active'
                                          ]
                                        : styles['ui-tabbed-panel-header-button']
                                }
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    {props.tabs.map((tab, index) => (
                        <div
                            key={tab.title + '-content'}
                            className={
                                index === activeTab
                                    ? styles['ui-tabbed-panel-content-active']
                                    : styles['ui-tabbed-panel-content']
                            }
                        >
                            {tab.content}
                        </div>
                    ))}

                    <div className={styles['ui-tabbed-panel-actions']}>
                        <UIButton
                            content="Cancel"
                            variant="secondary"
                            classNames={styles['ui-tabbed-panel-actions-button']}
                        />
                        <UIButton
                            content="Accept"
                            variant="primary"
                            classNames={styles['ui-tabbed-panel-actions-button']}
                        />
                    </div>
                </div>
            </>
        ),
        [activeTab],
    );

    return (
        <>
            <UIPanel
                title={props.title}
                content={panelContent()}
                position={props.position}
                update={props.update}
                classNames={styles['ui-tabbed-panel-base']}
            />
        </>
    );
};

export default UITabbedPanel;
