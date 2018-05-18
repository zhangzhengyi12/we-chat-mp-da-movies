基本打算不用任何框架了，就依赖原始的小程序吧，有些东西还没有被暴露出来。我必须自己去试试才行。

- 组件的created周期中，Props还没有被合并加入。

狗屎bug

http://tu.66vod.net/2017/7486.jpg
https://tu.66vod.net/2018/0770.jpg

不支持直接在外围回调传index,只能在组件内部数据中插入，然后再返回

要做Loading动画

评分可以是两个类进度条，同样可以做动画 width

一些组件需要做二次的抽离 比如top-show rating