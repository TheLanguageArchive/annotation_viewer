import { EafRefAnnotation } from '@fav-models/eaf/ref-annotation';
import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';
import { OrderedMap } from '@fav-models/ordered-map';

export class EafTier {

    id: string;
    locale: string;
    annotations: OrderedMap<string, EafRefAnnotation | EafAlignableAnnotation>;
    linguistic_type: string;

    constructor(id: string, locale: string, annotations: OrderedMap<string, EafRefAnnotation | EafAlignableAnnotation>, linguistic_type: string) {

        this.id              = id;
        this.locale          = locale;
        this.annotations     = annotations;
        this.linguistic_type = linguistic_type;
    }
}
