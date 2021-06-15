(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "0UvW":
/*!********************************!*\
  !*** ./src/app/entity/page.ts ***!
  \********************************/
/*! exports provided: Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Page", function() { return Page; });
/**
 * 分页.
 * @author 河北工业大学梦云智开发团队
 */
class Page {
    constructor(data) {
        this.content = data.content;
        this.number = data.number;
        this.size = data.size;
        this.numberOfElements = data.numberOfElements;
        if (data.last !== undefined) {
            this.last = data.last;
        }
        else {
            this.last = (this.number + 1) * this.size >= this.numberOfElements ? true : false;
        }
        if (data.first !== undefined) {
            this.first = data.first;
        }
        else {
            this.first = this.number === 0 ? true : false;
        }
        if (data.totalPages !== undefined) {
            this.totalPages = data.totalPages;
        }
        else {
            // Math.ceil()实现上取整，比如共10条记录，每页6条，则 10 / 6 = 1.x
            // Math.ceil(1.x) = 2 得出共2页
            this.totalPages = Math.ceil(this.numberOfElements / this.size);
        }
    }
}


/***/ }),

/***/ "biO4":
/*!*******************************************!*\
  !*** ./src/app/clazz/page/page.module.ts ***!
  \*******************************************/
/*! exports provided: PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageModule", function() { return PageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page.component */ "cDLT");




class PageModule {
}
PageModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PageModule });
PageModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PageModule_Factory(t) { return new (t || PageModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PageModule, { declarations: [_page_component__WEBPACK_IMPORTED_MODULE_2__["PageComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]], exports: [_page_component__WEBPACK_IMPORTED_MODULE_2__["PageComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_page_component__WEBPACK_IMPORTED_MODULE_2__["PageComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
                ],
                exports: [_page_component__WEBPACK_IMPORTED_MODULE_2__["PageComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "cDLT":
/*!**********************************************!*\
  !*** ./src/app/clazz/page/page.component.ts ***!
  \**********************************************/
/*! exports provided: PageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageComponent", function() { return PageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _entity_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../entity/page */ "0UvW");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");




const _c0 = function (a0) { return { active: a0 }; };
function PageComponent_li_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PageComponent_li_5_Template_span_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const p_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.onPage(p_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, ctx_r0.currentPage === p_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](p_r1 + 1);
} }
const _c1 = function (a0) { return { "visibility": a0 }; };
const _c2 = function (a0) { return { disabled: a0 }; };
class PageComponent {
    constructor() {
        this.inputPage = new _entity_page__WEBPACK_IMPORTED_MODULE_1__["Page"]({
            content: [],
            number: 0,
            size: 0,
            numberOfElements: 0
        });
        this.pages = [];
        this.currentPage = 0;
        this.bePageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    set page(page) {
        this.inputPage = page;
        console.log('set page被调用');
        console.log('当前页', this.inputPage.number);
        console.log('总页数', this.inputPage.totalPages);
        // 初始化最大页码，起始页码
        let maxCount;
        let begin;
        if (this.inputPage.totalPages > 7) {
            // 大于7页时，仅显示7页
            maxCount = 7;
            // 起始页为当前页-3.比如当前页为10，则应该由7页开始
            begin = this.inputPage.number - 3;
            if (begin < 0) {
                // 判断是否越界，可以删除下一行代码查看错误的效果
                begin = 0;
            }
            else if (begin > this.inputPage.totalPages - 7) {
                // 判断是否越界，可以删除下一行代码查看错误的效果
                begin = this.inputPage.totalPages - 7;
            }
        }
        else {
            // 小于等于7页时，使用原算法。页码数为总页数，页码由0开始
            maxCount = this.inputPage.totalPages;
            begin = 0;
        }
        // 生成页数数组
        this.pages = [];
        for (let i = 0; i < maxCount; i++, begin++) {
            this.pages.push(begin);
        }
        // 设置当前页
        this.currentPage = this.inputPage.number;
    }
    ngOnInit() {
        console.log('page组件调用ngOnInit()方法');
        console.log('当前页', this.inputPage.number);
        console.log('总页数', this.inputPage.totalPages);
    }
    onPage(page) {
        // 点击页码时弹出该页码
        this.bePageChange.emit(page);
    }
}
PageComponent.ɵfac = function PageComponent_Factory(t) { return new (t || PageComponent)(); };
PageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PageComponent, selectors: [["app-page"]], inputs: { page: "page" }, outputs: { bePageChange: "bePageChange" }, decls: 9, vars: 10, consts: [[1, "row", "justify-content-md-center", 3, "ngStyle"], [1, "pagination", "col-md-auto"], [1, "page-item", 3, "ngClass"], [1, "page-link"], ["class", "page-item", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "page-link", 3, "click"]], template: function PageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\u4E0A\u4E00\u9875");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, PageComponent_li_5_Template, 3, 4, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "\u4E0B\u4E00\u9875");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c1, ctx.inputPage.totalPages > 1 ? "visible" : "hidden"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](6, _c2, ctx.inputPage.first));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.pages);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](8, _c2, ctx.inputPage.last));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYWdlLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-page',
                templateUrl: './page.component.html',
                styleUrls: ['./page.component.css']
            }]
    }], function () { return []; }, { page: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], bePageChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "v6Ln":
/*!*********************************!*\
  !*** ./src/app/entity/clazz.ts ***!
  \*********************************/
/*! exports provided: Clazz */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clazz", function() { return Clazz; });
class Clazz {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.teacher = data.teacher;
    }
}


/***/ })

}]);
//# sourceMappingURL=common.js.map