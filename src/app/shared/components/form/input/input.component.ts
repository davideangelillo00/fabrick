import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';

type InputType = 'text' | 'number' | 'email' | 'password';
type InputValueType = string | number | null;

@Component({
  selector: 'fb-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  /** When true, input is disabled */
  @Input() isDisabled: boolean = false;
  /** Label shown above the input field */
  @Input() label!: string;
  /** Placeholder shown inside the input field */
  @Input() placeholder: string = '';
  /** Id of the input */
  @Input() uniqueId: string = '';
  /** Type of the input */
  @Input() type: InputType = 'text';
  /** When true, the input is required and a * is shown over the label */
  @Input() isRequired: boolean = false;
  /** Tooltip shown under the input, to valorise only when input is invalid */
  @Input() errorTooltip: string | null = null;
  public onChange: (value: InputValueType) => void = () => {};
  public onTouched: () => void = () => {};
  public value: FormControl<InputValueType> = new FormControl(null);
  private unsubscriber$: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.value.valueChanges.pipe(takeUntil(this.unsubscriber$)).subscribe((value: string | number | null) => {
      this.onChange(value);
      this.onTouched();
    });
    this.uniqueId = this.uniqueId || `${this.label || 'id'}-${Date.now()}`;
  }

  public ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public writeValue(value: string | null): void {
    this.value.setValue(value);
  }

  public registerOnChange(fn: (value: InputValueType) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
