import { Injectable } from "@angular/core";
import { Store } from './store';
import { EafState } from './states/eaf-state';
import { EafService } from '@fav-services/eaf.service';
import { EafTier } from '../models/eaf/tier';

@Injectable()
export class EafStore extends Store<EafState> {

    constructor(private eafService: EafService) {
        super(new EafState());
        this.eafService
        .fetch()
        .subscribe(eaf => {

            // getting first tier and annotation
            let tier       = Array.from(eaf.tiers)[0][1].value;
            let annotation = Array.from(tier.annotations)[0][1].value;

            // and setting initial state
            this.setState({
                ...this.state,
                eaf,
                tier: tier,
                activeIds: [annotation.id]
            });
        });
    }

    setTier(tierId: string): void {
        this.setState({
            ...this.state,
            tier: this.state.eaf.tiers.get(tierId)
        });
    }

    activateAnnotations(annotationIds: string[]) {

        this.setState({
            ...this.state,
            activeIds: annotationIds
        });
    }
}
