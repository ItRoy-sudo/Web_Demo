window.onload=function (){
    //方法1————通过拖拽事件实现拖拽

    //获取.box1该类的Dom对象
    let box1=document.querySelector("#box1");
    //拖拽开始触发：
    //传入的参数e是事件，这里表示拖拽事件对象
    box1.ondragstart=function (e){
        //dataTransfer用于源对象（拖拽元素）和目标对象（待放入拖拽对象的元素）之间传递数据
        //setData第一个参数为传递数据的类型，第二个参数为数据（这里传的数据是拖拽元素的id）
        e.dataTransfer.setData("text",e.target.id);
        console.log("拖拽开始");
    }
    //拖拽结束触发：
    box1.ondragend=function(){
        console.log("拖拽结束");
    }
    //拖拽元素离开原来位置时触发（注意别和ondragend混淆）：
    box1.ondragleave=function(){
        console.log("拖拽离开");
    }
    //拖拽过程时触发：
    box1.ondrag=function(){
        console.log("正在拖拽");
    }
    //获取.box3该类的Dom对象
    let box3=document.querySelector("#box3");
    //当拖拽元素进入到目标元素时触发：
    box3.ondragenter=function (){
        console.log("拖拽元素进来了");
    }
    //当拖拽元素离开目标元素时触发：
    box3.ondragleave=function (){
        console.log("拖拽元素离开了");
    }
    //当拖拽元素停留在目标元素时触发：
    box3.ondragover=function (e){
        //注意：一定要加上event.preventDefault(),是为了取消ondrop事件的默认动作
        e.preventDefault();
    }
    //当在目标元素上松开鼠标时触发：
    box3.ondrop=function (e){
        //获取拖拽元素的id，与上面的setData相对应
        let data=e.dataTransfer.getData("text");
        //e.target表示触发事件的节点，然后通过该节点移动id为data的元素
        // 这样就使得拖拽元素进到目标元素里
        e.target.appendChild(document.getElementById(data));
    }



    //方法2————通过鼠标事件实现拖拽
    // 两大要点：
    // 1.如何判断处于拖拽状态？鼠标左键按下+鼠标处于拖拽元素区域
    // 2.鼠标动，则拖拽元素动。鼠标现在x/y - 鼠标原先x/y = 拖拽元素现在x/y - 拖拽元素原先x/y

    let box2=document.querySelector("#box2");
    let status=false;       //status为拖拽状态，status=true表示拖拽，反之则未拖拽
    let diffX=0;            //鼠标在拖拽元素区域内点击位置的横坐标-拖拽元素左边框的横坐标，即横坐标差值
    let diffY=0;            //鼠标在拖拽元素区域内点击位置的纵坐标-拖拽元素左边框的纵坐标，即纵坐标差值
    //鼠标按下触发：
    box2.onmousedown=function (e){
        if(e.target.id=="box2")
            status=true;
        diffX=e.clientX-box2.offsetLeft;
        diffY=e.clientY-box2.offsetTop;
    }
    //鼠标弹起触发：
    box2.onmouseup=function (){
        status=false;
    }
    //鼠标移动触发：
    box2.onmousemove=function (e){    //e为鼠标事件对象，所以可以通过e.clientX获取鼠标当前横坐标
        if(status){   //处于拖拽状态才可进行拖拽
            console.log("正在拖拽");
            let left=e.clientX-diffX;     //通过鼠标现在的横坐标减去横坐标差值，得到拖拽元素现在的横坐标
            let top=e.clientY-diffY;
            box2.style.left=left+"px";    //通过样式改变拖拽元素位置
            box2.style.top=top+"px";      //注意：拖拽元素最好使用绝对定位，脱离文档流才可以拖拽
        }
    }
}




