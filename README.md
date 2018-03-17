# plug-ins-SPA-Route
一个基于jquery的简单路由控制页面变化，可用于中后台页面


提供方法：
1.路由 对应demo中的a 可自己封装页面调用
var route = new Route();

方法：
a.设定初始页面
@name：string 初始页面名字
route.init(name);

b.添加路由
@name：string 路由名字
@callback：function 回调函数
route.add(name，callback);

c.删除已存在路由
@name：string 路由名字
route.remove(name);

d.开始路由
route.start();
