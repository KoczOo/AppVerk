import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {HomeComponent} from "./pages/home/home.component";
import {authenticationGuard} from "./guards/authentication.guard";

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '**',
                component: HomeComponent,
                canActivate: [authenticationGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
