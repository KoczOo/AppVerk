import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {LoginComponent} from './components/login/login.component';
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoaderComponent} from './components/loader/loader.component';
import {provideHttpClient} from "@angular/common/http";
import {InputFormFieldComponent} from './components/controls/input-form-field/input-form-field.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        LoaderComponent,
        InputFormFieldComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        NgbModule,

    ],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule {
}
