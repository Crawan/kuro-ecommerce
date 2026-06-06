const successResponse = (message=null, data) => {
    return {
        success: true,
        message: message ? message : "No messsage provided",
        data: data ? data : null
    }
}

const errorResponse = (message, errorMessage, data=null) => {
    return {
        success: false,
        message: message,
        error: errorMessage,
        data: data
    }
}

module.exports = { successResponse, errorResponse }
