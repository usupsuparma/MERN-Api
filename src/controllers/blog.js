const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');
const { post } = require('../routes/blog');

const path = require('path');
const fs = require('fs');


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

exports.getAllData = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
        res.status(200).json({
            message: 'All Data Blog Post',
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
        })
    })
    .catch(err => next(err));

    // BlogPost.find()
    // .then(result => {
    //     res.status(200).json({
    //         message: 'All Data Blog Post',
    //         data: result,
    //     })
    // })
    // .catch(err => {
    //     next(err);
    // });
}

exports.getDetailData = (req, res, next) => {
    const id = req.params.postId;
    BlogPost.findById(id)
    .then(result => {
        if(!result) {
            const err = new Error('Data Tidak Ditemukan');
            err.errorStatus = 404;
            err.data = errors.array();
            throw err;
        }

        res.status(200).json({
            message: 'Success get Detail Data',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateData = (req, res, next) => {
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

    const id = req.params.postId;
    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    BlogPost.findById(id)
    .then(post => {
        if(!post) {
            const err = new Error('Data Tidak Ditemukan');
            err.errorStatus = 404;
            err.data = errors.array();
            throw err;
        }

        post.title = title;
        post.body = body;
        post.image = image;
        return post.save();
    })
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Update Berhasil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error("Blog post tidak ditemukan");
            error.errorStatus = 404;
            throw error;
        }
        removeImage(post.image);
        return BlogPost.findByIdAndRemove(postId);
    })
    .then(result => {
        res.status(200).json({
            message: 'Hapus Blog Berhasil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../../', filePath); // ../../ digunakan untuk berpindah posisi folder
    console.log(filePath);
    fs.unlink(filePath, err => console.log(err));
}