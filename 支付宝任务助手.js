console.setPosition(-50, 1300);


var deviceWidth = 1080
var deviceHeight = 2316
sleep(2000);
threads.start(function(){
    sleep(2000);
    if(text("立即开始").findOnce() != null){
        var isStart = text("立即开始").findOnce().bounds();
        click(isStart.centerX(), isStart.centerY());
    }
    
});
if(!requestScreenCapture()){
    toast("获取屏幕权限失败，请重新运行脚本");
    console.hide();
    exit();
}
console.show();
console.log("获取屏幕权限成功，开始支付宝任务");
var options = ["【正常启动】", "【多开的支付宝中直接启动】"];

var storage = storages.create("aliPayTask_isFirst");

if(storage.get("aliPayTask_isFirst") == undefined){
    // 首次打开时显示说明
    toast("请详细阅读，以后不再详细提示");
    if(dialogs.select("是否对手机自带支付宝执行任务？\n1.如果点击【正常启动】则先打开手机自带支付宝，然后开始任务\n（如果不执行多开中的支付宝则点击正常启动，普通用户直接点正常启动就可以）\n\n2.如果点击【多开的支付宝中直接启动】则直接在当前页面开始任务\n（此功能适合在多开类软件中打开的支付宝执行任务，但需注意此功能并不会校验当前所处软件，如若不在支付宝任意界面中则可能造成异常！用户只需在多开类软件打开的支付宝中的任意界面运行此脚本即可）", options) == 0){
        // 打开支付宝并等待数据缓冲
        try{
            launchApp("支付宝");
        }catch(e)
        {
            if(confirm("在你的手机找不到支付宝", "当前手机并未安装【支付宝】\n点击确定去下载【支付宝】，点击取消退出脚本！")){
                openUrl("https://mobile.alipay.com/index.htm");
            }
            else{
                toast("看来你我有缘无分，江山不改绿水长流，再会！");
                console.hide();
                exit();
            }
        }
        storage.put("aliPayTask_isNormalRun", 1);
        
    }
    else{
        storage.put("aliPayTask_isNormalRun", 0);
    }
    dialogs.confirm("♂韦尔开发\n             ©Vail.xjl.individuals", "如果当前手机开启了悬浮窗（包括手机自带的◎悬浮按钮），请在3秒内将其拖到屏幕左上角或右上角，否则将会影响宝箱查找功能！");
    storage.put("aliPayTask_isFirst", 1);
}
else{
    // 使用过后的显示说明
    threads.start(function(){
        sleep(4000);
        if(textContains("正常启动").findOnce() != null){
            var normalRun = textContains("正常启动").findOnce().bounds();
            click(normalRun.centerX(), normalRun.centerY());
        }
    });
    if(dialogs.select("老规矩\n1.普通用户直接点正常启\n2.多开用户直接点第二个\n\n\n3秒后自动点正常启", options) == 0){
        // 打开支付宝并等待数据缓冲
        try{
            launchApp("支付宝");
        }catch(e)
        {
            if(confirm("在你的手机找不到支付宝", "当前手机并未安装【支付宝】\n点击确定去下载【支付宝】，点击取消退出脚本！")){
                openUrl("https://mobile.alipay.com/index.htm");
            }
            else{
                toast("看来你我有缘无分，江山不改绿水长流，再会！");
                console.hide();
                exit();
            }
        }
        storage.put("aliPayTask_isNormalRun", 1);
        
    }
    else{
        storage.put("aliPayTask_isNormalRun", 0);
    }
    threads.start(function(){
        sleep(5000);
        if(text("确定").findOnce() != null){
            var ok = text("确定").findOnce().bounds();
            click(ok.centerX(), ok.centerY());
        }
    })
    dialogs.confirm("♂韦尔开发\n             ©Vail.xjl.individuals", "老规矩\n别忘了把悬浮窗拖到上面\n3秒后自动关闭此窗口");

    storage.put("aliPayTask_isFirst", 1);
}


for(var i = 3; i > 0; i--){ //支付宝数据缓冲，避免老式安卓机卡顿
    sleep(1000);
    console.log("等待支付宝缓冲，还剩" + i + "秒");
}

toIndex();
gongYi();
runToAnything();
sighIn();

function toIndex(){// 差错控制并进入支付宝首页
    
    sleep(3000);
    while((text("首页").findOnce() == null) || (text("理财").findOnce() == null)){
        console.log("当前不在主页面，正在尝试返回");
        back();
        sleep(2000);
    }
    sleep(2000);
    var alipayIndex = text("首页").findOnce().bounds();
    click(alipayIndex.centerX(), alipayIndex.centerY());
    console.log("已尝试点击首页");
    sleep(2000);
    click(alipayIndex.centerX(), alipayIndex.centerY());
    while((text("扫一扫").findOnce() == null) || (text("扫一扫").findOnce().bounds().centerY() < 300)){
        console.log("当前已在支付宝首页，但不在顶部，请等待或手动滑到顶部！");
        click(alipayIndex.centerX(), alipayIndex.centerY());
        swipe(900, 1500, 600, 2000, 500);
        sleep(1000);
    }
}

function gongYi(){  //公益三小时捐步
    toastLog("开始公益三小时捐步")
    var searchButton = text("搜索").findOnce().bounds();
    click(searchButton.centerX(), searchButton.centerY());
    sleep(3000);

    var airPaySearch = className("android.widget.EditText").findOnce();
    airPaySearch.setText("人人3小时");
    sleep(3000);
    searchButton = text("搜索").findOnce().bounds();
    click(searchButton.centerX(), searchButton.centerY());
    sleep(3000);
    var gongYi = text("3小时公益").findOnce().bounds();
    click(gongYi.centerX(), gongYi.centerY());
    sleep(5000);

    var original = captureScreen();
    var accessYiQiDong = images.read("src/accessYiQiDong.png");
    if(findImage(original, accessYiQiDong) == null){
        click(deviceWidth-20, deviceHeight-100);
        sleep(3000);
    }
    original = captureScreen();
    if(findImage(original, accessYiQiDong) == null){
        toastLog("益起动界面改版，请联系开发者！开始下一任务");
        toIndex();
        return 0;
    }
    console.hide();
    toastLog("成功进入公益三小时");
    var point = findImage(original, accessYiQiDong);
    click(point.x, point.y);
    sleep(5000);
    original = captureScreen();
    if(findImage(original, accessYiQiDong) != null){
        point = findImage(original, accessYiQiDong);
        click(point.x, point.y);
        sleep(3000);
    }
    click(deviceWidth-20, deviceHeight-100);
    sleep(2000);
    click(deviceWidth/2, 950);
    sleep(2000);

    original = captureScreen();
    var confirmJuanBu = images.read("src/confirmJuanBu.png");
    if(findImage(original, confirmJuanBu) == null){
        toastLog("益起动界面改版，请联系开发者！开始下一任务");
        toIndex();
        return 0;
    }
    point = findImage(original, confirmJuanBu);
    click(point.x, point.y);
    sleep(3000);
    toastLog("公益三小时捐步成功，开始下一项任务");
    console.show();
    toIndex();
}


function runToAnything(){// 进入支付宝运动并开始各项任务
    
    sleep(2000);
    var sportIndex = text("运动").findOne(2000).bounds();
    click(sportIndex.centerX(), sportIndex.centerY());
    sleep(2000);
    if(text("走路线").findOnce() != null){
        console.log("成功进入支付宝运动，开始捐步");
    }

    // 捐步任务
    sleep(2000);
    if((text("去捐步").findOnce() == null) && (textContains("今日已兑换").findOnce() != null)){
        console.log("当前已捐步！无需捐步！");
    }
    else if((text("去捐步").findOnce() == null) && (textContains("今日已兑换").findOnce() == null)){
        console.warn("当前步数不够或其他异常情况，不能捐步，请稍后尝试或联系开发者");
    }
    else{
        var runToMoney = text("去捐步").findOnce().bounds();
        click(runToMoney.centerX(), runToMoney.centerY());
        sleep(8000);
        if(text("立即捐步").findOnce() == null){
            console.log("当前已捐步或不能捐步");
            back();
            sleep(2000);
        }
        else{
            var text1 = text("立即捐步").findOnce().bounds();
            click(text1.centerX(), text1.centerY());
            console.log("已捐步！即将退出！");
            sleep(2000)
            back();
        }
        console.log("捐步任务完成，开始走路线");
    }
    // 走路线任务
    sleep(3000);
    swipe(900, 2000, 600, 1800, 500);
    while(text("走路线").findOnce() == null){
        console.log("没找到【走路线】，可能是控制台界面挡住了这个三个字！正在尝试上划界面！");
        sleep(2000);
        swipe(900, 2000, 600, 1800, 500);
    }
    var runTocoins = text("走路线").findOnce().bounds();
    click(runTocoins.centerX(), runTocoins.centerY());
    sleep(3000);
    collectCoins();
    if(text("下一关").findOnce() != null){//避免用户先操作或异常处理
        for(var i = 5; i > 0; i --){
            console.log("   " + i + "秒后去下一关");
            sleep(2000);
        }
        var next = text("下一关").findOnce().bounds();
        click(next.centerX(), next.centerY() + 20);
        sleep(2000);
        while(text("残忍离开").findOnce() != null){
            toast("当前为备用收取保险，如还未收取可能是手机分辨率问题。请联系开发者！")
            collectCoins();
            
            next = text("下一关").findOnce().bounds();
            click(next.centerX(), next.centerY());
            sleep(2000);
        }
        console.log("开始下一关");
        console.hide();
        sleep(3000);
        while(textContains("公里").findOnce().bounds().centerY() > 2100){
            swipe(500, 800, 600, 500, 500);
            sleep(1000);
        }
        sleep(1000);
        var enterRoad = textContains("公里").findOnce().bounds();
        click(enterRoad.centerX(), enterRoad.centerY());
        sleep(2000);

        click(deviceWidth / 2, deviceHeight - 50);
        sleep(2000);
        click(deviceWidth / 2, deviceHeight - 50);
        toast("走路线过程可能较长，请等待。");
        console.show();
        sleep(20000);
        while(text("恭喜你").findOnce() != null){
            console.log("恭喜你，走完一圈！");
            back();
            sleep(2000);
            runTocoins = text("走路线").findOnce().bounds();
            click(runTocoins.centerX(), runTocoins.centerY());
            collectCoins();
            if(text("下一关").findOnce() == null){
                var original = captureScreen();
                var b_boxUn = images.read("src/b_boxUn.png");
                var l_boxUn = images.read("src/l_boxUn.png");

                if(findImage(original, b_boxUn) == null){
                    console.warn("当前没有未成熟大宝箱！");
                }
                else{
                    var point = findImage(original, b_boxUn);
                    if(point.x < 200){
                        swipe(100, 1000, 250, 900, 500);
                    }
                    sleep(2000);
                    original = captureScreen();
                    point = findImage(original, b_boxUn);
                    click(point.x, point.y);
                    sleep(2000);
                    console.log("距离大宝箱成熟" + textContains("还剩").findOnce().text());
                }
                original = captureScreen();
                if(findImage(original, l_boxUn) == null){
                    console.warn("当前没有未成熟小宝箱！");
                }
                else{
                    var point = findImage(original, l_boxUn);
                    if(point.x < 200){
                        swipe(100, 1000, 250, 900, 500);
                    }
                    sleep(2000);
                    original = captureScreen();
                    point = findImage(original, l_boxUn);
                    click(point.x, point.y);
                    sleep(2000);
                    console.log("距离小宝箱成熟" + textContains("还剩").findOnce().text());
                }
                sleep(2000);
                // 设置定时任务或闹铃（待开发。。。）
                console.log("步数不够继续走了！");
                console.log("走路线任务完成！2秒后退出开始下一项任务");
                sleep(2000);
            }
            else{
                for(var i = 5; i > 0; i --){
                    console.log("   " + i + "秒后去下一关");
                    sleep(2000);
                }
                var next = text("下一关").findOnce().bounds();
                click(next.centerX(), next.centerY() + 20);
                sleep(2000);
                while(text("残忍离开").findOnce() != null){
                    toast("当前为备用收取保险，如还未收取可能是手机分辨率问题。请联系开发者！")
                    collectCoins();
                    
                    next = text("下一关").findOnce().bounds();
                    click(next.centerX(), next.centerY());
                    sleep(2000);
                }
                console.log("开始下一关");
                sleep(3000);
                while(textContains("公里").findOnce().bounds().centerY() > 2000){
                    swipe(500, 800, 600, 500, 500);
                    sleep(1000);
                }
                console.hide();
                sleep(1000);
                var enterRoad = textContains("公里").findOnce().bounds();
                click(enterRoad.centerX(), enterRoad.centerY());
                sleep(2000);

                click(deviceWidth / 2, deviceHeight - 50);
                sleep(2000);
                click(deviceWidth / 2, deviceHeight - 50);
                toastLog("走路线过程可能较长，请等待。");
                console.show();
                sleep(20000)
            }
            

        }
        
    }
    else{
        console.log("开始任务");
        sleep(3000);
        click(deviceWidth / 2, deviceHeight - 50);
        toastLog("走路线过程可能较长，请等待。");
        sleep(20000);
        while(text("恭喜你").findOnce() != null){
            console.log("恭喜你，走完一圈！");
            back();
            sleep(2000);
            runTocoins = text("走路线").findOnce().bounds();
            click(runTocoins.centerX(), runTocoins.centerY());
            sleep(2000);
            collectCoins();
            if(text("下一关").findOnce() == null){
                var original = captureScreen();
                var b_boxUn = images.read("src/b_boxUn.png");
                var l_boxUn = images.read("src/l_boxUn.png");

                if(findImage(original, b_boxUn) == null){
                    console.warn("当前没有未成熟大宝箱！");
                }
                else{
                    var point = findImage(original, b_boxUn);
                    if(point.x < 200){
                        swipe(100, 1000, 250, 900, 500);
                    }
                    sleep(2000);
                    original = captureScreen();
                    point = findImage(original, b_boxUn);
                    click(point.x, point.y);
                    sleep(2000);
                    console.log("距离大宝箱成熟" + textContains("还剩").findOnce().text());
                }
                original = captureScreen();
                if(findImage(original, l_boxUn) == null){
                    console.warn("当前没有未成熟小宝箱！");
                }
                else{
                    var point = findImage(original, l_boxUn);
                    if(point.x < 200){
                        swipe(100, 1000, 250, 900, 500);
                    }
                    sleep(2000);
                    original = captureScreen();
                    point = findImage(original, l_boxUn);
                    click(point.x, point.y);
                    sleep(2000);
                    console.log("距离小宝箱成熟" + textContains("还剩").findOnce().text());
                }
                sleep(2000);
                // 设置定时任务或闹铃（待开发。。。）
                console.log("步数不够继续走了！");
                console.log("走路线任务完成！2秒后退出开始下一项任务");
                sleep(2000);
            }
            else{
                for(var i = 5; i > 0; i --){
                    console.log("   " + i + "秒后去下一关");
                    sleep(2000);
                }
                var next = text("下一关").findOnce().bounds();
                click(next.centerX(), next.centerY() + 20);
                sleep(2000);
                while(text("残忍离开").findOnce() != null){
                    toast("当前为备用收取保险，如还未收取可能是手机分辨率问题。请联系开发者！")
                    collectCoins();
                    
                    next = text("下一关").findOnce().bounds();
                    click(next.centerX(), next.centerY());
                    sleep(2000);
                }
                console.log("开始下一关");
                while(textContains("公里").findOnce().bounds().centerY() > 2000){
                    swipe(500, 800, 600, 500, 500);
                    sleep(1000);
                }
                console.hide();
                sleep(1000);
                var enterRoad = textContains("公里").findOnce().bounds();
                click(enterRoad.centerX(), enterRoad.centerY());
                sleep(2000);

                click(deviceWidth / 2, deviceHeight - 50);
                sleep(2000);
                click(deviceWidth / 2, deviceHeight - 50);
                toast("走路线过程可能较长，请等待。");
                console.show();
                sleep(20000)
            }
            

        }
    }
    collectCoins();
    sleep(2000);
    // 如若有未成熟宝箱则制定定时任务
    if(textContains("还剩").findOnce() != null){
        if(storage.get("aliPayTask_isNormalRun") == 1){
            setTimeout(function(){
                console.show();
                launchApp("支付宝");
                for(var i = 3; i > 0; i--){ //支付宝数据缓冲，避免老式安卓机卡顿
                    sleep(1000);
                    console.log("等待支付宝缓冲，还剩" + i + "秒");
                }
                
                toIndex();
                runToAnything();
                console.hide();

            }, 60 * 60 * 1000 - 10);
            toastLog("当前有未成熟宝箱，已设置一小时后自动收取！");
        }
        else{
            console.log("当前虽然有未成熟宝箱，但启动方式为【多开的支付宝中直接启动】，为避免程序异常故不设置定时任务。");
        }
        
    }

    // 收取好友的宝箱
    toastLog("开始收集好友宝箱！")
    var friend = images.read("src/friend.png");
    var friend_box = images.read("src/friend_box.png");
    var original = captureScreen();
    if(findImage(original, friend) == null){
        toastLog("找不到好友入口，可能是支付宝界面改版，请联系开发者！")
    }
    else{
        point = findImage(original, friend);
        click(point.x, point.y);
        console.log("已点击好友入口");
        sleep(2000);
        console.hide();
        original = captureScreen();
        if(findImage(original, friend_box) != null){
            point = findImage(original, friend_box);
            click(point.x, point.y);
            sleep(3000);
            collectCoins();
            console.hide();
            back();
            sleep(2000); 
        }
        while(true){
            
            original = captureScreen();
            sleep(200);
            if(findImage(original, friend_box) != null){
                point = findImage(original, friend_box);
                click(point.x, point.y);
                sleep(3000);
                collectCoins();
                console.hide();
                back();
                sleep(2000); 
            }
            else{
                swipe(deviceWidth/2+105, deviceHeight-300, deviceWidth/2+136, deviceHeight-1500, 500);
            }
            if((text("邀请").findOnce() != null) || (text("加好友一起同行").findOnce() != null)){
                original = captureScreen();
                if(findImage(original, friend_box) == null){
                    break;
                }               
            }
        }
        console.show();
        toastLog("好友宝箱收集完成！");
    }
    console.log("走路线任务完成！5秒后退出开始下一项任务");
    sleep(5000);
    

    function collectCoins(){

        // 收取自己的宝箱
        toast("开始收集宝箱！");
        console.hide();
        sleep(3000);
        var original = captureScreen();
            var b_box = images.read("src/b_box.png");
            var l_box = images.read("src/l_box.png");
            var b_box1 = images.read("src/b_box1.png");
            var l_box1 = images.read("src/l_box1.png");
            while(findImage(original, l_box1) != null){
                toast("  小紫宝箱+1");
                var point = findImage(original, l_box1);
                click(point.x, point.y);
                sleep(2000);
                while(textContains("收下").findOnce() == null){
                    sleep(2000);
                }
                var receive = textContains("收下").findOnce().bounds();
                click(receive.centerX() + 200, receive.centerY());
                sleep(3000);
                original = captureScreen();
            }
            while(findImage(original, b_box1) != null){
                toast("  大紫宝箱+1");
                var point = findImage(original, b_box1);
                click(point.x, point.y);
                sleep(2000);
                while(textContains("收下").findOnce() == null){
                    sleep(2000);
                }
                var receive = textContains("收下").findOnce().bounds();
                click(receive.centerX() + 200, receive.centerY());
                sleep(3000);
                original = captureScreen();
            }
            // 差错控制
            while(findImage(original, l_box1) != null){
                toast("  小紫宝箱+1");
                var point = findImage(original, l_box1);
                click(point.x, point.y);
                sleep(2000);
                while(textContains("收下").findOnce() == null){
                    sleep(2000);
                }
                var receive = textContains("收下").findOnce().bounds();
                click(receive.centerX() + 200, receive.centerY());
                sleep(3000);
                original = captureScreen();
            }
            while(findImage(original, l_box) != null){
                toast("  小黄宝箱+1");
                var point = findImage(original, l_box);
                click(point.x, point.y);
                sleep(2000);
                while(textContains("收下").findOnce() == null){
                    sleep(2000);
                }
                var receive = textContains("收下").findOnce().bounds();
                click(receive.centerX() + 200, receive.centerY());
                sleep(3000);
                original = captureScreen();
            }
            while(findImage(original, b_box) != null){
                toast("  大黄宝箱+1");
                var point = findImage(original, b_box);
                click(point.x, point.y);
                sleep(2000);
                while(textContains("收下").findOnce() == null){
                    sleep(2000);
                }
                var receive = textContains("收下").findOnce().bounds();
                click(receive.centerX() + 200, receive.centerY());
                sleep(3000);
                original = captureScreen();
            }
            // 差错控制
            while(findImage(original, l_box) != null){
                toast("  小黄宝箱+1");
                var point = findImage(original, l_box);
                click(point.x, point.y);
                sleep(2000);
                while(textContains("收下").findOnce() == null){
                    sleep(2000);
                }
                var receive = textContains("收下").findOnce().bounds();
                click(receive.centerX() + 200, receive.centerY());
                sleep(3000);
                original = captureScreen();
            }
            var b_boxUn = images.read("src/b_boxUn.png");
                var l_boxUn = images.read("src/l_boxUn.png");

                if(findImage(original, b_boxUn) == null){
                    console.warn("当前没有未成熟大宝箱！");
                }
                else{
                    var point = findImage(original, b_boxUn);
                    if(point.x < 200){
                        swipe(100, 1000, 250, 900, 500);
                    }
                    sleep(2000);
                    original = captureScreen();
                    point = findImage(original, b_boxUn);
                    click(point.x, point.y);
                    sleep(2000);
                    console.log("距离大宝箱成熟" + textContains("还剩").findOnce().text());
                }
                original = captureScreen();
                if(findImage(original, l_boxUn) == null){
                    console.warn("当前没有未成熟小宝箱！");
                }
                else{
                    var point = findImage(original, l_boxUn);
                    if(point.x < 200){
                        swipe(100, 1000, 250, 900, 500);
                    }
                    sleep(2000);
                    original = captureScreen();
                    point = findImage(original, l_boxUn);
                    click(point.x, point.y);
                    sleep(2000);
                    console.log("距离小宝箱成熟" + textContains("还剩").findOnce().text());
                }
                // 设置定时任务或闹铃（待开发。。。）
                sleep(2000);


        console.show();

    
    }
}

function sighIn(){// 积分签到任务
    toIndex();
    sleep(2000);
    while((text("支付宝会员").findOnce() == null) || (text("我的").findOnce() == null)){
        console.log("当前已在首页，尝试点击【我的】");
        sleep(1000);
        mineAli = text("我的").findOnce().bounds();
        click(mineAli.centerX(), mineAli.centerY());
    }

    sleep(2000);
    var member = text("支付宝会员").findOnce().bounds();
    click(member.centerX(), member.centerY());
    sleep(3000);

    if((text("每日赚积分").findOnce() == null) || (text("我的家").findOnce() == null)){
        console.warn("当前未进入支付宝会员界面或支付宝界面改动！\n请联系开发者！即将退出签到积分任务");
    }
    else{
        if((text("今日签到").findOnce() == null) && (text("做任务赚积分").findOnce() != null))
        {
            console.log("今日已签到，无需再次签到！");
        }
        else if(textContains("今日签到").findOnce() != null){
            var earnCoins = text("每日赚积分").findOnce().bounds();
            click(earnCoins.centerX(), earnCoins.centerY());
            console.log(textContains("今日签到").findOnce().text());
            sleep(2000);
            back();
            sleep(2000);
        }
        else{
            console.log("支付宝会员签到界面改版，请联系开发者！");
        }
        
    }
    sleep(2000);
    console.log("每日赚积分已完成！开始收取家庭积分！");
    
    if(text("我的家").findOnce() == null){
        console.log("没有找到我的家，可能是你尚未开通家庭积分或支付宝界面改版，请联系开发者。");
    }
    else{
        var myFamily = text("我的家").findOnce().bounds();
        click(myFamily.centerX(), myFamily.centerY());
        sleep(3000);
        if(text("+1").findOnce() == null){
            console.log("当前没有可收家庭积分！");
        }
        else{
            var familyCoins = text("+1").findOnce().bounds();
            click(familyCoins.centerX(), familyCoins.centerY());
            console.log("家庭积分  +1");
        }
        back();
        sleep(2000);
    }
    console.log("每日家庭签到积分已完成，开始收取其他积分");
    sleep(2000);
    
    
    if(text("全部领取").findOnce() == null){
        console.log("当前没有其他可以收取的积分！");
    }
    else{
        var otherCoins = text("全部领取").findOnce().bounds();
        click(otherCoins.centerX(), otherCoins.centerY());
        console.log("其他积分已全部收取完成！");
    }
    sleep(2000);
    console.log("积分签到任务完成，开始下一任务！");
    sleep(2000);

}

toIndex();
console.log("任务已全部完成，即将回到桌面\n谢谢使用，再会！");
home();
sleep(3000);
console.hide();
