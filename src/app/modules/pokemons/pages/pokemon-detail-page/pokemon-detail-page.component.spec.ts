import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokemonDetailPageComponent} from './pokemon-detail-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('PokemonDetailPageComponent', () => {
  let component: PokemonDetailPageComponent;
  let fixture: ComponentFixture<PokemonDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetailPageComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(PokemonDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
