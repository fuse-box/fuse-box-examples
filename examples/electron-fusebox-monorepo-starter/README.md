# electron-fusebox-react
starter kit for electron / monorepo with fusebox

#current
```text
src/
-packages(monorepo)
-project(desktop app directory)
```

#alternative
```text
src/
project/
-app
-desktop
-packages(monorepo)
```
## 1) change paths option in tsconfig from 
```js
paths: {"@coglite/*": ["src/packages/*"]} to paths: {"@coglite/*": ["src/project/packages/*"]}
```
## 2) change alias in fuse.js from 
```js
alias : {"@coglite" : "~/packages"} to alias : {"@coglite" : "~/project/packages"}
```



#yarnrc alternative
```text
save-exact true
disturl "https://atom.io/download/electron"
target "2.0.3"
runtime "electron"
build-from-source true
```