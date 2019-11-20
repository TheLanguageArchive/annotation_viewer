import { Injectable } from "@angular/core";
import { Store } from '@fav-stores/store';
import { EafState } from '@fav-stores/states/eaf-state';
import { EafService } from '@fav-services/eaf.service';

@Injectable()
export class EafStore extends Store<EafState> {

    constructor(private eafService: EafService) {
        super(new EafState());
    }

    buildInitialState() {

        this.eafService
        .fetch()
        .subscribe(eaf => {

            // getting first tier and annotation
            let tier       = Array.from(eaf.tiers)[0][1].value;
            let annotation = Array.from(tier.annotations)[0][1].value;

            // and setting initial state
            this.setState({

                ...this.state,
                action: 'initialize',
                eaf,
                tier: tier,
                activeIds: [annotation.id]
            });
        });
    }

    setTier(tierId: string): void {

        this.setState({

            ...this.state,
            action: 'set-tier',
            tier: this.state.eaf.tiers.get(tierId)
        });
    }

    activateAnnotations(annotationIds: string[]) {

        this.setState({

            ...this.state,
            action: 'activate-annotations',
            activeIds: annotationIds
        });
    }
}
