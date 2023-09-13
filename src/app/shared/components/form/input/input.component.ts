import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';

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
  public onChange: (value: string | null) => void = () => {};
  public onTouched: () => void = () => {};
  public value: FormControl<string | null> = new FormControl(null);
  private unsubscriber$: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.value.valueChanges.pipe(takeUntil(this.unsubscriber$)).subscribe((value: string | number | null) => {
      this.onChange(this.value.value);
      this.onTouched!();
    })
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
