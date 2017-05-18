import {feedBack} from 'mainPack/index'

feedBack('Starting module A');

export function close() {
	feedBack('Closing module A');
}

/* ./tsconfig.json = {
  "compilerOptions": {
		"sourceRoot": "../../module",	- given from recursive/dist/module to configure given path in sourcemaps
		"baseUrl": "..",	- given from recursive/module to specify the root of the following path
		"paths": {
      "mainPack/*": ["./src/*"]	- given from "baseUrl" to help the editor find the types and references
		}
  }
}*/


/*
If this file is modified while the example is running, the console displays :
```
Module feedback: Closing module A
Module feedback: Starting module A
```
as the function `close` of the "old" module (the one loaded before the modification) is called,
and after, the "new module" is executed
*/