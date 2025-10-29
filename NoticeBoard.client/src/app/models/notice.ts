export interface Notice {
  id: number;
  title: string;
  content: string;
  dateCreated: Date;
  publisherId: number;
  publisherName: string;
}

export interface NoticeUpdate {
  title: string;
  content: string;
  publisherId: number;
  publisherName: string;
}
