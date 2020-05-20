import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  questions$: Observable<any[]>;
  classificationCodes: any[];
  formDataSaved: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.loadQuestion();
    this.questions$ = this.apiService.getQuestions();
  }

  fetchCodes(searchText) {
    this.apiService.searchCode(searchText)
    .subscribe(results => this.classificationCodes = results as any[]);
  }

  submitForm(form) {
    const data = { responses: [] };
    const formData = Object.values(form.value);
    formData.forEach((value, index) => {
      const questionIdx = index + 1;
      if (form.templated[index].type === 'select') {
        data.responses.push({ question_id: questionIdx, option_id: value });
      } else {
        data.responses.push({ question_id: questionIdx, text: value });
      }
    });
    this.apiService.saveData(data);
  }
}
