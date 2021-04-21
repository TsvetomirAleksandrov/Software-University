const errorHandler = (err, req, res, next) => {
    let message = err.message || 'Something went wrong!';
    let status = err.status || 500;

    // TODO: Add page to render
};

module.exports = errorHandler;