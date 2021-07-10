import csv  from'csv-parser'
import fs  from'fs'
 let results = [];

const parseCsv = async () => {
    await fs.createReadStream('./activities.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results);
      
    fs.writeFile('./activities.json', JSON.stringify(results), err => {
    if (err) {
      console.error(err)
      return
    }
    
    });

    })}

parseCsv();
