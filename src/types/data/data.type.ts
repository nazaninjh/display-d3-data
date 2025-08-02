export type TDATA = [number, number | null][] | [number, (number | null)[]][];

export type SinglePoint = { x: number; y: number };
export type MultiPoint = { x: number; y: number[] };

export interface TDataTable {
  title: string;
  data: TDATA;
}
