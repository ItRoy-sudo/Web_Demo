function MyObj(){
    let privateVal=10;
    function privateFuction(){
        return false;
    }
    MyObj.prototype.fuc=function (){
        return privateVal;
    }
}

let obj=new MyObj();
console.log(obj.fuc());
