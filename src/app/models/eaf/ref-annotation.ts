import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';
import { EafTimeslot } from '@fav-models/eaf/timeslot';

export class EafRefAnnotation {

    id: string;
    type: string;
    value: string;
    ref: string | null;
    referenced_annotation: EafAlignableAnnotation | null;
    previous: string | null;
    previous_annotation: EafRefAnnotation | null;
    custom_start: EafTimeslot | null;
    custom_end: EafTimeslot | null;

    constructor(id: string, type: string, value: string, ref: string | null, referenced_annotation: EafAlignableAnnotation | null, previous: string | null, previous_annotation: EafRefAnnotation | null, custom_start: EafTimeslot | null, custom_end: EafTimeslot | null) {

        this.id                    = id;
        this.type                  = type;
        this.value                 = value;
        this.ref                   = ref;
        this.referenced_annotation = referenced_annotation;
        this.previous              = previous;
        this.previous_annotation   = previous_annotation;
        this.custom_start          = custom_start;
        this.custom_end            = custom_end;
    }
}
