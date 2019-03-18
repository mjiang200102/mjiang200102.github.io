import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";

@Injectable()
export class SearchService {
  baseUrl: string = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH"; //"https://api.cdnjs.com/libraries"; //https://www.alphavantage.co/query?function=SYMBOL_SEARCH
  queryUrl: string = "&keywords="; //?search=
  api_keys: string = "&apikey=MSN48ISPXCFSIZL6";

  constructor(private http: Http) {}

  search(terms: Observable<string>) {
    return terms
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    return this.http
      .get(this.baseUrl + this.queryUrl + term + this.api_keys) //+ this.api_keys
      .map(res => res.json());
  }
}
