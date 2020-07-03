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

            if (null === eaf) {

                this.setError();
                return;
            }

            let tiers = Array.from(eaf.tiers);

            if (tiers.length === 0) {

                this.setError();
                return;
            }

            // getting first tier and annotation
            let tier        = tiers[0][1].value;
            let annotations = Array.from(tier.annotations);
            let activeIds   = [];

            if (annotations.length > 0) {

                let annotation = annotations[0][1].value;
                activeIds = [annotation.id];
            }

            // and setting initial state
            this.setState({

                ...this.state,
                action: 'initialize',
                eaf,
                tier,
                activeIds,
            });
        });
    }

    setTier(tierId: string): void {

        this.setState({

            ...this.state,
            action: 'set-tier',
            tier: this.state.eaf.tiers.get(tierId),
            activeIds: [],
        });
    }

    activateAnnotations(annotationIds: string[]) {

        this.setState({

            ...this.state,
            action: 'activate-annotations',
            activeIds: annotationIds
        });
    }

    setError() {

        this.setState({

            ...this.state,
            action: 'error',
        });
    }
}
