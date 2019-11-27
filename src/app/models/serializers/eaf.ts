import { OrderedMap } from '@fav-models/ordered-map';
import { Eaf } from '@fav-models/eaf';
import { EafMetadata } from '@fav-models/eaf/metadata';
import { EafHeader } from '@fav-models/eaf/header';
import { EafMedia } from '@fav-models/eaf/media';
import { EafProperty } from '@fav-models/eaf/property';
import { EafTimeslot } from '@fav-models/eaf/timeslot';
import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';
import { EafRefAnnotation } from '@fav-models/eaf/ref-annotation';
import { EafTier } from '@fav-models/eaf/tier';
import { EafInterface } from '@fav-models/eaf/interface';
import { EafMediaManager } from '@fav-models/eaf/media-manager';

export function SerializeEaf(eaf: EafInterface) {

    let media = [];
    for (let item of eaf.header.media.media) {
        media.push(new EafMedia(item.id, item.filename, item.url, item.mimetype, item.relative, item.audio, item.offset));
    }

    let mediaManager = new EafMediaManager(media, eaf.header.media.count, eaf.header.media.first);

    let properties = [];
    for (let item of eaf.header.properties) {
       properties.push(new EafProperty(item.name, item.value));
    }

    let metadata  = new EafMetadata(eaf.metadata.author, eaf.metadata.date, eaf.metadata.format, eaf.metadata.version);
    let header    = new EafHeader(eaf.header.mediafile, eaf.header.timeunits, mediaManager, properties);

    let timeslots = new OrderedMap<string, EafTimeslot>();
    for (let id in eaf.timeslots) {

        let item = eaf.timeslots[id];
        timeslots.set(item.id, new EafTimeslot(item.id, item.time));
    }

    let tiers           = new OrderedMap<string, EafTier>();
    let all_annotations = new OrderedMap<string, EafRefAnnotation | EafAlignableAnnotation>();

    for (let id in eaf.tiers) {

        let item        = eaf.tiers[id];
        let annotations = new OrderedMap<string, EafRefAnnotation | EafAlignableAnnotation>();

        for (let id in item.annotations) {

            let annotation = item.annotations[id];

            if (annotation.type === 'alignable') {

                annotation = (annotation as EafAlignableAnnotation);
                annotations.set(annotation.id, new EafAlignableAnnotation(annotation.id, annotation.type, annotation.value, annotation.start, annotation.end, annotation.custom_start, annotation.custom_end));

            } else {

                annotation = (annotation as EafRefAnnotation);
                annotations.set(annotation.id, new EafRefAnnotation(annotation.id, annotation.type, annotation.value, annotation.ref, annotation.referenced_annotation, annotation.previous, annotation.previous_annotation, annotation.custom_start, annotation.custom_end));
            }

            all_annotations.set(annotation.id, annotation);
        }

        tiers.set(item.id, new EafTier(item.id, item.locale, annotations, item.linguistic_type));
    }

    return new Eaf(metadata, header, timeslots, tiers, all_annotations);
}
