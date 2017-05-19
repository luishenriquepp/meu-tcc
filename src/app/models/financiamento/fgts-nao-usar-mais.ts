import {IProcessFgts} from './i-process-fgts';
import {FgtsDependency} from './fgts-dependency';

export class FgtsNaoUsarMais implements IProcessFgts {
    
    public Process(dependency: FgtsDependency, mes: number): void {
        return;
    }
}