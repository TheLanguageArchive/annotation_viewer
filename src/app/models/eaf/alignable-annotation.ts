import { EafTimeslot } from "@fav-models/eaf/timeslot";

export class EafAlignableAnnotation {

    id: string;
    type: string;
    value: string;
    start: EafTimeslot;
    end: EafTimeslot;
    custom_start: EafTimeslot | null;
    custom_end: EafTimeslot | null;

    /**
     * @TODO fix this so we don't need this
     * only added to suppress compiler
     * EafTier has annotations property that can contain either EafRefAnnotation or EafAlignable
     * and the different annotation components use this property to check whether a reference is available (@see TopLevelComponent)
     */
    ref = null;

    constructor(id: string, type: string, value: string, start: EafTimeslot, end: EafTimeslot, custom_start: EafTimeslot | null, custom_end: EafTimeslot | null) {

        this.id           = id;
        this.type         = type;
        this.value        = value;
        this.start        = start;
        this.end          = end;
        this.custom_start = custom_start;
        this.custom_end   = custom_end;
    }
}
