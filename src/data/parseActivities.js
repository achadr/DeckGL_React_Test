/* eslint-disable no-console */
import csv from 'csv-parser';
import fs from 'fs';

const pathCsv = './src/data/activities.csv';
const pathJson = './src/data/activities.json';

const results = [];
// converting CSV file to JSON to simulate an API because browser doesn't access to fs
const parseCsv = async () => {
  await fs.createReadStream(pathCsv)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      fs.writeFile(pathJson, JSON.stringify(results), (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
};

parseCsv();
