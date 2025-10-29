import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notice, NoticeUpdate } from '../models/notice';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {
  private apiBaseUrl = '/api/notices';
  private _notices = new BehaviorSubject<Notice[]>([]);
  public readonly notices$: Observable<Notice[]> = this._notices.asObservable();

  constructor(private http: HttpClient) {
    this.loadNotices();
  }

  loadNotices(): void {
    this.http.get<Notice[]>(this.apiBaseUrl).subscribe(data => {
      this._notices.next(data); 
    });
  }

  addNotice(notice: Omit<Notice, 'id' | 'dateCreated'>): Observable<Notice> {
    return this.http.post<Notice>(this.apiBaseUrl, notice).pipe(
      tap((newNotice) => {
        const currentNotices = this._notices.getValue();
        this._notices.next([...currentNotices, newNotice]);
      })
    );
  }

  deleteNotice(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${id}`).pipe(
      tap(() => {
        const currentNotices = this._notices.getValue();
        const updatedNotices = currentNotices.filter(n => n.id !== id);
        this._notices.next(updatedNotices);
      })
    );;
  }

  updateNotice(id: number, updatedData: NoticeUpdate): Observable<Notice> {
    return this.http.put<Notice>(`${this.apiBaseUrl}/${id}`, updatedData).pipe(
      tap((updatedNotice) => {
        const currentNotices = this._notices.getValue();
        const updatedList = currentNotices.map(n =>
          n.id === id ? { ...n, ...updatedNotice } : n
        );
        this._notices.next(updatedList);
      })
    );
  }
}
