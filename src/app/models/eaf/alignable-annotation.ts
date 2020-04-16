export class EafAlignableAnnotation {

    id: string;
    type: string;
    value: string;
    start: number;
    end: number;
    custom_start: number | null;
    custom_end: number | null;

    /**
     * @TODO fix this so we don't need this
     * only added to suppress compiler
     * EafTier has annotations property that can contain either EafRefAnnotation or EafAlignable
     * and the different annotation components use this property to check whether a reference is available (@see TopLevelComponent)
     */
    ref = null;

    constructor(id: string, type: string, value: string, start: number, end: number, custom_start: number | null, custom_end: number | null) {

        this.id           = id;
        this.type         = type;
        this.value        = value;
        this.start        = start;
        this.end          = end;
        this.custom_start = custom_start;
        this.custom_end   = custom_end;
    }
}
