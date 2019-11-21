import { Injectable } from "@angular/core";
import { Store } from '@fav-stores/store';
import { MediaState } from '@fav-stores/states/media-state';
import { EafMedia } from '@fav-models/eaf/media';

@Injectable()
export class MediaStore extends Store<MediaState> {

    constructor() {
        super(new MediaState());
    }

    buildInitialState(media: EafMedia) {

        this.setState({

            ...this.state,
            action: 'initialize',
            media: media
        });
    }

    setMedia(media: EafMedia) {

        this.setState({

            ...this.state,
            action: 'set-media',
            media: media,
        });
    }
}
