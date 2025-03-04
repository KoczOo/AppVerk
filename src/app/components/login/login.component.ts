import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../validators/email-validator";
import {AuthService} from "../../services/auth.service";
import {LoaderService} from "../../services/loader.service";

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {

    private fb: FormBuilder = inject(FormBuilder);
    private authService: AuthService = inject(AuthService)
    private loaderState: LoaderService = inject(LoaderService);

    form: FormGroup = this.fb.group({
        email: new FormControl('', [Validators.required, emailValidator()]),
        password: new FormControl('', [Validators.required]),
    });

    login(loginForm: FormGroup) {
        loginForm.markAllAsTouched();
        if (loginForm.invalid) {
            return;
        }

        this.loaderState.changeLoaderState(true);

        this.authService.onLogin(loginForm).subscribe();

    }

    getErrorMessage(controlName: string): string | null {
        const control = this.form.get(controlName);
        if (!control || !control.touched || !control.errors) return null;

        if (control.errors['required']) return 'Pole jest wymagane';
        if (control.errors['invalidEmail']) return 'Nieprawidłowy format e-mail';

        return null;
    }
}
