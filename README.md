
[![Build Status](https://travis-ci.org/bknds/ng-pi-admin.svg?branch=master)](https://travis-ci.org/bknds/ng-pi-admin)


Default | Dark | Light
---|---|---
![](https://raw.githubusercontent.com/bknds/ng-pi-admin/master/default.png) |![](https://raw.githubusercontent.com/bknds/ng-pi-admin/master/dark.png) | ![](https://raw.githubusercontent.com/bknds/ng-pi-admin/master/light.png)



## Based on
Angular 4+, Angular CLI, TypeScript, Scss, Bootstrap

## Demo

[Live Demo](http://treesflower.com/ng-pi-admin)

## Getting started
```
git clone https://github.com/bknds/ng-pi-admin.git

npm install

ng serve

localhost:4200
```

## License
[MIT license](LICENSE)



## change the fonts
ng-pi-admin/src/app/shared/theme/base.scss
```
* {
    // font-family: 'roboto-condensed', 'Microsoft Yahei';
    font-family: 'Courier New';
    padding: 0;
    margin: 0;
}
```

## change the theme
ng-pi-admin/src/app/shared/theme/conf.scss

## change the font color in each theme
ng-pi-admin/src/app/shared/theme/color-schemes



## httpclient
https://www.djamware.com/post/5b87894280aca74669894414/angular-6-httpclient-consume-restful-api-example
ng-pi-admin/src/app/app.module.ts
