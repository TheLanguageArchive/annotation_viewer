import { Injectable } from "@angular/core";
import { Store } from '@fav-stores/store';
import { SettingsState } from '@fav-stores/states/settings-state';

@Injectable()
export class SettingsStore extends Store<SettingsState> {

    constructor() {
        super(new SettingsState());
    }

    buildInitialState(url: string, width: number, height: number, showTimestamps: boolean) {

        this.setState({

            ...this.state,
            action: 'initialize',
            url: url,
            width: width,
            height: height,
            showTimestamps: showTimestamps,
        });
    }

    setUrl(url: string): void {

        this.setState({

            ...this.state,
            action: 'set-url',
            url: url
        });
    }

    setWidth(width: number): void {

        this.setState({

            ...this.state,
            action: 'set-width',
            width: width
        });
    }

    setHeight(height: number): void {

        this.setState({

            ...this.state,
            action: 'set-height',
            height: height
        });
    }

    toggleShowTimestamps(): void {

        this.setState({

            ...this.state,
            action: 'toggle-show-timestamps',
            showTimestamps: !this.state.showTimestamps
        });
    }
}
