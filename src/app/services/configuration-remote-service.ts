import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GlobalConfiguration} from '../models/global-configuration';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from '../services/auth-service';
import {ConfigurationService} from '../services/configuration-service';

@Injectable()
export class ConfigurationRemoteService {

    private entity: string = 'Taxas';
    
    constructor(private db: AngularFireDatabase,
                private authService: AuthService,
                private configurationService: ConfigurationService) { }    

    public BuscaTodos(): Observable<Array<GlobalConfiguration>> {
        let obs = new Observable<Array<GlobalConfiguration>>(observer => {
            this.authService.VerifyAuth().subscribe((user) => {
                if(user) {
                    this.db.list(this.entity+'/'+user.uid).subscribe((taxas) => {
                        observer.next(taxas);
                    });
                } else {
                    this.configurationService.BuscaTodos().then((taxas) => {
                        observer.next(taxas);
                    })
                }
             });
        })
        return obs;
    }

    public Salva(global: GlobalConfiguration): void {
        if(this.authService.isLogged) {
            this.db.database.ref(this.entity).child(this.authService.uId).push(global);
        } else {
            this.configurationService.Salva(global);
        }
    }
}