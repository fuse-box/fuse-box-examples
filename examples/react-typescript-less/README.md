# react-ts-less-fuse-example

## Test with dev build
`node fuse.js bundle-dev`

**Show into browser at `http://localhost:4444/` <br>**
I have an error into the console when I leave the `import "style.less";` in tsx components. 

### console error
```
Connecting to fusebox HMR at ws://localhost:4444

Uncaught Package not found style.less
f @ react-ts-less-fuse-example.js:21906
c @ react-ts-less-fuse-example.js:21906
y.require @ react-ts-less-fuse-example.js:21906
(anonymous) @ react-ts-less-fuse-example.js:61
c @ react-ts-less-fuse-example.js:21906
y.require @ react-ts-less-fuse-example.js:21906
(anonymous) @ react-ts-less-fuse-example.js:31
c @ react-ts-less-fuse-example.js:21906
y.require @ react-ts-less-fuse-example.js:21906
(anonymous) @ react-ts-less-fuse-example.js:20
c @ react-ts-less-fuse-example.js:21906
y.require @ react-ts-less-fuse-example.js:21906
(anonymous) @ react-ts-less-fuse-example.js:10
c @ react-ts-less-fuse-example.js:21906
r.import @ react-ts-less-fuse-example.js:21906
(anonymous) @ react-ts-less-fuse-example.js:21903
(anonymous) @ react-ts-less-fuse-example.js:21906

Connected
```

Now, when I comment `import "style.less";` in tsx components.
I don't have an console error and the first import `import "core.less";` into `widget.tsx` is successful.


## Test with quantum build
`node fuse.js bundle-standalone`

**Show into browser on the local folder <br>**
I don't have an error into the console when I leave the `import "style.less";` in tsx components
and the first import `import "core.less";` into `widget.tsx` is successful.

## Initialize LESS configuration

When I want to build LESS and generated the index.html, I must used the configuration!
**It's normal?**

```
plugins: [

  // Init before for build LESS!
  WebIndexPlugin(),

  // Init LESS build
  [LESSPlugin({
    paths: [
      path.resolve(__dirname, "node_modules")
    ]
  }), CSSPlugin()],
  
  // Init after for build index.html!
  WebIndexPlugin({
    template: "src/index.html",
    title: "React + TypeScript + LESS example",
    target: "index.html"
  })
  
]
```

Thank you, best regards.