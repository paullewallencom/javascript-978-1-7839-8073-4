define([], function() {
  var Injector = {}

  Injector.resolve = function(dependencies, fn) {
    return function() {
      var fnArguments = Array.prototype.slice.apply(arguments)

      require(dependencies, function() {
        var dependenciesArguments = Array.prototype.slice.apply(arguments)
          , compositeArguments = dependenciesArguments.concat(fnArguments)

        fn.apply(null, compositeArguments)
      })
    }
  }

  return Injector
})
