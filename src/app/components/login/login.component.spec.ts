import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { emailValidator } from '../../validators/email-validator';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['onLogin']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({ email: '', password: '' });
  });

  it('should mark email as required when empty', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('');
    emailControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.isRequired('email')).toBeTrue();
  });

  it('should validate email format', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.isEmailValid()).toBeTrue();
  });

  it('should mark password as required when empty', () => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue('');
    passwordControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.isRequired('password')).toBeTrue();
  });

  it('should not call login if form is invalid', () => {
    spyOn(component, 'login').and.callThrough();
    component.form.patchValue({ email: '', password: '' });
    component.login(component.form);
    expect(mockAuthService.onLogin).not.toHaveBeenCalled();
  });

  it('should handle login errors correctly', () => {
    mockAuthService.onLogin.and.returnValue(throwError(() => new Error('Login failed')));
    component.form.patchValue({ email: 'test@example.com', password: 'password123' });
    component.login(component.form);
    expect(component.isLoading()).toBeFalse();
  });
});
