import { EstrogenReceptor } from './er-receptor';
import { ProgesteroneReceptor } from './pr-receptor';
import { Her2Receptor } from './her2-receptor';

export class ReceptorStatus {
    er: EstrogenReceptor;
    pr: ProgesteroneReceptor;
    her2: Her2Receptor;
}