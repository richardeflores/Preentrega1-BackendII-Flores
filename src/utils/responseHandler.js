export const successResponse = (res, data, message = "Éxito", status = 200) => {
    console.log({status, message, data});
    return res.status(status).json({
        status,
        message,
    });
};

export const errorResponse = (res, message = "Error", status = 500) => {
    console.error({error: message, status});
    return res.status(status).json({
        status,
        message,
    });
};
