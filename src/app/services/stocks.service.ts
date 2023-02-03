import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  private stocksEndpoint = 'https://localhost:7292/api/Stocks';
  private stockValuesEndpoint = 'https://localhost:7292/api/StockValues';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.stocksEndpoint);
  }

  getStockValues(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.stockValuesEndpoint}`);
  }
}
