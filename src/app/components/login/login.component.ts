import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../validators/email-validator";
import {AuthService} from "../../services/auth.service";
import {finalize} from "rxjs";

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {

    private fb: FormBuilder = inject(FormBuilder);
    private authService: AuthService = inject(AuthService)
    isLoading: WritableSignal<boolean> = signal(false);

    form: FormGroup = this.fb.group({
        email: new FormControl('', [Validators.required, emailValidator()]),
        password: new FormControl('', [Validators.required]),
    });

    readonly isRequired: (controlName: string) => boolean = (controlName: string) => {
        const control = this.form.get(controlName);
        return !!(control && control.invalid && control.touched && control.errors?.['required'] && !control.value);
    }

    readonly isEmailValid: () => boolean = (() => {
        const control = this.form.get('email');
        return !!(control && control.invalid && control.touched && control.errors?.['invalidEmail']);
    })

    login(loginForm: FormGroup) {
        loginForm.markAllAsTouched();
        if (loginForm.invalid) {
            return;
        }

        this.isLoading.set(true);

        this.authService.onLogin(loginForm).subscribe(() =>
            finalize(() => this.isLoading.set(false)));
    }

}
