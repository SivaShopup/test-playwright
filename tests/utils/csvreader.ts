// utils/csvReader.ts
import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function getTestDataFromCSV(filePath: string) {
  const fileContent = fs.readFileSync(filePath);
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
}
