import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function getTestDataFromCSV(filePath: string) {  // declares and exportss a function
  const fileContent = fs.readFileSync(filePath);  // location of the csv file
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
}
