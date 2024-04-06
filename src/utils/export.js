import { utils, writeFile } from "xlsx";
export const downloadExcel = (fileName, array) => {
  const ws = utils.json_to_sheet(array);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFile(wb, `${fileName}.xlsx`);
};
