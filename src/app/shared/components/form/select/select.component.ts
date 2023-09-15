import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Select } from 'src/app/shared/interfaces/select';

@Component({
  selector: 'fb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  /** When true, input is disabled */
  @Input() isDisabled: boolean = false;
  /** Label shown above the input field */
  @Input() label!: string;
  /** Placeholder shown inside the input field */
  @Input() placeholder: string = 'Seleziona';
  /** Id of the input */
  @Input() uniqueId: string = '';
  /** When true, the input is required and a * is shown over the label */
  @Input() isRequired: boolean = false;
  /** Option list in the dropdown */
  @Input() options: Select[] = [];
  public onChange: (value: string | null) => void = () => {};
  public onTouched: () => void = () => {};
  public value: FormControl<string | null> = new FormControl(null);
  private unsubscriber$: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.value.valueChanges.pipe(takeUntil(this.unsubscriber$)).subscribe((value: string | number | null) => {
      this.onChange(this.value.value);
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

  public registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
