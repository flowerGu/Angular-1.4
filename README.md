#ng-bind
 ng-bind="方法名" 绑定一方法的返回值<br>
 ng-bind="arr[0]" 绑定数组中的某一个值<br>

#ng-repeat、ng-options(select)
 ng-repeat 数组循环html代码创建下拉列表<br>
 ng-options 针对一个对象<br>
 ng-repeat 字符串<br>
#directive
 ##restrict:E(元素)
  ```
  	<my-directive></my-directive>
  ```
 	  A(属性)
 ```
	<div my-directive="expression"></div>
 ```
	  C(类名)
```
	<div class="my-directive"></div>
```
	 
 ##template
 		1>html元素
  	    	2>接收两个参数的函数<br>
 ##templateUrl
 	     1>外部html文件<br>
             2>同template<br>
 ##replace
 	false（默认）<br>
   	将template/templateUrl的内容当作子元素插入到指令元素内部
