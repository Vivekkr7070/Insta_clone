// This middleware will handle any errors that occur in the app and send a uniform response.

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'An internal server error occurred',
    });
};

module.exports = errorHandler;