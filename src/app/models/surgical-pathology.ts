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
    report: string;
    reportDate: string;
    lymphNodeDissectionType: string;
    pathologistName: string;
    pathologistFacility: string;
}