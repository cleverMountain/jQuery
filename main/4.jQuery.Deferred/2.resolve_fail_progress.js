const dfd = $.Deferred()
console.log(dfd)
setTimeout(function () {
  console.log(1)
  dfd.resolve()
})

dfd.done(function aaa() {
  console.log(2)
})

// 1.执行done往回调队列里添加回调
promise['done'] = jQuery.Callbacks("once memory").add

// 2.执行dfd.resolve() => resolveWidth() => 执行jQuery.Callbacks("once memory").fire
deferred['resolve'] = function () {
  deferred['resolveWith'](promise)
}

// 3.执行deferred['resolveWith']
deferred['resolveWith'] = jQuery.Callbacks("once memory").fireWith


// 最后会执行回调队列的fire函数




/**
 * done | resolve
 * fail | reject
 * progress | notify
 */