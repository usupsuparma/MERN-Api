const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const blogController = require('../controllers/blog');

// [POST]  : /v1/blog/post
router.post('/post', [
        body('title').isLength({min: 5}).withMessage('Input title minimum 5 character'), 
        body('body').isLength({min: 5}).withMessage('Input body minimum 5 character')
    ], 
    blogController.createBlogPost);


module.exports = router;