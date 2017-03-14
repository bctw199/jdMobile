/**
 * Created by LuoJinTang on 2017/2/22.
 */
window.onload = function(){
    leftSideScroll();
}



var leftSideScroll = function(){
    var leftBox = document.getElementsByClassName('category-left-box')[0];
    var left_move_Box = document.getElementsByClassName('category-list')[0];
    setTranslate(left_move_Box,0);
    var startY=0;
    var endY=0;
    var offsetY=0;
    var startOffsetY=0;
    var movingY=0;
    leftBox.addEventListener('touchstart',function(e){
        startY=e.changedTouches[0].clientY;
        startOffsetY=parseInt(window.getComputedStyle(left_move_Box,null).transform.substring(7,26).split(',')[5]);
        console.log(startOffsetY);
       // console.log(startY);
    });

    $('.category-left-box').on('touchmove',function(e){
        movingY = e.originalEvent.changedTouches[0].clientY;
        offsetY=Math.abs(movingY-startY);
            if(offsetY<150 && movingY>startY){
                setTranslate(left_move_Box,offsetY+startOffsetY);
            }else if(offsetY<150 && movingY<startY){
                setTranslate(left_move_Box,startOffsetY-offsetY);
            }else{
                console.log('超过了');
            }

    });
    leftBox.addEventListener('touchend',function(e){
        endY = e.changedTouches[0].clientY;
        if (endY > startY && startOffsetY>=-150) {
            setTransition(left_move_Box);
            setTranslate(left_move_Box, 0);
        } else if (endY < startY && startOffsetY < -520) {
            setTransition(left_move_Box);
            setTranslate(left_move_Box, -675);
        }
    });
};


/*设置过渡函数*/
var setTransition = function(obj){
    obj.style.transition='all,0.3s,ease,0.3s';
    obj.style.webkitTransition='all,0.3s,ease,0.3s';
};
/*设置位置变化函数*/
var setTranslate = function(obj,x){
    obj.style.transform='translateY('+x+'px)';
    obj.style.webkitTransform='translateY('+x+'px)';
};
/*清除过渡*/
var removeTransition = function(obj){
    obj.style.transition='none';
    obj.style.webkitTransition='none';
};


