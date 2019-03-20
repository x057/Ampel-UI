import * as React from 'react';

import { Dropdown, Item } from './dropdown';
import { NavigationItems } from './navigation-items';

interface Props<T extends Item> {
    mainItems: Array<T>;
    subItems: Array<T>;
    dropdownLabel: string;
    // Seems to be a bug in TS `(item: T)` does not work.
    selectedItemWhen: <P extends T>(item: P) => boolean;
}

class Topbar<T extends Item> extends React.Component<Props<T>> {
    public render() {
        return (
            <div className="topbar" data-qa="topbar">
                <div className="left">
                    <div className="topbar-logo" />
                    <NavigationItems items={this.props.mainItems} selectedItemWhen={this.props.selectedItemWhen} />
                </div>
                <div className="right">
                    <Dropdown
                        id="topbar-misc-dropdown"
                        selectedItemWhen={this.props.selectedItemWhen}
                        label={this.props.dropdownLabel}
                        items={this.getSubItems()}
                    />
                </div>
            </div>
        );
    }

    private getSubItems() {
        return this.props.subItems.map((item) => ({ ...item, isHeader: true }));
    }
}

export { Topbar };