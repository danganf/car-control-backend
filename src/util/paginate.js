"use restrict";

const paginate = require('express-paginate');

const FORMAT_RESUL = {
    items_count: 0,
    page_count: 0,
    page_current: 0,
    pages: 0,
    rows: []
}

const formatPaginate = (req, results) => {
    const pageCount = Math.ceil(results.count / req.query.limit)

    FORMAT_RESUL.items_count = results.count
    FORMAT_RESUL.page_count = pageCount
    FORMAT_RESUL.rows = results.rows
    FORMAT_RESUL.page_current = req.query.page
    FORMAT_RESUL.pages = paginate.getArrayPages(req)(pageCount, pageCount, req.query.page)

    return FORMAT_RESUL
}

module.exports = {
    FORMAT_RESUL,
    formatPaginate,
}