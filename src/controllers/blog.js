const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');


exports.createBlogPost = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        console.log('err: ', errors);
        const err = new Error('Invalid Value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file) {
        console.log('err: ', errors);
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        throw err;

    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {uid: 1, name: 'Usup Suparma'}
    });

    posting.save()
    .then(result => {
    
        res.status(201).json({
            message: 'Create Blog Post Success',
            data: result
        });
    })
    .catch(err => {
        console.log(err);
    });



}