; (function (window) {

  function jQuery(selector) {

    return new jQuery.prototype.init(selector)
  }
  // init也是一个构造函数
  jQuery.prototype.init = function () {

  }



  jQuery.prototype = {

    jquery: '12', // 版本

    constructor: jQuery, // 修正construtor
    init: function (selector, context, rootjQuery) {
      console.log(this)
      return this
      var match, elem;
      if (!selector) {
        return this;
      }

      // Handle HTML strings
      if (typeof selector === "string") {
        if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
          // Assume that strings that start and end with <> are HTML and skip the regex check
          match = [null, selector, null];

        } else {
          match = rquickExpr.exec(selector);
        }

        // Match html or make sure no context is specified for #id
        if (match && (match[1] || !context)) {

          // HANDLE: $(html) -> $(array)
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;

            // scripts is true for back-compat
            jQuery.merge(this, jQuery.parseHTML(
              match[1],
              context && context.nodeType ? context.ownerDocument || context : document,
              true
            ));

            // HANDLE: $(html, props)
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                // Properties of context are called as methods if possible
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match]);

                  // ...and otherwise set as attributes
                } else {
                  this.attr(match, context[match]);
                }
              }
            }

            return this;

            // HANDLE: $(#id)
          } else {
            elem = document.getElementById(match[2]);

            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            if (elem && elem.parentNode) {
              // Inject the element directly into the jQuery object
              this.length = 1;
              this[0] = elem;
            }

            this.context = document;
            this.selector = selector;
            return this;
          }

          // HANDLE: $(expr, $(...))
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector);

          // HANDLE: $(expr, context)
          // (which is just equivalent to: $(context).find(expr)
        } else {
          return this.constructor(context).find(selector);
        }

        // HANDLE: $(DOMElement)
      } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;

        // HANDLE: $(function)
        // Shortcut for document ready
      } else if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
      }

      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }

      return jQuery.makeArray(selector, this);
    },


    selector: "",


    length: 0,

    toArray: function () {
      let obj = {
        0: 1,
        1: 2,
        length: 2
      }
      // 将类数组转化成数组
      console.log(Array.prototype.slice.call(obj))
      /**
       * {
       *   0: div,
       *   length: 1
       * }
       */
      return [].slice.call(this)
    },


    get: function (num) {

    },


    pushStack: function (elems) {


    },


    each: function (callback, args) {

    },

    ready: function (fn) {

    },

    slice: function () {

    },

    first: function () {

    },

    last: function () {

    },

    eq: function (i) {

    },

    map: function (callback) {

    },

    end: function () {

    },

    push: function () { },
    sort: [].sort,
    splice: [].splice
  };

  jQuery.prototype.css = function () { }
  jQuery.prototype.init.prototype = jQuery.prototype;
  /**
   * 1. 修正jQuery
   */
  function A() { }
  // A.prototype.constructor = A 默认执行
  let a = new A()
  console.log(a.constructor === A.prototype.constructor)
  A.prototype = { a: 1 } // 重写了原型属性，打印时的得到ƒ Object() { [native code] }
  // jQuery做法
  A.prototype = {
    a: 1,
    constructor: A // 修正constructor
  }
  console.log(A.prototype.constructor)


  window.$ = window.jQuery = jQuery
  console.log($('li').toArray())
})(window);