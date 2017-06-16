import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from 'angularfire2/database';
import {AdvancedProperties} from '../models/financiamento/advanced-properties';
import {AuthService} from '../services/auth-service';
import {FinanciamentoService} from '../services/financiamento-services';

@Injectable()
export class FinanciamentoRemoteService {

    private entity: string = 'Financiamentos';
    
    constructor(private db: AngularFireDatabase,
                private authService: AuthService,
                private financiamentoService: FinanciamentoService) { }

    public Save(financiamento: AdvancedProperties) {
        this.db.database.ref(this.entity).child(this.authService.uId).push(financiamento);
    }

    public GetAll(): Observable<Array<AdvancedProperties>> {
        let obs = new Observable<Array<AdvancedProperties>>(observer => {
            this.authService.VerifyAuth().subscribe((user) => {
                if(user) {
                    this.db.list(this.entity+'/'+user.uid).subscribe((financiamentos) => {
                        observer.next(financiamentos);
                    });
                } else {
                    this.financiamentoService.BuscaTodos().then((financiamentos) => {
                        observer.next(financiamentos);
                    })
                }
             });
        })
        return obs;
    }
}