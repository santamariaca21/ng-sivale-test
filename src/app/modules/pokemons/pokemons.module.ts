import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PokemonsRoutingModule} from './pokemons-routing.module';
import {PokemonListPageComponent} from './pages/pokemon-list-page/pokemon-list-page.component';
import {PokemonDetailPageComponent} from './pages/pokemon-detail-page/pokemon-detail-page.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    PokemonListPageComponent,
    PokemonDetailPageComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    SharedModule
  ]
})
export class PokemonsModule {
}
