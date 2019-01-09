# 常用代码整理

### javascript常用代码
#### 字符串相关
``` javascript
substr(start, length) // 截取start开始长度为length的字符串
slice(start, end) // 返回start到end的子串，不改变原字符串
splice(start, deleteCount, item...) // 改变原来子串，从start位置开始，删除deleteCount个元素，插入item元素。后两个参数可选
```
#### 判断数组中是否有该元素（可传比较函数）
``` javascript
/**
* find item in array
* @param  {[type]} array [description]
* @param  {[type]} item  [description]
* @return {[boolean]}    is the item in array
*/
function find(array, item) {
    return !!~array.findIndex(element => (element === item));
}
```
#### 日期格式化相关
``` javascript
function formatTime(date) {
  var now = date || new Date();
  var result = "";
  result = now.getFullYear() + "年";
  result += ("0" + (now.getMonth() + 1)).slice(-2) + "月";
  result += ("0" + now.getDate()).slice(-2) + "日 ";
  result += ("0" + now.getHours()).slice(-2) + ":";
  result += ("0" + now.getMinutes()).slice(-2) + ":";
  result += ("0" + now.getSeconds()).slice(-2) + " 星期";
  result += transformZhCn(now.getDay());
  return result;
}

function transformZhCn(index) {
    let dataObj = {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
    };
    return dataObj[index];
}

```
#### 编码解码相关
``` javascript
JSON.parse(text, reviver); // 将text字符串转换为JSON对象，对每个对象成员调用reviver
JSON.stringify(value, replacer, space); //将value转换为字符串，每个对象键值调用replacer,插入space数量的空格
encodeURI(URIstring); // 编码url
encodeURIComponent(URIstring); // 以组件形式编码url
decodeURI(URIstring); // 解码url
decodeURIComponent(URIstring); // 以组件形式解码url
```

#### React Element UI Form 组件 Rules 类型整理
> * `string`: Must be of type string. This is the default type.
> * `number`: Must be of type number.
> * `boolean`: Must be of type boolean.
> * `method`: Must be of type function.
> * `regexp`: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
> * `integer`: Must be of type number and an integer.
> * `float`: Must be of type number and a floating point number.
> * `array`: Must be an array as determined by Array.isArray.
> * `object`: Must be of type object and not Array.isArray.
> * `enum`: Value must exist in the enum.
> * `date`: Value must be valid as determined by Date
> * `url`: Must be of type url.
> * `hex`: Must be of type hex.
> * `email`: Must be of type email.

### git常用资源
#### 标签功能
``` Shell
git tag #显示所有标签
git tag -l 'v1.0.*' #显示v1.0开头的标签
git tag -a -m 'some tip' #增加标签并展示
git show v1.0 #查看v1.0的信息
git push origin --tags #推送所有标签
```
#### 分支功能
``` Shell
git checkout -b newBranch origin/oldBranch #以远程分支为基础创建新分支
git branch -D curBranch #删除现有分支
git merge newBranch #merge新分支到现有分支
```
#### 远程常用功能
``` Shell
git pull #拉取所有信息到本地
git push #推送本地信息到远程
git remote -v #查看远程分支信息
git remote add upstream git@github.com:sfilata/gitskills.git #添加远程主机
git fetch #拉取远程主机信息
```
