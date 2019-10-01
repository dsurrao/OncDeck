import { ChemotherapyRegimenEnum } from 'src/app/enums/chemotherapy-regimen-enum';
export class Chemotherapy {
    id: string;
    regimen: ChemotherapyRegimenEnum;
    regimenOther: string;
    startDate: string;
    plannedCycles: string;
    calculatedEndDate: string;
    actualEndDate: string;
}