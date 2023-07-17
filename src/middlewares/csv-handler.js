import csv from "csv-parser"
import fs from "fs"
import { v4 } from 'uuid';
import path from "path";

function csvMiddleware(req, res, next) {
    const rows = []
    const uploadedCsv = req.file;
    const destinationDirectory = path.join('src', 'csv');
    const filePath = path.join(destinationDirectory, `${v4()}.csv`);

    fs.rename(uploadedCsv.path, filePath, (error) => {
        if (error) {
            console.error('Error saving CSV file:', error);
            return res.status(500).send('An error occurred while saving the CSV file');
        }

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                rows.push(row)
            })
            .on('end', () => {
                req.rowData = rows;
                console.log(rows);
                next();
            })
    })
}

export { csvMiddleware };