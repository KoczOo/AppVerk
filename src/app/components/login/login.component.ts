import {Component, computed, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../validators/email-validator";

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private fb = inject(FormBuilder);

    protected form = signal(<FormGroup>(this.fb.group({
        email: ['', [Validators.required, emailValidator()]],
        password: ['', [Validators.required]],
    })));

    isRequired = (controlName: string) => computed(() => {
        const control = this.form().get(controlName);
        return !! (control && control.invalid && control.touched && control.errors?.['required'] && !control.value );
    })

    isEmailValid = (controlName: string) => computed(() => {
        const control = this.form().get(controlName);
        return !! (control && control.invalid && control.touched && control.errors?.['invalidEmail']);
    })

    login(loginForm: FormGroup<any>) {
        loginForm.markAllAsTouched()
        console.log(loginForm);
        if(loginForm.invalid) {
            return;
        } else {

        }
    }


}
