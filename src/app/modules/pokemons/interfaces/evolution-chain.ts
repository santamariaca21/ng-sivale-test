import {PokemonItem} from "./pokemon-item";

export interface EvolutionChain {
  chain: Chain;
}

export interface Chain {
  evolves_to: Array<Chain>;
  species: PokemonItem;
}
