import React, { ReactNode, useEffect, useState } from 'react';
import UIButton from './components/UIButton';
import UIPanel, { UIComponent, UIPosition } from './components/UIPanel';
import UITooltip from './components/UITooltip';
import UIActionPanel from './components/UIActionPanel';
import UITabbedPanel from './components/UITabbedPanel';
import UITabbedChatPanel from './components/UITabbedChatPanel';

const lipsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const App = () => {
    const defaultPositions = [
        { x: 0, y: 0, positionIndex: 0 },
        { x: 0, y: 0, positionIndex: 1 },
        { x: 0, y: 0, positionIndex: 2 },
    ];
    const uiConfig = localStorage.getItem('UIConfiguration');
    const initialPositions = uiConfig ? JSON.parse(uiConfig) : defaultPositions;
    const [uiPositions, setUIPositions] = useState<UIPosition[]>(initialPositions);
    const uiComponents: UIComponent[] = [];

    const ResetUIConfiguration = () => {
        setUIPositions([
            { x: 0, y: 0, positionIndex: 0 },
            { x: 0, y: 0, positionIndex: 1 },
            { x: 0, y: 0, positionIndex: 2 },
        ]);
        SaveUIConfiguration();
    };

    const UpdateUIComponent = (newX: number, newY: number, position: UIPosition) => {
        position = { ...position, x: newX, y: newY };
        console.log(newX, newY, position);
        setUIPositions((prev) => {
            return [
                ...prev.filter((f) => f.positionIndex != position.positionIndex),
                position,
            ];
        });
        SaveUIConfiguration();
    };

    const InitialiseUIConfiguration = () => {
        uiComponents.push({
            positionIndex: 0,
            component: (
                <UIActionPanel
                    key={0}
                    title="Action bar 1"
                    position={uiPositions[0]}
                    update={UpdateUIComponent}
                    buttons={[
                        { label: '1' },
                        { label: '2' },
                        { label: '3' },
                        { label: '4' },
                        { label: '5' },
                        { label: '6' },
                        { label: '7' },
                        { label: '8' },
                        { label: '9' },
                        { label: '10' },
                        { label: '11' },
                        { label: '12' },
                    ]}
                />
            ),
        });

        uiComponents.push({
            positionIndex: 1,
            component: (
                <UITabbedPanel
                    key={1}
                    title="Configuration"
                    position={uiPositions[1]}
                    update={UpdateUIComponent}
                    tabs={[
                        { title: 'tab 1', content: <>MyContent</> },
                        { title: 'tab two', content: <>Some more content</> },
                        { title: 'Tab 3', content: <>Different content</> },
                        { title: 'myTab 4', content: <>Same content.</> },
                    ]}
                />
            ),
        });

        uiComponents.push({
            positionIndex: 2,
            component: (
                <UITabbedChatPanel
                    key={2}
                    title="Chat"
                    position={uiPositions[2]}
                    update={UpdateUIComponent}
                    tabs={[
                        { title: 'Channel 1', content: lipsum },
                        { title: 'Channel two', content: lipsum },
                        { title: 'Channel 3', content: lipsum },
                        { title: 'Channel 4', content: lipsum },
                    ]}
                />
            ),
        });
    };

    const SaveUIConfiguration = () => {
        localStorage.setItem(
            'UIConfiguration',
            JSON.stringify(uiPositions?.map((config) => config)) ?? '',
        );
    };

    InitialiseUIConfiguration();

    return (
        <>
            <>frosty-css</>
            <br />

            {/* <UIButton variant='primary' content='Primary' />
            <UIButton variant='secondary' content='Secondary' />
            <UIButton variant='text' content='Text' />
            <br />

            <UIPanel title='UI Panel' content='UI Panel content goes here.' />
            <br />

            <UIPanel content='UI Panel without title. Some content goes here.' />
            <br />

            <UITooltip title='UI Tooltip' content='Tooltip content goes here.' />
            <br /> */}

            {uiComponents.map((config: UIComponent) => config.component)}
        </>
    );
};

export default App;
