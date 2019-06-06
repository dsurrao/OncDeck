import { BiopsyType } from './biopsy-type';
import { BiopsyHistology } from './biopsy-histology';
import { BiopsyFeatures } from './biopsy-features';
import { Receptors } from './receptors';
import { BiopsySite } from './biopsy-site';

export class CompletedBiopsy {
    reportText: string;
    procedureDate: string;
    reportDate: string;
    pathologistName: string;
    facility: string;
    type: BiopsyType;
    site: BiopsySite;
    histology: BiopsyHistology;
    receptors: Receptors;
    features: BiopsyFeatures;
}