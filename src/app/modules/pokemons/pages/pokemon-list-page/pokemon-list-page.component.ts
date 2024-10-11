import {Component, HostListener, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {PokemonItem} from "../../interfaces/pokemon-item";

@Component({
  selector: 'app-pokemon-list-page',
  templateUrl: './pokemon-list-page.component.html',
  styleUrls: ['./pokemon-list-page.component.scss']
})
export class PokemonListPageComponent implements OnInit {
  pokemonList: PokemonItem[] = [];

  selectedPokemon: string | null = null;

  private nextPageUrl: string | null = null;

  private _loading = false;

  private complete = false;

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (!this._loading && (window.innerHeight + window.scrollY + 100) >= document.body.offsetHeight) {
      this.nextPage();
    }
  }

  constructor(
    private _pokemonService: PokemonService
  ) {
  }

  ngOnInit(): void {
    this.nextPage();
  }

  nextPage(): void {
    if (this.complete) {
      return;
    }
    this._loading = true;
    this._pokemonService.getNextPokemonPage(this.nextPageUrl)
      .subscribe({
        next: response => {
          this.pokemonList = this.pokemonList.concat(response.results);
          this.nextPageUrl = response.next;
          this.complete =  !response.next;
        },
        complete: () => this._loading = false
      });
  }
}
