import {Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {Pokemon} from "../../interfaces/pokemon";
import {PokemonSpecies} from "../../interfaces/pokemon-species";
import {Chain, EvolutionChain} from "../../interfaces/evolution-chain";
import {PokemonItem} from "../../interfaces/pokemon-item";

@Component({
  selector: 'app-pokemon-detail-page',
  templateUrl: './pokemon-detail-page.component.html',
  styleUrls: ['./pokemon-detail-page.component.scss']
})
export class PokemonDetailPageComponent implements OnChanges {
  @Input()
  pokemonId: string | null = null;

  @Output()
  close = new EventEmitter<void>();

  pokemon: Pokemon | null = null;

  sprites: string[] = [];

  flavorText!: string;

  currentSprite = 0;

  evolves: PokemonItem[] = [];

  searchPokemon!: string;

  statNames: { [key: string]: string } = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'Ataque especial',
    'special-defense': 'Defensa especial',
    speed: 'Velocidad',
  }

  @HostBinding('class')
  get hostClass() {
    return this.pokemon ? 'modal' : 'd-none';
  }

  constructor(
    private _pokemonService: PokemonService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonId'].currentValue) {
      this.getPokemon(changes['pokemonId'].currentValue);
    } else {
      this.pokemon = null;
    }
  }

  getPokemon(pokemonId: string): void {
    if (this.searchPokemon === pokemonId) {
      return;
    }
    this._pokemonService.getPokemonById(pokemonId).subscribe(pokemon => {
      this.pokemon = pokemon;
      this.searchPokemon = pokemonId;
      this.currentSprite = 0;
      this.sprites = Object.values(pokemon.sprites).filter(s => typeof s === 'string').reverse() as string[];
      this.sprites.unshift(`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${('00' + this.pokemon.id).slice(-3)}.png`);
      this._pokemonService.getPokemonAttributes(pokemon.species.url, (species: PokemonSpecies) => {
        this.flavorText = species.flavor_text_entries.find(ft => ft.language.name === 'es')?.flavor_text ?? '';
        this._pokemonService.getPokemonAttributes(species.evolution_chain.url, (evolutionChain: EvolutionChain) => {
          this.evolves = this.getEvolves(evolutionChain.chain);
        });
      });
    });
  }

  getEvolves(chain: Chain, evolves: PokemonItem[] = []): PokemonItem[] {
    evolves.push({
      ...chain.species,
      index: chain.species.url.replace(/^.*\/(\d+)\/$/, '$1')
    });

    if (!chain.evolves_to.length) {
      return evolves;
    }

    for (const evolve of chain.evolves_to) {
      evolves = this.getEvolves(evolve, evolves);
    }

    return evolves;
  }
}
