import { EafMetadata } from "@fav-models/eaf/metadata";
import { EafHeader } from "@fav-models/eaf/header";
import { EafTier } from '@fav-models/eaf/tier';
import { EafRefAnnotation } from '@fav-models/eaf/ref-annotation';
import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';
import { OrderedMap } from '@fav-models/ordered-map';

export class Eaf {

    metadata: EafMetadata;
    header: EafHeader;
    tiers: OrderedMap<string, EafTier>;
    annotations: OrderedMap<string, EafRefAnnotation | EafAlignableAnnotation>;

    constructor(metadata: EafMetadata, header: EafHeader, tiers: OrderedMap<string, EafTier>, annotations: OrderedMap<string, EafRefAnnotation | EafAlignableAnnotation>) {

        this.metadata    = metadata;
        this.header      = header;
        this.tiers       = tiers;
        this.annotations = annotations;
    }
}
