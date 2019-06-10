import { BiopsyTissueEnum } from '../enums/biopsy-tissue-enum';
import { BiopsySideEnum } from '../enums/biopsy-side-enum';
import { LymphNodeEnum } from '../enums/lymph-node-enum';

export class BiopsySite {
    tissue: BiopsyTissueEnum;
    otherTissue: string;
    side: BiopsySideEnum;
    lymphNode: LymphNodeEnum;
    otherLymphNode: string;
}