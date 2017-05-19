import {FgtsDependency} from './fgts-dependency';

export interface IProcessFgts {
    Process(dependency: FgtsDependency, mes: number): void;
}