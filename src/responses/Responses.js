exports.errorHandler = (res, err) => {
    if (err?.response?.status === 404) {
        return notFoundError(res, err)
    }
    else if (err?.response?.status === 400) {
        return serverError(res, err)
    }
    else if (err?.response?.status === 406) {
        res.writeHead(406, { 'Content-Type': 'application/json; charset=utf-8' })
        return res.end(JSON.stringify({ error: err?.response?.data?.error?.errors }))
    }
    else if (err?.status === 200) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        return res.end(JSON.stringify({ data: err?.data?.data }))
    }
    else if (err?.response?.status === 403) {
        res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' })
        return res.end(JSON.stringify({ error: err?.response?.data?.eresponserror?.errors }))
    }
}

exports.validationError = (res, err) => {
    res.writeHead(406, { 'Content-Type': 'application/json; charset=utf-8' })
    return res.end(JSON.stringify({ error: err }))
}
