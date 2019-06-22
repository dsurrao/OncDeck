import { SurgicalMarginEnum } from "../enums/surgical-margin-enum";
import { SurgeryTypeEnum } from "../enums/surgery-type-enum";
import { EstrogenReceptor } from "./er-receptor";
import { ProgesteroneReceptor } from "./pr-receptor";
import { Her2Receptor } from "./her2-receptor";
import { HistologyEnum } from '../enums/histology-enum';
import { Features } from './features';

export class SurgicalPathology {
    surgeryType: SurgeryTypeEnum;
    histology: HistologyEnum;
    er: EstrogenReceptor;
    pr: ProgesteroneReceptor;
    her2: Her2Receptor;
    features: Features;
    surgicalMargin: SurgicalMarginEnum;
    surgeryDate: string;
    id: string;
}