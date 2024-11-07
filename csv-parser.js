import Papa from 'papaparse';
import { promises as fs } from 'fs';

async function parseCSV() {
    try {
        const csvFile = await fs.readFile('sample.csv', 'utf-8');
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvFile, {
                header: true,
                complete: (results) => {
                    resolve(results.data)
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Error reading CSV file:', error);
        throw error;
    }
}

export default parseCSV;
