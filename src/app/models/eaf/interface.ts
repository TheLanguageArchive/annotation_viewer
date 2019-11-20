export interface EafMetadataInterface {

    author: string;
    date: number;
    format: string;
    version: string;
}

export interface EafMediaInterface {

    id: number;
    url: string;
    mimetype: string;
    relative: string;
    audio: boolean;
}

export interface EafMediaManagerInterface {

    media: EafMediaInterface[];
    count: number;
    first: EafMediaInterface;
}

export interface EafHeaderPropertyInterface {

    name: string;
    value: string;
}

export interface EafHeaderInterface {

    mediafile: string;
    timeunits: string;
    media: EafMediaManagerInterface;
    properties: EafHeaderPropertyInterface[];
}

export interface EafTimeslotInterface {

    id: string;
    time: number;
}

export interface EafAlignableAnnotationInterface {

    id: string;
    type: string;
    value: string;
    start: EafTimeslotInterface;
    end: EafTimeslotInterface;
    custom_start: EafTimeslotInterface | null;
    custom_end: EafTimeslotInterface | null;
}

export interface EafRefAnnotationInterface {

    id: string;
    type: string;
    value: string;
    ref: string | null;
    referenced_annotation: EafAlignableAnnotationInterface | null;
    previous: string | null;
    previous_annotation: EafRefAnnotationInterface | null;
    custom_start: EafTimeslotInterface | null;
    custom_end: EafTimeslotInterface | null;
}

export interface EafTierInterface {

    id: string;
    locale: string;
    annotations: (EafRefAnnotationInterface | EafAlignableAnnotationInterface)[];
    linguistic_type: string;
}

export interface EafInterface {

    metadata: EafMetadataInterface;
    header: EafHeaderInterface;
    timeslots: EafTimeslotInterface[];
    tiers: EafTierInterface[];
}

export default EafInterface;
