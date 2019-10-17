import { Injectable } from "@angular/core";
import { Store } from '@fav-stores/store';
import { SettingsState } from '@fav-stores/states/settings-state';

@Injectable()
export class SettingsStore extends Store<SettingsState> {

    constructor() {
        super(new SettingsState());
    }

    setUrl(url: string): void {

        this.setState({
            ...this.state,
            url: url
        });
    }

    setWidth(width: number): void {

        this.setState({
            ...this.state,
            width: width
        });
    }

    setHeight(height: number): void {

        this.setState({
            ...this.state,
            height: height
        });
    }

    setShowTimestamps(showTimestamps: boolean): void {

        this.setState({
            ...this.state,
            showTimestamps: showTimestamps
        });
    }
}
