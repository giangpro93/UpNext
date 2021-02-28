

module.exports = {
    okResponse,
    errResponse
};

function okResponse(res, data) {
    res.status(200).json(data);
}

function errResponse(res, err) {
    res.status(500).json(err);
}