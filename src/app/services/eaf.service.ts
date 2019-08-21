import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Eaf } from '@fav-models/eaf';
import { MessageService } from '@fav-services/message.service';
import { SerializeEaf } from '@fav-models/serializers/eaf';
import { IdStore } from '@fav-stores/id-store';

@Injectable({
  providedIn: 'root'
})
export class EafService {

  private annotationUrl = '/flat/islandora/object/{id}/av_api';

  constructor(private idStore: IdStore, private http: HttpClient, private messageService: MessageService) { }

  fetch(): Observable<Eaf> {

    return this.http
      .get(this.annotationUrl.replace('{id}', this.idStore.state.id))
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
