const fs = require('fs')
var child = require('child_process')
var express = require('express');
const axios = require('axios');

const cors = require('cors');

var app = express();

app.use(cors());

// app.get('/audio', function (req, res) {
//   console.log(req.query)
//   const { id = "1813888105" } = req.query
//   axios({
//     method: "get",
//     url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
//     headers: {
//       'X-Real-IP': '211.161.244.70'
//     },
//     responseType: 'stream',
//   }).then(response =>
//     new Promise((resolve, reject) => {
//       response.data
//         .pipe(res)
//         .on('close', () => resolve())
//         .on('error', e => reject(e));
//     })
//   )
// });

// app.listen(9001, () => {
//   console.log('服務器啟動')
// })









// 先這樣之後看能不能保存在進程中，或是保存在變數中 on data 的方法我拿到了過多的東西
// 怎麼做到在擷取的同時進行輸出


// app.get('/audio', function (req, res) {

//   const writer = fs.createWriteStream('./new')
  
//   const { id = "1813888105" } = req.query

//     axios({
//       method: "get",
//       url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
//       headers: {
//         'X-Real-IP': '211.161.244.70'
//       },
//       responseType: 'stream',
//     }).then(response => { // 獲取 response 並進行轉發
//       response.data.pipe(writer)
//     })
// });

// app.listen(9001, () => {
//   console.log('服務器啟動')
// })

app.use('/static', express.static('./build'))

app.get('/audio', function (req, res) {

  const writer = fs.createWriteStream('./new')
  const { id = "1813888105" } = req.query

    axios({
      method: "get",
      url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
      headers: {
        'X-Real-IP': '211.161.244.70'
      },
      responseType: 'stream',
    }).then(response =>
      new Promise((resolve, reject) => {
        response.data
            .pipe(writer)
            .on('close', () => resolve())
            .on('error', e => reject(e));
      }).then(() => { // 但是這邊是拿完資料才輸出 照理說是邊讀取邊輸出
        res.sendFile( __dirname + '/new'); //假定是輸出 流
      })
    )
});

app.listen(3001, () => {
  console.log('服務器啟動')
})