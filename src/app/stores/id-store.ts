import { Injectable } from "@angular/core";
import { Store } from '@fav-stores/store';
import { IdState } from '@fav-stores/states/id-state';

@Injectable()
export class IdStore extends Store<IdState> {

    constructor() {
        super(new IdState());
    }

    setId(id: string): void {

        this.setState({
            ...this.state,
            id: id
        });
    }
}
