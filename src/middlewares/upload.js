import multer from "multer";

function uploadCsv(req, res, next) {
    const csv = multer({
        dest: 'src/csv'
    }).single('csv')

    csv(req, res, function (err) {
        if (err) {
            console.log('Error uploading CSV file');
            return res.status(500).send('An error occurred while uploading the CSV file')
        }

        next();
    
    })
}

export { uploadCsv };