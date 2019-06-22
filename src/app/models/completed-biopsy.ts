import { BiopsyType } from './biopsy-type';
import { Receptors } from './receptors';
import { BiopsySite } from './biopsy-site';
import { Histology } from './histology';
import { Features } from './features';

export class CompletedBiopsy {
    id: string;
    reportText: string;
    procedureDate: string;
    reportDate: string;
    pathologistName: string;
    facility: string;
    type: BiopsyType;
    site: BiopsySite;
    histology: Histology;
    receptors: Receptors;
    features: Features;
}