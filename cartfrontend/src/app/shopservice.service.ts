import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShopserviceService {
  private apiUrl='http://localhost:3001/product';
        
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const url = 'http://localhost:3001/product/views';
    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  addToCart(data: any): Observable<any> {
    // Send a POST request to your API
    return this.http.post<any>(`${this.apiUrl}/addtocart`, data);
  }

}
