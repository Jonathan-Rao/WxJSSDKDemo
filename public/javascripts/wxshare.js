(function(wx){

    var isWx = function(){
        return navigator.userAgent.match(/MicroMessenger/i) === 'micromessenger' ? true : false;
    }

    var wxshare = function(){
        if('wx' in window){
            
            var info = JSON.parse(document.getElementById('info').innerHTML);
            // console.log('进来了',info);
            wx.config({
                debug: false,
                appId: '',
                timestamp: info.timestamp, 
                nonceStr: info.nonceStr, 
                signature: info.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
            });

            // 分享内容自定义
            var shareInfo = {
                title: '米筑家装分享标题',
                desc: '米筑家装是一家物联网假装平台，该平台很不错的哦',
                link: 'https://'+window.location.host+'/view/hello.html',
                imgUrl: 'https://www.raodaokun.top/img/ceshi.jpg',
            };


                    wx.ready(function(){

                        // wx.updateAppMessageShareData({
                        //     title: shareInfo.title, // 分享标题
                        //     desc: shareInfo.desc, // 分享描述
                        //     link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        //     imgUrl: shareInfo.imgUrl, // 分享图标
                        //     success: function () {
                        //         // 设置成功
                        //     }
                        // });
                        //
                        // wx.updateTimelineShareData({
                        //     title: shareInfo.title, // 分享标题
                        //     link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        //     imgUrl:  shareInfo.imgUrl, // 分享图标
                        //     success: function () {
                        //         // 设置成功
                        //     }
                        // });


                        //分享到朋友圈
                        wx.onMenuShareTimeline({
                            title: shareInfo.title,
                            link: shareInfo.link,
                            imgUrl: shareInfo.imgUrl,
                            success: function() {
                                console.log('分享成功');

                            },
                            cancel: function() {

                            }
                        });
                        //分享给朋友
                        wx.onMenuShareAppMessage({
                            title: shareInfo.title,
                            desc: shareInfo.desc,
                            link: shareInfo.link,
                            imgUrl: shareInfo.imgUrl,
                            success: function() {
                                console.log('分享成功');
                            },
                            cancel: function() {

                            }
                        });
                        //分享到QQ
                        wx.onMenuShareQQ({
                            title: shareInfo.title,
                            desc: shareInfo.desc,
                            link: shareInfo.link,
                            imgUrl: shareInfo.imgUrl,
                            success: function() {
                                console.log('分享成功');
                            },
                            cancel: function() {

                            }
                        });
                        //分享到腾讯微博
                        wx.onMenuShareWeibo({
                            title: shareInfo.title,
                            desc: shareInfo.desc,
                            link: shareInfo.link,
                            imgUrl: shareInfo.imgUrl,
                            success: function() {
                                console.log('分享成功');
                            },
                            cancel: function() {

                            }
                        });
                        //分享到QQ空间
                        wx.onMenuShareQZone({
                            title: shareInfo.title,
                            desc: shareInfo.desc,
                            link: shareInfo.link,
                            imgUrl: shareInfo.imgUrl,
                            success: function() {
                                console.log('分享成功');
                            },
                            cancel: function() {

                            }
                        });
                    });




        }else{
            console.error('请在微信客户端中打开')
        }
    }


   wxshare();
})(wx || jWeixin)