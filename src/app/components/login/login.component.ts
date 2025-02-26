import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../validators/email-validator";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService: AuthService = inject(AuthService)
    isLoading = signal(false);

    form = this.fb.group({
        email: new FormControl('', [Validators.required, emailValidator()]),
        password: new FormControl('', [Validators.required]),
    });

    readonly isRequired = (controlName: string) => {
        const control = this.form.get(controlName);
        return !!(control && control.invalid && control.touched && control.errors?.['required'] && !control.value);
    }

    readonly isEmailValid = (() => {
        const control = this.form.get('email');
        return !!(control && control.invalid && control.touched && control.errors?.['invalidEmail']);
    })

    login(loginForm: FormGroup) {
        loginForm.markAllAsTouched();
        if (loginForm.invalid) {
            return;
        }

        this.isLoading.set(true);

        this.authService.onLogin(loginForm).subscribe({
            next: () => {
                this.isLoading.set(false);
            },
            error: () => {
                this.isLoading.set(false);
            }
        });
    }
}
