# TypeORM #4291 Fix Demo

This is a minimal repo for manually testing the fix for [#4291](https://github.com/typeorm/typeorm/issues/4291).

## Instructions

1. yarn install / npm install
2. yarn webpack / npx webpack
3. serve root in a webserver, open up index.html

You'll see the reported error `Cannot connect:  TypeError: Cannot read property 'Database' of undefined` in the console.

Now test the fix my editing line 304 of `node_modules/typeorm/browser/driver/sqljs/SqljsDriver.js`:

```diff
if (PlatformTools.type === "browser") {
-    this.sqlite = window.SQL;
+   this.sqlite = window.SQL || window.initSqlJs;
}
```

Build again with webpack and now it should work.

Test out the asm.js version by uncommenting the indicated line in webpack.config.js
