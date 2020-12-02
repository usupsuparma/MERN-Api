exports.createProduct = (req, res, next) => {
    
    res.json({
        "status": "Create Product Success",
        "data": {
            "nama":"usup",
            "id": 1,
        }
    })
    next();
}

exports.getAllProducts = (req, res, next) => {
    res.json(
        {
            "message": "Get All Products Success",
            "data": {
                "id": 1,
                "name": "avanza"
            }
        }
    )
}