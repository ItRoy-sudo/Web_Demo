window.onload=function (){     /*记得加上这句，window对象加载完执行*/
    //获取两侧按钮以及图片盒子的Dom节点
    let leftButton=document.querySelector("#left-button");
    let rightButton=document.querySelector("#right-button");
    let imgBox=document.querySelector("#img-box");

    let index=1;   /*index表示当前显示第几张图片*/

    //设置函数节流锁
    //为什么要设置呢？如果不设置节流，当一张图片过渡到下一张要耗时0.5s，但0.5s内用户切换多次，使得效果很差。设置节流锁是为了让过渡时间走完再切换
    let lock=true;   /*lock等于false表示当前正在节流，有过渡效果实现，不能切换；当等于true表示未节流，可以进入切换*/

    //向右切换的点击事件
    rightButton.onclick=function (){
        if(!lock){  /*lock为false，正在过渡，不能切换*/
            return;
        }
        index++;
        if(index>3){   /*如果index大于3，即播放到假第一张图片*/
            /*设置延时器，因为css中过渡效果时间为0.5s，所以设置延时0.5s后执行以假乱真的效果，即0.5s后用真第一张图片替换假第一张图片*/
            setTimeout(()=>{
                imgBox.style.left=0;   /*将可视区域移动到第一张图片，达到以假乱真的视觉欺骗*/
                imgBox.style.transition="none";  /*!!注意：若不取消过渡效果，则假第一张图片到真第一张图片会有过渡效果，会暴露无缝轮播*/
                index=1;
            },500)
        }
        imgBox.style.transition="0.5s ease";  /*补上过渡效果，因为上面延时器内取消了过渡效果*/
        let left=-(index-1)*1077;   /*定义初始left，对应#img-box里的left*/
        imgBox.style.left=left+"px";
        //正在进行过渡，关闭节流锁，过渡时间结束后再打开
        lock=false;
        setTimeout(()=>{
            lock=true;
        },500);
    }
    //克隆假第一张图片并添加至图片盒子
    let falseFirstImg=imgBox.firstElementChild.cloneNode();   /*cloneNode可以传参true，如果为true，则深度克隆节点，包括该节点底下的所有节点*/
    imgBox.appendChild(falseFirstImg);     /*添加节点*/

    //!!!!注意：最后一张切换到第一张和第一张切换到最后一张的无缝轮播实现有差别
    //最后一张切换到第一张：在最后一张后添加假第一张，让最后一张向假第一张过渡，当过渡时间结束后立马换成真第一张
    //第一张切换到最后一张：先取消过渡效果，然后把真第一张换成假第一张，这之后再补上过渡效果从假第一张过渡到最后一张（不需要克隆假最后一张）

    //向左切换的点击事件
    leftButton.onclick=function (){
        if(!lock){  /*lock为false，正在过渡，不能切换*/
            return;
        }
        index--;
        if(index<1){  /*index小于1，即第一张切换到假第一张后过渡到最后一张*/
            /*!!!!注意：先让图片无过渡效果替换，再有过渡效果的到最后一张图片*/
            imgBox.style.left=-1077*(4-1)+"px";
            imgBox.style.transition="none";
            setTimeout(()=>{
                imgBox.style.transition="0.5s ease";
                index=3;
                let left=-(index-1)*1077;   /*定义初始left，对应#img-box里的left*/
                imgBox.style.left=left+"px";
            },0)
        }else{
            let left=-(index-1)*1077;   /*定义初始left，对应#img-box里的left*/
            imgBox.style.left=left+"px";
        }
        //正在进行过渡，关闭节流锁，过渡时间结束后再打开
        lock=false;
        setTimeout(()=>{
            lock=true;
        },500);
    }
}
