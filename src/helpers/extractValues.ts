import type { TDATA } from "../types/data/data.type";

export const extractValues = (data: TDATA) => {
  const values = data.data.map((value) => {
    return value[value.length - 1] ? value[value.length - 1] : null;
  });
  return values;
};
