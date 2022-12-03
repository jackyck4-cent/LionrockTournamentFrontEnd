import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TnListFilterServiceService {
  private filters: string[] = [];
  private filterSource = new BehaviorSubject<string[]>(this.filters);

  constructor() { }

  change(data: string[]): void {
    this.filterSource.next(data);
  }

  public filterHasChanged(): Observable<string[]> {
    return this.filterSource.asObservable();
  }
}
