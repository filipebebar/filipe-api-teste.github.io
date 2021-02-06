import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pessoa} from './pessoa';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {
  constructor(private http: HttpClient) {

  }

  apiUrl: string = environment.apiURL;

  listAll(): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.apiUrl);
  }

  save(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl + '/', pessoa);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.delete<Pessoa>(this.apiUrl + '/' + pessoa.id);
  }

}
