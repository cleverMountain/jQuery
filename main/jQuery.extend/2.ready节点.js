
console.log(document.readyState)
document.onreadystatechange = function () {
  console.log(document.readyState)
}
/**
 * loading：表示文档正在加载中。
 * interactive：表示文档已完成加载，文档已被解析，但图像、样式表和框架等子资源仍在加载。
 * complete：表示文档和所有子资源已完成加载。如果状态变成这个，表明load事件即将触发。window.onload
 */


// dom加载完成
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded')
}, false)




// 触发顺序
/**
 * readystate: interactive
 * DOMContentLoaded
 * readystate: complete
 * load
 */