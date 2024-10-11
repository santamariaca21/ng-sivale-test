import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable} from "rxjs";
import {ApiResponsePaginate} from "../../../core/models/ApiResponsePaginate";
import {PokemonItem} from "../interfaces/pokemon-item";
import {Pokemon} from "../interfaces/pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private _http: HttpClient
  ) {
  }

  getNextPokemonPage(page: string | null): Observable<ApiResponsePaginate<PokemonItem>> {
    return this._http.get<ApiResponsePaginate<PokemonItem>>(page ?? `${environment.api}pokemon/`).pipe(
      map(response => ({
        ...response,
        results: response.results.map(p => ({
          ...p,
          index: p.url.replace(/^.*\/(\d+)\/$/, '$1')
        }))
      }))
    );
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return this._http.get<Pokemon>(`${environment.api}pokemon/${id}`);
  }

  getPokemonAttributes<ResponseT>(url: string, callback: (response: ResponseT) => void): void {
    this._http.get<ResponseT>(url).subscribe(callback)
  }
}
