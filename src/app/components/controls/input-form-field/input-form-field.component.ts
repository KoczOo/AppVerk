import {Component, forwardRef, Input} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from "@angular/forms";


@Component({
    selector: 'app-input-form-field',
    standalone: false,
    templateUrl: './input-form-field.component.html',
    styleUrl: './input-form-field.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFormFieldComponent),
            multi: true
        }
    ]
})
export class InputFormFieldComponent implements ControlValueAccessor {
    @Input() id: string = '';
    @Input() label: string = '';
    @Input() type: 'text' | 'password' = 'text';
    @Input() placeholder = '';
    @Input() errorMessage: string | null = null;

    value: string = '';
    disabled = false;

    onChange: (value: string) => void = () => {
    };
    onTouched: () => void = () => {
    };

    writeValue(value: string): void {
        this.value = value || '';
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInput(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value;
        this.value = inputValue;
        this.onChange(inputValue);
    }

}
