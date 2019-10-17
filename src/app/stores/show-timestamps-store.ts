import { Injectable } from "@angular/core";
import { Store } from '@fav-stores/store';
import { ShowTimestampsState } from '@fav-stores/states/show-timestamps-state';

@Injectable()
export class ShowTimestampsStore extends Store<ShowTimestampsState> {

    constructor() {
        super(new ShowTimestampsState());
    }

    setShowTimestamps(showTimestamps: boolean): void {

        this.setState({
            ...this.state,
            showTimestamps: showTimestamps
        });
    }
}
