export interface Entity {
  id: number;
  created_at: number;
}

export interface Application extends Entity {
  job_id: number | null;
  name: string;
  phone: string | null;
  email: string | null;
  status: string | null;
  resume: Resume | null;
  __job: Job | null;
}

export interface Job extends Entity {
  location: string | null;
  title: string;
  description: string;
  type: string;
  category: Category;
}

export interface Resume {
  meta: any;
  mime: string;
  name: string;
  path: string;
  size: number;
  type: string;
  url: string;
}

export interface GISLocation {
  data: LatLongData;
  type: string;
}

export interface LatLongData {
  lat: number;
  lng: number;
}

export interface Category extends Entity {
  category: string;
}

export interface PageInfo {
  curPage: number;
  itemsReceived: number;
  itemsTotal: number;
  nextPage: number;
  pageTotal: number;
  prevPage: number | null;
}

export interface ApplicationsPerPage extends PageInfo {
  items: Application[];
}

export enum Direction {
  First = 0,
  Previous = 1,
  Current = 2,
  Next = 3,
  Last = 4,
}

export interface HomeProperties {
  currentPage: number;
  sortedByColumn?: string | null;
  orderedBy?: string | null;
  filteredColumn?: string | null;
  filteredBy?: string | null;
}
