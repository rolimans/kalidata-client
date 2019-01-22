import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
    private subjectShow = new Subject<boolean>();
    public subjectShow$ = this.subjectShow.asObservable();

  constructor() { }

  hide() {
      this.subjectShow.next(false);
  }

  show() {
      this.subjectShow.next(true);
  }
}
