export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }>;
  species: {
    name: string;
    url: string;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    }
  }>
}
