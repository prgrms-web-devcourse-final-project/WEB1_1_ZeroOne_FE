export interface PortfolioItem {
  portFolioId: number; // 포트폴리오 아이디  
  userId: number; // 유저 아이디
  jobTitle: string | null; 
  portFolioUrl: string;
  username: string;
  introduction: string;
  majorJobGroup: string;
  minorJobGroup: string;
  memberImageUrl: string;
  relatedUrl: string[];
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageData {
  content: PortfolioItem[];
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
