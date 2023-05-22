import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'JhBsEqlE8aBnXRHt1lE7lLZpB81pjDun';
  private giphyUrl: string = 'https://api.giphy.com/v1/gifs/';

  constructor(
    private http: HttpClient
  ) { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory]; // spread para romper la referencia de JS
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    // si ya existía en el listado, la quitamos
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    // añadimos la tag a la primera posicion del historial
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.giphyUrl}search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
        // console.log({ gifs: this.gifList });
      });
  }


  // ejemplos sin HttpClientModule
  // async searchTag(tag: string): Promise<void> {
  //   if (tag.length === 0) return;
  //   this.organizeHistory(tag);

  //   // sin async await
  //   // fetch('https://api.giphy.com/v1/gifs/search?api_key=JhBsEqlE8aBnXRHt1lE7lLZpB81pjDun&limit=10&q=valorant')
  //   //   .then(resp => resp.json())
  //   //   .then(data => console.log(data));

  //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=JhBsEqlE8aBnXRHt1lE7lLZpB81pjDun&limit=10&q=valorant');
  //   const data = await resp.json();
  //   console.log(data);
  // }



}
