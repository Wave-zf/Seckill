//存放主要交互逻辑js代码
var seckill = {
    //封装ajax的url
    URL: {
        now: function () {
            return '/seckill/time/now';
        },
        exposer: function (seckillId) {
            return '/seckill/'+seckillId+'/exposer';
        },
        execution : function (seckillId,md5) {
            return '/seckill/'+seckillId+'/'+md5+'/execution';
        }
    },
    handleSeckillkill :function (seckillId,node){
        //处理秒杀逻辑
        node.hide()
            .html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>');
        $.post(seckill.URL.exposer(seckillId),{},function (result) {
            if(result && result['success']){
                var exposer = result['data'];
                if(exposer['exposed']){
                    //开启秒杀
                    var md5 = exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId,md5);
                    console.log("killUrl="+killUrl);
                    $('#killBtn').one('click',function () {
                        //执行秒杀操作
                        //1:先禁用秒杀按钮
                        $(this).addClass('disabled');
                        //2:发送秒杀1请求并执行秒杀
                        $.post(killUrl,{},function (result) {
                            if(result && result['success']){
                                var killResult = result['data'];
                                var state = killResult['state'];
                                var stateInfo = killResult['stateInfo'];
                                node.html('<span class="label label-success">'+stateInfo+'</span>');
                            }
                        });
                    });
                    node.show();

                }else {
                    //未开启
                    var now = exposer['now'];
                    var start = exposer['start'];
                    var end = exposer['end'];
                    seckill.countdown(seckillId,now,start,end);
                }
            }else {
                console.log('result='+result);//TODO
            }
        });
    },
    //验证手机号
    validataPhone: function (phone) {
        if (phone && phone.length == 11 && !isNaN(phone)) {
            return true;
        } else {
            return false;
        }
    },
    countdown: function (seckillId,nowTime,startTime,endTime) {
        console.log(seckillId + '_' + nowTime + '_' + startTime + '_' + endTime);//TODO
        var seckillBox = $('#seckill-box');
        //时间判断
        if(nowTime > endTime){
            seckillBox.html('秒杀结束！');
        }else if (nowTime < startTime) {
            var killTime = new Date(startTime + 1000);
            seckillBox.countdown(killTime, function (event) {
                var format = event.strftime('秒杀倒计时：%D天 %H时 %M分 %S秒');
                seckillBox.html(format);
            }).on('finish.countdown',function () {
                //出现秒杀按钮，获取秒杀地址
                seckill.handleSeckillkill(seckillId,seckillBox);
            });
        } else {
            //秒杀开始
            seckill.handleSeckillkill(seckillId,seckillBox);
        }
    },
    //详情页秒杀逻辑
    detail: {
        init: function (params) {
            //从cookie中查找手机号
            var killPhone = $.cookie('killPhone');
            //验证手机号
            if (!seckill.validataPhone(killPhone)) {
                //绑定phone
                var killPhoneModal = $('#killPhoneModal');
                killPhoneModal.modal({
                    show: true,//显示弹出层
                    keyboard: false,//禁止键盘事件
                    backdrop: 'static'//禁止位置关闭
                });
                $('#killPhoneBtn').click(function () {
                    var inputPhone = $('#killPhoneKey').val();
                    console.log('inputPhone='+inputPhone);//TODO
                    if (seckill.validataPhone(inputPhone)) {
                        //电话写入cookie
                        $.cookie('killPhone',inputPhone,{expires:7,path:'/seckill'});
                        //刷新页面
                        window.location.reload();
                    }else{
                        $('#killPhoneMessage').hide().html('<label class="label label-danger">手机号错误! </label>').show(300);
                    }
                });
            }
            //计时
            var seckillId = params['seckillId'];
            var startTime = params['startTime'];
            var endTime = params['endTime'];
            $.get(seckill.URL.now(),{},function (result) {
                if(result && result['success']){
                    //时间判断，计时交互
                    var nowTime = result['data'];
                    seckill.countdown(seckillId,nowTime,startTime,endTime);
                }else{
                    console.log('result='+result);//TODO
                }
            });
        }
    }
}