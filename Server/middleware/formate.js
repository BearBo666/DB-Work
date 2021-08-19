module.exports = (req, res, next) => {
    //处理分页参数
    if (req.method == 'GET') {
        let { currentPage, pageNum } = req.query
        //默认第1页，每页20条
        req.query.currentPage = currentPage ? Number(currentPage) : 1
        req.query.pageNum = pageNum ? Number(pageNum) : 20
    }
    //格式ip内容
    let env = process.env.NODE_ENV
    if (env == 'development') {
        req.ipv4 = '127.0.0.1'
    } else {
        req.ipv4 = req.ip.slice(7)
    }
    next()
}