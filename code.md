# 常用代码整理

### javascript常用代码
#### 字符串相关
``` javascript
substr(start, length) // 截取start开始长度为length的字符串
slice(start, end) // 返回start到end的子串，不改变原字符串
splice(start, deleteCount, item...) // 改变原来子串，从start位置开始，删除deleteCount个元素，插入item元素。后两个参数可选
```
#### 日期格式化相关
``` javascript
function formatTime() {
  var now = new Date();
  var result = "";
  result = now.getFullYear() + "年";
  result += ("0" + (now.getMonth() + 1)).slice(-2) + "月";
  result += ("0" + now.getDate()).slice(-2) + "日 ";
  result += ("0" + now.getHours()).slice(-2) + ":";
  result += ("0" + now.getMinutes()).slice(-2) + ":";
  result += ("0" + now.getSeconds()).slice(-2) + " 星期";
  result += tansformZhCn(now.getDay());
  return result;
}

function tansformZhCn(index) {
  switch (index) {
    case 0:
      return "日";
      break;
    case 1:
      return "一";
      break;
    case 2:
      return "二";
      break;
    case 3:
      return "三";
      break;
    case 4:
      return "四";
      break;
    case 5:
      return "五";
      break;
    case 6:
      return "六";
      break;
    default:
      break;
  }
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