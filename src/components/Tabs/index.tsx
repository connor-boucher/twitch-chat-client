import { Component, createSignal, Index, Match, Switch } from 'solid-js';

import type { Tab } from 'types';

interface TabsProps {
    tabs: Tab[];
}

const Tabs: Component<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = createSignal(0);

    return <div class="tabs-frame">
        <ul>
            <Index each={tabs}>
                {(tab, i) =>
                    <li onClick={() => setActiveTab(i)}>{tab().name}</li>
                }
            </Index>
        </ul>

        <Switch>
            <Index each={tabs}>
                {(tab, i) =>
                    <Match when={activeTab() === i}>
                        {tab().content}
                    </Match>
                }
            </Index>
        </Switch>
    </div>; 
};

export { Tabs };