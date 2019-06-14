import { SurgicalFeatureEnum } from "../enums/surgical-feature-enum";
import { SurgicalMarginEnum } from "../enums/surgical-margin-enum";
import { SurgeryTypeEnum } from "../enums/surgery-type-enum";
import { SurgeryHistologyEnum } from "../enums/surgery-histology-enum";
import { EstrogenReceptor } from "./er-receptor";
import { ProgesteroneReceptor } from "./pr-receptor";
import { Her2Receptor } from "./her2-receptor";
import { GradeEnum } from '../enums/grade-enum';

export class SurgicalPathology {
    surgeryType: SurgeryTypeEnum;
    surgeryHistology: SurgeryHistologyEnum;
    er: EstrogenReceptor;
    pr: ProgesteroneReceptor;
    her2: Her2Receptor;
    surgicalFeature: SurgicalFeatureEnum;
    tumorGrade: GradeEnum;
    surgicalMargin: SurgicalMarginEnum;
    surgeryDate: string;
    id: string;
}