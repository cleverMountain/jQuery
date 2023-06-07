// $('document') -> 自执行jQuery函数 -> 返回根



// 1
rootjQuery = jQuery(document)
{
  this.context = this[0] = selector
  this.length = 1
}
/**
 * init{
 *  0: document
 *  context: document,
 *  length: 1,
 *  prototype: prototype
 * }
 */



// 2 3216
jQuery(function () { })
// 调用ready方法
rootjQuery.ready(selector)



// 3 6560
jQuery(function () { })
// 调用ready方法
rootjQuery.ready(selector)

// 一共自执行了3次