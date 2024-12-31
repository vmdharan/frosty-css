import React, { KeyboardEvent, ReactNode, useCallback, useState } from 'react';
import UIPanel, { UIPosition } from '../UIPanel';
import * as styles from './index.module.scss';
import UIButton from '../UIButton';

type UITabbedChatPanelPropsType = {
    title?: string;
    tabs: UITabbedChatPanelContentPropsType[];
    position: UIPosition;
    update: (newX: number, newY: number, position: UIPosition) => void;
};

type UITabbedChatPanelContentPropsType = {
    title: string;
    content: ReactNode;
};

const UITabbedChatPanel = (props: UITabbedChatPanelPropsType) => {
    const [activeTab, setActiveTab] = useState(0);
    const [channelText, setChannelText] = useState(props.tabs.map((t) => t.content));
    const [inputText, setInputText] = useState('');

    const handleInput = (e: KeyboardEvent) => {
        if (e.code == 'Enter') {
            e.preventDefault();
            const updatedText = channelText;
            updatedText[activeTab] += '\n' + inputText;
            setChannelText(updatedText);
            setInputText('');
        }
    };

    const panelContent = useCallback(
        () => (
            <>
                <div className={styles['ui-tabbed-chat-panel']}>
                    <div className={styles['ui-tabbed-chat-panel-header']}>
                        {props.tabs.map((tab, index) => (
                            <button
                                key={tab.title}
                                onClick={() => setActiveTab(index)}
                                className={
                                    index === activeTab
                                        ? styles[
                                              'ui-tabbed-chat-panel-header-button-active'
                                          ]
                                        : styles[
                                              'ui-tabbed-chat-panel-header-button'
                                          ]
                                }
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    {channelText.map((tab, index) => (
                        <div
                            key={index + '-channel'}
                            className={
                                index === activeTab
                                    ? styles['ui-tabbed-chat-panel-content-active']
                                    : styles['ui-tabbed-chat-panel-content']
                            }
                        >
                            <textarea
                                rows={8}
                                cols={50}
                                readOnly
                                style={{ border: 'none' }}
                                value={tab?.toString()}
                            ></textarea>
                        </div>
                    ))}

                    <div className={styles['ui-tabbed-chat-panel-actions']}>
                        <input
                            type="text"
                            maxLength={256}
                            className={styles['ui-tabbed-chat-panel-actions-input']}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleInput}
                        />
                    </div>
                </div>
            </>
        ),
        [activeTab, inputText, channelText],
    );

    return (
        <>
            <UIPanel
                title={props.title}
                content={panelContent()}
                position={props.position}
                update={props.update}
                classNames={styles['ui-tabbed-chat-panel-base']}
            />
        </>
    );
};

export default UITabbedChatPanel;
