import { Injectable } from '@angular/core';
import { Observable, of, delay, take } from 'rxjs';
import { Animal } from '../models/models';

interface FakeHttpService<T> {
  fetchMockData(expectedResult?: T): Observable<T>;
}

abstract class MockHttpService<T> implements FakeHttpService<T> {
  fetchMockData(expectedResult?: T): Observable<T> {
    return of(expectedResult).pipe(delay(2000), take(1));
  }
}

@Injectable({
  providedIn: 'root',
})
export class FetchMockAnimal extends MockHttpService<Animal> {}
