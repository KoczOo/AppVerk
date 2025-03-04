import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthTokenService} from "../services/auth-token.service";
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {

    const auth: AuthTokenService = inject(AuthTokenService);
    const router: Router = inject(Router);
    const mainPage: UrlTree = router.parseUrl("");
    const login: UrlTree = router.parseUrl("login");

    const isLoginPage: boolean = route.routeConfig?.path === "login";

    if (auth.isLoggedIn()) {
        return isLoginPage ? mainPage : true;
    } else {
        return isLoginPage ? true : login;
    }

};
