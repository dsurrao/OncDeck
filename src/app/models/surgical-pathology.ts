import { SurgicalFeature } from "../enums/surgical-feature";
import { SurgicalMargin } from "../enums/surgical-margin";
import { SurgeryType } from "../enums/surgery-type";
import { SurgeryHistology } from "../enums/surgery-histology";
import { EstrogenReceptor } from "../models/er-receptor";
import { ProgesteroneReceptor } from "../models/pr-receptor";
import { Her2Receptor } from "../models/her2-receptor";

export class SurgicalPathology {
    surgeryType: SurgeryType;
    surgeryHistology: SurgeryHistology;
    erReceptor: EstrogenReceptor;
    prReceptor: ProgesteroneReceptor;
    her2Receptor: Her2Receptor;
    surgicalFeature: SurgicalFeature;
    surgicalMargin: SurgicalMargin;
    surgeryDate: string;
    id: string;
}