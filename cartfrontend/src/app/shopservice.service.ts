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

  addToCart(pid: any, name: any, rate: any, shortdiscretion: any, imageurl: any, discretion: any, quantity: number,sessionId:any): Observable<any> {
    const requestData = {
      sessionId:sessionId,
      pid: pid,
      name: name,
      rate: rate,
      shortdiscretion: shortdiscretion,
      imageurl: imageurl,
      discretion: discretion,
      quantity: quantity || 1// Include the quantity in the request
    };


    // Send a POST request to your API
    return this.http.post<any>(`${this.apiUrl}/addtocart`,requestData);
  }

}
