const errorHandler = (err, req, res, next) => {
    let message = err.message || 'Something went wrong!';
    let status = err.status || 500;

    res.status(err.status).render('home', { error: err })
};

module.exports = errorHandler;