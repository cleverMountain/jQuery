    const dfd = $.Deferred()
 
    setTimeout(function () {
  
      // dfd.resolve()
      console.dir(dfd)
      dfd.reject()
    })

    dfd.done(function aaa() {
      console.log('成功')
    }).fail(function bbb() {
      console.log('失败')
    })

jQuery.each( tuples, function( i, tuple ) {
  var list = tuple[ 2 ],
    stateString = tuple[ 3 ];

  // promise[ done | fail | progress ] = list.add 添加回调队列
  promise[ tuple[1] ] = list.add;

  // 状态resolved rejected undefined
  if ( stateString ) {
    // 当是done或者fail时已经放进了三个数组了

    list.add(function() {
      // state = [ resolved | rejected ]
      state = stateString;
      debugger
    // [ reject_list | resolve_list ].disable; progress_list.lock
    }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
  }

  // 添加resolve resolveWidth reject rejectWidth  notify notifyWidth
  // 执行dfd.resolve()相当于执行resolveWidth => list.fireWith
  deferred[ tuple[0] ] = function() {
    deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
    return this;
  };
  deferred[ tuple[0] + "With" ] = list.fireWith;
});


// 1.在list防如三个函数
list.add(function() {
  // state = [ resolved | rejected ]
  state = stateString;
  debugger
// [ reject_list | resolve_list ].disable; progress_list.lock
}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock )

// 2.执行resolve或者reject时，会遍历list一次执行三个函数，改变状态并禁用