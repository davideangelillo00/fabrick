import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';

type InputType = 'text' | 'number' | 'email' | 'password';

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
  @Input() isDisabled: boolean = false;
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() uniqueId: string = '';
  @Input() type: InputType = 'text';
  @Input() isRequired: boolean = false;
  @Input() errorTooltip: string | null = null;
  public onChange: (value: string | null) => void = () => {};
  public onTouched: () => void = () => {};
  public value: FormControl<string | null> = new FormControl(null);
  private unsubscriber$: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.value.valueChanges.pipe(takeUntil(this.unsubscriber$)).subscribe((value: string | number | null) => {
      this.onChange(this.value.value);
      this.onTouched!();
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

  public registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
