import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() questions$: Observable<any[]>;
  @Input() classificationCodes: any[];
  @Output() sendCode: EventEmitter<any> = new EventEmitter();
  @Output() formData: EventEmitter<any> = new EventEmitter();

  formTemplate: FormData[];
  myFormGroup: FormGroup;
  submitted: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    const formGroup = {};

    this.questions$.subscribe(data => {
      if (data.length > 0) {
        // template create from question type
        this.formTemplate = data;
        this.formTemplate.forEach((formItem: any) => {
          this.createFormControls(formGroup, formItem);
          // data type not provided (create custome type)
          if (formItem.text.includes('classification code')) {
            formItem.type = 'search';
            this.createTypeAHead(formGroup, formItem);
          }
        });
        this.myFormGroup = new FormGroup(formGroup);
      }
    });
  }

  submitForm(formValues) {
    if (this.myFormGroup.status !== 'INVALID') {
      this.formData.emit({ value: formValues, templated: this.formTemplate });
      this.submitted = true;
      this.clearForm(true);
    }
  }

  clearForm(valid) {
    if (valid) {
      this.myFormGroup.reset();
      Object.keys(this.myFormGroup.controls).forEach(key => {
        this.myFormGroup.get(key).setErrors(null);
      });
    } else {
      Object.keys(this.myFormGroup.controls).forEach(key => {
        this.myFormGroup.get(key).setErrors({ incorrect: true });
      });
    }
  }

  private createFormControls(formGroup: {}, item: any) {
    formGroup[item.id] = new FormControl('', [
      Validators.required,
      Validators.minLength(item.min),
      Validators.maxLength(item.max)
    ]);
    formGroup[item.id].type = item.type;
  }

  private createTypeAHead(formGroup: {}, item: any) {
    formGroup[item.id].valueChanges
      .pipe(debounceTime(1000),
        distinctUntilChanged())
      .subscribe(searchText => {
        if (searchText !== '' && searchText !== null
          && !parseInt(searchText, 10)) {
          this.sendCode.emit(searchText);
        }
      });
  }

}
