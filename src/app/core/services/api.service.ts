import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, BehaviorSubject, Observable, throwError } from 'rxjs';
import { debounceTime, map, tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer e60ce72ecdebc37631b0cc1de13a2f15',
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private questionRespones$ = new BehaviorSubject<any[]>([]);
  private codesResponse$ = new BehaviorSubject<any[]>([]);
  private formDataSave$ = new BehaviorSubject<any[]>([]);
  public readonly questions$: Observable<any[]> = this.questionRespones$.asObservable();
  public readonly codes$: Observable<any[]> = this.codesResponse$.asObservable();
  public readonly formSaved$: Observable<any[]> = this.formDataSave$.asObservable();

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) { }

  getQuestions(): Observable<any[]> {
    return this.questions$;
  }

  getCodes(): Observable<any[]> {
    return this.codes$;
  }

  formDataSave(): Observable<any[]> {
    return this.formSaved$;
  }

  loadQuestion() {
    this.http.get<any>(environment.api.questions, httpOptions)
    .pipe(
      tap(data =>  console.log('GET Request is successful ', data)),
      catchError(this.handleError))
     .subscribe(data => this.questionRespones$.next(data));
  }

  saveData(formData) {
    this.http.post<any>(environment.api.saveForm, formData, httpOptions)
      .pipe(
        tap(data => {
          console.log('POST Request is successful ', data.message);
          this.snackBar.open('quote saved', null, { duration: 2000 });
        }
        ),
        catchError(this.handleError)
      ).subscribe(data => {
        this.formDataSave$.next(data);
      });
  }

  searchCode(text: string): Observable<any[]> {
    return this.http.get<any>(environment.api.codes + text, httpOptions)
      .pipe(  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map((data: any) => {
          return (
            data.length !== 0 ? data as any[] : [{ data: 'No Record Found' } as any]
          );
        }
        ), catchError(this.handleError));
  }

   // TODO Create Service Handle Errors
  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}


