const multer = require('multer');
const upload = multer({ dest: '../middleware/multer' });

const uploadUser = ('/upload', upload.single('file'), (req, res) => {
    const file = new File({
        name: req.file.filename,
        path: req.file.path,
        size: req.file.size,
    });

    file.save((err, file) => {
        if (err) {
            return res.json({ message: "Error in aving your file. Please try again !" });
        }
        return res.json({ message: "File successfully uploaded", file });
    });
});

module.exports = {uploadUser}