import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';

export class EafRefAnnotation {

    id: string;
    type: string;
    value: string;
    ref: string | null;
    referenced_annotation: EafAlignableAnnotation | null;
    custom_start: number | null;
    custom_end: number | null;

    constructor(id: string, type: string, value: string, ref: string | null, referenced_annotation: EafAlignableAnnotation | null, custom_start: number | null, custom_end: number | null) {

        this.id                    = id;
        this.type                  = type;
        this.value                 = value;
        this.ref                   = ref;
        this.referenced_annotation = referenced_annotation;
        this.custom_start          = custom_start;
        this.custom_end            = custom_end;
    }
}
