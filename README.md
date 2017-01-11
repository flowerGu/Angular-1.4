# ng-bind
 ng-bind="方法名" 绑定一方法的返回值
 ng-bind="arr[0]" 绑定数组中的某一个值

#ng-repeat、ng-options(select)

 * ng-repeat 数组循环html代码创建下拉列表
 * ng-options 针对一个对象
 * ng-repeat 字符串
 
# directive
 ## restrict:E(元素)
  ```bash
  	<my-directive></my-directive>
  ```
  
 	  A(属性)
	  
 ```bash
	<div my-directive="expression"></div>
 ```
 
	  C(类名)
```bash
	<div class="my-directive"></div>
```
	 
 ## template
 
* html元素
* 接收两个参数的函数
 
## templateUrl
* 外部html文件
*  同template

##replace

* false（默认)
* 将template/templateUrl的内容当作子元素插入到指令元素内部

#ng实现load
1> angular.element(window).bind('load', function() {  
 alert('1');  
});  
2> $scope.$on('$viewContentLoaded', function() {  
    alert('1'); 
 });  
3> $scope.$watch('$viewContentLoaded', function() {  
    alert('1');  
    });
4> <div data-ng-init="load()" ></div> 
	$scope.load = function() {  
            alert('code here');  
         }  
