var APPID = global.params.appid,
    APPSECRET = global.params.secret;

var express = require('express');
var router = express.Router();
var request = require('request');
var sign = require('./libs/sign');


// 缓存 token jsapi_ticket 等
var cache = {
  token: null,
  jsapi_ticket: null
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // var requestUrl = req.protocol + '://' + req['headers'].host + req.originalUrl;
    var requestUrl ='https://www.raodaokun.top' + req.originalUrl;
    // console.log('url>>>', requestUrl);

  if(!cache.token){
    getToken(res,requestUrl);
  }else{
    getTiket(res,requestUrl);
  }

});


var getToken = function(res,url){


  var token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APPID +
      '&secret='+APPSECRET;

  request(token_url, function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
        console.log('getToken',data);
      cache.token = data.access_token;

      getTiket(res,url);
      
    }
  });
};

var getTiket = function(res,url){
  var tiket_url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+cache.token+'&type=jsapi';

  if(!cache.jsapi_ticket){
    request(tiket_url, function(error, response, body){
      if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        // console.log('getTiket',data);

        cache.jsapi_ticket = data.ticket;
        res.render('index', { 
          title: '微信JSSDK分享测试页面',
          appid: APPID,
          sign: JSON.stringify(sign(cache.jsapi_ticket,url))
        });
      }
    });
  }else{
      // console.log('getTiket',cache.jsapi_ticket);
      res.render('index', { 
        title: '微信JSSDK分享测试页面',
        appid: APPID,
        sign: JSON.stringify(sign(cache.jsapi_ticket,url))
      });
  }
};

module.exports = router;
