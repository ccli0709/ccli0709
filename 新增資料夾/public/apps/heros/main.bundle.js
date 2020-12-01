webpackJsonp([2,4],{

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-info\">\r\n  <div class=\"panel-heading\">{{title}}</div>\r\n  <div class=\"panel-body\">\r\n    <ul class=\"list-group\">\r\n      <li class=\"list-group-item\"\r\n        *ngFor=\"let hero of heroes\"\r\n        (click)=\"OnSelect(hero)\"\r\n        [class.active]=\"hero === selectedHero\"\r\n        style='cursor:pointer'>\r\n        {{hero.name}}&nbsp;&nbsp;\r\n        <span class=\"label label-success\">HP&nbsp;&nbsp;<span class=\"badge\">{{hero.hp}}</span></span>&nbsp;\r\n        <span class=\"label label-info\">MP&nbsp;&nbsp;<span class=\"badge\">{{hero.mp}}</span></span>&nbsp;\r\n        <span class=\"label label-danger\">STR&nbsp;&nbsp;<span class=\"badge\">{{hero.str}}</span></span>&nbsp;\r\n        <span class=\"label label-warning\">VIT&nbsp;&nbsp;<span class=\"badge\">{{hero.vit}}</span></span>&nbsp;\r\n        <span class=\"label label-primary\">DEX&nbsp;&nbsp;<span class=\"badge\">{{hero.dex}}</span></span>&nbsp;\r\n      </li>\r\n    </ul>\r\n    <div *ngIf=\"selectedHero\">\r\n      <div class=\"form-group\">\r\n        <label>編號</label>\r\n        <input class=\"form-control\" [(ngModel)]=\"selectedHero.id\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>名稱</label>\r\n        <input class=\"form-control\" [(ngModel)]=\"selectedHero.name\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>HP</label>\r\n        <input class=\"form-control\" [(ngModel)]=\"selectedHero.hp\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>MP</label>\r\n        <input class=\"form-control\" [(ngModel)]=\"selectedHero.mp\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>STR</label>\r\n        <input class=\"form-control\" [(ngModel)]=\"selectedHero.str\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>VIT</label>\r\n        <input class=\"form-control\" [(ngModel)]=\"selectedHero.vit\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>DEX</label>\r\n        <input class=\"form-control\" [(ngModel)]=\"selectedHero.dex\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(74);


/***/ }),

/***/ 73:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 73;


/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(83);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* unused harmony export Hero */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = '英雄聯萌';
        this.heroes = HEROS;
    }
    AppComponent.prototype.OnSelect = function (hero) {
        this.selectedHero = hero;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(139),
        styles: [__webpack_require__(137)]
    })
], AppComponent);

var Hero = (function () {
    function Hero() {
    }
    return Hero;
}());

var HEROS = [
    { id: 1, name: '蜘蛛人', hp: 500, mp: 100, str: 400, vit: 200, dex: 500 },
    { id: 2, name: '鋼鐵人', hp: 300, mp: 200, str: 100, vit: 100, dex: 200 },
    { id: 3, name: '綠巨人', hp: 600, mp: 300, str: 500, vit: 200, dex: 100 },
    { id: 4, name: '雷神索爾', hp: 700, mp: 200, str: 100, vit: 500, dex: 100 },
    { id: 5, name: '鷹眼', hp: 100, mp: 100, str: 200, vit: 200, dex: 300 },
    { id: 6, name: '黑寡婦', hp: 200, mp: 200, str: 100, vit: 300, dex: 500 },
    { id: 7, name: '美國隊長', hp: 900, mp: 200, str: 500, vit: 200, dex: 400 },
    { id: 8, name: '緋紅女巫', hp: 600, mp: 400, str: 300, vit: 400, dex: 400 },
    { id: 9, name: '白銀', hp: 500, mp: 100, str: 200, vit: 100, dex: 200 },
];
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(81);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[164]);
//# sourceMappingURL=main.bundle.js.map