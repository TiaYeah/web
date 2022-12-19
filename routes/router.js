const express = require("express");
const router = express.Router();
const path = require("path")

const multer = require("multer")

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/userFiles")
    },
    filename: (req, file, cb) =>{
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
})

const pageController = require("../controllers/pageController");
const noteController = require("../controllers/noteController");

router.get('/', pageController.getStartPage);
router.get('/search', pageController.getSearchPage);
router.get('/add', pageController.getAddPage);
router.get('/userFiles/:file',(req, res) => {
    var file = req.params.file;
    var fileLocation = path.join('/userFiles', file);
    res.download(fileLocation, file);
});

router.post('/add', multer({storage:storageConfig}).array("filedata"), noteController.getAddPage);
router.post('/search', noteController.getSearchReq);

module.exports = router;