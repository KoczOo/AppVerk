import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {LoginCredentials} from "../dto/model/LoginCredentials";
import {AuthTokenService} from "./auth-token.service";
import {Router} from "@angular/router";
import {AuthRestService} from "./auth-rest.service";
import {catchError, tap, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private authRestService: AuthRestService, private authTokenService: AuthTokenService, private router: Router) {
    }

    loginCredentials: LoginCredentials;

    onLogin(form: FormGroup) {
        this.loginCredentials = new LoginCredentials(
            form.value.email,
            form.value.password,
        )
        return this.authRestService.login(this.loginCredentials).pipe(
            tap(token => {
                this.authTokenService.setToken(token);
                this.router.navigate(['/']);
            }),
            catchError(error => {
                this.authTokenService.removeToken();
                console.error('Login failed:', error);
                return throwError(() => error);
            })
        );
    }

    onLogout() {
        this.authTokenService.removeToken();
        window.location.reload();
    }
}
