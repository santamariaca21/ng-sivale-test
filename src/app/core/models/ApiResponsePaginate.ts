export interface ApiResponsePaginate<ListT> {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListT[];
}
