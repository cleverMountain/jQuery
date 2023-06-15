const dfd = $.Deferred()
console.log(dfd)
setTimeout(function () {
  // 同一个dfd，执行完后list被清空list = [];
  dfd.resolve()
  
  dfd.reject()
})

// push进了两个list
dfd.done(function aaa() {
  console.log('成功')
}).fail(function bbb() {
  console.log('失败')
})

// 1.
jQuery.each( tuples, function( i, tuple ) {
  // 每次循环是一个新的回调队列，list特是一个新的
  var list = tuple[ 2 ],
    stateString = tuple[ 3 ];

  // promise[ done | fail | progress ] = list.add 添加回调队列
  promise[ tuple[1] ] = list.add;
  // 添加resolve resolveWidth reject rejectWidth  notify notifyWidth
  // 执行dfd.resolve()相当于执行resolveWidth => list.fireWith
  deferred[ tuple[0] ] = function() {
    deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
    return this;
  };
  deferred[ tuple[0] + "With" ] = list.fireWith;
});
