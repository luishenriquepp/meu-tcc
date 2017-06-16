import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    public isLogged: boolean = false;
    public uId;
    
    constructor(private provider: AngularFireAuth) { }
        
    public Loggin(): void {
        this.provider.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((s) => {
                this.isLogged = true;
                this.uId = this.provider.auth.currentUser.uid;                
            })
    }

    public Loggout(): void {
        this.provider.auth.signOut().then(() => {
            this.isLogged = false;
            this.uId = '';
        });
    }

    public VerifyAuth(): Observable<firebase.User> {
        return this.provider.authState;
    }
}