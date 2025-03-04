import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {LoginCredentials} from "../dto/model/LoginCredentials";
import {AuthTokenService} from "./auth-token.service";
import {Router} from "@angular/router";
import {AuthRestService} from "./auth-rest.service";
import {catchError, finalize, tap, throwError} from "rxjs";
import {LoaderService} from "./loader.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private authRestService: AuthRestService, private authTokenService: AuthTokenService, private router: Router, private loaderState: LoaderService) {
    }

    loginCredentials: LoginCredentials;

    onLogin(form: FormGroup) {
        this.loaderState.changeLoaderState(true);
        this.loginCredentials = new LoginCredentials(
            form.value.email,
            form.value.password,
        )
        return this.authRestService.login(this.loginCredentials).pipe(
            tap((token: string) => {
                this.authTokenService.setToken(token);
                this.router.navigate(['/']);
            }),
            catchError((error: Error) => {
                this.authTokenService.removeToken();
                console.error('Login failed:', error);
                return throwError(() => error);
            }),
            finalize(() => {
                this.loaderState.changeLoaderState(false)
            })
        );
    }

    onLogout(): void {
        this.authTokenService.removeToken();
        window.location.reload();
    }
}
