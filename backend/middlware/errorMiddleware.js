const errorHandler = (errObj, req, res,  next) => {
	const statusCode = res.statusCode || 500;
	
	res.status(statusCode);

	res.json({
		message: errObj.message,
		stack: process.env.NODE_ENV === 'production' ? null : errObj.stack
	})
}

module.exports = errorHandler;