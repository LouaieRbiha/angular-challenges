We're using a pure pipe on function so they don't get called on each change detection cycle
sometimes our method that we want to wrap calls other methods with this operator in that case you need to bind your method to this operator eg. myMethod.bind(this)
Be careful when you bind your method directly on the template with myMethod.bind(this) it will be recomputed on every change detection cycle even when you wrap it with the pure pipe because it will create a reference each time with bind
In that case you need to create a reference in the component then you can use it in the template and it will no re compute if the value or args of the pipe are not changed.
Ts => boundMethod = myMethod.bind(this);
HTML => boundMethod | wrapFn : arg1 : arg2 : ...
