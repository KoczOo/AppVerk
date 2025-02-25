import {CanActivateFn, Router} from '@angular/router';
import {AuthTokenService} from "../services/auth-token.service";
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {
    const auth: AuthTokenService = inject(AuthTokenService);
    const router: Router = inject(Router);
    const mainPage = router.parseUrl("");
    const login = router.parseUrl("login");

    const isLoginPage = route.routeConfig?.path === "login";

    if (auth.isLoggedIn()) {
        return isLoginPage ? mainPage : true;
    } else {
        return isLoginPage ? true : login;
    }
};
