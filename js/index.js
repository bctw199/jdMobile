/**
 * Created by java on 2017/2/21.
 */
/*入口函数*/
window.onload = function(){
    search();
    countdown();
    bannerScroll();

};
/*搜索框透明度变化函数*/
var search = function(){
    var search_box = document.getElementsByClassName('header-content')[0];
    var height = document.getElementsByClassName('jd-banner')[0].offsetHeight;
    window.onscroll = function(){
        var top = document.body.scrollTop;
        var opacity = top/height*0.85;
        if(top>height){
            search_box.style.backgroundColor='rgba(201, 22, 0, .85)';
        }else{
            search_box.style.backgroundColor='rgba(201, 22, 0,'+top/height*0.85+')';
        }
    }
};

/*秒杀倒计时函数*/
var countdown = function(){
    var time = 4*3600;
    var showSpan = document.getElementsByClassName('sk-time')[0];
    var showTime = showSpan.getElementsByClassName('num');
    window.setInterval(function(){
        time--;
        var h =Math.floor(time/3600);
        var m = Math.floor(time/60)%60;
        var s = time%60;

        showTime[0].innerHTML=h>10?Math.floor(h/10):0;
        showTime[1].innerHTML = h%10;

        showTime[2].innerHTML=m>10?Math.floor(m/10):0;
        showTime[3].innerHTML = m%10;

        showTime[4].innerHTML=s>10?Math.floor(s/10):0;
        showTime[5].innerHTML = s%10;
    },1000)
};
/*轮播图动画函数*/
var bannerScroll = function(){
    var bannerBox = document.getElementById("banner");
    var banner=bannerBox.children[0];
    var img_count=banner.children.length-2;//获取图片数量
    var controlBox = bannerBox.children[1];//获取控制条
    for(var i=0;i<img_count;i++){//动态添加控制条
        var li = document.createElement('li');//先创建后添加
        controlBox.appendChild(li);
    }
    var index = 1;
    var start_translateX=0; //touchstart时translateX的数值
    var end_translateX=0;   //touchEnd时translateX的数值
    var imgWith = banner.children[0].offsetWidth;//单张图片宽度

    var control = controlBox.children;
    control[0].classList.add('active');
    var startX=0;        //touchstart时接触点的位置
    var endX=0;         //touchend时接触点的位置
    var timer=null;


    //轮播图自动播放
    //clearInterval(timer);
    timer=setInterval(function(){
        index++;
        setTransition(banner);
        setTranslate(banner, -index * imgWith);
        transitionEnd(-1);
    },4000);

    //touchstart事件
    banner.addEventListener('touchstart',function(e){
        clearInterval(timer);
        startX= e.touches[0].clientX;
        //console.log(startX);
        //console.log('dd'+window.getComputedStyle(banner,null).transform);//获取translate的值，返回字符串"matrix(1, 0, 0, 1, -375, 0)"
        //截取字符串matrix(1, 0, 0, 1, -375, 0)，得到字符串数组["1", " 0", " 0", " 1", " -375", " 0"]
        var StrArray=window.getComputedStyle(banner,null).transform.substring(7,26).split(',');
        //通过parseInt方法将"-375"转换成number类型
        start_translateX = parseInt(StrArray[4]);
        //console.log(start_translateX);
    },false);

    //touchmove事件
    $('#banner').on('touchmove',function(e){
        //e.preventDefault();
        var currentX = e.originalEvent.changedTouches[0].clientX;
        console.log(currentX);
        var offsetX=currentX-startX;
        $('#imgBox').css({'webkitTransform':'translateX('+(start_translateX+offsetX)+'px)'});
    });

    //touchend事件
    banner.addEventListener('touchend',function(e){
        //获取结束位置的translateX值
        var StrArray=window.getComputedStyle(banner,null).transform.substring(7,26).split(',');
        end_translateX = parseInt(StrArray[4]);
        console.log(end_translateX);
        endX = e.changedTouches[0].clientX;

        //当滑动距离大于80px时图片切换到另一张
        if(Math.abs(endX-startX)>80){
            if (endX >= startX) {
                index--;
                setTransition(banner);
                setTranslate(banner, -index * imgWith);
                transitionEnd(-1);
            } else {
                index++;
                setTransition(banner);
                setTranslate(banner, -index * imgWith);
                transitionEnd(-1);

            }
        }
        //当滑动距离小于100像素的时候图片跟随滑动，释放后图片复位
        else{
            //向右滑动时图片向左复位
            if(endX>startX){
                setTransition(banner);
                setTranslate(banner,end_translateX-Math.abs(end_translateX-start_translateX));
            }
            //向左滑动时图片向右复位
            else{
                setTransition(banner);
                setTranslate(banner,end_translateX+Math.abs(end_translateX-start_translateX));
            }
        }
        timer=setInterval(function(){
            index++;
            setTransition(banner);
            setTranslate(banner, -index * imgWith);
            transitionEnd(-1);
        },4000);


    }, false);



    /*设置过渡函数*/
    var setTransition = function(obj){
        obj.style.transition='all,0.3s,ease,0.3s';
        obj.style.webkitTransition='all,0.3s,ease,0.3s';
    };
    /*设置位置变化函数*/
    var setTranslate = function(obj,x){
        obj.style.transform='translateX('+x+'px)';
        obj.style.webkitTransform='translateX('+x+'px)';
    };
    /*清除过渡*/
    var removeTransition = function(obj){
        obj.style.transition='none';
        obj.style.webkitTransition='none';
    };

    var transitionEnd = function(flag){
        banner.addEventListener('webkitTransitionEnd', function () {
            if (index >= 9) {
                removeTransition(banner);
                index = 1;
                setTranslate(banner, -index * imgWith);
            } else if (index <= 0) {
                removeTransition(banner);
                index = 8;
                setTranslate(banner, index * imgWith*flag);
            }
            //console.log('transitionEnd');
            //console.log(index);

            //banner控制条跟随动画
            for(var i=0;i<control.length;i++){
                control[i].classList.remove('active');
            }
            control[index-1].classList.add('active');
        }, false);
    };

};

/*for(var i=0;i<control.length;i++){
 control[i].classList.remove('active');
 }
 index++;
 if(index<9){
 control[index-1].classList.add('active');
 }else if(index==9){
 control[index-9].classList.add('active');
 }else if(index==10){
 control[index-10].classList.add('active');
 }


 setInterval(function(){
 index++;
 setTransition(banner);
 setTranslate(banner,-index*imgWith);
 },1500);
 banner.addEventListener('webkitTransitionEnd',function(){
 if(index>=9){
 index=1;
 setTranslate(banner,-index*imgWith);
 removeTransition(banner);
 }else if(index<=0){
 index=8;
 setTranslate(banner,-index*imgWith);
 removeTransition(banner);
 }
 },false);

 */

