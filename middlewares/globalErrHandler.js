export const globalErrhandler = (err, req, res, next) => {
    // build our error object
    //stack --(basically whick line of code allocates the error in our code)
    //StatusCode -- 
    //message

    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode : 500;
    const message = err?.message;
    
    res.status(statusCode).json({
        stack,
        message
    });

}


//404 handler
export const notFound = (req, res, next) => {
    //constructing our custom error message , we are using our original url which the user is accessing
    const err = new Error(`Route ${req.originalUrl} not found`)
    next(err);
}