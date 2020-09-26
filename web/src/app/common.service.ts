import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient,private router: Router) { }

  _post(api,body,success, failure) {
    this.http.post(`${environment.serverUrl}${api}`,body).subscribe((res) => {
      success(res);
    }, (err) => {
      failure(err);
    });
  }

  _get(api,success, failure) {
    this.http.get(`${environment.serverUrl}${api}`).subscribe((res) => {
       success(res);
    }, (err) => {
      failure(err);
    });
  }
}
