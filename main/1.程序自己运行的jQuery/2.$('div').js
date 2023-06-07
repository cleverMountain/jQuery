// $('div').js 实现


//1. rootjQuery = jQuery(document)得到根rootjQuery
/**
 * init{
 *  0: document
 *  context: document,
 *  length: 1,
 *  prototype: prototype
 * }
 */



// 2.$('div')再次调用jQuery('div').调用jQuery.prototype.init



// 3.经过selector与context判断调用rootjQuery.find( selector );
// 此时rootjQuery.find是rootjQuery.prototype.find
// find方法通过jQuery.prototype.extend扩展find



// 4.jQuery.find( selector, self[ i ], ret )得到ret即[div]
// jQuery.find是构造函数上的方法等于Sizzle



// 5.通过pushStack方法把[div]对象添加上prevObject属性


// 6.返回[div]
/**
 * {
 *  0: div
 *  length: 1
 *  prevObject: [document]
 *  prototype: 
 * }
 */