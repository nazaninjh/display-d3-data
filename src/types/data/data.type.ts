export interface TDATA {
  data: [number, number | null][] | [number, (number | null)[]][];
}

export interface TDataTable {
  title: string;
  data: TDATA;
}
