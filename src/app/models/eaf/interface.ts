export interface EafMetadataInterface {

    author: string;
    date: number;
    format: string;
    version: string;
}

export interface EafMediaInterface {

    id: number;
    filename: string;
    url: string;
    mimetype: string;
    relative: string;
    audio: boolean;
    offset: number;
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

export interface EafAlignableAnnotationInterface {

    id: string;
    type: string;
    value: string;
    start: number;
    end: number;
    custom_start: number | null;
    custom_end: number | null;
    ref: null;
}

export interface EafRefAnnotationInterface {

    id: string;
    type: string;
    value: string;
    ref: string | null;
    referenced_annotation: EafAlignableAnnotationInterface | null;
    custom_start: number | null;
    custom_end: number | null;
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
    tiers: EafTierInterface[];
}

export default EafInterface;
