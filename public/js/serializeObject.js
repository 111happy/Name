// 将表单中用户输入的内容转换为对象类型
function serializeObject(obj) {
    var result = {};
    var params = obj.serializeArray();
    // 循环数组，将数组转换为对象类型
    $.each(params,function (index,value){
        result[value.name] = value.value;
        // 将处理的结果返回到函数外部
        return result;
    })
    console.log(result);
}