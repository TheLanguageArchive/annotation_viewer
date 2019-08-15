import { EafMetadata } from "@fav-models/eaf/metadata";
import { EafHeader } from "@fav-models/eaf/header";
import { EafTimeslot } from '@fav-models/eaf/timeslot';
import { EafTier } from '@fav-models/eaf/tier';
import { EafRefAnnotation } from '@fav-models/eaf/ref-annotation';
import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';
import { OrderedMap } from '@fav-models/ordered-map';

export class Eaf {

    metadata: EafMetadata;
    header: EafHeader;
    timeslots: OrderedMap<string, EafTimeslot>;
    tiers: OrderedMap<string, EafTier>;
    annotations: OrderedMap<string, EafRefAnnotation | EafAlignableAnnotation>;

    constructor(metadata: EafMetadata, header: EafHeader, timeslots: OrderedMap<string, EafTimeslot>, tiers: OrderedMap<string, EafTier>, annotations: OrderedMap<string, EafRefAnnotation | EafAlignableAnnotation>) {

        this.metadata    = metadata;
        this.header      = header;
        this.timeslots   = timeslots;
        this.tiers       = tiers;
        this.annotations = annotations;
    }

    getTier(id: string): EafTier {
        return !!this.tiers[id] ? this.tiers[id] : null;
    }

    getTimeslot(id: string): EafTimeslot {
        return !!this.timeslots[id] ? this.timeslots[id] : null;
    }

    getDuration(start: EafTimeslot, end: EafTimeslot) {

        if (start.time > end.time) {
            return start.time - end.time;
        } else {
            return end.time - start.time;
        }
    }
}
