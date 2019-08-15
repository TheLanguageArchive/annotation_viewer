import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Eaf } from '@fav-models/eaf';
import { MessageService } from '@fav-services/message.service';
import { SerializeEaf } from '@fav-models/serializers/eaf';

@Injectable({
  providedIn: 'root'
})
export class EafService {

  private annotationUrl = '/flat/islandora/object/lat:12345_fef5f9f8_6e19_49ac_a605_3b4387bf76d0/av_api';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  fetch(): Observable<Eaf> {

    return this.http
      .get(this.annotationUrl)
      .pipe(
        map(data => SerializeEaf(data as Eaf)),
        tap(_ => this.messageService.add('fetched accommodations')),
        catchError(this.handleError<Eaf>('fetch', null))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send error to monolog

      this.messageService.add(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
