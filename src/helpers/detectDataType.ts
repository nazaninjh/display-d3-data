import type { TDATA } from "../types/data/data.type";

export const detectDataType = (data: TDATA) => {
  const isMulti = data.data.every((singleItem) => {
    return Array.isArray(singleItem[singleItem.length - 1]);
  });

  return isMulti ? "MULTI" : "SINGLE";
};
