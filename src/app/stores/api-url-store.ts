import { Injectable } from "@angular/core";
import { Store } from '@fav-stores/store';
import { ApiUrlState } from '@fav-stores/states/api-url-state';

@Injectable()
export class ApiUrlStore extends Store<ApiUrlState> {

    constructor() {
        super(new ApiUrlState());
    }

    setUrl(url: string): void {

        this.setState({
            ...this.state,
            url: url
        });
    }
}
