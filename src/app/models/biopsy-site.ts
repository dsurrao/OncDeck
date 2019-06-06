import { BiopsyTissueEnum } from '../enums/biopsy-tissue-enum';
import { BiopsySideEnum } from '../enums/biopsy-side-enum';
import { LymphNode } from '../enums/lymph-node';

export class BiopsySite {
    tissue: BiopsyTissueEnum;
    side: BiopsySideEnum;
    lymphNode: LymphNode;
    otherTissue: string;
}