const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    // 通过查询字符串获取到客户端发送来的数据
    const query = req.query
    // 调用res.send()方法，把数据响应给客户端
    res.send("2")
})
app.post('/', (req, res) => {
    const data = req.body
    res.send("2")
})
app.listen(80, () => {
    console.log('服务器运行在http://127.0.0.1:80');
})