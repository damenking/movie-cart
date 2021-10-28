export interface MoviesBySearchRequest {
  title: string;
  year?: string;
  page: number;
}

export interface MoviesBySearchResponse {
  Search: MovieDetail[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  imdbID: string;
  Type?: string;
  Poster?: string;
}