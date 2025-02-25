import {Component, computed, inject, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../validators/email-validator";

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private fb = inject(FormBuilder);

    protected form = this.fb.group({
        email: new FormControl('', [Validators.required, emailValidator()]),
        password: new FormControl('', [Validators.required]),
    });

    readonly isRequired = (controlName: string) => {
        const control = this.form.get(controlName);
        return !! (control && control.invalid && control.touched && control.errors?.['required'] && !control.value );
    }

    readonly isEmailValid = (() => {
        const control = this.form.get('email');
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
