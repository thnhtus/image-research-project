export interface ParamsProps {
  id?: string;
  collections?: string;
  topics?: string;
  username?: string;
  query: string;
  orientation?: string;
  content_filter?: string;
  count?: number;
  resolution?: string;
  quantity?: number;
  page?: number;
  perPage?: number;
  orderBy?: string;
  color?: string;
}

export interface Photo {
  id?: string;
  width?: number;
  height?: number;
  urls?: {
    large?: string;
    regular?: string;
    raw?: string;
    small?: string;
    full?: string;
    thumb?: string;
  };
  color?: string;
  user?: {
    username?: string;
    name?: string;
  };
  blur_hash?: string;
}

export interface PhotoList {
  results?: Photo[];
  total?: number;
  total_pages?: number;
}
