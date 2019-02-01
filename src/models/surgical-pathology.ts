import { SurgicalFeature } from "./surgical-feature";
import { SurgicalMargin } from "./surgical-margin";
import { SurgeryType } from "./surgery-type";
import { SurgeryHistology } from "./surgery-histology";
import { EstrogenReceptor } from "./er-receptor";
import { ProgesteroneReceptor } from "./pr-receptor";
import { Her2Receptor } from "./her2-receptor";

export class SurgicalPathology {
    surgeryType: SurgeryType;
    surgeryHistology: SurgeryHistology;
    erReceptor: EstrogenReceptor;
    prReceptor: ProgesteroneReceptor;
    her2Receptor: Her2Receptor;
    surgicalFeature: SurgicalFeature;
    surgicalMargin: SurgicalMargin;
    id: string;
}