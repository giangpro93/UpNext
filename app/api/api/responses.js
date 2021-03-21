

module.exports = {
    okResponse,
    errResponse,
    respond
};

function okResponse(res, data) {
    console.log(data);
    res.status(200).json(data);
}

function errResponse(res, err) {
    console.log(err);
    res.status(500).json(err);
}

function respond(req, res, promiseThunk, arg=req.body) {
    console.log(req.body);
    return promiseThunk(arg)
        .then(data => okResponse(res, data))
        .catch(err => errResponse(res, err));
}