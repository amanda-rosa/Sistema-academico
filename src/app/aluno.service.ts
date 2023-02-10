import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Aluno } from './aluno';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  baseUrl = 'http://localhost:4200/';

  constructor(private http: HttpClient){
}
  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.baseUrl}/aluno`)
  }

  getAluno(id: number): Observable<Aluno>{
    const url = `${this.baseUrl}/aluno/${id}`;
    return this.http.get<Aluno>(url).pipe(
      catchError(this.handleError<Aluno>(`getAluno id=${id}`))
    );
  }

    addAluno(aluno: Aluno): Observable<any>{
      return this.http.post<Aluno> (`${this.baseUrl}/aluno`, aluno).pipe(
         catchError(this.handleError<Aluno>('addAluno'))
       );
    }

    updateAluno(aluno: Aluno): Observable<any>{
      return this.http.put(`${this.baseUrl}/aluno/${aluno.id}`, aluno).pipe(
        catchError(this.handleError<any>('updateAluno'))
      );
    }

    deleteAluno(id: number): Observable<Aluno> {
      const url = `${this.baseUrl}/aluno/${id}`;

      return this.http.delete<Aluno>(url).pipe(
        catchError(this.handleError<Aluno>('deleteAluno'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);


      return of(result as T);
    };
  }
}
