import * as fs from 'fs';
import * as path from 'path';

/**
 * Reads CSV file and returns an array of objects
 * @param filePath Relative or absolute path to the CSV file
 * @returns Parsed records as an array of objects
 */
export function readCSV(filePath: string): any[] {
    try {
        const resolvedPath = path.isAbsolute(filePath)
            ? filePath
            : path.join(__dirname, filePath);

        const raw = fs.readFileSync(resolvedPath, 'utf-8');
        const lines = raw
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0); // ignore empty lines

        if (lines.length < 2) {
            throw new Error(`CSV must contain at least one data row: ${filePath}`);
        }

        const headers = lines[0].split(',').map(h => h.trim());

        const records = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const row: Record<string, string> = {};
            headers.forEach((header, i) => {
                row[header] = values[i] || '';
            });
            return row;
        });

        console.log(`✅ Loaded ${records.length} rows from CSV: ${resolvedPath}`);
        return records;
    } catch (error) {
        console.error(`Error reading CSV at ${filePath}:`, error);
        return [];
    }
}
