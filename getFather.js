    /**
     * 获得一个position为absolute对象的父元素
     * @param  {} obj [一个position为absolute的元素]
     * @return {}     [这个元素的父元素，定位以这个元素为基准]
     */
function getFather(obj) {

    // 获取当前的父元素
    var father = obj.parentNode;

    for (var fatherStyle = getComputedStyle(father, false)['position'];
             fatherStyle == 'static' || fatherStyle == 'inherit';
             father = father.parentNode) {
    // 每次更新fatherStyle的值
        fatherStyle = getComputedStyle(father, false)['position'];

    // 当position为inherit时计算其实际的position,如果结果为非innerit且
    // 非static则直接返回开始初始化的position为inherit的元素
        for (var child = father; fatherStyle == 'inherit';) {
                 father = father.parentNode;
                 fatherStyle = getComputedStyle(father, false)['position'];
    // 判断非inherit且非static，返回结果
            if (fatherStyle != 'inherit' && fatherStyle != 'static') {
                father = child;
                return father;
            }
        }
        if (father == window) {
            break;
        }
    }
    return father;
}