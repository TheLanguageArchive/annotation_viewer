import { Eaf } from '@fav-models/eaf';
import { EafTier } from '@fav-models/eaf/tier';

export class EafState {
    eaf: Eaf;
    tier: EafTier;
    activeIds: string[];
}
