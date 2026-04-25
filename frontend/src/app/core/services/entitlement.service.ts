import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entitlement, ApiResponse } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class EntitlementService {
  private apiUrl = 'http://localhost:3200/api/entitlements';

  constructor(private http: HttpClient) {}

  getEntitlements(): Observable<ApiResponse<Entitlement[]>> {
    return this.http.get<ApiResponse<Entitlement[]>>(this.apiUrl);
  }

  getEntitlementById(id: string): Observable<ApiResponse<Entitlement>> {
    return this.http.get<ApiResponse<Entitlement>>(`${this.apiUrl}/${id}`);
  }

  createEntitlement(entitlement: { name: string; description?: string }): Observable<ApiResponse<Entitlement>> {
    return this.http.post<ApiResponse<Entitlement>>(this.apiUrl, entitlement);
  }

  updateEntitlement(id: string, entitlement: Partial<Entitlement>): Observable<ApiResponse<Entitlement>> {
    return this.http.put<ApiResponse<Entitlement>>(`${this.apiUrl}/${id}`, entitlement);
  }

  deleteEntitlement(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
