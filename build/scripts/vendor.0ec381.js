webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ "1Ufw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (factory) {
    if (typeof window.define === 'function') {
        if (window.define.amd) {
            // AMD模式
            window.define('wangEditor', ["jquery"], factory);
        } else if (window.define.cmd) {
            // CMD模式
            window.define(function (require, exports, module) {
                return factory;
            });
        } else {
            // 全局模式
            factory(window.jQuery);
        }
    } else if (( false ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
        // commonjs

        // 引用 css —— webapck
        __webpack_require__("x7Ro");
        module.exports = factory(
        // 传入 jquery ，支持使用 npm 方式或者自己定义jquery的路径
        __webpack_require__(1));
    } else {
        // 全局模式
        factory(window.jQuery);
    }
})(function ($) {

    // 验证是否引用jquery
    if (!$ || !$.fn || !$.fn.jquery) {
        alert('在引用wangEditor.js之前，先引用jQuery，否则无法使用 wangEditor');
        return;
    }

    // 定义扩展函数
    var _e = function _e(fn) {
        var E = window.wangEditor;
        if (E) {
            // 执行传入的函数
            fn(E, $);
        }
    };
    // 定义构造函数
    (function (window, $) {
        if (window.wangEditor) {
            // 重复引用
            alert('一个页面不能重复引用 wangEditor.js 或 wangEditor.min.js ！！！');
            return;
        }

        // 编辑器（整体）构造函数
        var E = function E(elem) {
            // 支持 id 和 element 两种形式
            if (typeof elem === 'string') {
                elem = '#' + elem;
            }

            // ---------------获取基本节点------------------
            var $elem = $(elem);
            if ($elem.length !== 1) {
                return;
            }
            var nodeName = $elem[0].nodeName;
            if (nodeName !== 'TEXTAREA' && nodeName !== 'DIV') {
                // 只能是 textarea 和 div ，其他类型的元素不行
                return;
            }
            this.valueNodeName = nodeName.toLowerCase();
            this.$valueContainer = $elem;

            // 记录 elem 的 prev 和 parent（最后渲染 editor 要用到）
            this.$prev = $elem.prev();
            this.$parent = $elem.parent();

            // ------------------初始化------------------
            this.init();
        };

        E.fn = E.prototype;

        E.$body = $('body');
        E.$document = $(document);
        E.$window = $(window);
        E.userAgent = navigator.userAgent;
        E.getComputedStyle = window.getComputedStyle;
        E.w3cRange = typeof document.createRange === 'function';
        E.hostname = location.hostname.toLowerCase();
        E.websiteHost = 'wangeditor.github.io|www.wangeditor.com|wangeditor.coding.me';
        E.isOnWebsite = E.websiteHost.indexOf(E.hostname) >= 0;
        E.docsite = 'http://www.kancloud.cn/wangfupeng/wangeditor2/113961';

        // 暴露给全局对象
        window.wangEditor = E;

        // 注册 plugin 事件，用于用户自定义插件
        // 用户在引用 wangEditor.js 之后，还可以通过 E.plugin() 注入自定义函数，
        // 该函数将会在 editor.create() 方法的最后一步执行
        E.plugin = function (fn) {
            if (!E._plugins) {
                E._plugins = [];
            }

            if (typeof fn === 'function') {
                E._plugins.push(fn);
            }
        };
    })(window, $);
    // editor 绑定事件
    _e(function (E, $) {

        E.fn.init = function () {

            // 初始化 editor 默认配置
            this.initDefaultConfig();

            // 增加container
            this.addEditorContainer();

            // 增加编辑区域
            this.addTxt();

            // 增加menuContainer
            this.addMenuContainer();

            // 初始化菜单集合
            this.menus = {};

            // 初始化commandHooks
            this.commandHooks();
        };
    });
    // editor api
    _e(function (E, $) {

        // 预定义 ready 事件
        E.fn.ready = function (fn) {

            if (!this.readyFns) {
                this.readyFns = [];
            }

            this.readyFns.push(fn);
        };

        // 处理ready事件
        E.fn.readyHeadler = function () {
            var fns = this.readyFns;

            while (fns.length) {
                fns.shift().call(this);
            }
        };

        // 更新内容到 $valueContainer
        E.fn.updateValue = function () {
            var editor = this;
            var $valueContainer = editor.$valueContainer;
            var $txt = editor.txt.$txt;

            if ($valueContainer === $txt) {
                // 传入生成编辑器的div，即是编辑区域
                return;
            }

            var value = $txt.html();
            $valueContainer.val(value);
        };

        // 获取初始化的内容
        E.fn.getInitValue = function () {
            var editor = this;
            var $valueContainer = editor.$valueContainer;
            var currentValue = '';
            var nodeName = editor.valueNodeName;
            if (nodeName === 'div') {
                currentValue = $valueContainer.html();
            } else if (nodeName === 'textarea') {
                currentValue = $valueContainer.val();
            }

            return currentValue;
        };

        // 触发菜单updatestyle
        E.fn.updateMenuStyle = function () {
            var menus = this.menus;

            $.each(menus, function (k, menu) {
                menu.updateSelected();
            });
        };

        // 除了传入的 menuIds，其他全部启用
        E.fn.enableMenusExcept = function (menuIds) {
            if (this._disabled) {
                // 编辑器处于禁用状态，则不执行改操作
                return;
            }
            // menuIds参数：支持数组和字符串
            menuIds = menuIds || [];
            if (typeof menuIds === 'string') {
                menuIds = [menuIds];
            }

            $.each(this.menus, function (k, menu) {
                if (menuIds.indexOf(k) >= 0) {
                    return;
                }
                menu.disabled(false);
            });
        };

        // 除了传入的 menuIds，其他全部禁用
        E.fn.disableMenusExcept = function (menuIds) {
            if (this._disabled) {
                // 编辑器处于禁用状态，则不执行改操作
                return;
            }
            // menuIds参数：支持数组和字符串
            menuIds = menuIds || [];
            if (typeof menuIds === 'string') {
                menuIds = [menuIds];
            }

            $.each(this.menus, function (k, menu) {
                if (menuIds.indexOf(k) >= 0) {
                    return;
                }
                menu.disabled(true);
            });
        };

        // 隐藏所有 dropPanel droplist modal
        E.fn.hideDropPanelAndModal = function () {
            var menus = this.menus;

            $.each(menus, function (k, menu) {
                var m = menu.dropPanel || menu.dropList || menu.modal;
                if (m && m.hide) {
                    m.hide();
                }
            });
        };
    });
    // selection range API
    _e(function (E, $) {

        // 用到 w3c range 的函数，如果检测到浏览器不支持 w3c range，则赋值为空函数
        var ieRange = !E.w3cRange;
        function emptyFn() {}

        // 设置或读取当前的range
        E.fn.currentRange = function (cr) {
            if (cr) {
                this._rangeData = cr;
            } else {
                return this._rangeData;
            }
        };

        // 将当前选区折叠
        E.fn.collapseRange = function (range, opt) {
            // opt 参数说明：'start'-折叠到开始; 'end'-折叠到结束
            opt = opt || 'end';
            opt = opt === 'start' ? true : false;

            range = range || this.currentRange();

            if (range) {
                // 合并，保存
                range.collapse(opt);
                this.currentRange(range);
            }
        };

        // 获取选区的文字
        E.fn.getRangeText = ieRange ? emptyFn : function (range) {
            range = range || this.currentRange();
            if (!range) {
                return;
            }
            return range.toString();
        };

        // 获取选区对应的DOM对象
        E.fn.getRangeElem = ieRange ? emptyFn : function (range) {
            range = range || this.currentRange();
            var dom = range.commonAncestorContainer;

            if (dom.nodeType === 1) {
                return dom;
            } else {
                return dom.parentNode;
            }
        };

        // 选区内容是否为空？
        E.fn.isRangeEmpty = ieRange ? emptyFn : function (range) {
            range = range || this.currentRange();

            if (range && range.startContainer) {
                if (range.startContainer === range.endContainer) {
                    if (range.startOffset === range.endOffset) {
                        return true;
                    }
                }
            }

            return false;
        };

        // 保存选区数据
        E.fn.saveSelection = ieRange ? emptyFn : function (range) {
            var self = this,
                _parentElem,
                selection,
                txt = self.txt.$txt.get(0);

            if (range) {
                _parentElem = range.commonAncestorContainer;
            } else {
                selection = document.getSelection();
                if (selection.getRangeAt && selection.rangeCount) {
                    range = document.getSelection().getRangeAt(0);
                    _parentElem = range.commonAncestorContainer;
                }
            }
            // 确定父元素一定要包含在编辑器区域内
            if (_parentElem && ($.contains(txt, _parentElem) || txt === _parentElem)) {
                // 保存选择区域
                self.currentRange(range);
            }
        };

        // 恢复选中区域
        E.fn.restoreSelection = ieRange ? emptyFn : function (range) {
            var selection;

            range = range || this.currentRange();

            if (!range) {
                return;
            }

            // 使用 try catch 来防止 IE 某些情况报错
            try {
                selection = document.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            } catch (ex) {
                E.error('执行 editor.restoreSelection 时，IE可能会有异常，不影响使用');
            }
        };

        // 根据elem恢复选区
        E.fn.restoreSelectionByElem = ieRange ? emptyFn : function (elem, opt) {
            // opt参数说明：'start'-折叠到开始，'end'-折叠到结束，'all'-全部选中
            if (!elem) {
                return;
            }
            opt = opt || 'end'; // 默认为折叠到结束

            // 根据elem获取选区
            this.setRangeByElem(elem);

            // 根据 opt 折叠选区
            if (opt === 'start') {
                this.collapseRange(this.currentRange(), 'start');
            }
            if (opt === 'end') {
                this.collapseRange(this.currentRange(), 'end');
            }

            // 恢复选区
            this.restoreSelection();
        };

        // 初始化选区
        E.fn.initSelection = ieRange ? emptyFn : function () {
            var editor = this;
            if (editor.currentRange()) {
                //如果currentRange有值，则不用再初始化
                return;
            }

            var range;
            var $txt = editor.txt.$txt;
            var $firstChild = $txt.children().first();

            if ($firstChild.length) {
                editor.restoreSelectionByElem($firstChild.get(0));
            }
        };

        // 根据元素创建选区
        E.fn.setRangeByElem = ieRange ? emptyFn : function (elem) {
            var editor = this;
            var txtElem = editor.txt.$txt.get(0);
            if (!elem || !$.contains(txtElem, elem)) {
                return;
            }

            // 找到elem的第一个 textNode 和 最后一个 textNode
            var firstTextNode = elem.firstChild;
            while (firstTextNode) {
                if (firstTextNode.nodeType === 3) {
                    break;
                }
                // 继续向下
                firstTextNode = firstTextNode.firstChild;
            }
            var lastTextNode = elem.lastChild;
            while (lastTextNode) {
                if (lastTextNode.nodeType === 3) {
                    break;
                }
                // 继续向下
                lastTextNode = lastTextNode.lastChild;
            }

            var range = document.createRange();
            if (firstTextNode && lastTextNode) {
                // 说明 elem 有内容，能取到子元素
                range.setStart(firstTextNode, 0);
                range.setEnd(lastTextNode, lastTextNode.textContent.length);
            } else {
                // 说明 elem 无内容
                range.setStart(elem, 0);
                range.setEnd(elem, 0);
            }

            // 保存选区
            editor.saveSelection(range);
        };
    });
    // selection range API - IE8及以下
    _e(function (E, $) {

        if (E.w3cRange) {
            // 说明支持 W3C 的range方法
            return;
        }

        // -----------------IE8时，需要重写以下方法-------------------

        // 获取选区的文字
        E.fn.getRangeText = function (range) {
            range = range || this.currentRange();
            if (!range) {
                return;
            }
            return range.text;
        };

        // 获取选区对应的DOM对象
        E.fn.getRangeElem = function (range) {
            range = range || this.currentRange();
            if (!range) {
                return;
            }
            var dom = range.parentElement();

            if (dom.nodeType === 1) {
                return dom;
            } else {
                return dom.parentNode;
            }
        };

        // 选区内容是否为空？
        E.fn.isRangeEmpty = function (range) {
            range = range || this.currentRange();

            if (range && range.text) {
                return false;
            }

            return true;
        };

        // 保存选区数据
        E.fn.saveSelection = function (range) {
            var self = this,
                _parentElem,
                selection,
                txt = self.txt.$txt.get(0);

            if (range) {
                _parentElem = range.parentElement();
            } else {
                range = document.selection.createRange();
                if (typeof range.parentElement === 'undefined') {
                    //IE6、7中，insertImage后会执行此处
                    //由于找不到range.parentElement，所以干脆将_parentElem赋值为null
                    _parentElem = null;
                } else {
                    _parentElem = range.parentElement();
                }
            }

            // 确定父元素一定要包含在编辑器区域内
            if (_parentElem && ($.contains(txt, _parentElem) || txt === _parentElem)) {
                // 保存选择区域
                self.currentRange(range);
            }
        };

        // 恢复选中区域
        E.fn.restoreSelection = function (currentRange) {
            var editor = this,
                selection,
                range;

            currentRange = currentRange || editor.currentRange();
            if (!currentRange) {
                return;
            }

            range = document.selection.createRange();
            try {
                // 此处，plupload上传上传图片时，IE8-会报一个『参数无效』的错误
                range.setEndPoint('EndToEnd', currentRange);
            } catch (ex) {}

            if (currentRange.text.length === 0) {
                try {
                    // IE8 插入表情会报错
                    range.collapse(false);
                } catch (ex) {}
            } else {
                range.setEndPoint('StartToStart', currentRange);
            }
            range.select();
        };
    });
    // editor command hooks
    _e(function (E, $) {

        E.fn.commandHooks = function () {
            var editor = this;
            var commandHooks = {};

            // insertHtml
            commandHooks.insertHtml = function (html) {
                var $elem = $(html);
                var rangeElem = editor.getRangeElem();
                var targetElem;

                targetElem = editor.getLegalTags(rangeElem);
                if (!targetElem) {
                    return;
                }

                $(targetElem).after($elem);
            };

            // 保存到对象
            editor.commandHooks = commandHooks;
        };
    });
    // editor command API
    _e(function (E, $) {

        // 基本命令
        E.fn.command = function (e, commandName, commandValue, callback) {
            var editor = this;
            var hooks;

            function commandFn() {
                if (!commandName) {
                    return;
                }
                if (editor.queryCommandSupported(commandName)) {
                    // 默认命令
                    document.execCommand(commandName, false, commandValue);
                } else {
                    // hooks 命令
                    hooks = editor.commandHooks;
                    if (commandName in hooks) {
                        hooks[commandName](commandValue);
                    }
                }
            }

            this.customCommand(e, commandFn, callback);
        };

        // 针对一个elem对象执行基础命令
        E.fn.commandForElem = function (elemOpt, e, commandName, commandValue, callback) {
            // 取得查询elem的查询条件和验证函数
            var selector;
            var check;
            if (typeof elemOpt === 'string') {
                selector = elemOpt;
            } else {
                selector = elemOpt.selector;
                check = elemOpt.check;
            }

            // 查询elem
            var rangeElem = this.getRangeElem();
            rangeElem = this.getSelfOrParentByName(rangeElem, selector, check);

            // 根据elem设置range
            if (rangeElem) {
                this.setRangeByElem(rangeElem);
            }

            // 然后执行基础命令
            this.command(e, commandName, commandValue, callback);
        };

        // 自定义命令
        E.fn.customCommand = function (e, commandFn, callback) {
            var editor = this;
            var range = editor.currentRange();

            if (!range) {
                // 目前没有选区，则无法执行命令
                e && e.preventDefault();
                return;
            }
            // 记录内容，以便撤销（执行命令之前就要记录）
            editor.undoRecord();

            // 恢复选区（有 range 参数）
            this.restoreSelection(range);

            // 执行命令事件
            commandFn.call(editor);

            // 保存选区（无参数，要从浏览器直接获取range信息）
            this.saveSelection();
            // 重新恢复选区（无参数，要取得刚刚从浏览器得到的range信息）
            this.restoreSelection();

            // 执行 callback
            if (callback && typeof callback === 'function') {
                callback.call(editor);
            }

            // 最后插入空行
            editor.txt.insertEmptyP();

            // 包裹暴露的img和text
            editor.txt.wrapImgAndText();

            // 更新内容
            editor.updateValue();

            // 更新菜单样式
            editor.updateMenuStyle();

            // 隐藏 dropPanel dropList modal  设置 200ms 间隔
            function hidePanelAndModal() {
                editor.hideDropPanelAndModal();
            }
            setTimeout(hidePanelAndModal, 200);

            if (e) {
                e.preventDefault();
            }
        };

        // 封装 document.queryCommandValue 函数
        // IE8 直接执行偶尔会报错，因此直接用 try catch 封装一下
        E.fn.queryCommandValue = function (commandName) {
            var result = '';
            try {
                result = document.queryCommandValue(commandName);
            } catch (ex) {}
            return result;
        };

        // 封装 document.queryCommandState 函数
        // IE8 直接执行偶尔会报错，因此直接用 try catch 封装一下
        E.fn.queryCommandState = function (commandName) {
            var result = false;
            try {
                result = document.queryCommandState(commandName);
            } catch (ex) {}
            return result;
        };

        // 封装 document.queryCommandSupported 函数
        E.fn.queryCommandSupported = function (commandName) {
            var result = false;
            try {
                result = document.queryCommandSupported(commandName);
            } catch (ex) {}
            return result;
        };
    });
    // dom selector
    _e(function (E, $) {

        var matchesSelector;

        // matchesSelector hook
        function _matchesSelectorForIE(selector) {
            var elem = this;
            var $elems = $(selector);
            var result = false;

            // 用jquery查找 selector 所有对象，如果其中有一个和传入 elem 相同，则证明 elem 符合 selector
            $elems.each(function () {
                if (this === elem) {
                    result = true;
                    return false;
                }
            });

            return result;
        }

        // 从当前的elem，往上去查找合法标签 如 p head table blockquote ul ol 等
        E.fn.getLegalTags = function (elem) {
            var legalTags = this.config.legalTags;
            if (!legalTags) {
                E.error('配置项中缺少 legalTags 的配置');
                return;
            }
            return this.getSelfOrParentByName(elem, legalTags);
        };

        // 根据条件，查询自身或者父元素，符合即返回
        E.fn.getSelfOrParentByName = function (elem, selector, check) {

            if (!elem || !selector) {
                return;
            }

            if (!matchesSelector) {
                // 定义 matchesSelector 函数
                matchesSelector = elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.oMatchesSelector || elem.matchesSelector;
            }
            if (!matchesSelector) {
                // 如果浏览器本身不支持 matchesSelector 则使用自定义的hook
                matchesSelector = _matchesSelectorForIE;
            }

            var txt = this.txt.$txt.get(0);

            while (elem && txt !== elem && $.contains(txt, elem)) {
                if (matchesSelector.call(elem, selector)) {
                    // 符合 selector 查询条件

                    if (!check) {
                        // 没有 check 验证函数，直接返回即可
                        return elem;
                    }

                    if (check(elem)) {
                        // 如果有 check 验证函数，还需 check 函数的确认
                        return elem;
                    }
                }

                // 如果上一步没经过验证，则将跳转到父元素
                elem = elem.parentNode;
            }

            return;
        };
    });
    // undo redo
    _e(function (E, $) {

        var length = 20; // 缓存的最大长度
        function _getRedoList(editor) {
            if (editor._redoList == null) {
                editor._redoList = [];
            }
            return editor._redoList;
        }
        function _getUndoList(editor) {
            if (editor._undoList == null) {
                editor._undoList = [];
            }
            return editor._undoList;
        }

        // 数据处理
        function _handle(editor, data, type) {
            // var range = data.range;
            // var range2 = range.cloneRange && range.cloneRange();
            var val = data.val;
            var html = editor.txt.$txt.html();

            if (val == null) {
                return;
            }

            if (val === html) {
                if (type === 'redo') {
                    editor.redo();
                    return;
                } else if (type === 'undo') {
                    editor.undo();
                    return;
                } else {
                    return;
                }
            }

            // 保存数据
            editor.txt.$txt.html(val);
            // 更新数据到textarea（有必要的话）
            editor.updateValue();

            // onchange 事件
            if (editor.onchange && typeof editor.onchange === 'function') {
                editor.onchange.call(editor);
            }

            // ?????
            // 注释：$txt 被重新赋值之后，range会被重置，cloneRange() 也不好使
            // // 重置选区
            // if (range2) {
            //     editor.restoreSelection(range2);
            // }
        }

        // 记录
        E.fn.undoRecord = function () {
            var editor = this;
            var $txt = editor.txt.$txt;
            var val = $txt.html();
            var undoList = _getUndoList(editor);
            var redoList = _getRedoList(editor);
            var currentVal = undoList.length ? undoList[0] : '';

            if (val === currentVal.val) {
                return;
            }

            // 清空 redolist
            if (redoList.length) {
                redoList = [];
            }

            // 添加数据到 undoList
            undoList.unshift({
                range: editor.currentRange(), // 将当前的range也记录下
                val: val
            });

            // 限制 undoList 长度
            if (undoList.length > length) {
                undoList.pop();
            }
        };

        // undo 操作
        E.fn.undo = function () {
            var editor = this;
            var undoList = _getUndoList(editor);
            var redoList = _getRedoList(editor);

            if (!undoList.length) {
                return;
            }

            // 取出 undolist 第一个值，加入 redolist
            var data = undoList.shift();
            redoList.unshift(data);

            // 并修改编辑器的内容
            _handle(this, data, 'undo');
        };

        // redo 操作
        E.fn.redo = function () {
            var editor = this;
            var undoList = _getUndoList(editor);
            var redoList = _getRedoList(editor);
            if (!redoList.length) {
                return;
            }

            // 取出 redolist 第一个值，加入 undolist
            var data = redoList.shift();
            undoList.unshift(data);

            // 并修改编辑器的内容
            _handle(this, data, 'redo');
        };
    });
    // 暴露给用户的 API
    _e(function (E, $) {

        // 创建编辑器
        E.fn.create = function () {
            var editor = this;

            // 检查 E.$body 是否有值
            // 如果在 body 之前引用了 js 文件，body 尚未加载，可能没有值
            if (!E.$body || E.$body.length === 0) {
                E.$body = $('body');
                E.$document = $(document);
                E.$window = $(window);
            }

            // 执行 addMenus 之前：
            // 1. 允许用户修改 editor.UI 自定义配置UI
            // 2. 允许用户通过修改 editor.menus 来自定义配置菜单
            // 因此要在 create 时执行，而不是 init           
            editor.addMenus();

            // 渲染
            editor.renderMenus();
            editor.renderMenuContainer();
            editor.renderTxt();
            editor.renderEditorContainer();

            // 绑定事件
            editor.eventMenus();
            editor.eventMenuContainer();
            editor.eventTxt();

            // 处理ready事件
            editor.readyHeadler();

            // 初始化选区
            editor.initSelection();

            // $txt 快捷方式
            editor.$txt = editor.txt.$txt;

            // 执行用户自定义事件，通过 E.ready() 添加
            var _plugins = E._plugins;
            if (_plugins && _plugins.length) {
                $.each(_plugins, function (k, val) {
                    val.call(editor);
                });
            }
        };

        // 禁用编辑器
        E.fn.disable = function () {
            this.txt.$txt.removeAttr('contenteditable');
            this.disableMenusExcept();

            // 先禁用，再记录状态
            this._disabled = true;
        };
        // 启用编辑器
        E.fn.enable = function () {
            // 先解除状态记录，再启用
            this._disabled = false;
            this.txt.$txt.attr('contenteditable', 'true');
            this.enableMenusExcept();
        };

        // 销毁编辑器
        E.fn.destroy = function () {
            var self = this;
            var $valueContainer = self.$valueContainer;
            var $editorContainer = self.$editorContainer;
            var valueNodeName = self.valueNodeName;

            if (valueNodeName === 'div') {
                // div 生成的编辑器
                $valueContainer.removeAttr('contenteditable');
                $editorContainer.after($valueContainer);
                $editorContainer.hide();
            } else {
                // textarea 生成的编辑器
                $valueContainer.show();
                $editorContainer.hide();
            }
        };

        // 撤销 销毁编辑器
        E.fn.undestroy = function () {
            var self = this;
            var $valueContainer = self.$valueContainer;
            var $editorContainer = self.$editorContainer;
            var $menuContainer = self.menuContainer.$menuContainer;
            var valueNodeName = self.valueNodeName;

            if (valueNodeName === 'div') {
                // div 生成的编辑器
                $valueContainer.attr('contenteditable', 'true');
                $menuContainer.after($valueContainer);
                $editorContainer.show();
            } else {
                // textarea 生成的编辑器
                $valueContainer.hide();
                $editorContainer.show();
            }
        };

        // 清空内容的快捷方式
        E.fn.clear = function () {
            var editor = this;
            var $txt = editor.txt.$txt;
            $txt.html('<p><br></p>');
            editor.restoreSelectionByElem($txt.find('p').get(0));
        };
    });
    // menuContainer 构造函数
    _e(function (E, $) {

        // 定义构造函数
        var MenuContainer = function MenuContainer(editor) {
            this.editor = editor;
            this.init();
        };

        MenuContainer.fn = MenuContainer.prototype;

        // 暴露给 E 即 window.wangEditor
        E.MenuContainer = MenuContainer;
    });
    // MenuContainer.fn bind fn
    _e(function (E, $) {

        var MenuContainer = E.MenuContainer;

        // 初始化
        MenuContainer.fn.init = function () {
            var self = this;
            var $menuContainer = $('<div class="wangEditor-menu-container clearfix"></div>');

            self.$menuContainer = $menuContainer;

            // change shadow
            self.changeShadow();
        };

        // 编辑区域滚动时，增加shadow
        MenuContainer.fn.changeShadow = function () {
            var $menuContainer = this.$menuContainer;
            var editor = this.editor;
            var $txt = editor.txt.$txt;

            $txt.on('scroll', function () {
                if ($txt.scrollTop() > 10) {
                    $menuContainer.addClass('wangEditor-menu-shadow');
                } else {
                    $menuContainer.removeClass('wangEditor-menu-shadow');
                }
            });
        };
    });
    // MenuContainer.fn API
    _e(function (E, $) {

        var MenuContainer = E.MenuContainer;

        MenuContainer.fn.render = function () {
            var $menuContainer = this.$menuContainer;
            var $editorContainer = this.editor.$editorContainer;

            $editorContainer.append($menuContainer);
        };

        // 获取菜单栏的高度
        MenuContainer.fn.height = function () {
            var $menuContainer = this.$menuContainer;
            return $menuContainer.height();
        };

        // 添加菜单
        MenuContainer.fn.appendMenu = function (groupIdx, menu) {
            // 判断是否需要新增一个菜单组
            this._addGroup(groupIdx);
            // 增加菜单（返回 $menuItem）
            return this._addOneMenu(menu);
        };
        MenuContainer.fn._addGroup = function (groupIdx) {
            var $menuContainer = this.$menuContainer;
            var $menuGroup;
            if (!this.$currentGroup || this.currentGroupIdx !== groupIdx) {
                $menuGroup = $('<div class="menu-group clearfix"></div>');
                $menuContainer.append($menuGroup);

                this.$currentGroup = $menuGroup;
                this.currentGroupIdx = groupIdx;
            }
        };
        MenuContainer.fn._addOneMenu = function (menu) {
            var $menuNormal = menu.$domNormal;
            var $menuSelected = menu.$domSelected;

            var $menuGroup = this.$currentGroup;
            var $item = $('<div class="menu-item clearfix"></div>');
            $menuSelected.hide();
            $item.append($menuNormal).append($menuSelected);
            $menuGroup.append($item);

            return $item;
        };
    });
    // menu 构造函数
    _e(function (E, $) {

        // 定义构造函数
        var Menu = function Menu(opt) {
            this.editor = opt.editor;
            this.id = opt.id;
            this.title = opt.title;
            this.$domNormal = opt.$domNormal;
            this.$domSelected = opt.$domSelected || opt.$domNormal;

            // document.execCommand 的参数
            this.commandName = opt.commandName;
            this.commandValue = opt.commandValue;
            this.commandNameSelected = opt.commandNameSelected || opt.commandName;
            this.commandValueSelected = opt.commandValueSelected || opt.commandValue;
        };

        Menu.fn = Menu.prototype;

        // 暴露给 E 即 window.wangEditor
        E.Menu = Menu;
    });
    // Menu.fn 初始化绑定的事件
    _e(function (E, $) {

        var Menu = E.Menu;

        // 初始化UI
        Menu.fn.initUI = function () {
            var editor = this.editor;
            var uiConfig = editor.UI.menus;
            var menuId = this.id;
            var menuUI = uiConfig[menuId];

            if (this.$domNormal && this.$domSelected) {
                // 自定义的菜单中，已经传入了 $dom 无需从配置文件中查找生成
                return;
            }

            if (menuUI == null) {
                E.warn('editor.UI配置中，没有菜单 "' + menuId + '" 的UI配置，只能取默认值');

                // 必须写成 uiConfig['default'];
                // 写成 uiConfig.default IE8会报错
                menuUI = uiConfig['default'];
            }

            // 正常状态
            this.$domNormal = $(menuUI.normal);

            // 选中状态
            if (/^\./.test(menuUI.selected)) {
                // 增加一个样式
                this.$domSelected = this.$domNormal.clone().addClass(menuUI.selected.slice(1));
            } else {
                // 一个新的dom对象
                this.$domSelected = $(menuUI.selected);
            }
        };
    });
    // Menu.fn API
    _e(function (E, $) {

        var Menu = E.Menu;

        // 渲染菜单
        Menu.fn.render = function (groupIdx) {
            // 渲染UI
            this.initUI();

            var editor = this.editor;
            var menuContainer = editor.menuContainer;
            var $menuItem = menuContainer.appendMenu(groupIdx, this);
            var onRender = this.onRender;

            // 渲染tip
            this._renderTip($menuItem);

            // 执行 onRender 函数
            if (onRender && typeof onRender === 'function') {
                onRender.call(this);
            }
        };
        Menu.fn._renderTip = function ($menuItem) {
            var self = this;
            var editor = self.editor;
            var title = self.title;
            var $tip = $('<div class="menu-tip"></div>');
            // var $triangle = $('<i class="tip-triangle"></i>'); // 小三角

            // 计算 tip 宽度
            var $tempDiv;
            if (!self.tipWidth) {
                // 设置一个纯透明的 p（absolute;top:-10000px;不会显示在内容区域）
                // 内容赋值为 title ，为了计算tip宽度
                $tempDiv = $('<p style="opacity:0; filter:Alpha(opacity=0); position:absolute;top:-10000px;">' + title + '</p>');
                // 先添加到body，计算完再 remove
                E.$body.append($tempDiv);
                editor.ready(function () {
                    var editor = this;
                    var titleWidth = $tempDiv.outerWidth() + 5; // 多出 5px 的冗余
                    var currentWidth = $tip.outerWidth();
                    var currentMarginLeft = parseFloat($tip.css('margin-left'), 10);
                    // 计算完，拿到数据，则弃用
                    $tempDiv.remove();
                    $tempDiv = null;

                    // 重新设置样式
                    $tip.css({
                        width: titleWidth,
                        'margin-left': currentMarginLeft + (currentWidth - titleWidth) / 2
                    });

                    // 存储
                    self.tipWidth = titleWidth;
                });
            }

            // $tip.append($triangle);
            $tip.append(title);
            $menuItem.append($tip);

            function show() {
                $tip.show();
            }
            function hide() {
                $tip.hide();
            }

            var timeoutId;
            $menuItem.find('a').on('mouseenter', function (e) {
                if (!self.active() && !self.disabled()) {
                    timeoutId = setTimeout(show, 200);
                }
            }).on('mouseleave', function (e) {
                timeoutId && clearTimeout(timeoutId);
                hide();
            }).on('click', hide);
        };

        // 绑定事件
        Menu.fn.bindEvent = function () {
            var self = this;

            var $domNormal = self.$domNormal;
            var $domSelected = self.$domSelected;

            // 试图获取该菜单定义的事件（未selected），没有则自己定义
            var clickEvent = self.clickEvent;
            if (!clickEvent) {
                clickEvent = function clickEvent(e) {
                    // -----------dropPanel dropList modal-----------
                    var dropObj = self.dropPanel || self.dropList || self.modal;
                    if (dropObj && dropObj.show) {
                        if (dropObj.isShowing) {
                            dropObj.hide();
                        } else {
                            dropObj.show();
                        }
                        return;
                    }

                    // -----------command-----------
                    var editor = self.editor;
                    var commandName;
                    var commandValue;

                    var selected = self.selected;
                    if (selected) {
                        commandName = self.commandNameSelected;
                        commandValue = self.commandValueSelected;
                    } else {
                        commandName = self.commandName;
                        commandValue = self.commandValue;
                    }

                    if (commandName) {
                        // 执行命令
                        editor.command(e, commandName, commandValue);
                    } else {
                        // 提示
                        E.warn('菜单 "' + self.id + '" 未定义click事件');
                        e.preventDefault();
                    }
                };
            }
            // 获取菜单定义的selected情况下的点击事件
            var clickEventSelected = self.clickEventSelected || clickEvent;

            // 将事件绑定到菜单dom上
            $domNormal.click(function (e) {
                if (!self.disabled()) {
                    clickEvent.call(self, e);
                    self.updateSelected();
                }
                e.preventDefault();
            });
            $domSelected.click(function (e) {
                if (!self.disabled()) {
                    clickEventSelected.call(self, e);
                    self.updateSelected();
                }
                e.preventDefault();
            });
        };

        // 更新选中状态
        Menu.fn.updateSelected = function () {
            var self = this;
            var editor = self.editor;

            // 试图获取用户自定义的判断事件
            var updateSelectedEvent = self.updateSelectedEvent;
            if (!updateSelectedEvent) {
                // 用户未自定义，则设置默认值
                updateSelectedEvent = function updateSelectedEvent() {
                    var self = this;
                    var editor = self.editor;
                    var commandName = self.commandName;
                    var commandValue = self.commandValue;

                    if (commandValue) {
                        if (editor.queryCommandValue(commandName).toLowerCase() === commandValue.toLowerCase()) {
                            return true;
                        }
                    } else if (editor.queryCommandState(commandName)) {
                        return true;
                    }

                    return false;
                };
            }

            // 获取结果
            var result = updateSelectedEvent.call(self);
            result = !!result;

            // 存储结果、显示效果
            self.changeSelectedState(result);
        };

        // 切换选中状态、显示效果
        Menu.fn.changeSelectedState = function (state) {
            var self = this;
            var selected = self.selected;

            if (state != null && typeof state === 'boolean') {
                if (selected === state) {
                    // 计算结果和当前的状态一样
                    return;
                }
                // 存储结果
                self.selected = state;

                // 切换菜单的显示
                if (state) {
                    // 选中
                    self.$domNormal.hide();
                    self.$domSelected.show();
                } else {
                    // 未选中
                    self.$domNormal.show();
                    self.$domSelected.hide();
                }
            } // if
        };

        // 点击菜单，显示了 dropPanel modal 时，菜单的状态 
        Menu.fn.active = function (active) {
            if (active == null) {
                return this._activeState;
            }
            this._activeState = active;
        };
        Menu.fn.activeStyle = function (active) {
            var selected = this.selected;
            var $dom = this.$domNormal;
            var $domSelected = this.$domSelected;

            if (active) {
                $dom.addClass('active');
                $domSelected.addClass('active');
            } else {
                $dom.removeClass('active');
                $domSelected.removeClass('active');
            }

            // 记录状态 （ menu hover 时会取状态用 ）
            this.active(active);
        };

        // 菜单的启用和禁用
        Menu.fn.disabled = function (opt) {
            // 参数为空，取值
            if (opt == null) {
                return !!this._disabled;
            }

            if (this._disabled === opt) {
                // 要设置的参数值和当前参数只一样，无需再次设置
                return;
            }

            var $dom = this.$domNormal;
            var $domSelected = this.$domSelected;

            // 设置样式
            if (opt) {
                $dom.addClass('disable');
                $domSelected.addClass('disable');
            } else {
                $dom.removeClass('disable');
                $domSelected.removeClass('disable');
            }

            // 存储
            this._disabled = opt;
        };
    });
    // dropList 构造函数
    _e(function (E, $) {

        // 定义构造函数
        var DropList = function DropList(editor, menu, opt) {
            this.editor = editor;
            this.menu = menu;

            // list 的数据源，格式 {'commandValue': 'title', ...}
            this.data = opt.data;
            // 要为每个item自定义的模板
            this.tpl = opt.tpl;
            // 为了执行 editor.commandForElem 而传入的elem查询方式
            this.selectorForELemCommand = opt.selectorForELemCommand;

            // 执行事件前后的钩子
            this.beforeEvent = opt.beforeEvent;
            this.afterEvent = opt.afterEvent;

            // 初始化
            this.init();
        };

        DropList.fn = DropList.prototype;

        // 暴露给 E 即 window.wangEditor
        E.DropList = DropList;
    });
    // dropList fn bind
    _e(function (E, $) {

        var DropList = E.DropList;

        // init
        DropList.fn.init = function () {
            var self = this;

            // 生成dom对象
            self.initDOM();

            // 绑定command事件
            self.bindEvent();

            // 声明隐藏的事件
            self.initHideEvent();
        };

        // 初始化dom结构
        DropList.fn.initDOM = function () {
            var self = this;
            var data = self.data;
            var tpl = self.tpl || '<span>{#title}</span>';
            var $list = $('<div class="wangEditor-drop-list clearfix"></div>');

            var itemContent;
            var $item;
            $.each(data, function (commandValue, title) {
                itemContent = tpl.replace(/{#commandValue}/ig, commandValue).replace(/{#title}/ig, title);
                $item = $('<a href="#" commandValue="' + commandValue + '"></a>');
                $item.append(itemContent);
                $list.append($item);
            });

            self.$list = $list;
        };

        // 绑定事件
        DropList.fn.bindEvent = function () {
            var self = this;
            var editor = self.editor;
            var menu = self.menu;
            var commandName = menu.commandName;
            var selectorForELemCommand = self.selectorForELemCommand;
            var $list = self.$list;

            // 执行事件前后的钩子函数
            var beforeEvent = self.beforeEvent;
            var afterEvent = self.afterEvent;

            $list.on('click', 'a[commandValue]', function (e) {
                // 正式命令执行之前
                if (beforeEvent && typeof beforeEvent === 'function') {
                    beforeEvent.call(e);
                }

                // 执行命令
                var commandValue = $(e.currentTarget).attr('commandValue');
                if (menu.selected && editor.isRangeEmpty() && selectorForELemCommand) {
                    // 当前处于选中状态，并且选中内容为空
                    editor.commandForElem(selectorForELemCommand, e, commandName, commandValue);
                } else {
                    // 当前未处于选中状态，或者有选中内容。则执行默认命令
                    editor.command(e, commandName, commandValue);
                }

                // 正式命令之后的钩子
                if (afterEvent && typeof afterEvent === 'function') {
                    afterEvent.call(e);
                }
            });
        };

        // 点击其他地方，立即隐藏 droplist
        DropList.fn.initHideEvent = function () {
            var self = this;

            // 获取 list elem
            var thisList = self.$list.get(0);

            E.$body.on('click', function (e) {
                if (!self.isShowing) {
                    return;
                }
                var trigger = e.target;

                // 获取菜单elem
                var menu = self.menu;
                var menuDom;
                if (menu.selected) {
                    menuDom = menu.$domSelected.get(0);
                } else {
                    menuDom = menu.$domNormal.get(0);
                }

                if (menuDom === trigger || $.contains(menuDom, trigger)) {
                    // 说明由本菜单点击触发的
                    return;
                }

                if (thisList === trigger || $.contains(thisList, trigger)) {
                    // 说明由本list点击触发的
                    return;
                }

                // 其他情况，隐藏 list
                self.hide();
            });

            E.$window.scroll(function () {
                self.hide();
            });

            E.$window.on('resize', function () {
                self.hide();
            });
        };
    });
    // dropListfn api
    _e(function (E, $) {

        var DropList = E.DropList;

        // 渲染
        DropList.fn._render = function () {
            var self = this;
            var editor = self.editor;
            var $list = self.$list;

            // 渲染到页面
            editor.$editorContainer.append($list);

            // 记录状态
            self.rendered = true;
        };

        // 定位
        DropList.fn._position = function () {
            var self = this;
            var $list = self.$list;
            var editor = self.editor;
            var menu = self.menu;
            var $menuContainer = editor.menuContainer.$menuContainer;
            var $menuDom = menu.selected ? menu.$domSelected : menu.$domNormal;
            // 注意这里的 offsetParent() 要返回 .menu-item 的 position
            // 因为 .menu-item 是 position:relative
            var menuPosition = $menuDom.offsetParent().position();

            // 取得 menu 的位置、尺寸属性
            var menuTop = menuPosition.top;
            var menuLeft = menuPosition.left;
            var menuHeight = $menuDom.offsetParent().height();
            var menuWidth = $menuDom.offsetParent().width();

            // 取得 list 的尺寸属性
            var listWidth = $list.outerWidth();
            // var listHeight = $list.outerHeight();

            // 取得 $txt 的尺寸
            var txtWidth = editor.txt.$txt.outerWidth();

            // ------------开始计算-------------

            // 初步计算 list 位置属性
            var top = menuTop + menuHeight;
            var left = menuLeft + menuWidth / 2;
            var marginLeft = 0 - menuWidth / 2;

            // 如果超出了有边界，则要左移（且和右侧有间隙）
            var valWithTxt = left + listWidth - txtWidth;
            if (valWithTxt > -10) {
                marginLeft = marginLeft - valWithTxt - 10;
            }
            // 设置样式
            $list.css({
                top: top,
                left: left,
                'margin-left': marginLeft
            });

            // 如果因为向下滚动而导致菜单fixed，则再加一步处理
            if (editor._isMenufixed) {
                top = top + ($menuContainer.offset().top + $menuContainer.outerHeight() - $list.offset().top);

                // 重新设置top
                $list.css({
                    top: top
                });
            }
        };

        // 显示
        DropList.fn.show = function () {
            var self = this;
            var menu = self.menu;
            if (!self.rendered) {
                // 第一次show之前，先渲染
                self._render();
            }

            if (self.isShowing) {
                return;
            }

            var $list = self.$list;
            $list.show();

            // 定位
            self._position();

            // 记录状态
            self.isShowing = true;

            // 菜单状态
            menu.activeStyle(true);
        };

        // 隐藏
        DropList.fn.hide = function () {
            var self = this;
            var menu = self.menu;
            if (!self.isShowing) {
                return;
            }

            var $list = self.$list;
            $list.hide();

            // 记录状态
            self.isShowing = false;

            // 菜单状态
            menu.activeStyle(false);
        };
    });
    // dropPanel 构造函数
    _e(function (E, $) {

        // 定义构造函数
        var DropPanel = function DropPanel(editor, menu, opt) {
            this.editor = editor;
            this.menu = menu;
            this.$content = opt.$content;
            this.width = opt.width || 200;
            this.height = opt.height;
            this.onRender = opt.onRender;

            // init
            this.init();
        };

        DropPanel.fn = DropPanel.prototype;

        // 暴露给 E 即 window.wangEditor
        E.DropPanel = DropPanel;
    });
    // dropPanel fn bind
    _e(function (E, $) {

        var DropPanel = E.DropPanel;

        // init
        DropPanel.fn.init = function () {
            var self = this;

            // 生成dom对象
            self.initDOM();

            // 声明隐藏的事件
            self.initHideEvent();
        };

        // init DOM
        DropPanel.fn.initDOM = function () {
            var self = this;
            var $content = self.$content;
            var width = self.width;
            var height = self.height;
            var $panel = $('<div class="wangEditor-drop-panel clearfix"></div>');
            var $triangle = $('<div class="tip-triangle"></div>');

            $panel.css({
                width: width,
                height: height ? height : 'auto'
            });
            $panel.append($triangle);
            $panel.append($content);

            // 添加对象数据
            self.$panel = $panel;
            self.$triangle = $triangle;
        };

        // 点击其他地方，立即隐藏 dropPanel
        DropPanel.fn.initHideEvent = function () {
            var self = this;

            // 获取 panel elem
            var thisPanle = self.$panel.get(0);

            E.$body.on('click', function (e) {
                if (!self.isShowing) {
                    return;
                }
                var trigger = e.target;

                // 获取菜单elem
                var menu = self.menu;
                var menuDom;
                if (menu.selected) {
                    menuDom = menu.$domSelected.get(0);
                } else {
                    menuDom = menu.$domNormal.get(0);
                }

                if (menuDom === trigger || $.contains(menuDom, trigger)) {
                    // 说明由本菜单点击触发的
                    return;
                }

                if (thisPanle === trigger || $.contains(thisPanle, trigger)) {
                    // 说明由本panel点击触发的
                    return;
                }

                // 其他情况，隐藏 panel
                self.hide();
            });

            E.$window.scroll(function (e) {
                self.hide();
            });

            E.$window.on('resize', function () {
                self.hide();
            });
        };
    });
    // dropPanel fn api
    _e(function (E, $) {

        var DropPanel = E.DropPanel;

        // 渲染
        DropPanel.fn._render = function () {
            var self = this;
            var onRender = self.onRender;
            var editor = self.editor;
            var $panel = self.$panel;

            // 渲染到页面
            editor.$editorContainer.append($panel);

            // 渲染后的回调事件
            onRender && onRender.call(self);

            // 记录状态
            self.rendered = true;
        };

        // 定位
        DropPanel.fn._position = function () {
            var self = this;
            var $panel = self.$panel;
            var $triangle = self.$triangle;
            var editor = self.editor;
            var $menuContainer = editor.menuContainer.$menuContainer;
            var menu = self.menu;
            var $menuDom = menu.selected ? menu.$domSelected : menu.$domNormal;
            // 注意这里的 offsetParent() 要返回 .menu-item 的 position
            // 因为 .menu-item 是 position:relative
            var menuPosition = $menuDom.offsetParent().position();

            // 取得 menu 的位置、尺寸属性
            var menuTop = menuPosition.top;
            var menuLeft = menuPosition.left;
            var menuHeight = $menuDom.offsetParent().height();
            var menuWidth = $menuDom.offsetParent().width();

            // 取得 panel 的尺寸属性
            var panelWidth = $panel.outerWidth();
            // var panelHeight = $panel.outerHeight();

            // 取得 $txt 的尺寸
            var txtWidth = editor.txt.$txt.outerWidth();

            // ------------开始计算-------------

            // 初步计算 panel 位置属性
            var top = menuTop + menuHeight;
            var left = menuLeft + menuWidth / 2;
            var marginLeft = 0 - panelWidth / 2;
            var marginLeft2 = marginLeft; // 下文用于和 marginLeft 比较，来设置三角形tip的位置

            // 如果超出了左边界，则移动回来（要和左侧有10px间隙）
            if (0 - marginLeft > left - 10) {
                marginLeft = 0 - (left - 10);
            }

            // 如果超出了有边界，则要左移（且和右侧有10px间隙）
            var valWithTxt = left + panelWidth + marginLeft - txtWidth;
            if (valWithTxt > -10) {
                marginLeft = marginLeft - valWithTxt - 10;
            }

            // 设置样式
            $panel.css({
                top: top,
                left: left,
                'margin-left': marginLeft
            });

            // 如果因为向下滚动而导致菜单fixed，则再加一步处理
            if (editor._isMenufixed) {
                top = top + ($menuContainer.offset().top + $menuContainer.outerHeight() - $panel.offset().top);

                // 重新设置top
                $panel.css({
                    top: top
                });
            }

            // 设置三角形 tip 的位置
            $triangle.css({
                'margin-left': marginLeft2 - marginLeft - 5
            });
        };

        // focus 第一个 input
        DropPanel.fn.focusFirstInput = function () {
            var self = this;
            var $panel = self.$panel;
            $panel.find('input[type=text],textarea').each(function () {
                var $input = $(this);
                if ($input.attr('disabled') == null) {
                    $input.focus();
                    return false;
                }
            });
        };

        // 显示
        DropPanel.fn.show = function () {
            var self = this;
            var menu = self.menu;
            if (!self.rendered) {
                // 第一次show之前，先渲染
                self._render();
            }

            if (self.isShowing) {
                return;
            }

            var $panel = self.$panel;
            $panel.show();

            // 定位
            self._position();

            // 记录状态
            self.isShowing = true;

            // 菜单状态
            menu.activeStyle(true);

            if (E.w3cRange) {
                // 高级浏览器
                self.focusFirstInput();
            } else {
                // 兼容 IE8 input placeholder
                E.placeholderForIE8($panel);
            }
        };

        // 隐藏
        DropPanel.fn.hide = function () {
            var self = this;
            var menu = self.menu;
            if (!self.isShowing) {
                return;
            }

            var $panel = self.$panel;
            $panel.hide();

            // 记录状态
            self.isShowing = false;

            // 菜单状态
            menu.activeStyle(false);
        };
    });
    // modal 构造函数
    _e(function (E, $) {

        // 定义构造函数
        var Modal = function Modal(editor, menu, opt) {
            this.editor = editor;
            this.menu = menu;
            this.$content = opt.$content;

            this.init();
        };

        Modal.fn = Modal.prototype;

        // 暴露给 E 即 window.wangEditor
        E.Modal = Modal;
    });
    // modal fn bind
    _e(function (E, $) {

        var Modal = E.Modal;

        Modal.fn.init = function () {
            var self = this;

            // 初始化dom
            self.initDom();

            // 初始化隐藏事件
            self.initHideEvent();
        };

        // 初始化dom
        Modal.fn.initDom = function () {
            var self = this;
            var $content = self.$content;
            var $modal = $('<div class="wangEditor-modal"></div>');
            var $close = $('<div class="wangEditor-modal-close"><i class="wangeditor-menu-img-cancel-circle"></i></div>');

            $modal.append($close);
            $modal.append($content);

            // 记录数据
            self.$modal = $modal;
            self.$close = $close;
        };

        // 初始化隐藏事件
        Modal.fn.initHideEvent = function () {
            var self = this;
            var $close = self.$close;
            var modal = self.$modal.get(0);

            // 点击 $close 按钮，隐藏
            $close.click(function () {
                self.hide();
            });

            // 点击其他部分，隐藏
            E.$body.on('click', function (e) {
                if (!self.isShowing) {
                    return;
                }
                var trigger = e.target;

                // 获取菜单elem
                var menu = self.menu;
                var menuDom;
                if (menu) {
                    if (menu.selected) {
                        menuDom = menu.$domSelected.get(0);
                    } else {
                        menuDom = menu.$domNormal.get(0);
                    }

                    if (menuDom === trigger || $.contains(menuDom, trigger)) {
                        // 说明由本菜单点击触发的
                        return;
                    }
                }

                if (modal === trigger || $.contains(modal, trigger)) {
                    // 说明由本panel点击触发的
                    return;
                }

                // 其他情况，隐藏 panel
                self.hide();
            });
        };
    });
    // modal fn api
    _e(function (E, $) {

        var Modal = E.Modal;

        // 渲染
        Modal.fn._render = function () {
            var self = this;
            var editor = self.editor;
            var $modal = self.$modal;

            // $modal的z-index，在配置的z-index基础上再 +10
            $modal.css('z-index', editor.config.zindex + 10 + '');

            // 渲染到body最后面
            E.$body.append($modal);

            // 记录状态
            self.rendered = true;
        };

        // 定位
        Modal.fn._position = function () {
            var self = this;
            var $modal = self.$modal;
            var top = $modal.offset().top;
            var width = $modal.outerWidth();
            var height = $modal.outerHeight();
            var marginLeft = 0 - width / 2;
            var marginTop = 0 - height / 2;
            var sTop = E.$window.scrollTop();

            // 保证modal最顶部，不超过浏览器上边框
            if (height / 2 > top) {
                marginTop = 0 - top;
            }

            $modal.css({
                'margin-left': marginLeft + 'px',
                'margin-top': marginTop + sTop + 'px'
            });
        };

        // 显示
        Modal.fn.show = function () {
            var self = this;
            var menu = self.menu;
            if (!self.rendered) {
                // 第一次show之前，先渲染
                self._render();
            }

            if (self.isShowing) {
                return;
            }
            // 记录状态
            self.isShowing = true;

            var $modal = self.$modal;
            $modal.show();

            // 定位
            self._position();

            // 激活菜单状态
            menu && menu.activeStyle(true);
        };

        // 隐藏
        Modal.fn.hide = function () {
            var self = this;
            var menu = self.menu;
            if (!self.isShowing) {
                return;
            }
            // 记录状态
            self.isShowing = false;

            // 隐藏
            var $modal = self.$modal;
            $modal.hide();

            // 菜单状态
            menu && menu.activeStyle(false);
        };
    });
    // txt 构造函数
    _e(function (E, $) {

        // 定义构造函数
        var Txt = function Txt(editor) {
            this.editor = editor;

            // 初始化
            this.init();
        };

        Txt.fn = Txt.prototype;

        // 暴露给 E 即 window.wangEditor
        E.Txt = Txt;
    });
    // Txt.fn bind fn
    _e(function (E, $) {

        var Txt = E.Txt;

        // 初始化
        Txt.fn.init = function () {
            var self = this;
            var editor = self.editor;
            var $valueContainer = editor.$valueContainer;
            var currentValue = editor.getInitValue();
            var $txt;

            if ($valueContainer.get(0).nodeName === 'DIV') {
                // 如果传入生成编辑器的元素就是div，则直接使用
                $txt = $valueContainer;
                $txt.addClass("wangEditor-txt");
                $txt.attr('contentEditable', 'true');
            } else {
                // 如果不是div（是textarea），则创建一个div
                $txt = $('<div class="wangEditor-txt" contentEditable="true">' + currentValue + '</div>');
            }

            // 试图最后插入一个空行，ready之后才行
            editor.ready(function () {
                self.insertEmptyP();
            });

            self.$txt = $txt;

            // 删除时，如果没有内容了，就添加一个 <p><br></p>
            self.contentEmptyHandle();

            // enter时，不能使用 div 换行
            self.bindEnterForDiv();

            // enter时，用 p 包裹 text
            self.bindEnterForText();

            // tab 插入4个空格
            self.bindTabEvent();

            // 处理粘贴内容
            self.bindPasteFilter();

            // $txt.formatText() 方法
            self.bindFormatText();

            // 定义 $txt.html() 方法
            self.bindHtml();
        };

        // 删除时，如果没有内容了，就添加一个 <p><br></p>
        Txt.fn.contentEmptyHandle = function () {
            var self = this;
            var editor = self.editor;
            var $txt = self.$txt;
            var $p;

            $txt.on('keydown', function (e) {
                if (e.keyCode !== 8) {
                    return;
                }
                var txtHtml = $.trim($txt.html().toLowerCase());
                if (txtHtml === '<p><br></p>') {
                    // 如果最后还剩余一个空行，就不再继续删除了
                    e.preventDefault();
                    return;
                }
            });

            $txt.on('keyup', function (e) {
                if (e.keyCode !== 8) {
                    return;
                }
                var txtHtml = $.trim($txt.html().toLowerCase());
                // ff时用 txtHtml === '<br>' 判断，其他用 !txtHtml 判断
                if (!txtHtml || txtHtml === '<br>') {
                    // 内容空了
                    $p = $('<p><br/></p>');
                    $txt.html(''); // 一定要先清空，否则在 ff 下有问题
                    $txt.append($p);
                    editor.restoreSelectionByElem($p.get(0));
                }
            });
        };

        // enter时，不能使用 div 换行
        Txt.fn.bindEnterForDiv = function () {
            var tags = E.config.legalTags; // 配置中编辑器要求的合法标签，如 p head table blockquote ul ol 等
            var self = this;
            var editor = self.editor;
            var $txt = self.$txt;

            var $keydownDivElem;
            function divHandler() {
                if (!$keydownDivElem) {
                    return;
                }

                var $pElem = $('<p>' + $keydownDivElem.html() + '</p>');
                $keydownDivElem.after($pElem);
                $keydownDivElem.remove();
            }

            $txt.on('keydown keyup', function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                // 查找合法标签
                var rangeElem = editor.getRangeElem();
                var targetElem = editor.getLegalTags(rangeElem);
                var $targetElem;
                var $pElem;

                if (!targetElem) {
                    // 没找到合法标签，就去查找 div
                    targetElem = editor.getSelfOrParentByName(rangeElem, 'div');
                    if (!targetElem) {
                        return;
                    }
                    $targetElem = $(targetElem);

                    if (e.type === 'keydown') {
                        // 异步执行（同步执行会出现问题）
                        $keydownDivElem = $targetElem;
                        setTimeout(divHandler, 0);
                    }

                    if (e.type === 'keyup') {
                        // 将 div 的内容移动到 p 里面，并移除 div
                        $pElem = $('<p>' + $targetElem.html() + '</p>');
                        $targetElem.after($pElem);
                        $targetElem.remove();

                        // 如果是回车结束，将选区定位到行首
                        editor.restoreSelectionByElem($pElem.get(0), 'start');
                    }
                }
            });
        };

        // enter时，用 p 包裹 text
        Txt.fn.bindEnterForText = function () {
            var self = this;
            var $txt = self.$txt;
            var handle;
            $txt.on('keyup', function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                if (!handle) {
                    handle = function handle() {
                        self.wrapImgAndText();
                    };
                }
                setTimeout(handle);
            });
        };

        // tab 时，插入4个空格
        Txt.fn.bindTabEvent = function () {
            var self = this;
            var editor = self.editor;
            var $txt = self.$txt;

            $txt.on('keydown', function (e) {
                if (e.keyCode !== 9) {
                    // 只监听 tab 按钮
                    return;
                }
                // 如果浏览器支持 insertHtml 则插入4个空格。如果不支持，就不管了
                if (editor.queryCommandSupported('insertHtml')) {
                    editor.command(e, 'insertHtml', '&nbsp;&nbsp;&nbsp;&nbsp;');
                }
            });
        };

        // 处理粘贴内容
        Txt.fn.bindPasteFilter = function () {
            var self = this;
            var editor = self.editor;
            var resultHtml = ''; //存储最终的结果
            var $txt = self.$txt;
            var legalTags = editor.config.legalTags;
            var legalTagArr = legalTags.split(',');

            $txt.on('paste', function (e) {
                if (!editor.config.pasteFilter) {
                    // 配置中取消了粘贴过滤
                    return;
                }

                var currentNodeName = editor.getRangeElem().nodeName;
                if (currentNodeName === 'TD' || currentNodeName === 'TH') {
                    // 在表格的单元格中粘贴，忽略所有内容。否则会出现异常情况
                    return;
                }

                resultHtml = ''; // 先清空 resultHtml

                var pasteHtml, $paste, docSplitHtml;
                var data = e.clipboardData || e.originalEvent.clipboardData;
                var ieData = window.clipboardData;

                if (editor.config.pasteText) {
                    // 只粘贴纯文本

                    if (data && data.getData) {
                        // w3c
                        pasteHtml = data.getData('text/plain');
                    } else if (ieData && ieData.getData) {
                        // IE
                        pasteHtml = ieData.getData('text');
                    } else {
                        // 其他情况
                        return;
                    }

                    // 拼接为 <p> 标签
                    if (pasteHtml) {
                        resultHtml = '<p>' + pasteHtml + '</p>';
                    }
                } else {
                    // 粘贴过滤了样式的、只有标签的 html

                    if (data && data.getData) {
                        // w3c

                        // 获取粘贴过来的html
                        pasteHtml = data.getData('text/html');

                        // 过滤从 word excel 粘贴过来的乱码
                        docSplitHtml = pasteHtml.split('</html>');
                        if (docSplitHtml.length === 2) {
                            pasteHtml = docSplitHtml[0];
                        }

                        if (pasteHtml) {
                            // 创建dom
                            $paste = $('<div>' + pasteHtml + '</div>');
                            // 处理，并将结果存储到 resultHtml 『全局』变量
                            handle($paste.get(0));
                        } else {
                            // 得不到html，试图获取text
                            pasteHtml = data.getData('text/plain');
                            if (pasteHtml) {
                                // 替换特殊字符
                                pasteHtml = pasteHtml.replace(/[ ]/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '</p><p>');
                                // 拼接
                                resultHtml = '<p>' + pasteHtml + '</p>';

                                // 查询链接
                                resultHtml = resultHtml.replace(/<p>(https?:\/\/.*?)<\/p>/ig, function (match, link) {
                                    return '<p><a href="' + link + '" target="_blank">' + link + '</p>';
                                });
                            }
                        }
                    } else if (ieData && ieData.getData) {
                        // IE 直接从剪切板中取出纯文本格式
                        resultHtml = ieData.getData('text');
                        if (!resultHtml) {
                            return;
                        }
                        // 拼接为 <p> 标签
                        resultHtml = '<p>' + resultHtml + '</p>';
                        resultHtml = resultHtml.replace(new RegExp('\n', 'g'), '</p><p>');
                    } else {
                        // 其他情况
                        return;
                    }
                }

                // 执行命令
                if (resultHtml) {
                    editor.command(e, 'insertHtml', resultHtml);

                    // 删除内容为空的 p 和嵌套的 p
                    self.clearEmptyOrNestP();
                }
            });

            // 处理粘贴的内容
            function handle(elem) {
                if (!elem || !elem.nodeType || !elem.nodeName) {
                    return;
                }
                var $elem;
                var nodeName = elem.nodeName.toLowerCase();
                var nodeType = elem.nodeType;
                var childNodesClone;

                // 只处理文本和普通node标签
                if (nodeType !== 3 && nodeType !== 1) {
                    return;
                }

                $elem = $(elem);

                // 如果是容器，则继续深度遍历
                if (nodeName === 'div') {
                    childNodesClone = [];
                    $.each(elem.childNodes, function (index, item) {
                        // elem.childNodes 可获取TEXT节点，而 $elem.children() 就获取不到
                        // 先将 elem.childNodes 拷贝一份，一面在循环递归过程中 elem 发生变化
                        childNodesClone.push(item);
                    });
                    // 遍历子元素，执行操作
                    $.each(childNodesClone, function () {
                        handle(this);
                    });
                    return;
                }

                if (legalTagArr.indexOf(nodeName) >= 0) {
                    // 如果是合法标签之内的，则根据元素类型，获取值
                    resultHtml += getResult(elem);
                } else if (nodeType === 3) {
                    // 如果是文本，则直接插入 p 标签
                    resultHtml += '<p>' + elem.textContent + '</p>';
                } else if (nodeName === 'br') {
                    // <br>保留
                    resultHtml += '<br/>';
                } else {
                    // 忽略的标签
                    if (['meta', 'style', 'script', 'object', 'form', 'iframe', 'hr'].indexOf(nodeName) >= 0) {
                        return;
                    }
                    // 其他标签，移除属性，插入 p 标签
                    $elem = $(removeAttrs(elem));
                    // 注意，这里的 clone() 是必须的，否则会出错
                    resultHtml += $('<div>').append($elem.clone()).html();
                }
            }

            // 获取元素的结果
            function getResult(elem) {
                var nodeName = elem.nodeName.toLowerCase();
                var $elem;
                var htmlForP = '';
                var htmlForLi = '';

                if (['blockquote'].indexOf(nodeName) >= 0) {

                    // 直接取出元素text即可
                    $elem = $(elem);
                    return '<' + nodeName + '>' + $elem.text() + '</' + nodeName + '>';
                } else if (['p', 'h1', 'h2', 'h3', 'h4', 'h5'].indexOf(nodeName) >= 0) {

                    //p head 取出 text 和链接
                    elem = removeAttrs(elem);
                    $elem = $(elem);
                    htmlForP = $elem.html();

                    // 剔除 a img 之外的元素
                    htmlForP = htmlForP.replace(/<.*?>/ig, function (tag) {
                        if (tag === '</a>' || tag.indexOf('<a ') === 0 || tag.indexOf('<img ') === 0) {
                            return tag;
                        } else {
                            return '';
                        }
                    });

                    return '<' + nodeName + '>' + htmlForP + '</' + nodeName + '>';
                } else if (['ul', 'ol'].indexOf(nodeName) >= 0) {

                    // ul ol元素，获取子元素（li元素）的text link img，再拼接
                    $elem = $(elem);
                    $elem.children().each(function () {
                        var $li = $(removeAttrs(this));
                        var html = $li.html();

                        html = html.replace(/<.*?>/ig, function (tag) {
                            if (tag === '</a>' || tag.indexOf('<a ') === 0 || tag.indexOf('<img ') === 0) {
                                return tag;
                            } else {
                                return '';
                            }
                        });

                        htmlForLi += '<li>' + html + '</li>';
                    });
                    return '<' + nodeName + '>' + htmlForLi + '</' + nodeName + '>';
                } else {

                    // 其他元素，移除元素属性
                    $elem = $(removeAttrs(elem));
                    return $('<div>').append($elem).html();
                }
            }

            // 移除一个元素（子元素）的attr
            function removeAttrs(elem) {
                var attrs = elem.attributes || [];
                var attrNames = [];
                var exception = ['href', 'target', 'src', 'alt', 'rowspan', 'colspan']; //例外情况

                // 先存储下elem中所有 attr 的名称
                $.each(attrs, function (key, attr) {
                    if (attr && attr.nodeType === 2) {
                        attrNames.push(attr.nodeName);
                    }
                });
                // 再根据名称删除所有attr
                $.each(attrNames, function (key, attr) {
                    if (exception.indexOf(attr) < 0) {
                        // 除了 exception 规定的例外情况，删除其他属性
                        elem.removeAttribute(attr);
                    }
                });

                // 递归子节点
                var children = elem.childNodes;
                if (children.length) {
                    $.each(children, function (key, value) {
                        removeAttrs(value);
                    });
                }

                return elem;
            }
        };

        // 绑定 $txt.formatText() 方法
        Txt.fn.bindFormatText = function () {
            var self = this;
            var editor = self.editor;
            var $txt = self.$txt;
            var legalTags = E.config.legalTags;
            var legalTagArr = legalTags.split(',');
            var length = legalTagArr.length;
            var regArr = [];

            // 将 E.config.legalTags 配置的有效字符，生成正则表达式
            $.each(legalTagArr, function (k, tag) {
                var reg = '\>\\s*\<(' + tag + ')\>';
                regArr.push(new RegExp(reg, 'ig'));
            });

            // 增加 li 
            regArr.push(new RegExp('\>\\s*\<(li)\>', 'ig'));

            // 增加 tr
            regArr.push(new RegExp('\>\\s*\<(tr)\>', 'ig'));

            // 增加 code
            regArr.push(new RegExp('\>\\s*\<(code)\>', 'ig'));

            // 生成 formatText 方法
            $txt.formatText = function () {
                var $temp = $('<div>');
                var html = $txt.html();

                // 去除空格
                html = html.replace(/\s*</ig, '<');

                // 段落、表格之间换行
                $.each(regArr, function (k, reg) {
                    if (!reg.test(html)) {
                        return;
                    }
                    html = html.replace(reg, function (matchStr, tag) {
                        return '>\n<' + tag + '>';
                    });
                });

                $temp.html(html);
                return $temp.text();
            };
        };

        // 定制 $txt.html 方法
        Txt.fn.bindHtml = function () {
            var self = this;
            var editor = self.editor;
            var $txt = self.$txt;
            var $valueContainer = editor.$valueContainer;
            var valueNodeName = editor.valueNodeName;

            $txt.html = function (html) {
                var result;

                if (valueNodeName === 'div') {
                    // div 生成的编辑器，取值、赋值，都直接触发jquery的html方法
                    result = $.fn.html.call($txt, html);
                }

                // textarea 生成的编辑器，则需要考虑赋值时，也给textarea赋值

                if (html === undefined) {
                    // 取值，直接触发jquery原生html方法
                    result = $.fn.html.call($txt);

                    // 替换 html 中，src和href属性中的 & 字符。
                    // 因为 .html() 或者 .innerHTML 会把所有的 & 字符都改成 &amp; 但是 src 和 href 中的要保持 &
                    result = result.replace(/(href|src)\=\"(.*)\"/igm, function (a, b, c) {
                        return b + '="' + c.replace('&amp;', '&') + '"';
                    });
                } else {
                    // 赋值，需要同时给 textarea 赋值
                    result = $.fn.html.call($txt, html);
                    $valueContainer.val(html);
                }

                if (html === undefined) {
                    return result;
                } else {
                    // 手动触发 change 事件，因为 $txt 监控了 change 事件来判断是否需要执行 editor.onchange 
                    $txt.change();
                }
            };
        };
    });
    // Txt.fn api
    _e(function (E, $) {

        var Txt = E.Txt;

        var txtChangeEventNames = 'propertychange change click keyup input paste';

        // 渲染
        Txt.fn.render = function () {
            var $txt = this.$txt;
            var $editorContainer = this.editor.$editorContainer;
            $editorContainer.append($txt);
        };

        // 计算高度
        Txt.fn.initHeight = function () {
            var editor = this.editor;
            var $txt = this.$txt;
            var valueContainerHeight = editor.$valueContainer.height();
            var menuHeight = editor.menuContainer.height();
            var txtHeight = valueContainerHeight - menuHeight;

            // 限制最小为 50px
            txtHeight = txtHeight < 50 ? 50 : txtHeight;

            $txt.height(txtHeight);

            // 记录原始高度
            editor.valueContainerHeight = valueContainerHeight;

            // 设置 max-height
            this.initMaxHeight(txtHeight, menuHeight);
        };

        // 计算最大高度
        Txt.fn.initMaxHeight = function (txtHeight, menuHeight) {
            var editor = this.editor;
            var $menuContainer = editor.menuContainer.$menuContainer;
            var $txt = this.$txt;
            var $wrap = $('<div>');

            // 需要浏览器支持 max-height，否则不管
            if (window.getComputedStyle && 'max-height' in window.getComputedStyle($txt.get(0))) {
                // 获取 max-height 并判断是否有值
                var maxHeight = parseInt(editor.$valueContainer.css('max-height'));
                if (isNaN(maxHeight)) {
                    return;
                }

                // max-height 和『全屏』暂时有冲突
                if (editor.menus.fullscreen) {
                    E.warn('max-height和『全屏』菜单一起使用时，会有一些问题尚未解决，请暂时不要两个同时使用');
                    return;
                }

                // 标记
                editor.useMaxHeight = true;

                // 设置maxheight
                $wrap.css({
                    'max-height': maxHeight - menuHeight + 'px',
                    'overflow-y': 'auto'
                });
                $txt.css({
                    'height': 'auto',
                    'overflow-y': 'visible',
                    'min-height': txtHeight + 'px'
                });

                // 滚动式，菜单阴影
                $wrap.on('scroll', function () {
                    if ($txt.parent().scrollTop() > 10) {
                        $menuContainer.addClass('wangEditor-menu-shadow');
                    } else {
                        $menuContainer.removeClass('wangEditor-menu-shadow');
                    }
                });

                // 需在编辑器区域外面再包裹一层
                $txt.wrap($wrap);
            }
        };

        // 保存选区
        Txt.fn.saveSelectionEvent = function () {
            var $txt = this.$txt;
            var editor = this.editor;
            var timeoutId;
            var dt = Date.now();

            function save() {
                editor.saveSelection();
            }

            // 同步保存选区
            function saveSync() {
                // 100ms之内，不重复保存
                if (Date.now() - dt < 100) {
                    return;
                }

                dt = Date.now();
                save();
            }

            // 异步保存选区
            function saveAync() {
                // 节流，防止高频率重复操作
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(save, 300);
            }

            // txt change 、focus、blur 时随时保存选区
            $txt.on(txtChangeEventNames + ' focus blur', function (e) {
                // 先同步保存选区，为了让接下来就马上要执行 editor.getRangeElem() 的程序
                // 能够获取到正确的 rangeElem
                saveSync();

                // 再异步保存选区，为了确定更加准确的选区，为后续的操作做准备
                saveAync();
            });

            // 鼠标拖拽选择时，可能会拖拽到编辑器区域外面再松手，此时 $txt 就监听不到 click事件了
            $txt.on('mousedown', function () {
                $txt.on('mouseleave.saveSelection', function (e) {
                    // 先同步后异步，如上述注释
                    saveSync();
                    saveAync();

                    // 顺道吧菜单状态也更新了
                    editor.updateMenuStyle();
                });
            }).on('mouseup', function () {
                $txt.off('mouseleave.saveSelection');
            });
        };

        // 随时更新 value
        Txt.fn.updateValueEvent = function () {
            var $txt = this.$txt;
            var editor = this.editor;
            var timeoutId, oldValue;

            // 触发 onchange 事件
            function doOnchange() {
                var val = $txt.html();
                if (oldValue === val) {
                    // 无变化
                    return;
                }

                // 触发 onchange 事件
                if (editor.onchange && typeof editor.onchange === 'function') {
                    editor.onchange.call(editor);
                }

                // 更新内容
                editor.updateValue();

                // 记录最新内容
                oldValue = val;
            }

            // txt change 时随时更新内容
            $txt.on(txtChangeEventNames, function (e) {
                // 初始化
                if (oldValue == null) {
                    oldValue = $txt.html();
                }

                // 监控内容变化（停止操作 100ms 之后立即执行）
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(doOnchange, 100);
            });
        };

        // 随时更新 menustyle
        Txt.fn.updateMenuStyleEvent = function () {
            var $txt = this.$txt;
            var editor = this.editor;

            // txt change 时随时更新内容
            $txt.on(txtChangeEventNames, function (e) {
                editor.updateMenuStyle();
            });
        };

        // 最后插入试图插入 <p><br><p>
        Txt.fn.insertEmptyP = function () {
            var $txt = this.$txt;
            var $children = $txt.children();

            if ($children.length === 0) {
                $txt.append($('<p><br></p>'));
                return;
            }

            if ($.trim($children.last().html()).toLowerCase() !== '<br>') {
                $txt.append($('<p><br></p>'));
            }
        };

        // 将编辑器暴露出来的文字和图片，都用 p 来包裹
        Txt.fn.wrapImgAndText = function () {
            var $txt = this.$txt;
            var $imgs = $txt.children('img');
            var txt = $txt[0];
            var childNodes = txt.childNodes;
            var childrenLength = childNodes.length;
            var i, childNode, p;

            // 处理图片
            $imgs.length && $imgs.each(function () {
                $(this).wrap('<p>');
            });

            // 处理文字
            for (i = 0; i < childrenLength; i++) {
                childNode = childNodes[i];
                if (childNode.nodeType === 3 && childNode.textContent && $.trim(childNode.textContent)) {
                    $(childNode).wrap('<p>');
                }
            }
        };

        // 清空内容为空的<p>，以及重复包裹的<p>（在windows下的chrome粘贴文字之后，会出现上述情况）
        Txt.fn.clearEmptyOrNestP = function () {
            var $txt = this.$txt;
            var $pList = $txt.find('p');

            $pList.each(function () {
                var $p = $(this);
                var $children = $p.children();
                var childrenLength = $children.length;
                var $firstChild;
                var content = $.trim($p.html());

                // 内容为空的p
                if (!content) {
                    $p.remove();
                    return;
                }

                // 嵌套的p
                if (childrenLength === 1) {
                    $firstChild = $children.first();
                    if ($firstChild.get(0) && $firstChild.get(0).nodeName === 'P') {
                        $p.html($firstChild.html());
                    }
                }
            });
        };

        // 获取 scrollTop
        Txt.fn.scrollTop = function (val) {
            var self = this;
            var editor = self.editor;
            var $txt = self.$txt;

            if (editor.useMaxHeight) {
                return $txt.parent().scrollTop(val);
            } else {
                return $txt.scrollTop(val);
            }
        };

        // 鼠标hover时候，显示p、head的高度
        Txt.fn.showHeightOnHover = function () {
            var editor = this.editor;
            var $editorContainer = editor.$editorContainer;
            var menuContainer = editor.menuContainer;
            var $txt = this.$txt;
            var $tip = $('<i class="height-tip"><i>');
            var isTipInTxt = false;

            function addAndShowTip($target) {
                if (!isTipInTxt) {
                    $editorContainer.append($tip);
                    isTipInTxt = true;
                }

                var txtTop = $txt.position().top;
                var txtHeight = $txt.outerHeight();

                var height = $target.height();
                var top = $target.position().top;
                var marginTop = parseInt($target.css('margin-top'), 10);
                var paddingTop = parseInt($target.css('padding-top'), 10);
                var marginBottom = parseInt($target.css('margin-bottom'), 10);
                var paddingBottom = parseInt($target.css('padding-bottom'), 10);

                // 计算初步的结果
                var resultHeight = height + paddingTop + marginTop + paddingBottom + marginBottom;
                var resultTop = top + menuContainer.height();

                // var spaceValue;

                // // 判断是否超出下边界
                // spaceValue = (resultTop + resultHeight) - (txtTop + txtHeight);
                // if (spaceValue > 0) {
                //     resultHeight = resultHeight - spaceValue;
                // }

                // // 判断是否超出了下边界
                // spaceValue = txtTop > resultTop;
                // if (spaceValue) {
                //     resultHeight = resultHeight - spaceValue;
                //     top = top + spaceValue;
                // }

                // 按照最终结果渲染
                $tip.css({
                    height: height + paddingTop + marginTop + paddingBottom + marginBottom,
                    top: top + menuContainer.height()
                });
            }
            function removeTip() {
                if (!isTipInTxt) {
                    return;
                }
                $tip.remove();
                isTipInTxt = false;
            }

            $txt.on('mouseenter', 'ul,ol,blockquote,p,h1,h2,h3,h4,h5,table,pre', function (e) {
                addAndShowTip($(e.currentTarget));
            }).on('mouseleave', function () {
                removeTip();
            });
        };
    });
    // 工具函数
    _e(function (E, $) {

        // IE8 [].indexOf()
        if (!Array.prototype.indexOf) {
            //IE低版本不支持 arr.indexOf 
            Array.prototype.indexOf = function (elem) {
                var i = 0,
                    length = this.length;
                for (; i < length; i++) {
                    if (this[i] === elem) {
                        return i;
                    }
                }
                return -1;
            };
            //IE低版本不支持 arr.lastIndexOf
            Array.prototype.lastIndexOf = function (elem) {
                var length = this.length;
                for (length = length - 1; length >= 0; length--) {
                    if (this[length] === elem) {
                        return length;
                    }
                }
                return -1;
            };
        }

        // IE8 Date.now()
        if (!Date.now) {
            Date.now = function () {
                return new Date().valueOf();
            };
        }

        // console.log && console.warn && console.error
        var console = window.console;
        var emptyFn = function emptyFn() {};
        $.each(['info', 'log', 'warn', 'error'], function (key, value) {
            if (console == null) {
                E[value] = emptyFn;
            } else {
                E[value] = function (info) {
                    // 通过配置来控制打印输出
                    if (E.config && E.config.printLog) {
                        console[value]('wangEditor提示: ' + info);
                    }
                };
            }
        });

        // 获取随机数
        E.random = function () {
            return Math.random().toString().slice(2);
        };

        // 浏览器是否支持 placeholder
        E.placeholder = 'placeholder' in document.createElement('input');

        // 兼容IE8的 input placeholder
        E.placeholderForIE8 = function ($container) {
            if (E.placeholder) {
                return;
            }
            $container.find('input[placeholder]').each(function () {
                var $input = $(this);
                var placeholder = $input.attr('placeholder');

                if ($input.val() === '') {
                    $input.css('color', '#666');
                    $input.val(placeholder);

                    $input.on('focus.placeholder click.placeholder', function () {
                        $input.val('');
                        $input.css('color', '#333');
                        $input.off('focus.placeholder click.placeholder');
                    });
                }
            });
        };
    });
    // 语言包
    _e(function (E, $) {
        E.langs = {};

        // 中文
        E.langs['zh-cn'] = {
            bold: '粗体',
            underline: '下划线',
            italic: '斜体',
            forecolor: '文字颜色',
            bgcolor: '背景色',
            strikethrough: '删除线',
            eraser: '清空格式',
            source: '源码',
            quote: '引用',
            fontfamily: '字体',
            fontsize: '字号',
            head: '标题',
            orderlist: '有序列表',
            unorderlist: '无序列表',
            alignleft: '左对齐',
            aligncenter: '居中',
            alignright: '右对齐',
            link: '链接',
            text: '文本',
            submit: '提交',
            cancel: '取消',
            unlink: '取消链接',
            table: '表格',
            emotion: '表情',
            img: '图片',
            uploadImg: '上传图片',
            linkImg: '网络图片',
            video: '视频',
            'width': '宽',
            'height': '高',
            location: '位置',
            loading: '加载中',
            searchlocation: '搜索位置',
            dynamicMap: '动态地图',
            clearLocation: '清除位置',
            langDynamicOneLocation: '动态地图只能显示一个位置',
            insertcode: '插入代码',
            undo: '撤销',
            redo: '重复',
            fullscreen: '全屏',
            openLink: '打开链接'
        };

        // 英文
        E.langs.en = {
            bold: 'Bold',
            underline: 'Underline',
            italic: 'Italic',
            forecolor: 'Color',
            bgcolor: 'Backcolor',
            strikethrough: 'Strikethrough',
            eraser: 'Eraser',
            source: 'Codeview',
            quote: 'Quote',
            fontfamily: 'Font family',
            fontsize: 'Font size',
            head: 'Head',
            orderlist: 'Ordered list',
            unorderlist: 'Unordered list',
            alignleft: 'Align left',
            aligncenter: 'Align center',
            alignright: 'Align right',
            link: 'Insert link',
            text: 'Text',
            submit: 'Submit',
            cancel: 'Cancel',
            unlink: 'Unlink',
            table: 'Table',
            emotion: 'Emotions',
            img: 'Image',
            uploadImg: 'Upload',
            linkImg: 'Link',
            video: 'Video',
            'width': 'width',
            'height': 'height',
            location: 'Location',
            loading: 'Loading',
            searchlocation: 'search',
            dynamicMap: 'Dynamic',
            clearLocation: 'Clear',
            langDynamicOneLocation: 'Only one location in dynamic map',
            insertcode: 'Insert Code',
            undo: 'Undo',
            redo: 'Redo',
            fullscreen: 'Full screnn',
            openLink: 'open link'
        };
    });
    // 全局配置
    _e(function (E, $) {

        E.config = {};

        // 全屏时的 z-index
        E.config.zindex = 10000;

        // 是否打印log
        E.config.printLog = true;

        // 菜单吸顶：false - 不吸顶；number - 吸顶，值为top值
        E.config.menuFixed = 0;

        // 编辑源码时，过滤 javascript
        E.config.jsFilter = true;

        // 编辑器允许的标签
        E.config.legalTags = 'p,h1,h2,h3,h4,h5,h6,blockquote,table,ul,ol,pre';

        // 语言包
        E.config.lang = E.langs['zh-cn'];

        // 菜单配置
        E.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|', 'link', 'unlink', 'table', 'emotion', '|', 'img', 'video', 'location', 'insertcode', '|', 'undo', 'redo', 'fullscreen'];

        // 颜色配置
        E.config.colors = {
            // 'value': 'title'
            '#880000': '暗红色',
            '#800080': '紫色',
            '#ff0000': '红色',
            '#ff00ff': '鲜粉色',
            '#000080': '深蓝色',
            '#0000ff': '蓝色',
            '#00ffff': '湖蓝色',
            '#008080': '蓝绿色',
            '#008000': '绿色',
            '#808000': '橄榄色',
            '#00ff00': '浅绿色',
            '#ffcc00': '橙黄色',
            '#808080': '灰色',
            '#c0c0c0': '银色',
            '#000000': '黑色',
            '#ffffff': '白色'
        };

        // 字体
        E.config.familys = ['宋体', '黑体', '楷体', '微软雅黑', 'Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Microsoft JhengHei', 'Trebuchet MS', 'Courier New', 'Impact', 'Comic Sans MS', 'Consolas'];

        // 字号
        E.config.fontsizes = {
            // 格式：'value': 'title'
            1: '12px',
            2: '13px',
            3: '16px',
            4: '18px',
            5: '24px',
            6: '32px',
            7: '48px'
        };

        // 表情包
        E.config.emotionsShow = 'icon'; // 显示项，默认为'icon'，也可以配置成'value'
        E.config.emotions = {
            // 'default': {
            //     title: '默认',
            //     data: './emotions.data'
            // },
            'weibo': {
                title: '微博表情',
                data: [{
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif',
                    value: '[草泥马]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif',
                    value: '[神马]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif',
                    value: '[浮云]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_thumb.gif',
                    value: '[给力]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_thumb.gif',
                    value: '[围观]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_thumb.gif',
                    value: '[威武]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_thumb.gif',
                    value: '[熊猫]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/81/rabbit_thumb.gif',
                    value: '[兔子]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/otm_thumb.gif',
                    value: '[奥特曼]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/15/j_thumb.gif',
                    value: '[囧]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/hufen_thumb.gif',
                    value: '[互粉]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c4/liwu_thumb.gif',
                    value: '[礼物]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ac/smilea_thumb.gif',
                    value: '[呵呵]'
                }, {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0b/tootha_thumb.gif',
                    value: '[哈哈]'
                }]
            }
        };

        // 百度地图的key
        E.config.mapAk = 'TVhjYjq1ICT2qqL5LdS8mwas';

        // 上传图片的配置
        // server地址
        E.config.uploadImgUrl = '';
        // 超时时间
        E.config.uploadTimeout = 20 * 1000;
        // 用于存储上传回调事件
        E.config.uploadImgFns = {};
        // 自定义上传图片的filename
        // E.config.uploadImgFileName = 'customFileName';

        // 自定义上传，设置为 true 之后，显示上传图标
        E.config.customUpload = false;
        // 自定义上传的init事件
        // E.config.customUploadInit = function () {....};

        // 自定义上传时传递的参数（如 token）
        E.config.uploadParams = {
            /* token: 'abcdef12345' */
        };

        // 自定义上传是的header参数
        E.config.uploadHeaders = {
            /* 'Accept' : 'text/x-json' */
        };

        // 跨域上传时传递 cookie，默认为 true
        E.config.withCredentials = true;

        // 隐藏网络图片，默认为 false
        E.config.hideLinkImg = false;

        // 是否过滤粘贴内容
        E.config.pasteFilter = true;

        // 是否粘贴纯文本，当 editor.config.pasteFilter === false 时候，此配置将失效
        E.config.pasteText = false;

        // 插入代码时，默认的语言
        E.config.codeDefaultLang = 'javascript';
    });
    // 全局UI
    _e(function (E, $) {

        E.UI = {};

        // 为菜单自定义配置的UI
        E.UI.menus = {
            // 这个 default 不加引号，在 IE8 会报错
            'default': {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-command"></i></a>',
                selected: '.selected'
            },
            bold: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-bold"></i></a>',
                selected: '.selected'
            },
            underline: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-underline"></i></a>',
                selected: '.selected'
            },
            italic: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-italic"></i></a>',
                selected: '.selected'
            },
            forecolor: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-pencil"></i></a>',
                selected: '.selected'
            },
            bgcolor: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-brush"></i></a>',
                selected: '.selected'
            },
            strikethrough: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-strikethrough"></i></a>',
                selected: '.selected'
            },
            eraser: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-eraser"></i></a>',
                selected: '.selected'
            },
            quote: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-quotes-left"></i></a>',
                selected: '.selected'
            },
            source: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-code"></i></a>',
                selected: '.selected'
            },
            fontfamily: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-font2"></i></a>',
                selected: '.selected'
            },
            fontsize: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-text-height"></i></a>',
                selected: '.selected'
            },
            head: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-header"></i></a>',
                selected: '.selected'
            },
            orderlist: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-numbered"></i></a>',
                selected: '.selected'
            },
            unorderlist: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-bullet"></i></a>',
                selected: '.selected'
            },
            alignleft: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-left"></i></a>',
                selected: '.selected'
            },
            aligncenter: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-center"></i></a>',
                selected: '.selected'
            },
            alignright: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-right"></i></a>',
                selected: '.selected'
            },
            link: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-link"></i></a>',
                selected: '.selected'
            },
            unlink: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-unlink"></i></a>',
                selected: '.selected'
            },
            table: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-table"></i></a>',
                selected: '.selected'
            },
            emotion: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-happy"></i></a>',
                selected: '.selected'
            },
            img: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>',
                selected: '.selected'
            },
            video: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-play"></i></a>',
                selected: '.selected'
            },
            location: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-location"></i></a>',
                selected: '.selected'
            },
            insertcode: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-terminal"></i></a>',
                selected: '.selected'
            },
            undo: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-ccw"></i></a>',
                selected: '.selected'
            },
            redo: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-cw"></i></a>',
                selected: '.selected'
            },
            fullscreen: {
                normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-enlarge2"></i></a>',
                selected: '<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-shrink2"></i></a>'
            }
        };
    });
    // 对象配置
    _e(function (E, $) {

        E.fn.initDefaultConfig = function () {
            var editor = this;
            editor.config = $.extend({}, E.config);
            editor.UI = $.extend({}, E.UI);
        };
    });
    // 增加 container
    _e(function (E, $) {

        E.fn.addEditorContainer = function () {
            this.$editorContainer = $('<div class="wangEditor-container"></div>');
        };
    });
    // 增加编辑区域对象
    _e(function (E, $) {

        E.fn.addTxt = function () {
            var editor = this;
            var txt = new E.Txt(editor);

            editor.txt = txt;
        };
    });
    // 增加menuContainer对象
    _e(function (E, $) {

        E.fn.addMenuContainer = function () {
            var editor = this;
            editor.menuContainer = new E.MenuContainer(editor);
        };
    });
    // 增加menus
    _e(function (E, $) {

        // 存储创建菜单的函数
        E.createMenuFns = [];
        E.createMenu = function (fn) {
            E.createMenuFns.push(fn);
        };

        // 创建所有菜单
        E.fn.addMenus = function () {
            var editor = this;
            var menuIds = editor.config.menus;

            // 检验 menuId 是否在配置中存在
            function check(menuId) {
                if (menuIds.indexOf(menuId) >= 0) {
                    return true;
                }
                return false;
            }

            // 遍历所有的菜单创建函数，并执行
            $.each(E.createMenuFns, function (k, createMenuFn) {
                createMenuFn.call(editor, check);
            });
        };
    });
    // bold菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'bold';
            if (!check(menuId)) {
                return;
            }

            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.bold,
                commandName: 'Bold'
            });

            // 定义选中状态下的click事件
            menu.clickEventSelected = function (e) {
                var isRangeEmpty = editor.isRangeEmpty();
                if (!isRangeEmpty) {
                    // 如果选区有内容，则执行基础命令
                    editor.command(e, 'Bold');
                } else {
                    // 如果选区没有内容
                    editor.commandForElem('b,strong,h1,h2,h3,h4,h5', e, 'Bold');
                }
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // underline菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'underline';
            if (!check(menuId)) {
                return;
            }

            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.underline,
                commandName: 'Underline'
            });

            // 定义选中状态下的click事件
            menu.clickEventSelected = function (e) {
                var isRangeEmpty = editor.isRangeEmpty();
                if (!isRangeEmpty) {
                    // 如果选区有内容，则执行基础命令
                    editor.command(e, 'Underline');
                } else {
                    // 如果选区没有内容
                    editor.commandForElem('u,a', e, 'Underline');
                }
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // italic 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'italic';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.italic,
                commandName: 'Italic'
            });

            // 定义选中状态下的click事件
            menu.clickEventSelected = function (e) {
                var isRangeEmpty = editor.isRangeEmpty();
                if (!isRangeEmpty) {
                    // 如果选区有内容，则执行基础命令
                    editor.command(e, 'Italic');
                } else {
                    // 如果选区没有内容
                    editor.commandForElem('i', e, 'Italic');
                }
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // forecolor 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'forecolor';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;
            var configColors = editor.config.colors;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.forecolor
            });

            // 创建 dropPanel
            var $content = $('<div></div>');
            $.each(configColors, function (k, v) {
                $content.append(['<a href="#" class="color-item"', '    title="' + v + '" commandValue="' + k + '" ', '    style="color: ' + k + '" ', '><i class="wangeditor-menu-img-pencil"></i></a>'].join(''));
            });
            $content.on('click', 'a[commandValue]', function (e) {
                // 执行命令
                var $elem = $(this);
                var commandValue = $elem.attr('commandValue');

                if (menu.selected && editor.isRangeEmpty()) {
                    // 当前处于选中状态，并且选中内容为空
                    editor.commandForElem('font[color]', e, 'forecolor', commandValue);
                } else {
                    // 当前未处于选中状态，或者有选中内容。则执行默认命令
                    editor.command(e, 'forecolor', commandValue);
                }
            });
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $content,
                width: 125
            });

            // 定义 update selected 事件
            menu.updateSelectedEvent = function () {
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'font[color]');
                if (rangeElem) {
                    return true;
                }
                return false;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // bgcolor 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'bgcolor';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;
            var configColors = editor.config.colors;

            // 检查元素是否有 background-color: 内联样式
            function checkElemFn(elem) {
                var cssText;
                if (elem && elem.style && elem.style.cssText != null) {
                    cssText = elem.style.cssText;
                    if (cssText && cssText.indexOf('background-color:') >= 0) {
                        return true;
                    }
                }
                return false;
            }

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.bgcolor
            });

            // 创建 dropPanel
            var $content = $('<div></div>');
            $.each(configColors, function (k, v) {
                $content.append(['<a href="#" class="color-item"', '    title="' + v + '" commandValue="' + k + '" ', '    style="color: ' + k + '" ', '><i class="wangeditor-menu-img-brush"></i></a>'].join(''));
            });
            $content.on('click', 'a[commandValue]', function (e) {
                // 执行命令

                var $elem = $(this);
                var commandValue = $elem.attr('commandValue');

                if (menu.selected && editor.isRangeEmpty()) {
                    // 当前处于选中状态，并且选中内容为空。使用 commandForElem 执行命令
                    editor.commandForElem({
                        selector: 'span,font',
                        check: checkElemFn
                    }, e, 'BackColor', commandValue);
                } else {
                    // 当前未处于选中状态，或者有选中内容。则执行默认命令
                    editor.command(e, 'BackColor', commandValue);
                }
            });
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $content,
                width: 125
            });

            // 定义 update selected 事件
            menu.updateSelectedEvent = function () {
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'span,font', checkElemFn);

                if (rangeElem) {
                    return true;
                }
                return false;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // strikethrough 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'strikethrough';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.strikethrough,
                commandName: 'StrikeThrough'
            });

            // 定义选中状态下的click事件
            menu.clickEventSelected = function (e) {
                var isRangeEmpty = editor.isRangeEmpty();
                if (!isRangeEmpty) {
                    // 如果选区有内容，则执行基础命令
                    editor.command(e, 'StrikeThrough');
                } else {
                    // 如果选区没有内容
                    editor.commandForElem('strike', e, 'StrikeThrough');
                }
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // eraser 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'eraser';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.eraser,
                commandName: 'RemoveFormat'
            });

            // 定义点击事件
            menu.clickEvent = function (e) {
                var isRangeEmpty = editor.isRangeEmpty();

                if (!isRangeEmpty) {
                    // 选区不是空的，则执行默认命令
                    editor.command(e, 'RemoveFormat');
                    return;
                }

                var $clearElem;

                // 自定义的命令函数
                function commandFn() {
                    var editor = this;
                    var rangeElem;
                    var pElem, $pElem;
                    var quoteElem, $quoteElem;
                    var listElem, $listElem;

                    // 获取选区 elem
                    rangeElem = editor.getRangeElem();
                    // 第一步，获取 quote 父元素
                    quoteElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
                    if (quoteElem) {
                        $quoteElem = $(quoteElem);
                        $clearElem = $('<p>' + $quoteElem.text() + '</p>');
                        $quoteElem.after($clearElem).remove();
                    }
                    // 第二步，获取 p h 父元素
                    pElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5');
                    if (pElem) {
                        $pElem = $(pElem);
                        $clearElem = $('<p>' + $pElem.text() + '</p>');
                        $pElem.after($clearElem).remove();
                    }
                    // 第三步，获取list
                    listElem = editor.getSelfOrParentByName(rangeElem, 'ul,ol');
                    if (listElem) {
                        $listElem = $(listElem);
                        $clearElem = $('<p>' + $listElem.text() + '</p>');
                        $listElem.after($clearElem).remove();
                    }
                }

                // 自定义 callback 事件
                function callback() {
                    // callback中，设置range为clearElem
                    var editor = this;
                    if ($clearElem) {
                        editor.restoreSelectionByElem($clearElem.get(0));
                    }
                }

                // 执行自定义命令
                editor.customCommand(e, commandFn, callback);
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // source 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'source';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;
            var txtHtml;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.source
            });

            menu.isShowCode = false;

            // 更新内容
            function updateValue() {
                var $code = menu.$codeTextarea;
                var $txt = editor.txt.$txt;
                var value = $.trim($code.val()); // 取值

                if (!value) {
                    value = '<p><br></p>';
                }

                // 过滤js代码
                if (editor.config.jsFilter) {

                    value = value.replace(/<script[\s\S]*?<\/script>/ig, '');
                }
                // 赋值
                try {
                    $txt.html(value);
                } catch (ex) {
                    // 更新 html 源码出错，一般都是取消了 js 过滤之后，js报错导致的
                }
            }

            // 定义click事件
            menu.clickEvent = function (e) {
                var self = this;
                var editor = self.editor;
                var $txt = editor.txt.$txt;
                var txtOuterHeight = $txt.outerHeight();
                var txtHeight = $txt.height();

                if (!self.$codeTextarea) {
                    self.$codeTextarea = $('<textarea class="code-textarea"></textarea>');
                }
                var $code = self.$codeTextarea;
                $code.css({
                    height: txtHeight,
                    'margin-top': txtOuterHeight - txtHeight
                });

                // 赋值
                $code.val($txt.html());

                // 监控变化
                $code.on('change', function (e) {
                    updateValue();
                });

                // 渲染
                $txt.after($code).hide();
                $code.show();

                // 更新状态
                menu.isShowCode = true;

                // 执行 updateSelected 事件
                this.updateSelected();

                // 禁用其他菜单
                editor.disableMenusExcept('source');

                // 记录当前html值
                txtHtml = $txt.html();
            };

            // 定义选中状态下的click事件
            menu.clickEventSelected = function (e) {
                var self = this;
                var editor = self.editor;
                var $txt = editor.txt.$txt;
                var $code = self.$codeTextarea;
                var value;

                if (!$code) {
                    return;
                }

                // 更新内容
                updateValue();

                // 渲染
                $code.after($txt).hide();
                $txt.show();

                // 更新状态
                menu.isShowCode = false;

                // 执行 updateSelected 事件
                this.updateSelected();

                // 启用其他菜单
                editor.enableMenusExcept('source');

                // 判断是否执行 onchange 事件
                if ($txt.html() !== txtHtml) {
                    if (editor.onchange && typeof editor.onchange === 'function') {
                        editor.onchange.call(editor);
                    }
                }
            };

            // 定义切换选中状态事件
            menu.updateSelectedEvent = function () {
                return this.isShowCode;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // quote 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'quote';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.quote,
                commandName: 'formatBlock',
                commandValue: 'blockquote'
            });

            // 定义click事件
            menu.clickEvent = function (e) {
                var rangeElem = editor.getRangeElem();
                var $rangeElem;
                if (!rangeElem) {
                    e.preventDefault();
                    return;
                }
                var currentQuote = editor.getSelfOrParentByName(rangeElem, 'blockquote');
                var $quote;

                if (currentQuote) {
                    // 说明当前在quote之内，不做任何处理
                    e.preventDefault();
                    return;
                }

                rangeElem = editor.getLegalTags(rangeElem);
                $rangeElem = $(rangeElem);

                // 无文字，则不允许执行引用
                if (!$rangeElem.text()) {
                    return;
                }

                if (!rangeElem) {
                    // 执行默认命令
                    // IE8 下执行此处（不过，经测试代码无效，也不报错）
                    editor.command(e, 'formatBlock', 'blockquote');
                    return;
                }

                // 自定义command事件
                function commandFn() {
                    $quote = $('<p>' + $rangeElem.text() + '</p>');
                    $rangeElem.after($quote).remove();
                    $quote.wrap('<blockquote>');
                }

                // 自定义 callback 事件
                function callback() {
                    // callback中，设置range为quote
                    var editor = this;
                    if ($quote) {
                        editor.restoreSelectionByElem($quote.get(0));
                    }
                }

                // 执行自定义命令
                editor.customCommand(e, commandFn, callback);
            };

            // 定义选中状态下的click事件
            menu.clickEventSelected = function (e) {
                var rangeElem;
                var quoteElem;
                var $lastChild;

                // 获取当前选区的elem，并试图往上找 quote 元素
                rangeElem = editor.getRangeElem();
                quoteElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
                if (!quoteElem) {
                    // 没找到，则返回
                    e.preventDefault();
                    return;
                }

                // 自定义的command事件
                function commandFn() {
                    var $quoteElem;
                    var $children;

                    $quoteElem = $(quoteElem);
                    $children = $quoteElem.children();
                    if ($children.length) {
                        $children.each(function (k) {
                            var $item = $(this);
                            if ($item.get(0).nodeName === 'P') {
                                $quoteElem.after($item);
                            } else {
                                $quoteElem.after('<p>' + $item.text() + '</p>');
                            }
                            $lastChild = $item; // 记录最后一个子元素，用于callback中的range定位
                        });
                        $quoteElem.remove();
                        return;
                    }
                }

                // 自定义的callback函数
                function callback() {
                    // callback中，设置range为lastChild
                    var editor = this;
                    if ($lastChild) {
                        editor.restoreSelectionByElem($lastChild.get(0));
                    }
                }

                // 执行自定义命令
                editor.customCommand(e, commandFn, callback);
            };

            // 定义更新选中状态的事件
            menu.updateSelectedEvent = function () {
                var self = this; //菜单对象
                var editor = self.editor;
                var rangeElem;

                rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');

                if (rangeElem) {
                    return true;
                }

                return false;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;

            // --------------- 两次点击 enter 跳出引用 ---------------
            editor.ready(function () {
                var editor = this;
                var $txt = editor.txt.$txt;
                var isPrevEnter = false; // 是不是刚刚在quote中按了 enter 键
                $txt.on('keydown', function (e) {
                    if (e.keyCode !== 13) {
                        // 不是 enter 键
                        isPrevEnter = false;
                        return;
                    }

                    var rangeElem = editor.getRangeElem();
                    rangeElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
                    if (!rangeElem) {
                        // 选区不是 quote
                        isPrevEnter = false;
                        return;
                    }

                    if (!isPrevEnter) {
                        // 最近没有在qote中按enter键
                        isPrevEnter = true;
                        return;
                    }

                    var currentRangeElem = editor.getRangeElem();
                    var $currentRangeElem = $(currentRangeElem);
                    if ($currentRangeElem.length) {
                        $currentRangeElem.parent().after($currentRangeElem);
                    }

                    // 设置选区
                    editor.restoreSelectionByElem(currentRangeElem, 'start');

                    isPrevEnter = false;
                    // 阻止默认行文
                    e.preventDefault();
                });
            }); // editor.ready(

            // --------------- 处理quote中无内容时不能删除的问题 ---------------
            editor.ready(function () {
                var editor = this;
                var $txt = editor.txt.$txt;
                var $rangeElem;

                function commandFn() {
                    $rangeElem && $rangeElem.remove();
                }
                function callback() {
                    if (!$rangeElem) {
                        return;
                    }
                    var $prev = $rangeElem.prev();
                    if ($prev.length) {
                        // 有 prev 则定位到 prev 最后
                        editor.restoreSelectionByElem($prev.get(0));
                    } else {
                        // 无 prev 则初始化选区
                        editor.initSelection();
                    }
                }

                $txt.on('keydown', function (e) {
                    if (e.keyCode !== 8) {
                        // 不是 backspace 键
                        return;
                    }

                    var rangeElem = editor.getRangeElem();
                    rangeElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
                    if (!rangeElem) {
                        // 选区不是 quote
                        return;
                    }
                    $rangeElem = $(rangeElem);

                    var text = $rangeElem.text();
                    if (text) {
                        // quote 中还有内容
                        return;
                    }
                    editor.customCommand(e, commandFn, callback);
                }); // $txt.on
            }); // editor.ready(
        });
    });
    // 字体 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'fontfamily';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;
            var configFamilys = editor.config.familys;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.fontfamily,
                commandName: 'fontName'
            });

            // 初始化数据
            var data = {};
            /*
                data 需要的结构
                {
                    'commandValue': 'title'
                    ...
                }
            */
            $.each(configFamilys, function (k, v) {
                // configFamilys 是数组，data 是对象
                data[v] = v;
            });

            // 创建droplist
            var tpl = '<span style="font-family:{#commandValue};">{#title}</span>';
            menu.dropList = new E.DropList(editor, menu, {
                data: data,
                tpl: tpl,
                selectorForELemCommand: 'font[face]' // 为了执行 editor.commandForElem 而传入的elem查询方式
            });

            // 定义 update selected 事件
            menu.updateSelectedEvent = function () {
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'font[face]');
                if (rangeElem) {
                    return true;
                }
                return false;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // 字号 菜单
    _e(function (E, $) {
        E.createMenu(function (check) {
            var menuId = 'fontsize';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;
            var configSize = editor.config.fontsizes;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.fontsize,
                commandName: 'fontSize'
            });

            // 初始化数据
            var data = configSize;
            /*
                data 需要的结构
                {
                    'commandValue': 'title'
                    ...
                }
            */

            // 创建droplist
            var tpl = '<span style="font-size:{#title};">{#title}</span>';
            menu.dropList = new E.DropList(editor, menu, {
                data: data,
                tpl: tpl,
                selectorForELemCommand: 'font[size]' // 为了执行 editor.commandForElem 而传入的elem查询方式
            });

            // 定义 update selected 事件
            menu.updateSelectedEvent = function () {
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'font[size]');
                if (rangeElem) {
                    return true;
                }
                return false;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // head 菜单
    _e(function (E, $) {
        E.createMenu(function (check) {
            var menuId = 'head';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.head,
                commandName: 'formatBlock'
            });

            // 初始化数据
            var data = {
                '<h1>': '标题1',
                '<h2>': '标题2',
                '<h3>': '标题3',
                '<h4>': '标题4',
                '<h5>': '标题5'
            };
            /*
                data 需要的结构
                {
                    'commandValue': 'title'
                    ...
                }
            */

            var isOrderedList;
            function beforeEvent(e) {
                if (editor.queryCommandState('InsertOrderedList')) {
                    isOrderedList = true;

                    // 先取消有序列表
                    editor.command(e, 'InsertOrderedList');
                } else {
                    isOrderedList = false;
                }
            }

            function afterEvent(e) {
                if (isOrderedList) {
                    // 再设置有序列表
                    editor.command(e, 'InsertOrderedList');
                }
            }

            // 创建droplist
            var tpl = '{#commandValue}{#title}';
            menu.dropList = new E.DropList(editor, menu, {
                data: data,
                tpl: tpl,
                // 对 ol 直接设置 head，会出现每个 li 的 index 都变成 1 的问题，因此要先取消 ol，然后设置 head，最后再增加上 ol
                beforeEvent: beforeEvent,
                afterEvent: afterEvent
            });

            // 定义 update selected 事件
            menu.updateSelectedEvent = function () {
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'h1,h2,h3,h4,h5');
                if (rangeElem) {
                    return true;
                }
                return false;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // unorderlist 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'unorderlist';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.unorderlist,
                commandName: 'InsertUnorderedList'
            });

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // orderlist 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'orderlist';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.orderlist,
                commandName: 'InsertOrderedList'
            });

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // alignleft 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'alignleft';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.alignleft,
                commandName: 'JustifyLeft'
            });

            // 定义 update selected 事件
            menu.updateSelectedEvent = function () {
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,li', function (elem) {
                    var cssText;
                    if (elem && elem.style && elem.style.cssText != null) {
                        cssText = elem.style.cssText;
                        if (cssText && /text-align:\s*left;/.test(cssText)) {
                            return true;
                        }
                    }
                    if ($(elem).attr('align') === 'left') {
                        // ff 中，设置align-left之后，会是 <p align="left">xxx</p>
                        return true;
                    }
                    return false;
                });
                if (rangeElem) {
                    return true;
                }
                return false;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // aligncenter 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'aligncenter';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.aligncenter,
                commandName: 'JustifyCenter'
            });

            // 定义 update selected 事件
            menu.updateSelectedEvent = function () {
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,li', function (elem) {
                    var cssText;
                    if (elem && elem.style && elem.style.cssText != null) {
                        cssText = elem.style.cssText;
                        if (cssText && /text-align:\s*center;/.test(cssText)) {
                            return true;
                        }
                    }
                    if ($(elem).attr('align') === 'center') {
                        // ff 中，设置align-center之后，会是 <p align="center">xxx</p>
                        return true;
                    }
                    return false;
                });
                if (rangeElem) {
                    return true;
                }
                return false;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // alignright 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'alignright';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.alignright,
                commandName: 'JustifyRight'
            });

            // 定义 update selected 事件
            menu.updateSelectedEvent = function () {
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,li', function (elem) {
                    var cssText;
                    if (elem && elem.style && elem.style.cssText != null) {
                        cssText = elem.style.cssText;
                        if (cssText && /text-align:\s*right;/.test(cssText)) {
                            return true;
                        }
                    }
                    if ($(elem).attr('align') === 'right') {
                        // ff 中，设置align-right之后，会是 <p align="right">xxx</p>
                        return true;
                    }
                    return false;
                });
                if (rangeElem) {
                    return true;
                }
                return false;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // link 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'link';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.link
            });

            // 创建 dropPanel
            var $content = $('<div></div>');
            var $div1 = $('<div style="margin:20px 10px;" class="clearfix"></div>');
            var $div2 = $div1.clone();
            var $div3 = $div1.clone().css('margin', '0 10px');
            var $textInput = $('<input type="text" class="block" placeholder="' + lang.text + '"/>');
            var $urlInput = $('<input type="text" class="block" placeholder="' + lang.link + '"/>');
            var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
            var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');

            $div1.append($textInput);
            $div2.append($urlInput);
            $div3.append($btnSubmit).append($btnCancel);
            $content.append($div1).append($div2).append($div3);

            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $content,
                width: 300
            });

            // 定义click事件
            menu.clickEvent = function (e) {
                var menu = this;
                var dropPanel = menu.dropPanel;

                // -------------隐藏----------------
                if (dropPanel.isShowing) {
                    dropPanel.hide();
                    return;
                }

                // -------------显示----------------

                // 重置 input
                $textInput.val('');
                $urlInput.val('http://');

                // 获取url
                var url = '';
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'a');
                if (rangeElem) {
                    url = rangeElem.href || '';
                }

                // 获取 text
                var text = '';
                var isRangeEmpty = editor.isRangeEmpty();
                if (!isRangeEmpty) {
                    // 选区不是空
                    text = editor.getRangeText() || '';
                } else if (rangeElem) {
                    // 如果选区空，并且在 a 标签之内
                    text = rangeElem.textContent || rangeElem.innerHTML;
                }

                // 设置 url 和 text
                url && $urlInput.val(url);
                text && $textInput.val(text);

                // 如果有选区内容，textinput 不能修改
                if (!isRangeEmpty) {
                    $textInput.attr('disabled', true);
                } else {
                    $textInput.removeAttr('disabled');
                }

                // 显示（要设置好了所有input的值和属性之后再显示）
                dropPanel.show();
            };

            // 定义 update selected 事件
            menu.updateSelectedEvent = function () {
                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'a');
                if (rangeElem) {
                    return true;
                }
                return false;
            };

            // 『取消』 按钮
            $btnCancel.click(function (e) {
                e.preventDefault();
                menu.dropPanel.hide();
            });

            // 『确定』按钮
            $btnSubmit.click(function (e) {
                e.preventDefault();
                var rangeElem = editor.getRangeElem();
                var targetElem = editor.getSelfOrParentByName(rangeElem, 'a');
                var isRangeEmpty = editor.isRangeEmpty();

                var $linkElem, linkHtml;
                var commandFn, callback;
                var $txt = editor.txt.$txt;
                var $oldLinks, $newLinks;
                var uniqId = 'link' + E.random();

                // 获取数据
                var url = $.trim($urlInput.val());
                var text = $.trim($textInput.val());

                if (!url) {
                    menu.dropPanel.focusFirstInput();
                    return;
                }
                if (!text) {
                    text = url;
                }

                if (!isRangeEmpty) {
                    // 选中区域有内容，则执行默认命令

                    // 获取目前 txt 内所有链接，并为当前链接做一个标记
                    $oldLinks = $txt.find('a');
                    $oldLinks.attr(uniqId, '1');

                    // 执行命令 
                    editor.command(e, 'createLink', url);

                    // 去的没有标记的链接，即刚刚插入的链接
                    $newLinks = $txt.find('a').not('[' + uniqId + ']');
                    $newLinks.attr('target', '_blank'); // 增加 _blank

                    // 去掉之前做的标记
                    $oldLinks.removeAttr(uniqId);
                } else if (targetElem) {
                    // 无选中区域，在 a 标签之内，修改该 a 标签的内容和链接
                    $linkElem = $(targetElem);
                    commandFn = function commandFn() {
                        $linkElem.attr('href', url);
                        $linkElem.text(text);
                    };
                    callback = function callback() {
                        var editor = this;
                        editor.restoreSelectionByElem(targetElem);
                    };
                    // 执行命令
                    editor.customCommand(e, commandFn, callback);
                } else {
                    // 无选中区域，不在 a 标签之内，插入新的链接

                    linkHtml = '<a href="' + url + '" target="_blank">' + text + '</a>';
                    if (E.userAgent.indexOf('Firefox') > 0) {
                        linkHtml += '<span>&nbsp;</span>';
                    }
                    editor.command(e, 'insertHtml', linkHtml);
                }
            });

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // unlink 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'unlink';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.unlink,
                commandName: 'unLink'
            });

            // click 事件
            menu.clickEvent = function (e) {
                var isRangeEmpty = editor.isRangeEmpty();
                if (!isRangeEmpty) {
                    // 有选中区域，或者IE8，执行默认命令
                    editor.command(e, 'unLink');
                    return;
                }

                // 无选中区域...

                var rangeElem = editor.getRangeElem();
                var aElem = editor.getSelfOrParentByName(rangeElem, 'a');
                if (!aElem) {
                    // 不在 a 之内，返回
                    e.preventDefault();
                    return;
                }

                // 在 a 之内
                var $a = $(aElem);
                var $span = $('<span>' + $a.text() + '</span>');
                function commandFn() {
                    $a.after($span).remove();
                }
                function callback() {
                    editor.restoreSelectionByElem($span.get(0));
                }
                editor.customCommand(e, commandFn, callback);
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // table 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'table';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.table
            });

            // dropPanel 内容
            var $content = $('<div style="font-size: 14px; color: #666; text-align:right;"></div>');
            var $table = $('<table class="choose-table" style="margin-bottom:10px;margin-top:5px;">');
            var $row = $('<span>0</span>');
            var $rowspan = $('<span> 行 </span>');
            var $col = $('<span>0</span>');
            var $colspan = $('<span> 列</span>');
            var $tr;
            var i, j;

            // 创建一个n行n列的表格
            for (i = 0; i < 15; i++) {
                $tr = $('<tr index="' + (i + 1) + '">');
                for (j = 0; j < 20; j++) {
                    $tr.append($('<td index="' + (j + 1) + '">'));
                }
                $table.append($tr);
            }
            $content.append($table);
            $content.append($row).append($rowspan).append($col).append($colspan);

            // 定义table事件
            $table.on('mouseenter', 'td', function (e) {
                var $currentTd = $(e.currentTarget);
                var currentTdIndex = $currentTd.attr('index');
                var $currentTr = $currentTd.parent();
                var currentTrIndex = $currentTr.attr('index');

                // 显示
                $row.text(currentTrIndex);
                $col.text(currentTdIndex);

                // 遍历设置背景颜色
                $table.find('tr').each(function () {
                    var $tr = $(this);
                    var trIndex = $tr.attr('index');
                    if (parseInt(trIndex, 10) <= parseInt(currentTrIndex, 10)) {
                        // 该行需要可能需要设置背景色
                        $tr.find('td').each(function () {
                            var $td = $(this);
                            var tdIndex = $td.attr('index');
                            if (parseInt(tdIndex, 10) <= parseInt(currentTdIndex, 10)) {
                                // 需要设置背景色
                                $td.addClass('active');
                            } else {
                                // 需要移除背景色
                                $td.removeClass('active');
                            }
                        });
                    } else {
                        // 改行不需要设置背景色
                        $tr.find('td').removeClass('active');
                    }
                });
            }).on('mouseleave', function (e) {
                // mouseleave 删除背景色
                $table.find('td').removeClass('active');

                $row.text(0);
                $col.text(0);
            });

            // 插入表格
            $table.on('click', 'td', function (e) {
                var $currentTd = $(e.currentTarget);
                var currentTdIndex = $currentTd.attr('index');
                var $currentTr = $currentTd.parent();
                var currentTrIndex = $currentTr.attr('index');

                var rownum = parseInt(currentTrIndex, 10);
                var colnum = parseInt(currentTdIndex, 10);

                // -------- 拼接tabel html --------

                var i, j;
                var tableHtml = '<table>';
                for (i = 0; i < rownum; i++) {
                    tableHtml += '<tr>';

                    for (j = 0; j < colnum; j++) {
                        tableHtml += '<td><span>&nbsp;</span></td>';
                    }
                    tableHtml += '</tr>';
                }
                tableHtml += '</table>';

                // -------- 执行命令 --------
                editor.command(e, 'insertHtml', tableHtml);
            });

            // 创建 panel
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $content,
                width: 262
            });

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // emotion 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'emotion';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var config = editor.config;
            var lang = config.lang;
            var configEmotions = config.emotions;
            var emotionsShow = config.emotionsShow;

            // 记录每一个表情图片的地址
            editor.emotionUrls = [];

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.emotion
            });

            // 添加表情图片的函数
            function insertEmotionImgs(data, $tabContent) {
                // 添加表情图片
                $.each(data, function (k, emotion) {
                    var src = emotion.icon || emotion.url;
                    var value = emotion.value || emotion.title;
                    // 通过配置 editor.config.emotionsShow 的值来修改插入到编辑器的内容（图片/value）
                    var commandValue = emotionsShow === 'icon' ? src : value;
                    var $command = $('<a href="#" commandValue="' + commandValue + '"></a>');
                    var $img = $('<img>');
                    $img.attr('_src', src); // 先将 src 复制到 '_src' 属性，先不加载

                    $command.append($img);
                    $tabContent.append($command);

                    // 记录下每一个表情图片的地址
                    editor.emotionUrls.push(src);
                });
            }

            // 拼接 dropPanel 内容
            var $panelContent = $('<div class="panel-tab"></div>');
            var $tabContainer = $('<div class="tab-container"></div>');
            var $contentContainer = $('<div class="content-container emotion-content-container"></div>');
            $.each(configEmotions, function (k, emotion) {
                var title = emotion.title;
                var data = emotion.data;

                E.log('正在处理 ' + title + ' 表情的数据...');

                // 增加该组表情的tab和content
                var $tab = $('<a href="#">' + title + ' </a>');
                $tabContainer.append($tab);
                var $tabContent = $('<div class="content"></div>');
                $contentContainer.append($tabContent);

                // tab 切换事件
                $tab.click(function (e) {
                    $tabContainer.children().removeClass('selected');
                    $contentContainer.children().removeClass('selected');
                    $tabContent.addClass('selected');
                    $tab.addClass('selected');
                    e.preventDefault();
                });

                // 处理data
                if (typeof data === 'string') {
                    // url 形式，需要通过ajax从该url获取数据
                    E.log('将通过 ' + data + ' 地址ajax下载表情包');
                    $.get(data, function (result) {
                        result = $.parseJSON(result);
                        E.log('下载完毕，得到 ' + result.length + ' 个表情');
                        insertEmotionImgs(result, $tabContent);
                    });
                } else if (Object.prototype.toString.call(data).toLowerCase().indexOf('array') > 0) {
                    // 数组，即 data 直接就是表情包数据
                    insertEmotionImgs(data, $tabContent);
                } else {
                    // 其他情况，data格式不对
                    E.error('data 数据格式错误，请修改为正确格式，参考文档：' + E.docsite);
                    return;
                }
            });
            $panelContent.append($tabContainer).append($contentContainer);

            // 默认显示第一个tab
            $tabContainer.children().first().addClass('selected');
            $contentContainer.children().first().addClass('selected');

            // 插入表情command事件
            $contentContainer.on('click', 'a[commandValue]', function (e) {
                var $a = $(e.currentTarget);
                var commandValue = $a.attr('commandValue');
                var img;

                // commandValue 有可能是图片url，也有可能是表情的 value，需要区别对待

                if (emotionsShow === 'icon') {
                    // 插入图片
                    editor.command(e, 'InsertImage', commandValue);
                } else {
                    // 插入value
                    editor.command(e, 'insertHtml', '<span>' + commandValue + '</span>');
                }

                e.preventDefault();
            });

            // 添加panel
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $panelContent,
                width: 350
            });

            // 定义click事件（异步加载表情图片）
            menu.clickEvent = function (e) {
                var menu = this;
                var dropPanel = menu.dropPanel;

                // -------------隐藏-------------
                if (dropPanel.isShowing) {
                    dropPanel.hide();
                    return;
                }

                // -------------显示-------------
                dropPanel.show();

                // 异步加载图片
                if (menu.imgLoaded) {
                    return;
                }
                $contentContainer.find('img').each(function () {
                    var $img = $(this);
                    var _src = $img.attr('_src');
                    $img.on('error', function () {
                        E.error('加载不出表情图片 ' + _src);
                    });
                    $img.attr('src', _src);
                    $img.removeAttr('_src');
                });
                menu.imgLoaded = true;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // img 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'img';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.img
            });

            // 创建 panel content
            var $panelContent = $('<div class="panel-tab"></div>');
            var $tabContainer = $('<div class="tab-container"></div>');
            var $contentContainer = $('<div class="content-container"></div>');
            $panelContent.append($tabContainer).append($contentContainer);

            // tab
            var $uploadTab = $('<a href="#">' + lang.uploadImg + '</a>');
            var $linkTab = $('<a href="#">' + lang.linkImg + '</a>');
            $tabContainer.append($uploadTab).append($linkTab);

            // 上传图片 content
            var $uploadContent = $('<div class="content"></div>');
            $contentContainer.append($uploadContent);

            // 网络图片 content
            var $linkContent = $('<div class="content"></div>');
            $contentContainer.append($linkContent);
            linkContentHandler(editor, menu, $linkContent);

            // 添加panel
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $panelContent,
                width: 400,
                onRender: function onRender() {
                    // 渲染后的回调事件，用于执行自定义上传的init
                    // 因为渲染之后，上传面板的dom才会被渲染到页面，才能让第三方空间获取到
                    var init = editor.config.customUploadInit;
                    init && init.call(editor);
                }
            });

            // 增加到editor对象中
            editor.menus[menuId] = menu;

            // tab 切换事件
            function tabToggle() {
                $uploadTab.click(function (e) {
                    $tabContainer.children().removeClass('selected');
                    $contentContainer.children().removeClass('selected');
                    $uploadContent.addClass('selected');
                    $uploadTab.addClass('selected');
                    e.preventDefault();
                });
                $linkTab.click(function (e) {
                    $tabContainer.children().removeClass('selected');
                    $contentContainer.children().removeClass('selected');
                    $linkContent.addClass('selected');
                    $linkTab.addClass('selected');
                    e.preventDefault();

                    // focus input
                    if (E.placeholder) {
                        $linkContent.find('input[type=text]').focus();
                    }
                });

                // 默认情况
                // $uploadTab.addClass('selected');
                // $uploadContent.addClass('selected');
                $uploadTab.click();
            }

            // 隐藏上传图片
            function hideUploadImg() {
                $tabContainer.remove();
                $uploadContent.remove();
                $linkContent.addClass('selected');
            }

            // 隐藏网络图片
            function hideLinkImg() {
                $tabContainer.remove();
                $linkContent.remove();
                $uploadContent.addClass('selected');
            }

            // 判断用户是否配置了上传图片
            editor.ready(function () {
                var editor = this;
                var config = editor.config;
                var uploadImgUrl = config.uploadImgUrl;
                var customUpload = config.customUpload;
                var linkImg = config.hideLinkImg;
                var $uploadImgPanel;

                if (uploadImgUrl || customUpload) {
                    // 第一，暴露出 $uploadContent 以便用户自定义 ！！！重要
                    editor.$uploadContent = $uploadContent;

                    // 第二，绑定tab切换事件
                    tabToggle();

                    if (linkImg) {
                        // 隐藏网络图片
                        hideLinkImg();
                    }
                } else {
                    // 未配置上传图片功能
                    hideUploadImg();
                }

                // 点击 $uploadContent 立即隐藏 dropPanel
                // 为了兼容IE8、9的上传，因为IE8、9使用 modal 上传
                // 这里使用异步，为了不妨碍高级浏览器通过点击 $uploadContent 选择文件
                function hidePanel() {
                    menu.dropPanel.hide();
                }
                $uploadContent.click(function () {
                    setTimeout(hidePanel);
                });
            });
        });

        // --------------- 处理网络图片content ---------------
        function linkContentHandler(editor, menu, $linkContent) {
            var lang = editor.config.lang;
            var $urlContainer = $('<div style="margin:20px 10px 10px 10px;"></div>');
            var $urlInput = $('<input type="text" class="block" placeholder="http://"/>');
            $urlContainer.append($urlInput);
            var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
            var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');

            $linkContent.append($urlContainer).append($btnSubmit).append($btnCancel);

            // 取消
            $btnCancel.click(function (e) {
                e.preventDefault();
                menu.dropPanel.hide();
            });

            // callback 
            function callback() {
                $urlInput.val('');
            }

            // 确定
            $btnSubmit.click(function (e) {
                e.preventDefault();
                var url = $.trim($urlInput.val());
                if (!url) {
                    // 无内容
                    $urlInput.focus();
                    return;
                }

                var imgHtml = '<img style="max-width:100%;" src="' + url + '"/>';
                editor.command(e, 'insertHtml', imgHtml, callback);
            });
        }
    });
    // video 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'video';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;
            var reg = /^<(iframe)|(embed)/i; // <iframe... 或者 <embed... 格式

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.video
            });

            // 创建 panel 内容
            var $content = $('<div></div>');
            var $linkInputContainer = $('<div style="margin:20px 10px;"></div>');
            var $linkInput = $('<input type="text" class="block" placeholder=\'格式如：<iframe src="..." frameborder=0 allowfullscreen></iframe>\'/>');
            $linkInputContainer.append($linkInput);
            var $sizeContainer = $('<div style="margin:20px 10px;"></div>');
            var $widthInput = $('<input type="text" value="640" style="width:50px;text-align:center;"/>');
            var $heightInput = $('<input type="text" value="498" style="width:50px;text-align:center;"/>');
            $sizeContainer.append('<span> ' + lang.width + ' </span>').append($widthInput).append('<span> px &nbsp;&nbsp;&nbsp;</span>').append('<span> ' + lang.height + ' </span>').append($heightInput).append('<span> px </span>');
            var $btnContainer = $('<div></div>');
            var $howToCopy = $('<a href="http://www.kancloud.cn/wangfupeng/wangeditor2/134973" target="_blank" style="display:inline-block;margin-top:10px;margin-left:10px;color:#999;">如何复制视频链接？</a>');
            var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
            var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');
            $btnContainer.append($howToCopy).append($btnSubmit).append($btnCancel);
            $content.append($linkInputContainer).append($sizeContainer).append($btnContainer);

            // 取消按钮
            $btnCancel.click(function (e) {
                e.preventDefault();
                $linkInput.val('');
                menu.dropPanel.hide();
            });

            // 确定按钮
            $btnSubmit.click(function (e) {
                e.preventDefault();
                var link = $.trim($linkInput.val());
                var $link;
                var width = parseInt($widthInput.val());
                var height = parseInt($heightInput.val());
                var $div = $('<div>');
                var html = '<p>{content}</p>';

                // 验证数据
                if (!link) {
                    menu.dropPanel.focusFirstInput();
                    return;
                }

                if (!reg.test(link)) {
                    alert('视频链接格式错误！');
                    menu.dropPanel.focusFirstInput();
                    return;
                }

                if (isNaN(width) || isNaN(height)) {
                    alert('宽度或高度不是数字！');
                    return;
                }

                $link = $(link);

                // 设置高度和宽度
                $link.attr('width', width).attr('height', height);

                // 拼接字符串
                html = html.replace('{content}', $div.append($link).html());

                // 执行命令
                editor.command(e, 'insertHtml', html);
                $linkInput.val('');
            });

            // 创建panel
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $content,
                width: 400
            });

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // location 菜单
    _e(function (E, $) {

        // 判断浏览器的 input 是否支持 keyup
        var inputKeyup = function (input) {
            return 'onkeyup' in input;
        }(document.createElement('input'));

        // 百度地图的key
        E.baiduMapAk = 'TVhjYjq1ICT2qqL5LdS8mwas';

        // 一个页面中，如果有多个编辑器，地图会出现问题。这个参数记录一下，如果超过 1 就提示
        E.numberOfLocation = 0;

        E.createMenu(function (check) {
            var menuId = 'location';
            if (!check(menuId)) {
                return;
            }

            if (++E.numberOfLocation > 1) {
                E.error('目前不支持在一个页面多个编辑器上同时使用地图，可通过自定义菜单配置去掉地图菜单');
                return;
            }

            var editor = this;
            var config = editor.config;
            var lang = config.lang;
            var ak = config.mapAk;

            // 地图的变量存储到这个地方
            editor.mapData = {};
            var mapData = editor.mapData;

            // ---------- 地图事件 ----------
            mapData.markers = [];
            mapData.mapContainerId = 'map' + E.random();

            mapData.clearLocations = function () {
                var map = mapData.map;
                if (!map) {
                    return;
                }
                map.clearOverlays();

                //同时，清空marker数组
                mapData.markers = [];
            };

            mapData.searchMap = function () {
                var map = mapData.map;
                if (!map) {
                    return;
                }

                var BMap = window.BMap;
                var cityName = $cityInput.val();
                var locationName = $searchInput.val();
                var myGeo, marker;

                if (cityName !== '') {
                    if (!locationName || locationName === '') {
                        map.centerAndZoom(cityName, 11);
                    }

                    //地址解析
                    if (locationName && locationName !== '') {
                        myGeo = new BMap.Geocoder();
                        // 将地址解析结果显示在地图上,并调整地图视野
                        myGeo.getPoint(locationName, function (point) {
                            if (point) {
                                map.centerAndZoom(point, 13);
                                marker = new BMap.Marker(point);
                                map.addOverlay(marker);
                                marker.enableDragging(); //允许拖拽
                                mapData.markers.push(marker); //将marker加入到数组中
                            } else {
                                // alert('未找到');
                                map.centerAndZoom(cityName, 11); //找不到则重新定位到城市
                            }
                        }, cityName);
                    }
                } // if(cityName !== '')
            };

            // load script 之后的 callback
            var hasCallback = false;
            window.baiduMapCallBack = function () {
                // 避免重复加载
                if (hasCallback) {
                    return;
                } else {
                    hasCallback = true;
                }

                var BMap = window.BMap;
                if (!mapData.map) {
                    // 创建Map实例
                    mapData.map = new BMap.Map(mapData.mapContainerId);
                }
                var map = mapData.map;

                map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
                map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
                map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

                //根据IP定位
                function locationFun(result) {
                    var cityName = result.name;
                    map.setCenter(cityName);

                    // 设置城市名称
                    $cityInput.val(cityName);
                    if (E.placeholder) {
                        $searchInput.focus();
                    }
                    var timeoutId, _searchFn;
                    if (inputKeyup) {
                        // 并绑定搜索事件 - input 支持 keyup
                        _searchFn = function searchFn(e) {
                            if (e.type === 'keyup' && e.keyCode === 13) {
                                e.preventDefault();
                            }
                            if (timeoutId) {
                                clearTimeout(timeoutId);
                            }
                            timeoutId = setTimeout(mapData.searchMap, 500);
                        };
                        $cityInput.on('keyup change paste', _searchFn);
                        $searchInput.on('keyup change paste', _searchFn);
                    } else {
                        // 并绑定搜索事件 - input 不支持 keyup
                        _searchFn = function searchFn() {
                            if (!$content.is(':visible')) {
                                // panel 不显示了，就不用再监控了
                                clearTimeout(timeoutId);
                                return;
                            }

                            var currentCity = '';
                            var currentSearch = '';
                            var city = $cityInput.val();
                            var search = $searchInput.val();

                            if (city !== currentCity || search !== currentSearch) {
                                // 刚获取的数据和之前的数据不一致，执行查询
                                mapData.searchMap();
                                // 更新数据
                                currentCity = city;
                                currentSearch = search;
                            }

                            // 继续监控
                            if (timeoutId) {
                                clearTimeout(timeoutId);
                            }
                            timeoutId = setTimeout(_searchFn, 1000);
                        };
                        // 开始监控
                        timeoutId = setTimeout(_searchFn, 1000);
                    }
                }
                var myCity = new BMap.LocalCity();
                myCity.get(locationFun);

                //鼠标点击，创建位置
                map.addEventListener("click", function (e) {
                    var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
                    map.addOverlay(marker);
                    marker.enableDragging();
                    mapData.markers.push(marker); //加入到数组中
                }, false);
            };

            mapData.loadMapScript = function () {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://api.map.baidu.com/api?v=2.0&ak=" + ak + "&s=1&callback=baiduMapCallBack"; // baiduMapCallBack是一个本地函数
                try {
                    // IE10- 报错
                    document.body.appendChild(script);
                } catch (ex) {
                    E.error('加载地图过程中发生错误');
                }
            };

            // 初始化地图
            mapData.initMap = function () {
                if (window.BMap) {
                    // 不是第一次，直接处理地图即可
                    window.baiduMapCallBack();
                } else {
                    // 第一次，先加载地图 script，再处理地图（script加载完自动执行处理）
                    mapData.loadMapScript();
                }
            };

            // ---------- 创建 menu 对象 ----------

            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.location
            });

            editor.menus[menuId] = menu;

            // ---------- 构建UI ----------

            // panel content 
            var $content = $('<div></div>');

            // 搜索框
            var $inputContainer = $('<div style="margin:10px 0;"></div>');
            var $cityInput = $('<input type="text"/>');
            $cityInput.css({
                width: '80px',
                'text-align': 'center'
            });
            var $searchInput = $('<input type="text"/>');
            $searchInput.css({
                width: '300px',
                'margin-left': '10px'
            }).attr('placeholder', lang.searchlocation);
            var $clearBtn = $('<button class="right link">' + lang.clearLocation + '</button>');
            $inputContainer.append($clearBtn).append($cityInput).append($searchInput);
            $content.append($inputContainer);

            // 清除位置按钮
            $clearBtn.click(function (e) {
                $searchInput.val('');
                $searchInput.focus();
                mapData.clearLocations();
                e.preventDefault();
            });

            // 地图
            var $map = $('<div id="' + mapData.mapContainerId + '"></div>');
            $map.css({
                height: '260px',
                width: '100%',
                position: 'relative',
                'margin-top': '10px',
                border: '1px solid #f1f1f1'
            });
            var $mapLoading = $('<span>' + lang.loading + '</span>');
            $mapLoading.css({
                position: 'absolute',
                width: '100px',
                'text-align': 'center',
                top: '45%',
                left: '50%',
                'margin-left': '-50px'
            });
            $map.append($mapLoading);
            $content.append($map);

            // 按钮
            var $btnContainer = $('<div style="margin:10px 0;"></div>');
            var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
            var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');
            var $checkLabel = $('<label style="display:inline-block;margin-top:10px;color:#666;"></label>');
            var $check = $('<input type="checkbox">');
            $checkLabel.append($check).append('<span style="display:inline-block;margin-left:5px;">  ' + lang.dynamicMap + '</span>');
            $btnContainer.append($checkLabel).append($btnSubmit).append($btnCancel);
            $content.append($btnContainer);

            function callback() {
                $searchInput.val('');
            }

            // 『取消』按钮事件
            $btnCancel.click(function (e) {
                e.preventDefault();
                callback();
                menu.dropPanel.hide();
            });

            // 『确定』按钮事件
            $btnSubmit.click(function (e) {
                e.preventDefault();
                var map = mapData.map,
                    isDynamic = $check.is(':checked'),
                    markers = mapData.markers,
                    center = map.getCenter(),
                    centerLng = center.lng,
                    centerLat = center.lat,
                    zoom = map.getZoom(),
                    size = map.getSize(),
                    sizeWidth = size.width,
                    sizeHeight = size.height,
                    position,
                    src,
                    iframe;

                if (isDynamic) {
                    //动态地址
                    src = 'http://ueditor.baidu.com/ueditor/dialogs/map/show.html#';
                } else {
                    //静态地址
                    src = 'http://api.map.baidu.com/staticimage?';
                }

                //src参数
                src = src + 'center=' + centerLng + ',' + centerLat + '&zoom=' + zoom + '&width=' + sizeWidth + '&height=' + sizeHeight;
                if (markers.length > 0) {
                    src = src + '&markers=';

                    //添加所有的marker
                    $.each(markers, function (key, value) {
                        position = value.getPosition();
                        if (key > 0) {
                            src = src + '|';
                        }
                        src = src + position.lng + ',' + position.lat;
                    });
                }

                if (isDynamic) {
                    if (markers.length > 1) {
                        alert(lang.langDynamicOneLocation);
                        return;
                    }

                    src += '&markerStyles=l,A';

                    //插入iframe
                    iframe = '<iframe class="ueditor_baidumap" src="{src}" frameborder="0" width="' + sizeWidth + '" height="' + sizeHeight + '"></iframe>';
                    iframe = iframe.replace('{src}', src);
                    editor.command(e, 'insertHtml', iframe, callback);
                } else {
                    //插入图片
                    editor.command(e, 'insertHtml', '<img style="max-width:100%;" src="' + src + '"/>', callback);
                }
            });

            // 根据 UI 创建菜单 panel
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $content,
                width: 500
            });

            // ---------- 事件 ----------

            // render 时执行事件
            menu.onRender = function () {
                if (ak === E.baiduMapAk) {
                    E.warn('建议在配置中自定义百度地图的mapAk，否则可能影响地图功能，文档：' + E.docsite);
                }
            };

            // click 事件
            menu.clickEvent = function (e) {
                var menu = this;
                var dropPanel = menu.dropPanel;
                var firstTime = false;

                // -------------隐藏-------------
                if (dropPanel.isShowing) {
                    dropPanel.hide();
                    return;
                }

                // -------------显示-------------
                if (!mapData.map) {
                    // 第一次，先加载地图
                    firstTime = true;
                }

                dropPanel.show();
                mapData.initMap();

                if (!firstTime) {
                    $searchInput.focus();
                }
            };
        });
    });
    // insertcode 菜单
    _e(function (E, $) {

        // 加载 highlightjs 代码
        function loadHljs() {
            if (E.userAgent.indexOf('MSIE 8') > 0) {
                // 不支持 IE8
                return;
            }
            if (window.hljs) {
                // 不要重复加载
                return;
            }
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "//cdn.bootcss.com/highlight.js/9.2.0/highlight.min.js";
            document.body.appendChild(script);
        }

        E.createMenu(function (check) {
            var menuId = 'insertcode';
            if (!check(menuId)) {
                return;
            }

            // 加载 highlightjs 代码
            setTimeout(loadHljs, 0);

            var editor = this;
            var config = editor.config;
            var lang = config.lang;
            var $txt = editor.txt.$txt;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.insertcode
            });

            // click 事件
            menu.clickEvent = function (e) {
                var menu = this;
                var dropPanel = menu.dropPanel;

                // 隐藏
                if (dropPanel.isShowing) {
                    dropPanel.hide();
                    return;
                }

                // 显示
                $textarea.val('');
                dropPanel.show();

                // highlightjs 语言列表
                var hljs = window.hljs;
                if (hljs && hljs.listLanguages) {
                    if ($langSelect.children().length !== 0) {
                        return;
                    }
                    $langSelect.css({
                        'margin-top': '9px',
                        'margin-left': '5px'
                    });
                    $.each(hljs.listLanguages(), function (key, lang) {
                        if (lang === 'xml') {
                            lang = 'html';
                        }
                        if (lang === config.codeDefaultLang) {
                            $langSelect.append('<option value="' + lang + '" selected="selected">' + lang + '</option>');
                        } else {
                            $langSelect.append('<option value="' + lang + '">' + lang + '</option>');
                        }
                    });
                } else {
                    $langSelect.hide();
                }
            };

            // 选中状态下的 click 事件
            menu.clickEventSelected = function (e) {
                var menu = this;
                var dropPanel = menu.dropPanel;

                // 隐藏
                if (dropPanel.isShowing) {
                    dropPanel.hide();
                    return;
                }

                // 显示
                dropPanel.show();

                var rangeElem = editor.getRangeElem();
                var targetElem = editor.getSelfOrParentByName(rangeElem, 'pre');
                var $targetElem;
                var className;
                if (targetElem) {
                    // 确定找到 pre 之后，再找 code
                    targetElem = editor.getSelfOrParentByName(rangeElem, 'code');
                }
                if (!targetElem) {
                    return;
                }
                $targetElem = $(targetElem);

                // 赋值内容
                $textarea.val($targetElem.text());
                if ($langSelect) {
                    // 赋值语言
                    className = $targetElem.attr('class');
                    if (className) {
                        $langSelect.val(className.split(' ')[0]);
                    }
                }
            };

            // 定义更新选中状态的事件
            menu.updateSelectedEvent = function () {
                var self = this; //菜单对象
                var editor = self.editor;
                var rangeElem;

                rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'pre');

                if (rangeElem) {
                    return true;
                }

                return false;
            };

            // 创建 panel
            var $content = $('<div></div>');
            var $textarea = $('<textarea></textarea>');
            var $langSelect = $('<select></select>');
            contentHandle($content);
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $content,
                width: 500
            });

            // 增加到editor对象中
            editor.menus[menuId] = menu;

            // ------ 增加 content 内容 ------
            function contentHandle($content) {
                // textarea 区域
                var $textareaContainer = $('<div></div>');
                $textareaContainer.css({
                    margin: '15px 5px 5px 5px',
                    height: '160px',
                    'text-align': 'center'
                });
                $textarea.css({
                    width: '100%',
                    height: '100%',
                    padding: '10px'
                });
                $textarea.on('keydown', function (e) {
                    // 取消 tab 键默认行为
                    if (e.keyCode === 9) {
                        e.preventDefault();
                    }
                });
                $textareaContainer.append($textarea);
                $content.append($textareaContainer);

                // 按钮区域
                var $btnContainer = $('<div></div>');
                var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
                var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');

                $btnContainer.append($btnSubmit).append($btnCancel).append($langSelect);
                $content.append($btnContainer);

                // 取消按钮
                $btnCancel.click(function (e) {
                    e.preventDefault();
                    menu.dropPanel.hide();
                });

                // 确定按钮
                var codeTpl = '<pre style="max-width:100%;overflow-x:auto;"><code{#langClass}>{#content}</code></pre>';
                $btnSubmit.click(function (e) {
                    e.preventDefault();
                    var val = $textarea.val();
                    if (!val) {
                        // 无内容
                        $textarea.focus();
                        return;
                    }

                    var rangeElem = editor.getRangeElem();
                    if ($.trim($(rangeElem).text()) && codeTpl.indexOf('<p><br></p>') !== 0) {
                        codeTpl = '<p><br></p>' + codeTpl;
                    }

                    var lang = $langSelect ? $langSelect.val() : ''; // 获取高亮语言
                    var langClass = '';
                    var doHightlight = function doHightlight() {
                        $txt.find('pre code').each(function (i, block) {
                            var $block = $(block);
                            if ($block.attr('codemark')) {
                                // 有 codemark 标记的代码块，就不再重新格式化了
                                return;
                            } else if (window.hljs) {
                                // 新代码块，格式化之后，立即标记 codemark
                                window.hljs.highlightBlock(block);
                                $block.attr('codemark', '1');
                            }
                        });
                    };

                    // 语言高亮样式
                    if (lang) {
                        langClass = ' class="' + lang + ' hljs"';
                    }

                    // 替换标签
                    val = val.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');

                    // ---- menu 未选中状态 ----
                    if (!menu.selected) {
                        // 拼接html
                        var html = codeTpl.replace('{#langClass}', langClass).replace('{#content}', val);
                        editor.command(e, 'insertHtml', html, doHightlight);
                        return;
                    }

                    // ---- menu 选中状态 ----
                    var targetElem = editor.getSelfOrParentByName(rangeElem, 'pre');
                    var $targetElem;
                    if (targetElem) {
                        // 确定找到 pre 之后，再找 code
                        targetElem = editor.getSelfOrParentByName(rangeElem, 'code');
                    }
                    if (!targetElem) {
                        return;
                    }
                    $targetElem = $(targetElem);

                    function commandFn() {
                        var className;
                        if (lang) {
                            className = $targetElem.attr('class');
                            if (className !== lang + ' hljs') {
                                $targetElem.attr('class', lang + ' hljs');
                            }
                        }
                        $targetElem.html(val);
                    }
                    function callback() {
                        editor.restoreSelectionByElem(targetElem);
                        doHightlight();
                    }
                    editor.customCommand(e, commandFn, callback);
                });
            }

            // ------ enter 时，不另起标签，只换行 ------
            $txt.on('keydown', function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                var rangeElem = editor.getRangeElem();
                var targetElem = editor.getSelfOrParentByName(rangeElem, 'code');
                if (!targetElem) {
                    return;
                }

                editor.command(e, 'insertHtml', '\n');
            });

            // ------ 点击时，禁用其他标签 ------
            function updateMenu() {
                var rangeElem = editor.getRangeElem();
                var targetElem = editor.getSelfOrParentByName(rangeElem, 'code');
                if (targetElem) {
                    // 在 code 之内，禁用其他菜单
                    editor.disableMenusExcept('insertcode');
                } else {
                    // 不是在 code 之内，启用其他菜单
                    editor.enableMenusExcept('insertcode');
                }
            }
            $txt.on('keydown click', function (e) {
                // 此处必须使用 setTimeout 异步处理，否则不对
                setTimeout(updateMenu);
            });
        });
    });
    // undo 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'undo';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.undo
            });

            // click 事件
            menu.clickEvent = function (e) {
                editor.undo();
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;

            // ------------ 初始化时、enter 时、打字中断时，做记录 ------------
            // ------------ ctrl + z 是调用记录撤销，而不是使用浏览器默认的撤销 ------------
            editor.ready(function () {
                var editor = this;
                var $txt = editor.txt.$txt;
                var timeoutId;

                // 执行undo记录
                function undo() {
                    editor.undoRecord();
                }

                $txt.on('keydown', function (e) {
                    var keyCode = e.keyCode;

                    // 撤销 ctrl + z
                    if (e.ctrlKey && keyCode === 90) {
                        editor.undo();
                        return;
                    }

                    if (keyCode === 13) {
                        // enter 做记录
                        undo();
                    } else {
                        // keyup 之后 1s 之内不操作，则做一次记录
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        timeoutId = setTimeout(undo, 1000);
                    }
                });

                // 初始化做记录
                editor.undoRecord();
            });
        });
    });
    // redo 菜单
    _e(function (E, $) {

        E.createMenu(function (check) {
            var menuId = 'redo';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.redo
            });

            // click 事件
            menu.clickEvent = function (e) {
                editor.redo();
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // 全屏 菜单
    _e(function (E, $) {

        // 记录全屏时的scrollTop
        var scrollTopWhenFullScreen;

        E.createMenu(function (check) {
            var menuId = 'fullscreen';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var $txt = editor.txt.$txt;
            var config = editor.config;
            var zIndexConfig = config.zindex || 10000;
            var lang = config.lang;

            var isSelected = false;
            var zIndex;

            var maxHeight;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.fullscreen
            });

            // 定义click事件
            menu.clickEvent = function (e) {
                // 增加样式
                var $editorContainer = editor.$editorContainer;
                $editorContainer.addClass('wangEditor-fullscreen');

                // （先保存当前的）再设置z-index
                zIndex = $editorContainer.css('z-index');
                $editorContainer.css('z-index', zIndexConfig);

                var $wrapper;
                var txtHeight = $txt.height();
                var txtOuterHeight = $txt.outerHeight();

                if (editor.useMaxHeight) {
                    // 记录 max-height，并暂时去掉maxheight
                    maxHeight = $txt.css('max-height');
                    $txt.css('max-height', 'none');

                    // 如果使用了maxHeight， 将$txt从它的父元素中移出来
                    $wrapper = $txt.parent();
                    $wrapper.after($txt);
                    $wrapper.remove();
                    $txt.css('overflow-y', 'auto');
                }

                // 设置高度到全屏
                var menuContainer = editor.menuContainer;
                $txt.height(E.$window.height() - menuContainer.height() - (txtOuterHeight - txtHeight) // 去掉内边距和外边距
                );

                // 取消menuContainer的内联样式（menu吸顶时，会为 menuContainer 设置一些内联样式）
                editor.menuContainer.$menuContainer.attr('style', '');

                // 保存状态
                isSelected = true;

                // 记录编辑器是否全屏
                editor.isFullScreen = true;

                // 记录设置全屏时的高度
                scrollTopWhenFullScreen = E.$window.scrollTop();
            };

            // 定义选中状态的 click 事件
            menu.clickEventSelected = function (e) {
                // 取消样式
                var $editorContainer = editor.$editorContainer;
                $editorContainer.removeClass('wangEditor-fullscreen');
                $editorContainer.css('z-index', zIndex);

                // 还原height
                if (editor.useMaxHeight) {
                    $txt.css('max-height', maxHeight);
                } else {
                    // editor.valueContainerHeight 在 editor.txt.initHeight() 中事先保存了
                    editor.$valueContainer.css('height', editor.valueContainerHeight);
                }

                // 重新计算高度
                editor.txt.initHeight();

                // 保存状态
                isSelected = false;

                // 记录编辑器是否全屏
                editor.isFullScreen = false;

                // 还原scrollTop
                if (scrollTopWhenFullScreen != null) {
                    E.$window.scrollTop(scrollTopWhenFullScreen);
                }
            };

            // 定义选中事件
            menu.updateSelectedEvent = function (e) {
                return isSelected;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // 渲染menus
    _e(function (E, $) {

        E.fn.renderMenus = function () {

            var editor = this;
            var menus = editor.menus;
            var menuIds = editor.config.menus;
            var menuContainer = editor.menuContainer;

            var menu;
            var groupIdx = 0;
            $.each(menuIds, function (k, v) {
                if (v === '|') {
                    groupIdx++;
                    return;
                }

                menu = menus[v];
                if (menu) {
                    menu.render(groupIdx);
                }
            });
        };
    });
    // 渲染menus
    _e(function (E, $) {

        E.fn.renderMenuContainer = function () {

            var editor = this;
            var menuContainer = editor.menuContainer;
            var $editorContainer = editor.$editorContainer;

            menuContainer.render();
        };
    });
    // 渲染 txt
    _e(function (E, $) {

        E.fn.renderTxt = function () {

            var editor = this;
            var txt = editor.txt;

            txt.render();

            // ready 时候，计算txt的高度
            editor.ready(function () {
                txt.initHeight();
            });
        };
    });
    // 渲染 container
    _e(function (E, $) {

        E.fn.renderEditorContainer = function () {

            var editor = this;
            var $valueContainer = editor.$valueContainer;
            var $editorContainer = editor.$editorContainer;
            var $txt = editor.txt.$txt;
            var $prev, $parent;

            // 将编辑器渲染到页面中
            if ($valueContainer === $txt) {
                $prev = editor.$prev;
                $parent = editor.$parent;

                if ($prev && $prev.length) {
                    // 有前置节点，就插入到前置节点的后面
                    $prev.after($editorContainer);
                } else {
                    // 没有前置节点，就直接插入到父元素
                    $parent.prepend($editorContainer);
                }
            } else {
                $valueContainer.after($editorContainer);
                $valueContainer.hide();
            }

            // 设置宽度（这样设置宽度有问题）
            // $editorContainer.css('width', $valueContainer.css('width'));
        };
    });
    // 菜单事件
    _e(function (E, $) {

        // 绑定每个菜单的click事件
        E.fn.eventMenus = function () {

            var menus = this.menus;

            // 绑定菜单的点击事件
            $.each(menus, function (k, v) {
                v.bindEvent();
            });
        };
    });
    // 菜单container事件
    _e(function (E, $) {

        E.fn.eventMenuContainer = function () {};
    });
    // 编辑区域事件
    _e(function (E, $) {

        E.fn.eventTxt = function () {

            var txt = this.txt;

            // txt内容变化时，保存选区
            txt.saveSelectionEvent();

            // txt内容变化时，随时更新 value
            txt.updateValueEvent();

            // txt内容变化时，随时更新 menu style
            txt.updateMenuStyleEvent();

            // // 鼠标hover时，显示 p head 高度（暂时关闭这个功能）
            // if (!/ie/i.test(E.userAgent)) {
            //     // 暂时不支持IE
            //     txt.showHeightOnHover();
            // }
        };
    });
    // 上传图片事件
    _e(function (E, $) {

        E.plugin(function () {
            var editor = this;
            var fns = editor.config.uploadImgFns; // editor.config.uploadImgFns = {} 在config文件中定义了

            // -------- 定义load函数 --------
            fns.onload || (fns.onload = function (resultText, xhr) {
                E.log('上传结束，返回结果为 ' + resultText);

                var editor = this;
                var originalName = editor.uploadImgOriginalName || ''; // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
                var img;
                if (resultText.indexOf('error|') === 0) {
                    // 提示错误
                    E.warn('上传失败：' + resultText.split('|')[1]);
                    alert(resultText.split('|')[1]);
                } else {
                    E.log('上传成功，即将插入编辑区域，结果为：' + resultText);

                    // 将结果插入编辑器
                    img = document.createElement('img');
                    img.onload = function () {
                        var html = '<img src="' + resultText + '" alt="' + originalName + '" style="max-width:100%;"/>';
                        editor.command(null, 'insertHtml', html);

                        E.log('已插入图片，地址 ' + resultText);
                        img = null;
                    };
                    img.onerror = function () {
                        E.error('使用返回的结果获取图片，发生错误。请确认以下结果是否正确：' + resultText);
                        img = null;
                    };
                    img.src = resultText;
                }
            });

            // -------- 定义tiemout函数 --------
            fns.ontimeout || (fns.ontimeout = function (xhr) {
                E.error('上传图片超时');
                alert('上传图片超时');
            });

            // -------- 定义error函数 --------
            fns.onerror || (fns.onerror = function (xhr) {
                E.error('上传上图片发生错误');
                alert('上传上图片发生错误');
            });
        });
    });
    // xhr 上传图片
    _e(function (E, $) {

        if (!window.FileReader || !window.FormData) {
            // 如果不支持html5的文档操作，直接返回
            return;
        }

        E.plugin(function () {

            var editor = this;
            var config = editor.config;
            var uploadImgUrl = config.uploadImgUrl;
            var uploadTimeout = config.uploadTimeout;

            // 获取配置中的上传事件
            var uploadImgFns = config.uploadImgFns;
            var onload = uploadImgFns.onload;
            var ontimeout = uploadImgFns.ontimeout;
            var onerror = uploadImgFns.onerror;

            if (!uploadImgUrl) {
                return;
            }

            // -------- 将以base64的图片url数据转换为Blob --------
            function convertBase64UrlToBlob(urlData, filetype) {
                //去掉url的头，并转换为byte
                var bytes = window.atob(urlData.split(',')[1]);

                //处理异常,将ascii码小于0的转换为大于0
                var ab = new ArrayBuffer(bytes.length);
                var ia = new Uint8Array(ab);
                var i;
                for (i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }

                return new Blob([ab], { type: filetype });
            }

            // -------- 插入图片的方法 --------
            function insertImg(src, event) {
                var img = document.createElement('img');
                img.onload = function () {
                    var html = '<img src="' + src + '" style="max-width:100%;"/>';
                    editor.command(event, 'insertHtml', html);

                    E.log('已插入图片，地址 ' + src);
                    img = null;
                };
                img.onerror = function () {
                    E.error('使用返回的结果获取图片，发生错误。请确认以下结果是否正确：' + src);
                    img = null;
                };
                img.src = src;
            }

            // -------- onprogress 事件 --------
            function updateProgress(e) {
                if (e.lengthComputable) {
                    var percentComplete = e.loaded / e.total;
                    editor.showUploadProgress(percentComplete * 100);
                }
            }

            // -------- xhr 上传图片 --------
            editor.xhrUploadImg = function (opt) {
                // opt 数据
                var event = opt.event;
                var fileName = opt.filename || '';
                var base64 = opt.base64;
                var fileType = opt.fileType || 'image/png'; // 无扩展名则默认使用 png
                var name = opt.name || 'wangEditor_upload_file';
                var loadfn = opt.loadfn || onload;
                var errorfn = opt.errorfn || onerror;
                var timeoutfn = opt.timeoutfn || ontimeout;

                // 上传参数（如 token）
                var params = editor.config.uploadParams || {};

                // headers
                var headers = editor.config.uploadHeaders || {};

                // 获取文件扩展名
                var fileExt = 'png'; // 默认为 png
                if (fileName.indexOf('.') > 0) {
                    // 原来的文件名有扩展名
                    fileExt = fileName.slice(fileName.lastIndexOf('.') - fileName.length + 1);
                } else if (fileType.indexOf('/') > 0 && fileType.split('/')[1]) {
                    // 文件名没有扩展名，通过类型获取，如从 'image/png' 取 'png'
                    fileExt = fileType.split('/')[1];
                }

                // ------------ begin 预览模拟上传 ------------
                if (E.isOnWebsite) {
                    E.log('预览模拟上传');
                    insertImg(base64, event);
                    return;
                }
                // ------------ end 预览模拟上传 ------------

                // 变量声明
                var xhr = new XMLHttpRequest();
                var timeoutId;
                var src;
                var formData = new FormData();

                // 超时处理
                function timeoutCallback() {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    if (xhr && xhr.abort) {
                        xhr.abort();
                    }

                    // 超时了就阻止默认行为
                    event.preventDefault();

                    // 执行回调函数，提示什么内容，都应该在回调函数中定义
                    timeoutfn && timeoutfn.call(editor, xhr);

                    // 隐藏进度条
                    editor.hideUploadProgress();
                }

                xhr.onload = function () {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }

                    // 记录文件名到 editor.uploadImgOriginalName ，插入图片时，可做 alt 属性用
                    editor.uploadImgOriginalName = fileName;
                    if (fileName.indexOf('.') > 0) {
                        editor.uploadImgOriginalName = fileName.split('.')[0];
                    }

                    // 执行load函数，任何操作，都应该在load函数中定义
                    loadfn && loadfn.call(editor, xhr.responseText, xhr);

                    // 隐藏进度条
                    editor.hideUploadProgress();
                };
                xhr.onerror = function () {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }

                    // 超时了就阻止默认行为
                    event.preventDefault();

                    // 执行error函数，错误提示，应该在error函数中定义
                    errorfn && errorfn.call(editor, xhr);

                    // 隐藏进度条
                    editor.hideUploadProgress();
                };
                // xhr.onprogress = updateProgress;
                xhr.upload.onprogress = updateProgress;

                // 填充数据
                formData.append(name, convertBase64UrlToBlob(base64, fileType), E.random() + '.' + fileExt);

                // 添加参数
                $.each(params, function (key, value) {
                    formData.append(key, value);
                });

                // 开始上传
                xhr.open('POST', uploadImgUrl, true);
                // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  // 将参数解析成传统form的方式上传

                // 修改自定义配置的headers
                $.each(headers, function (key, value) {
                    xhr.setRequestHeader(key, value);
                });

                // 跨域上传时，传cookie
                xhr.withCredentials = editor.config.withCredentials || true;

                // 发送数据
                xhr.send(formData);
                timeoutId = setTimeout(timeoutCallback, uploadTimeout);

                E.log('开始上传...并开始超时计算');
            };
        });
    });
    // 进度条
    _e(function (E, $) {

        E.plugin(function () {

            var editor = this;
            var menuContainer = editor.menuContainer;
            var menuHeight = menuContainer.height();
            var $editorContainer = editor.$editorContainer;
            var width = $editorContainer.width();
            var $progress = $('<div class="wangEditor-upload-progress"></div>');

            // 渲染事件
            var isRender = false;
            function render() {
                if (isRender) {
                    return;
                }
                isRender = true;

                $progress.css({
                    top: menuHeight + 'px'
                });
                $editorContainer.append($progress);
            }

            // ------ 显示进度 ------
            editor.showUploadProgress = function (progress) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                // 显示之前，先判断是否渲染
                render();

                $progress.show();
                $progress.width(progress * width / 100);
            };

            // ------ 隐藏进度条 ------
            var timeoutId;
            function hideProgress() {
                $progress.hide();
                timeoutId = null;
            }
            editor.hideUploadProgress = function (time) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                time = time || 750;
                timeoutId = setTimeout(hideProgress, time);
            };
        });
    });
    // upload img 插件
    _e(function (E, $) {

        E.plugin(function () {
            var editor = this;
            var config = editor.config;
            var uploadImgUrl = config.uploadImgUrl;
            var uploadTimeout = config.uploadTimeout;
            var event;

            if (!uploadImgUrl) {
                return;
            }

            // 获取editor的上传dom
            var $uploadContent = editor.$uploadContent;
            if (!$uploadContent) {
                return;
            }

            // 自定义UI，并添加到上传dom节点上
            var $uploadIcon = $('<div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div>');
            $uploadContent.append($uploadIcon);

            // ---------- 构建上传对象 ----------
            var upfile = new E.UploadFile({
                editor: editor,
                uploadUrl: uploadImgUrl,
                timeout: uploadTimeout,
                fileAccept: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp' // 只允许选择图片 
            });

            // 选择本地文件，上传
            $uploadIcon.click(function (e) {
                event = e;
                upfile.selectFiles();
            });
        });
    });
    // h5 方式上传图片
    _e(function (E, $) {

        if (!window.FileReader || !window.FormData) {
            // 如果不支持html5的文档操作，直接返回
            return;
        }

        // 构造函数
        var UploadFile = function UploadFile(opt) {
            this.editor = opt.editor;
            this.uploadUrl = opt.uploadUrl;
            this.timeout = opt.timeout;
            this.fileAccept = opt.fileAccept;
            this.multiple = true;
        };

        UploadFile.fn = UploadFile.prototype;

        // clear
        UploadFile.fn.clear = function () {
            this.$input.val('');
            E.log('input value 已清空');
        };

        // 渲染
        UploadFile.fn.render = function () {
            var self = this;
            if (self._hasRender) {
                // 不要重复渲染
                return;
            }

            E.log('渲染dom');

            var fileAccept = self.fileAccept;
            var acceptTpl = fileAccept ? 'accept="' + fileAccept + '"' : '';
            var multiple = self.multiple;
            var multipleTpl = multiple ? 'multiple="multiple"' : '';
            var $input = $('<input type="file" ' + acceptTpl + ' ' + multipleTpl + '/>');
            var $container = $('<div style="display:none;"></div>');

            $container.append($input);
            E.$body.append($container);

            // onchange 事件
            $input.on('change', function (e) {
                self.selected(e, $input.get(0));
            });

            // 记录对象数据
            self.$input = $input;

            // 记录
            self._hasRender = true;
        };

        // 选择
        UploadFile.fn.selectFiles = function () {
            var self = this;

            E.log('使用 html5 方式上传');

            // 先渲染
            self.render();

            // 选择
            E.log('选择文件');
            self.$input.click();
        };

        // 选中文件之后
        UploadFile.fn.selected = function (e, input) {
            var self = this;
            var files = input.files || [];
            if (files.length === 0) {
                return;
            }

            E.log('选中 ' + files.length + ' 个文件');

            // 遍历选中的文件，预览、上传
            $.each(files, function (key, value) {
                self.upload(value);
            });
        };

        // 上传单个文件
        UploadFile.fn.upload = function (file) {
            var self = this;
            var editor = self.editor;
            var filename = file.name || '';
            var fileType = file.type || '';
            var uploadImgFns = editor.config.uploadImgFns;
            var uploadFileName = editor.config.uploadImgFileName || 'wangEditorH5File';
            var onload = uploadImgFns.onload;
            var ontimeout = uploadImgFns.ontimeout;
            var onerror = uploadImgFns.onerror;
            var reader = new FileReader();

            if (!onload || !ontimeout || !onerror) {
                E.error('请为编辑器配置上传图片的 onload ontimeout onerror 回调事件');
                return;
            }

            E.log('开始执行 ' + filename + ' 文件的上传');

            // 清空 input 数据
            function clearInput() {
                self.clear();
            }

            // onload事件
            reader.onload = function (e) {
                E.log('已读取' + filename + '文件');

                var base64 = e.target.result || this.result;
                editor.xhrUploadImg({
                    event: e,
                    filename: filename,
                    base64: base64,
                    fileType: fileType,
                    name: uploadFileName,
                    loadfn: function loadfn(resultText, xhr) {
                        clearInput();
                        // 执行配置中的方法
                        var editor = this;
                        onload.call(editor, resultText, xhr);
                    },
                    errorfn: function errorfn(xhr) {
                        clearInput();
                        if (E.isOnWebsite) {
                            alert('wangEditor官网暂时没有服务端，因此报错。实际项目中不会发生');
                        }
                        // 执行配置中的方法
                        var editor = this;
                        onerror.call(editor, xhr);
                    },
                    timeoutfn: function timeoutfn(xhr) {
                        clearInput();
                        if (E.isOnWebsite) {
                            alert('wangEditor官网暂时没有服务端，因此超时。实际项目中不会发生');
                        }
                        // 执行配置中的方法
                        var editor = this;
                        ontimeout(editor, xhr);
                    }
                });
            };

            // 开始取文件
            reader.readAsDataURL(file);
        };

        // 暴露给 E
        E.UploadFile = UploadFile;
    });
    // form方式上传图片
    _e(function (E, $) {

        if (window.FileReader && window.FormData) {
            // 如果支持 html5 上传，则返回
            return;
        }

        // 构造函数
        var UploadFile = function UploadFile(opt) {
            this.editor = opt.editor;
            this.uploadUrl = opt.uploadUrl;
            this.timeout = opt.timeout;
            this.fileAccept = opt.fileAccept;
            this.multiple = false;
        };

        UploadFile.fn = UploadFile.prototype;

        // clear
        UploadFile.fn.clear = function () {
            this.$input.val('');
            E.log('input value 已清空');
        };

        // 隐藏modal
        UploadFile.fn.hideModal = function () {
            this.modal.hide();
        };

        // 渲染
        UploadFile.fn.render = function () {
            var self = this;
            var editor = self.editor;
            var uploadFileName = editor.config.uploadImgFileName || 'wangEditorFormFile';
            if (self._hasRender) {
                // 不要重复渲染
                return;
            }

            // 服务器端路径
            var uploadUrl = self.uploadUrl;

            E.log('渲染dom');

            // 创建 form 和 iframe
            var iframeId = 'iframe' + E.random();
            var $iframe = $('<iframe name="' + iframeId + '" id="' + iframeId + '" frameborder="0" width="0" height="0"></iframe>');
            var multiple = self.multiple;
            var multipleTpl = multiple ? 'multiple="multiple"' : '';
            var $p = $('<p>选择图片并上传</p>');
            var $input = $('<input type="file" ' + multipleTpl + ' name="' + uploadFileName + '"/>');
            var $btn = $('<input type="submit" value="上传"/>');
            var $form = $('<form enctype="multipart/form-data" method="post" action="' + uploadUrl + '" target="' + iframeId + '"></form>');
            var $container = $('<div style="margin:10px 20px;"></div>');

            $form.append($p).append($input).append($btn);

            // 增加用户配置的参数，如 token
            $.each(editor.config.uploadParams, function (key, value) {
                $form.append($('<input type="hidden" name="' + key + '" value="' + value + '"/>'));
            });

            $container.append($form);
            $container.append($iframe);

            self.$input = $input;
            self.$iframe = $iframe;

            // 生成 modal
            var modal = new E.Modal(editor, undefined, {
                $content: $container
            });
            self.modal = modal;

            // 记录
            self._hasRender = true;
        };

        // 绑定 iframe load 事件
        UploadFile.fn.bindLoadEvent = function () {
            var self = this;
            if (self._hasBindLoad) {
                // 不要重复绑定
                return;
            }

            var editor = self.editor;
            var $iframe = self.$iframe;
            var iframe = $iframe.get(0);
            var iframeWindow = iframe.contentWindow;
            var onload = editor.config.uploadImgFns.onload;

            // 定义load事件
            function onloadFn() {
                var resultText = $.trim(iframeWindow.document.body.innerHTML);
                if (!resultText) {
                    return;
                }

                // 获取文件名
                var fileFullName = self.$input.val(); // 结果如 C:\folder\abc.png 格式
                var fileOriginalName = fileFullName;
                if (fileFullName.lastIndexOf('\\') >= 0) {
                    // 获取 abc.png 格式
                    fileOriginalName = fileFullName.slice(fileFullName.lastIndexOf('\\') + 1);
                    if (fileOriginalName.indexOf('.') > 0) {
                        // 获取 abc （即不带扩展名的文件名）
                        fileOriginalName = fileOriginalName.split('.')[0];
                    }
                }

                // 将文件名暂存到 editor.uploadImgOriginalName ，插入图片时，可作为 alt 属性来用
                editor.uploadImgOriginalName = fileOriginalName;

                // 执行load函数，插入图片的操作，应该在load函数中执行
                onload.call(editor, resultText);

                // 清空 input 数据
                self.clear();

                // 隐藏modal
                self.hideModal();
            }

            // 绑定 load 事件
            if (iframe.attachEvent) {
                iframe.attachEvent('onload', onloadFn);
            } else {
                iframe.onload = onloadFn;
            }

            // 记录
            self._hasBindLoad = true;
        };

        UploadFile.fn.show = function () {
            var self = this;
            var modal = self.modal;

            function show() {
                modal.show();
                self.bindLoadEvent();
            }
            setTimeout(show);
        };

        // 选择
        UploadFile.fn.selectFiles = function () {
            var self = this;

            E.log('使用 form 方式上传');

            // 先渲染
            self.render();

            // 先清空
            self.clear();

            // 显示
            self.show();
        };

        // 暴露给 E
        E.UploadFile = UploadFile;
    });
    // upload img 插件 粘贴图片
    _e(function (E, $) {

        E.plugin(function () {
            var editor = this;
            var txt = editor.txt;
            var $txt = txt.$txt;
            var config = editor.config;
            var uploadImgUrl = config.uploadImgUrl;
            var uploadFileName = config.uploadImgFileName || 'wangEditorPasteFile';
            var pasteEvent;
            var $imgsBeforePaste;

            // 未配置上传图片url，则忽略
            if (!uploadImgUrl) {
                return;
            }

            // -------- 非 chrome 下，通过查找粘贴的图片的方式上传 --------
            function findPasteImgAndUpload() {
                var reg = /^data:(image\/\w+);base64/;
                var $imgs = $txt.find('img');

                E.log('粘贴后，检查到编辑器有' + $imgs.length + '个图片。开始遍历图片，试图找到刚刚粘贴过来的图片');

                $.each($imgs, function () {
                    var img = this;
                    var $img = $(img);
                    var flag;
                    var base64 = $img.attr('src');
                    var type;

                    // 判断当前图片是否是粘贴之前的
                    $imgsBeforePaste.each(function () {
                        if (img === this) {
                            // 当前图片是粘贴之前的
                            flag = true;
                            return false;
                        }
                    });

                    // 当前图片是粘贴之前的，则忽略
                    if (flag) {
                        return;
                    }

                    E.log('找到一个粘贴过来的图片');

                    if (reg.test(base64)) {
                        // 得到的粘贴的图片是 base64 格式，符合要求
                        E.log('src 是 base64 格式，可以上传');
                        type = base64.match(reg)[1];
                        editor.xhrUploadImg({
                            event: pasteEvent,
                            base64: base64,
                            fileType: type,
                            name: uploadFileName
                        });
                    } else {
                        E.log('src 为 ' + base64 + ' ，不是 base64 格式，暂时不支持上传');
                    }

                    // 最终移除原图片
                    $img.remove();
                });

                E.log('遍历结束');
            }

            // 开始监控粘贴事件
            $txt.on('paste', function (e) {
                pasteEvent = e;
                var data = pasteEvent.clipboardData || pasteEvent.originalEvent.clipboardData;
                var text;
                var items;

                // -------- 试图获取剪切板中的文字，有文字的情况下，就不处理图片粘贴 --------
                if (data == null) {
                    text = window.clipboardData && window.clipboardData.getData('text');
                } else {
                    text = data.getData('text/plain') || data.getData('text/html');
                }
                if (text) {
                    return;
                }

                items = data && data.items;
                if (items) {
                    // -------- chrome 可以用 data.items 取出图片 -----
                    E.log('通过 data.items 得到了数据');

                    $.each(items, function (key, value) {
                        var fileType = value.type || '';
                        if (fileType.indexOf('image') < 0) {
                            // 不是图片
                            return;
                        }

                        var file = value.getAsFile();
                        var reader = new FileReader();

                        E.log('得到一个粘贴图片');

                        reader.onload = function (e) {
                            E.log('读取到粘贴的图片');

                            // 执行上传
                            var base64 = e.target.result || this.result;
                            editor.xhrUploadImg({
                                event: pasteEvent,
                                base64: base64,
                                fileType: fileType,
                                name: uploadFileName
                            });
                        };

                        //读取粘贴的文件
                        reader.readAsDataURL(file);
                    });
                } else {
                    // -------- 非 chrome 不能用 data.items 取图片 -----

                    E.log('未从 data.items 得到数据，使用检测粘贴图片的方式');

                    // 获取
                    $imgsBeforePaste = $txt.find('img');
                    E.log('粘贴前，检查到编辑器有' + $imgsBeforePaste.length + '个图片');

                    // 异步上传找到的图片
                    setTimeout(findPasteImgAndUpload, 0);
                }
            });
        });
    });
    // 拖拽上传图片 插件 
    _e(function (E, $) {

        E.plugin(function () {

            var editor = this;
            var txt = editor.txt;
            var $txt = txt.$txt;
            var config = editor.config;
            var uploadImgUrl = config.uploadImgUrl;
            var uploadFileName = config.uploadImgFileName || 'wangEditorDragFile';

            // 未配置上传图片url，则忽略
            if (!uploadImgUrl) {
                return;
            }

            // 阻止浏览器默认行为
            E.$document.on('dragleave drop dragenter dragover', function (e) {
                e.preventDefault();
            });

            // 监控 $txt drop 事件
            $txt.on('drop', function (dragEvent) {
                dragEvent.preventDefault();

                var originalEvent = dragEvent.originalEvent;
                var files = originalEvent.dataTransfer && originalEvent.dataTransfer.files;

                if (!files || !files.length) {
                    return;
                }

                $.each(files, function (k, file) {
                    var type = file.type;
                    var name = file.name;

                    if (type.indexOf('image/') < 0) {
                        // 只接收图片
                        return;
                    }

                    E.log('得到图片 ' + name);

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        E.log('读取到图片 ' + name);

                        // 执行上传
                        var base64 = e.target.result || this.result;
                        editor.xhrUploadImg({
                            event: dragEvent,
                            base64: base64,
                            fileType: type,
                            name: uploadFileName
                        });
                    };

                    //读取粘贴的文件
                    reader.readAsDataURL(file);
                });
            });
        });
    });
    // 编辑器区域 table toolbar
    _e(function (E, $) {

        E.plugin(function () {
            var editor = this;
            var txt = editor.txt;
            var $txt = txt.$txt;
            var html = '';
            // 说明：设置了 max-height 之后，$txt.parent() 负责滚动处理
            var $currentTxt = editor.useMaxHeight ? $txt.parent() : $txt;
            var $currentTable;

            // 用到的dom节点
            var isRendered = false;
            var $toolbar = $('<div class="txt-toolbar"></div>');
            var $triangle = $('<div class="tip-triangle"></div>');
            var $delete = $('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>');
            var $zoomSmall = $('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>');
            var $zoomBig = $('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>');

            // 渲染到页面
            function render() {
                if (isRendered) {
                    return;
                }

                // 绑定事件
                bindEvent();

                // 拼接 渲染到页面上
                $toolbar.append($triangle).append($delete).append($zoomSmall).append($zoomBig);
                editor.$editorContainer.append($toolbar);
                isRendered = true;
            }

            // 绑定事件
            function bindEvent() {
                // 统一执行命令的方法
                var commandFn;
                function command(e, callback) {
                    // 执行命令之前，先存储html内容
                    html = $txt.html();
                    // 监控内容变化
                    var cb = function cb() {
                        if (callback) {
                            callback();
                        }
                        if (html !== $txt.html()) {
                            $txt.change();
                        }
                    };
                    // 执行命令
                    if (commandFn) {
                        editor.customCommand(e, commandFn, cb);
                    }
                }

                // 删除
                $delete.click(function (e) {
                    commandFn = function commandFn() {
                        $currentTable.remove();
                    };
                    command(e, function () {
                        setTimeout(hide, 100);
                    });
                });

                // 放大
                $zoomBig.click(function (e) {
                    commandFn = function commandFn() {
                        $currentTable.css({
                            width: '100%'
                        });
                    };
                    command(e, function () {
                        setTimeout(show);
                    });
                });

                // 缩小
                $zoomSmall.click(function (e) {
                    commandFn = function commandFn() {
                        $currentTable.css({
                            width: 'auto'
                        });
                    };
                    command(e, function () {
                        setTimeout(show);
                    });
                });
            }

            // 显示 toolbar
            function show() {
                if (editor._disabled) {
                    // 编辑器已经被禁用，则不让显示
                    return;
                }
                if ($currentTable == null) {
                    return;
                }
                $currentTable.addClass('clicked');
                var tablePosition = $currentTable.position();
                var tableTop = tablePosition.top;
                var tableLeft = tablePosition.left;
                var tableHeight = $currentTable.outerHeight();
                var tableWidth = $currentTable.outerWidth();

                // --- 定位 toolbar ---

                // 计算初步结果
                var top = tableTop + tableHeight;
                var left = tableLeft;
                var marginLeft = 0;

                var txtTop = $currentTxt.position().top;
                var txtHeight = $currentTxt.outerHeight();
                if (top > txtTop + txtHeight) {
                    // top 不得超出编辑范围
                    top = txtTop + txtHeight;
                }

                // 显示（方便计算 margin）
                $toolbar.show();

                // 计算 margin
                var width = $toolbar.outerWidth();
                marginLeft = tableWidth / 2 - width / 2;

                // 定位
                $toolbar.css({
                    top: top + 5,
                    left: left,
                    'margin-left': marginLeft
                });
                // 如果定位太靠左了
                if (marginLeft < 0) {
                    // 得到三角形的margin-left
                    $toolbar.css('margin-left', '0');
                    $triangle.hide();
                } else {
                    $triangle.show();
                }
            }

            // 隐藏 toolbar
            function hide() {
                if ($currentTable == null) {
                    return;
                }
                $currentTable.removeClass('clicked');
                $currentTable = null;
                $toolbar.hide();
            }

            // click table 事件
            $currentTxt.on('click', 'table', function (e) {
                var $table = $(e.currentTarget);

                // 渲染
                render();

                if ($currentTable && $currentTable.get(0) === $table.get(0)) {
                    setTimeout(hide, 100);
                    return;
                }

                // 显示 toolbar
                $currentTable = $table;
                show();

                // 阻止冒泡
                e.preventDefault();
                e.stopPropagation();
            }).on('click keydown scroll', function (e) {
                setTimeout(hide, 100);
            });
            E.$body.on('click keydown scroll', function (e) {
                setTimeout(hide, 100);
            });
        });
    });
    // 编辑器区域 img toolbar
    _e(function (E, $) {

        if (E.userAgent.indexOf('MSIE 8') > 0) {
            return;
        }

        E.plugin(function () {
            var editor = this;
            var lang = editor.config.lang;
            var txt = editor.txt;
            var $txt = txt.$txt;
            var html = '';
            // 说明：设置了 max-height 之后，$txt.parent() 负责滚动处理
            var $currentTxt = editor.useMaxHeight ? $txt.parent() : $txt;
            var $editorContainer = editor.$editorContainer;
            var $currentImg;
            var currentLink = '';

            // 用到的dom节点
            var isRendered = false;
            var $dragPoint = $('<div class="img-drag-point"></div>');

            var $toolbar = $('<div class="txt-toolbar"></div>');
            var $triangle = $('<div class="tip-triangle"></div>');

            var $menuContainer = $('<div></div>');
            var $delete = $('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>');
            var $zoomSmall = $('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>');
            var $zoomBig = $('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>');
            // var $floatLeft = $('<a href="#"><i class="wangeditor-menu-img-align-left"></i></a>');
            // var $noFloat = $('<a href="#"><i class="wangeditor-menu-img-align-justify"></i></a>');
            // var $floatRight = $('<a href="#"><i class="wangeditor-menu-img-align-right"></i></a>');
            var $alignLeft = $('<a href="#"><i class="wangeditor-menu-img-align-left"></i></a>');
            var $alignCenter = $('<a href="#"><i class="wangeditor-menu-img-align-center"></i></a>');
            var $alignRight = $('<a href="#"><i class="wangeditor-menu-img-align-right"></i></a>');
            var $link = $('<a href="#"><i class="wangeditor-menu-img-link"></i></a>');
            var $unLink = $('<a href="#"><i class="wangeditor-menu-img-unlink"></i></a>');

            var $linkInputContainer = $('<div style="display:none;"></div>');
            var $linkInput = $('<input type="text" style="height:26px; margin-left:10px; width:200px;"/>');
            var $linkBtnSubmit = $('<button class="right">' + lang.submit + '</button>');
            var $linkBtnCancel = $('<button class="right gray">' + lang.cancel + '</button>');

            // 记录是否正在拖拽
            var isOnDrag = false;

            // 获取 / 设置 链接
            function imgLink(e, url) {
                if (!$currentImg) {
                    return;
                }
                var commandFn;
                var callback = function callback() {
                    // 及时保存currentLink
                    if (url != null) {
                        currentLink = url;
                    }
                    if (html !== $txt.html()) {
                        $txt.change();
                    }
                };
                var $link;
                var inLink = false;
                var $parent = $currentImg.parent();
                if ($parent.get(0).nodeName.toLowerCase() === 'a') {
                    // 父元素就是图片链接
                    $link = $parent;
                    inLink = true;
                } else {
                    // 父元素不是图片链接，则重新创建一个链接
                    $link = $('<a target="_blank"></a>');
                }

                if (url == null) {
                    // url 无值，是获取链接
                    return $link.attr('href') || '';
                } else if (url === '') {
                    // url 是空字符串，是取消链接
                    if (inLink) {
                        commandFn = function commandFn() {
                            $currentImg.unwrap();
                        };
                    }
                } else {
                    // url 有值，是设置链接
                    if (url === currentLink) {
                        return;
                    }
                    commandFn = function commandFn() {
                        $link.attr('href', url);

                        if (!inLink) {
                            // 当前图片未包含在链接中，则包含进来
                            $currentImg.wrap($link);
                        }
                    };
                }

                // 执行命令
                if (commandFn) {
                    // 记录下执行命令之前的html内容
                    html = $txt.html();
                    // 执行命令
                    editor.customCommand(e, commandFn, callback);
                }
            }

            // 渲染到页面
            function render() {
                if (isRendered) {
                    return;
                }

                // 绑定事件
                bindToolbarEvent();
                bindDragEvent();

                // 菜单放入 container
                $menuContainer.append($delete).append($zoomSmall).append($zoomBig)
                // .append($floatLeft)
                // .append($noFloat)
                // .append($floatRight);
                .append($alignLeft).append($alignCenter).append($alignRight).append($link).append($unLink);

                // 链接input放入container
                $linkInputContainer.append($linkInput).append($linkBtnCancel).append($linkBtnSubmit);

                // 拼接 渲染到页面上
                $toolbar.append($triangle).append($menuContainer).append($linkInputContainer);

                editor.$editorContainer.append($toolbar).append($dragPoint);
                isRendered = true;
            }

            // 绑定toolbar事件
            function bindToolbarEvent() {
                // 统一执行命令的方法
                var commandFn;
                function customCommand(e, callback) {
                    var cb;
                    // 记录下执行命令之前的html内容
                    html = $txt.html();
                    cb = function cb() {
                        if (callback) {
                            callback();
                        }
                        if (html !== $txt.html()) {
                            $txt.change();
                        }
                    };
                    // 执行命令
                    if (commandFn) {
                        editor.customCommand(e, commandFn, cb);
                    }
                }

                // 删除
                $delete.click(function (e) {
                    // 删除之前先unlink
                    imgLink(e, '');

                    // 删除图片
                    commandFn = function commandFn() {
                        $currentImg.remove();
                    };
                    customCommand(e, function () {
                        setTimeout(hide, 100);
                    });
                });

                // 放大
                $zoomBig.click(function (e) {
                    commandFn = function commandFn() {
                        var img = $currentImg.get(0);
                        var width = img.width;
                        var height = img.height;
                        width = width * 1.1;
                        height = height * 1.1;

                        $currentImg.css({
                            width: width + 'px',
                            height: height + 'px'
                        });
                    };
                    customCommand(e, function () {
                        setTimeout(show);
                    });
                });

                // 缩小
                $zoomSmall.click(function (e) {
                    commandFn = function commandFn() {
                        var img = $currentImg.get(0);
                        var width = img.width;
                        var height = img.height;
                        width = width * 0.9;
                        height = height * 0.9;

                        $currentImg.css({
                            width: width + 'px',
                            height: height + 'px'
                        });
                    };
                    customCommand(e, function () {
                        setTimeout(show);
                    });
                });

                // // 左浮动
                // $floatLeft.click(function (e) {
                //     commandFn = function () {
                //         $currentImg.css({
                //             float: 'left'
                //         });
                //     };
                //     customCommand(e, function () {
                //         setTimeout(hide, 100);
                //     });
                // });

                // alignLeft
                $alignLeft.click(function (e) {
                    commandFn = function commandFn() {
                        // 如果 img 增加了链接，那么 img.parent() 就是 a 标签，设置 align 没用的，因此必须找到 P 父节点来设置 align
                        $currentImg.parents('p').css({
                            'text-align': 'left'
                        }).attr('align', 'left');
                    };
                    customCommand(e, function () {
                        setTimeout(hide, 100);
                    });
                });

                // // 右浮动
                // $floatRight.click(function (e) {
                //     commandFn = function () {
                //         $currentImg.css({
                //             float: 'right'
                //         });
                //     };
                //     customCommand(e, function () {
                //         setTimeout(hide, 100);
                //     });
                // });

                // alignRight
                $alignRight.click(function (e) {
                    commandFn = function commandFn() {
                        // 如果 img 增加了链接，那么 img.parent() 就是 a 标签，设置 align 没用的，因此必须找到 P 父节点来设置 align
                        $currentImg.parents('p').css({
                            'text-align': 'right'
                        }).attr('align', 'right');
                    };
                    customCommand(e, function () {
                        setTimeout(hide, 100);
                    });
                });

                // // 无浮动
                // $noFloat.click(function (e) {
                //     commandFn = function () {
                //         $currentImg.css({
                //             float: 'none'
                //         });
                //     };
                //     customCommand(e, function () {
                //         setTimeout(hide, 100);
                //     });
                // });

                // alignCenter
                $alignCenter.click(function (e) {
                    commandFn = function commandFn() {
                        // 如果 img 增加了链接，那么 img.parent() 就是 a 标签，设置 align 没用的，因此必须找到 P 父节点来设置 align
                        $currentImg.parents('p').css({
                            'text-align': 'center'
                        }).attr('align', 'center');
                    };
                    customCommand(e, function () {
                        setTimeout(hide, 100);
                    });
                });

                // link
                // 显示链接input
                $link.click(function (e) {
                    e.preventDefault();

                    // 获取当前链接，并显示
                    currentLink = imgLink(e);
                    $linkInput.val(currentLink);

                    $menuContainer.hide();
                    $linkInputContainer.show();
                });
                // 设置链接
                $linkBtnSubmit.click(function (e) {
                    e.preventDefault();

                    var url = $.trim($linkInput.val());
                    if (url) {
                        // 设置链接，同时会自动更新 currentLink 的值
                        imgLink(e, url);
                    }

                    // 隐藏 toolbar
                    setTimeout(hide);
                });
                // 取消设置链接
                $linkBtnCancel.click(function (e) {
                    e.preventDefault();

                    // 重置链接 input
                    $linkInput.val(currentLink);

                    $menuContainer.show();
                    $linkInputContainer.hide();
                });

                // unlink
                $unLink.click(function (e) {
                    e.preventDefault();

                    // 执行 unlink
                    imgLink(e, '');

                    // 隐藏 toolbar
                    setTimeout(hide);
                });
            }

            // 绑定drag事件
            function bindDragEvent() {
                var _x, _y;
                var dragMarginLeft, dragMarginTop;
                var imgWidth, imgHeight;

                function mousemove(e) {
                    var diffX, diffY;

                    // 计算差额
                    diffX = e.pageX - _x;
                    diffY = e.pageY - _y;

                    // --------- 计算拖拽点的位置 ---------
                    var currentDragMarginLeft = dragMarginLeft + diffX;
                    var currentDragMarginTop = dragMarginTop + diffY;
                    $dragPoint.css({
                        'margin-left': currentDragMarginLeft,
                        'margin-top': currentDragMarginTop
                    });

                    // --------- 计算图片的大小 ---------
                    var currentImgWidth = imgWidth + diffX;
                    var currentImggHeight = imgHeight + diffY;
                    $currentImg && $currentImg.css({
                        width: currentImgWidth,
                        height: currentImggHeight
                    });
                }

                $dragPoint.on('mousedown', function (e) {
                    if (!$currentImg) {
                        return;
                    }
                    // 当前鼠标位置
                    _x = e.pageX;
                    _y = e.pageY;

                    // 当前拖拽点的位置
                    dragMarginLeft = parseFloat($dragPoint.css('margin-left'), 10);
                    dragMarginTop = parseFloat($dragPoint.css('margin-top'), 10);

                    // 当前图片的大小
                    imgWidth = $currentImg.width();
                    imgHeight = $currentImg.height();

                    // 隐藏 $toolbar
                    $toolbar.hide();

                    // 绑定计算事件
                    E.$document.on('mousemove._dragResizeImg', mousemove);
                    E.$document.on('mouseup._dragResizeImg', function (e) {
                        // 取消绑定
                        E.$document.off('mousemove._dragResizeImg');
                        E.$document.off('mouseup._dragResizeImg');

                        // 隐藏，并还原拖拽点的位置
                        hide();
                        $dragPoint.css({
                            'margin-left': dragMarginLeft,
                            'margin-top': dragMarginTop
                        });

                        // 记录
                        isOnDrag = false;
                    });

                    // 记录
                    isOnDrag = true;
                });
            }

            // 显示 toolbar
            function show() {
                if (editor._disabled) {
                    // 编辑器已经被禁用，则不让显示
                    return;
                }
                if ($currentImg == null) {
                    return;
                }
                $currentImg.addClass('clicked');
                var imgPosition = $currentImg.position();
                var imgTop = imgPosition.top;
                var imgLeft = imgPosition.left;
                var imgHeight = $currentImg.outerHeight();
                var imgWidth = $currentImg.outerWidth();

                // --- 定位 dragpoint ---
                $dragPoint.css({
                    top: imgTop + imgHeight,
                    left: imgLeft + imgWidth
                });

                // --- 定位 toolbar ---

                // 计算初步结果
                var top = imgTop + imgHeight;
                var left = imgLeft;
                var marginLeft = 0;

                var txtTop = $currentTxt.position().top;
                var txtHeight = $currentTxt.outerHeight();
                if (top > txtTop + txtHeight) {
                    // top 不得超出编辑范围
                    top = txtTop + txtHeight;
                } else {
                    // top 超出编辑范围，dragPoint就不显示了
                    $dragPoint.show();
                }

                // 显示（方便计算 margin）
                $toolbar.show();

                // 计算 margin
                var width = $toolbar.outerWidth();
                marginLeft = imgWidth / 2 - width / 2;

                // 定位
                $toolbar.css({
                    top: top + 5,
                    left: left,
                    'margin-left': marginLeft
                });
                // 如果定位太靠左了
                if (marginLeft < 0) {
                    // 得到三角形的margin-left
                    $toolbar.css('margin-left', '0');
                    $triangle.hide();
                } else {
                    $triangle.show();
                }

                // disable 菜单
                editor.disableMenusExcept();
            }

            // 隐藏 toolbar
            function hide() {
                if ($currentImg == null) {
                    return;
                }
                $currentImg.removeClass('clicked');
                $currentImg = null;

                $toolbar.hide();
                $dragPoint.hide();

                // enable 菜单
                editor.enableMenusExcept();
            }

            // 判断img是否是一个表情
            function isEmotion(imgSrc) {
                var result = false;
                if (!editor.emotionUrls) {
                    return result;
                }
                $.each(editor.emotionUrls, function (index, url) {
                    var flag = false;
                    if (imgSrc === url) {
                        result = true;
                        flag = true;
                    }
                    if (flag) {
                        return false; // break 循环
                    }
                });
                return result;
            }

            // click img 事件
            $currentTxt.on('mousedown', 'img', function (e) {
                e.preventDefault();
            }).on('click', 'img', function (e) {
                var $img = $(e.currentTarget);
                var src = $img.attr('src');

                if (!src || isEmotion(src)) {
                    // 是一个表情图标
                    return;
                }

                // ---------- 不是表情图标 ---------- 

                // 渲染
                render();

                if ($currentImg && $currentImg.get(0) === $img.get(0)) {
                    setTimeout(hide, 100);
                    return;
                }

                // 显示 toolbar
                $currentImg = $img;
                show();

                // 默认显示menuContainer，其他默认隐藏
                $menuContainer.show();
                $linkInputContainer.hide();

                // 阻止冒泡
                e.preventDefault();
                e.stopPropagation();
            }).on('click keydown scroll', function (e) {
                if (!isOnDrag) {
                    setTimeout(hide, 100);
                }
            });
        });
    });
    // 编辑区域 link toolbar
    _e(function (E, $) {
        E.plugin(function () {
            var editor = this;
            var lang = editor.config.lang;
            var $txt = editor.txt.$txt;

            // 当前命中的链接
            var $currentLink;

            var $toolbar = $('<div class="txt-toolbar"></div>');
            var $triangle = $('<div class="tip-triangle"></div>');
            var $triggerLink = $('<a href="#" target="_blank"><i class="wangeditor-menu-img-link"></i> ' + lang.openLink + '</a>');
            var isRendered;

            // 记录当前的显示/隐藏状态
            var isShow = false;

            var showTimeoutId, hideTimeoutId;
            var showTimeoutIdByToolbar, hideTimeoutIdByToolbar;

            // 渲染 dom
            function render() {
                if (isRendered) {
                    return;
                }

                $toolbar.append($triangle).append($triggerLink);

                editor.$editorContainer.append($toolbar);

                isRendered = true;
            }

            // 定位
            function setPosition() {
                if (!$currentLink) {
                    return;
                }

                var position = $currentLink.position();
                var left = position.left;
                var top = position.top;
                var height = $currentLink.height();

                // 初步计算top值
                var topResult = top + height + 5;

                // 判断 toolbar 是否超过了编辑器区域的下边界
                var menuHeight = editor.menuContainer.height();
                var txtHeight = editor.txt.$txt.outerHeight();
                if (topResult > menuHeight + txtHeight) {
                    topResult = menuHeight + txtHeight + 5;
                }

                // 最终设置
                $toolbar.css({
                    top: topResult,
                    left: left
                });
            }

            // 显示 toolbar
            function show() {
                if (isShow) {
                    return;
                }

                if (!$currentLink) {
                    return;
                }

                render();

                $toolbar.show();

                // 设置链接
                var href = $currentLink.attr('href');
                $triggerLink.attr('href', href);

                // 定位
                setPosition();

                isShow = true;
            }

            // 隐藏 toolbar
            function hide() {
                if (!isShow) {
                    return;
                }

                if (!$currentLink) {
                    return;
                }

                $toolbar.hide();
                isShow = false;
            }

            // $txt 绑定事件
            $txt.on('mouseenter', 'a', function (e) {
                // 延时 500ms 显示toolbar
                if (showTimeoutId) {
                    clearTimeout(showTimeoutId);
                }
                showTimeoutId = setTimeout(function () {
                    var a = e.currentTarget;
                    var $a = $(a);
                    $currentLink = $a;

                    var $img = $a.children('img');
                    if ($img.length) {
                        // 该链接下包含一个图片

                        // 图片点击时，隐藏toolbar
                        $img.click(function (e) {
                            hide();
                        });

                        if ($img.hasClass('clicked')) {
                            // 图片还处于clicked状态，则不显示toolbar
                            return;
                        }
                    }

                    // 显示toolbar
                    show();
                }, 500);
            }).on('mouseleave', 'a', function (e) {
                // 延时 500ms 隐藏toolbar
                if (hideTimeoutId) {
                    clearTimeout(hideTimeoutId);
                }
                hideTimeoutId = setTimeout(hide, 500);
            }).on('click keydown scroll', function (e) {
                setTimeout(hide, 100);
            });
            // $toolbar 绑定事件
            $toolbar.on('mouseenter', function (e) {
                // 先中断掉 $txt.mouseleave 导致的隐藏
                if (hideTimeoutId) {
                    clearTimeout(hideTimeoutId);
                }
            }).on('mouseleave', function (e) {
                // 延时 500ms 显示toolbar
                if (showTimeoutIdByToolbar) {
                    clearTimeout(showTimeoutIdByToolbar);
                }
                showTimeoutIdByToolbar = setTimeout(hide, 500);
            });
        });
    });
    // menu吸顶
    _e(function (E, $) {

        E.plugin(function () {
            var editor = this;
            var menuFixed = editor.config.menuFixed;
            if (menuFixed === false || typeof menuFixed !== 'number') {
                // 没有配置菜单吸顶
                return;
            }
            var bodyMarginTop = parseFloat(E.$body.css('margin-top'), 10);
            if (isNaN(bodyMarginTop)) {
                bodyMarginTop = 0;
            }

            var $editorContainer = editor.$editorContainer;
            var editorTop = $editorContainer.offset().top;
            var editorHeight = $editorContainer.outerHeight();

            var $menuContainer = editor.menuContainer.$menuContainer;
            var menuCssPosition = $menuContainer.css('position');
            var menuCssTop = $menuContainer.css('top');
            var menuTop = $menuContainer.offset().top;
            var menuHeight = $menuContainer.outerHeight();
            var menuWidth = $menuContainer.width();

            //重新计算宽度
            E.$window.resize(function () {
                menuWidth = $menuContainer.width();
            });
            //编辑区高度变化
            editor.onchange = function () {
                editorHeight = $editorContainer.outerHeight();
                menuWidth = $menuContainer.width(); //可能出现滚动条
                menuFixedFunc();
            };

            //这个变量未使用？
            //var $txt = editor.txt.$txt;

            E.$window.scroll(menuFixedFunc);

            function menuFixedFunc() {
                //全屏模式不支持
                if (editor.isFullScreen) {
                    return;
                }

                var sTop = E.$window.scrollTop();

                // 如果 menuTop === 0 说明此前编辑器一直隐藏，后来显示出来了，要重新计算相关数据
                if (menuTop === 0) {
                    menuTop = $menuContainer.offset().top;
                    editorTop = $editorContainer.offset().top;
                    editorHeight = $editorContainer.outerHeight();
                    menuHeight = $menuContainer.outerHeight();
                }

                //菜单fixed条件由离开屏幕后（sTop >= menuTop）触发改为达到menuFixed高度时（sTop + menuFixed >= menuTop）触发
                if (sTop + menuFixed >= menuTop && sTop + menuFixed + menuHeight + 30 < editorTop + editorHeight) {
                    // 吸顶
                    $menuContainer.css({
                        position: 'fixed',
                        top: menuFixed
                    });

                    // 固定宽度
                    $menuContainer.width(menuWidth);

                    // 增加body margin-top
                    E.$body.css({
                        'margin-top': bodyMarginTop + menuHeight
                    });

                    // 记录
                    if (!editor._isMenufixed) {
                        editor._isMenufixed = true;
                    }
                } else {
                    // 取消吸顶
                    $menuContainer.css({
                        position: menuCssPosition,
                        top: menuCssTop
                    });

                    // 取消宽度固定
                    $menuContainer.css('width', '100%');

                    // 还原 body margin-top
                    E.$body.css({
                        'margin-top': bodyMarginTop
                    });

                    // 撤销记录
                    if (editor._isMenufixed) {
                        editor._isMenufixed = false;
                    }
                }
            }
        });
    });
    // 缩进 菜单插件
    _e(function (E, $) {

        // 用 createMenu 方法创建菜单
        E.createMenu(function (check) {

            // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
            var menuId = 'indent';

            // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
            if (!check(menuId)) {
                return;
            }

            // this 指向 editor 对象自身
            var editor = this;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor, // 编辑器对象
                id: menuId, // 菜单id
                title: '缩进', // 菜单标题

                // 正常状态和选中装下的dom对象，样式需要自定义
                $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-indent-left"></i></a>'),
                $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-indent-left"></i></a>')
            });

            // 菜单正常状态下，点击将触发该事件
            menu.clickEvent = function (e) {
                var elem = editor.getRangeElem();
                var p = editor.getSelfOrParentByName(elem, 'p');
                var $p;

                if (!p) {
                    // 未找到 p 元素，则忽略
                    return e.preventDefault();
                }
                $p = $(p);

                // 使用自定义命令
                function commandFn() {
                    $p.css('text-indent', '2em');
                }
                editor.customCommand(e, commandFn);
            };

            // 菜单选中状态下，点击将触发该事件
            menu.clickEventSelected = function (e) {
                var elem = editor.getRangeElem();
                var p = editor.getSelfOrParentByName(elem, 'p');
                var $p;

                if (!p) {
                    // 未找到 p 元素，则忽略
                    return e.preventDefault();
                }
                $p = $(p);

                // 使用自定义命令
                function commandFn() {
                    $p.css('text-indent', '0');
                }
                editor.customCommand(e, commandFn);
            };

            // 根据当前选区，自定义更新菜单的选中状态或者正常状态
            menu.updateSelectedEvent = function () {
                // 获取当前选区所在的父元素
                var elem = editor.getRangeElem();
                var p = editor.getSelfOrParentByName(elem, 'p');
                var $p;
                var indent;

                if (!p) {
                    // 未找到 p 元素，则标记为未处于选中状态
                    return false;
                }
                $p = $(p);
                indent = $p.css('text-indent');

                if (!indent || indent === '0px') {
                    // 得到的p，text-indent 属性是 0，则标记为未处于选中状态
                    return false;
                }

                // 找到 p 元素，并且 text-indent 不是 0，则标记为选中状态
                return true;
            };

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // 行高 菜单插件
    _e(function (E, $) {

        // 用 createMenu 方法创建菜单
        E.createMenu(function (check) {

            // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
            var menuId = 'lineheight';

            // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
            if (!check(menuId)) {
                return;
            }

            // this 指向 editor 对象自身
            var editor = this;

            // 由于浏览器自身不支持 lineHeight 命令，因此要做一个hook
            editor.commandHooks.lineHeight = function (value) {
                var rangeElem = editor.getRangeElem();
                var targetElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,pre');
                if (!targetElem) {
                    return;
                }
                $(targetElem).css('line-height', value + '');
            };

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor, // 编辑器对象
                id: menuId, // 菜单id
                title: '行高', // 菜单标题
                commandName: 'lineHeight', // 命令名称

                // 正常状态和选中装下的dom对象，样式需要自定义
                $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-arrows-v"></i></a>'),
                $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-arrows-v"></i></a>')
            });

            // 数据源
            var data = {
                // 格式： 'value' : 'title'
                '1.0': '1.0倍',
                '1.5': '1.5倍',
                '1.8': '1.8倍',
                '2.0': '2.0倍',
                '2.5': '2.5倍',
                '3.0': '3.0倍'
            };

            // 为menu创建droplist对象
            var tpl = '<span style="line-height:{#commandValue}">{#title}</span>';
            menu.dropList = new E.DropList(editor, menu, {
                data: data, // 传入数据源
                tpl: tpl // 传入模板
            });

            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    });
    // 自定义上传
    _e(function (E, $) {

        E.plugin(function () {

            var editor = this;
            var customUpload = editor.config.customUpload;
            if (!customUpload) {
                return;
            } else if (editor.config.uploadImgUrl) {
                alert('自定义上传无效，详看浏览器日志console.log');
                E.error('已经配置了 uploadImgUrl ，就不能再配置 customUpload ，两者冲突。将导致自定义上传无效。');
                return;
            }

            var $uploadContent = editor.$uploadContent;
            if (!$uploadContent) {
                E.error('自定义上传，无法获取 editor.$uploadContent');
            }

            // UI
            var $uploadIcon = $('<div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div>');
            $uploadContent.append($uploadIcon);

            // 设置id，并暴露
            var btnId = 'upload' + E.random();
            var containerId = 'upload' + E.random();
            $uploadIcon.attr('id', btnId);
            $uploadContent.attr('id', containerId);

            editor.customUploadBtnId = btnId;
            editor.customUploadContainerId = containerId;
        });
    });
    // 版权提示
    _e(function (E, $) {
        E.info('本页面富文本编辑器由 wangEditor 提供 http://wangeditor.github.io/ ');
    });

    // 最终返回wangEditor构造函数
    return window.wangEditor;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("3IRH")(module)))

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("eZkf");


/***/ }),

/***/ "3IRH":
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "Cgxu":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(undefined);
// imports


// module
exports.push([module.i, "/* 编辑器边框颜色 */\n/* 菜单颜色、上边框颜色 */\n/* 菜单选中状态的颜色 */\n/* input focus 时的颜色 */\n/* 按钮颜色 */\n/* tab selected 状态下的颜色 */\n.wangEditor-container {\n  position: relative;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  z-index: 1;\n  width: 100%;\n}\n.wangEditor-container a:focus,\n.wangEditor-container button:focus {\n  outline: none;\n}\n.wangEditor-container,\n.wangEditor-container * {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  line-height: 1;\n}\n.wangEditor-container img {\n  border: none;\n}\n.wangEditor-container .clearfix:after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.wangEditor-container .clearfix {\n  *zoom: 1;\n}\n.wangEditor-container textarea {\n  border: none;\n}\n.wangEditor-container textarea:focus {\n  outline: none;\n}\n.wangEditor-container .height-tip {\n  position: absolute;\n  width: 3px;\n  background-color: #ccc;\n  left: 0;\n  transition: top .2s;\n}\n.wangEditor-container .txt-toolbar {\n  position: absolute;\n  background-color: #fff;\n  padding: 3px 5px;\n  border-top: 2px solid #666;\n  box-shadow: 1px 3px 3px #999;\n  border-left: 1px\\9 solid\\9 #ccc\\9;\n  border-bottom: 1px\\9 solid\\9 #999\\9;\n  border-right: 1px\\9 solid\\9 #999\\9;\n}\n.wangEditor-container .txt-toolbar .tip-triangle {\n  display: block;\n  position: absolute;\n  width: 0;\n  height: 0;\n  border: 5px solid;\n  border-color: transparent transparent #666 transparent;\n  top: -12px;\n  left: 50%;\n  margin-left: -5px;\n}\n.wangEditor-container .txt-toolbar a {\n  color: #666;\n  display: inline-block;\n  margin: 0 3px;\n  padding: 5px;\n  text-decoration: none;\n  border-radius: 3px;\n}\n.wangEditor-container .txt-toolbar a:hover {\n  background-color: #f1f1f1;\n}\n.wangEditor-container .img-drag-point {\n  display: block;\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  cursor: se-resize;\n  background-color: #666;\n  margin-left: -6px;\n  margin-top: -6px;\n  box-shadow: 1px 1px 5px #999;\n}\n.wangEditor-container .wangEditor-upload-progress {\n  position: absolute;\n  height: 1px;\n  background: #1e88e5;\n  width: 0;\n  display: none;\n  -webkit-transition: width .5s;\n  -o-transition: width .5s;\n  transition: width .5s;\n}\n.wangEditor-fullscreen {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.wangEditor-container .code-textarea {\n  resize: none;\n  width: 100%;\n  font-size: 14px;\n  line-height: 1.5;\n  font-family: 'Verdana';\n  color: #333;\n  padding: 0 15px 0 15px;\n}\n.wangEditor-menu-container {\n  width: 100%;\n  border-bottom: 1px solid #f1f1f1;\n  background-color: #fff;\n}\n.wangEditor-menu-container a {\n  text-decoration: none;\n}\n.wangEditor-menu-container .menu-group {\n  float: left;\n  padding: 0 8px;\n  border-right: 1px solid #f1f1f1;\n}\n.wangEditor-menu-container .menu-item {\n  float: left;\n  position: relative;\n  text-align: center;\n  height: 31px;\n  width: 35px;\n}\n.wangEditor-menu-container .menu-item:hover {\n  background-color: #f1f1f1;\n}\n.wangEditor-menu-container .menu-item a {\n  display: block;\n  text-align: center;\n  color: #666;\n  width: 100%;\n  padding: 8px 0;\n  font-size: 0.9em;\n}\n.wangEditor-menu-container .menu-item .selected {\n  color: #1e88e5;\n}\n.wangEditor-menu-container .menu-item .active {\n  background-color: #f1f1f1;\n}\n.wangEditor-menu-container .menu-item .disable {\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n.wangEditor-menu-container .menu-tip {\n  display: block;\n  position: absolute;\n  z-index: 20;\n  width: 60px;\n  text-align: center;\n  background-color: #666;\n  color: #fff;\n  padding: 7px 0;\n  font-size: 12px;\n  top: 100%;\n  left: 50%;\n  margin-left: -30px;\n  border-radius: 2px;\n  box-shadow: 1px 1px 5px #999;\n  display: none;\n  /*// 小三角\n        .tip-triangle {\n            display: block;\n            position: absolute;\n            width: 0;\n            height: 0;\n            border:5px solid;\n            border-color: transparent transparent @fore-color transparent;\n            top: -10px;\n            left: 50%;\n            margin-left: -5px;\n        }*/\n}\n.wangEditor-menu-container .menu-tip-40 {\n  width: 40px;\n  margin-left: -20px;\n}\n.wangEditor-menu-container .menu-tip-50 {\n  width: 50px;\n  margin-left: -25px;\n}\n.wangEditor-menu-shadow {\n  /*border-bottom-width: 0;*/\n  border-bottom: 1px\\9 solid\\9 #f1f1f1\\9;\n  box-shadow: 0 1px 3px #999;\n}\n.wangEditor-container .wangEditor-txt {\n  width: 100%;\n  text-align: left;\n  padding: 15px;\n  padding-top: 0;\n  margin-top: 5px;\n  overflow-y: auto;\n}\n.wangEditor-container .wangEditor-txt p,\n.wangEditor-container .wangEditor-txt h1,\n.wangEditor-container .wangEditor-txt h2,\n.wangEditor-container .wangEditor-txt h3,\n.wangEditor-container .wangEditor-txt h4,\n.wangEditor-container .wangEditor-txt h5 {\n  margin: 10px 0;\n  line-height: 1.8;\n}\n.wangEditor-container .wangEditor-txt p *,\n.wangEditor-container .wangEditor-txt h1 *,\n.wangEditor-container .wangEditor-txt h2 *,\n.wangEditor-container .wangEditor-txt h3 *,\n.wangEditor-container .wangEditor-txt h4 *,\n.wangEditor-container .wangEditor-txt h5 * {\n  line-height: 1.8;\n}\n.wangEditor-container .wangEditor-txt ul,\n.wangEditor-container .wangEditor-txt ol {\n  padding-left: 20px;\n}\n.wangEditor-container .wangEditor-txt img {\n  cursor: pointer;\n}\n.wangEditor-container .wangEditor-txt img.clicked {\n  box-shadow: 1px 1px 10px #999;\n}\n.wangEditor-container .wangEditor-txt table.clicked {\n  box-shadow: 1px 1px 10px #999;\n}\n.wangEditor-container .wangEditor-txt pre code {\n  line-height: 1.5;\n}\n.wangEditor-container .wangEditor-txt:focus {\n  outline: none;\n}\n.wangEditor-container .wangEditor-txt blockquote {\n  display: block;\n  border-left: 8px solid #d0e5f2;\n  padding: 5px 10px;\n  margin: 10px 0;\n  line-height: 1.4;\n  font-size: 100%;\n  background-color: #f1f1f1;\n}\n.wangEditor-container .wangEditor-txt table {\n  border: none;\n  border-collapse: collapse;\n}\n.wangEditor-container .wangEditor-txt table td,\n.wangEditor-container .wangEditor-txt table th {\n  border: 1px solid #999;\n  padding: 3px 5px;\n  min-width: 50px;\n  height: 20px;\n}\n.wangEditor-container .wangEditor-txt pre {\n  border: 1px solid #ccc;\n  background-color: #f8f8f8;\n  padding: 10px;\n  margin: 5px 0px;\n  font-size: 0.8em;\n  border-radius: 3px;\n}\n.wangEditor-drop-list {\n  display: none;\n  position: absolute;\n  background-color: #fff;\n  overflow: hidden;\n  z-index: 10;\n  transition: height .7s;\n  border-top: 1px solid #f1f1f1;\n  box-shadow: 1px 3px 3px #999;\n  border-left: 1px\\9 solid\\9 #ccc\\9;\n  border-bottom: 1px\\9 solid\\9 #999\\9;\n  border-right: 1px\\9 solid\\9 #999\\9;\n}\n.wangEditor-drop-list a {\n  text-decoration: none;\n  display: block;\n  color: #666;\n  padding: 3px 5px;\n}\n.wangEditor-drop-list a:hover {\n  background-color: #f1f1f1;\n}\n.wangEditor-drop-panel,\n.txt-toolbar {\n  display: none;\n  position: absolute;\n  padding: 10px;\n  font-size: 14px;\n  /*border: 1px\\9 solid\\9 #cccccc\\9;*/\n  background-color: #fff;\n  z-index: 10;\n  border-top: 2px solid #666;\n  box-shadow: 1px 3px 3px #999;\n  border-left: 1px\\9 solid\\9 #ccc\\9;\n  border-bottom: 1px\\9 solid\\9 #999\\9;\n  border-right: 1px\\9 solid\\9 #999\\9;\n}\n.wangEditor-drop-panel .tip-triangle,\n.txt-toolbar .tip-triangle {\n  display: block;\n  position: absolute;\n  width: 0;\n  height: 0;\n  border: 5px solid;\n  border-color: transparent transparent #666 transparent;\n  top: -12px;\n  left: 50%;\n  margin-left: -5px;\n}\n.wangEditor-drop-panel a,\n.txt-toolbar a {\n  text-decoration: none;\n}\n.wangEditor-drop-panel input[type=text],\n.txt-toolbar input[type=text] {\n  border: none;\n  border-bottom: 1px solid #ccc;\n  font-size: 14px;\n  height: 20px;\n  color: #333;\n  padding: 3px 0;\n}\n.wangEditor-drop-panel input[type=text]:focus,\n.txt-toolbar input[type=text]:focus {\n  outline: none;\n  border-bottom: 2px solid #1e88e5;\n}\n.wangEditor-drop-panel input[type=text].block,\n.txt-toolbar input[type=text].block {\n  display: block;\n  width: 100%;\n}\n.wangEditor-drop-panel textarea,\n.txt-toolbar textarea {\n  border: 1px solid #ccc;\n}\n.wangEditor-drop-panel textarea:focus,\n.txt-toolbar textarea:focus {\n  outline: none;\n  border-color: #1e88e5;\n}\n.wangEditor-drop-panel button,\n.txt-toolbar button {\n  font-size: 14px;\n  color: #1e88e5;\n  border: none;\n  padding: 10px;\n  background-color: #fff;\n  cursor: pointer;\n  border-radius: 3px;\n}\n.wangEditor-drop-panel button:hover,\n.txt-toolbar button:hover {\n  background-color: #f1f1f1;\n}\n.wangEditor-drop-panel button:focus,\n.txt-toolbar button:focus {\n  outline: none;\n}\n.wangEditor-drop-panel button.right,\n.txt-toolbar button.right {\n  float: right;\n  margin-left: 10px;\n}\n.wangEditor-drop-panel button.gray,\n.txt-toolbar button.gray {\n  color: #999;\n}\n.wangEditor-drop-panel button.link,\n.txt-toolbar button.link {\n  padding: 5px 10px;\n}\n.wangEditor-drop-panel button.link:hover,\n.txt-toolbar button.link:hover {\n  background-color: #fff;\n  text-decoration: underline;\n}\n.wangEditor-drop-panel .color-item,\n.txt-toolbar .color-item {\n  display: block;\n  float: left;\n  width: 25px;\n  height: 25px;\n  text-align: center;\n  padding: 2px;\n  border-radius: 2px;\n  text-decoration: underline;\n}\n.wangEditor-drop-panel .color-item:hover,\n.txt-toolbar .color-item:hover {\n  background-color: #f1f1f1;\n}\n.wangEditor-drop-panel .list-menu-item,\n.txt-toolbar .list-menu-item {\n  display: block;\n  float: left;\n  color: #333;\n  padding: 5px 5px;\n  border-radius: 2px;\n}\n.wangEditor-drop-panel .list-menu-item:hover,\n.txt-toolbar .list-menu-item:hover {\n  background-color: #f1f1f1;\n}\n.wangEditor-drop-panel table.choose-table,\n.txt-toolbar table.choose-table {\n  border: none;\n  border-collapse: collapse;\n}\n.wangEditor-drop-panel table.choose-table td,\n.txt-toolbar table.choose-table td {\n  border: 1px solid #ccc;\n  width: 16px;\n  height: 12px;\n}\n.wangEditor-drop-panel table.choose-table td.active,\n.txt-toolbar table.choose-table td.active {\n  background-color: #ccc;\n  opacity: .5;\n  filter: alpha(opacity=50);\n}\n.wangEditor-drop-panel .panel-tab .tab-container,\n.txt-toolbar .panel-tab .tab-container {\n  margin-bottom: 5px;\n}\n.wangEditor-drop-panel .panel-tab .tab-container a,\n.txt-toolbar .panel-tab .tab-container a {\n  display: inline-block;\n  color: #999;\n  text-align: center;\n  margin: 0 5px;\n  padding: 5px 5px;\n}\n.wangEditor-drop-panel .panel-tab .tab-container a.selected,\n.txt-toolbar .panel-tab .tab-container a.selected {\n  color: #1e88e5;\n  border-bottom: 2px solid #1e88e5;\n}\n.wangEditor-drop-panel .panel-tab .content-container .content,\n.txt-toolbar .panel-tab .content-container .content {\n  display: none;\n}\n.wangEditor-drop-panel .panel-tab .content-container .content a,\n.txt-toolbar .panel-tab .content-container .content a {\n  display: inline-block;\n  margin: 2px;\n  padding: 2px;\n  border-radius: 2px;\n}\n.wangEditor-drop-panel .panel-tab .content-container .content a:hover,\n.txt-toolbar .panel-tab .content-container .content a:hover {\n  background-color: #f1f1f1;\n}\n.wangEditor-drop-panel .panel-tab .content-container .selected,\n.txt-toolbar .panel-tab .content-container .selected {\n  display: block;\n}\n.wangEditor-drop-panel .panel-tab .emotion-content-container,\n.txt-toolbar .panel-tab .emotion-content-container {\n  height: 200px;\n  overflow-y: auto;\n}\n.wangEditor-drop-panel .upload-icon-container,\n.txt-toolbar .upload-icon-container {\n  color: #ccc;\n  text-align: center;\n  margin: 20px 20px 15px 20px !important;\n  padding: 5px !important;\n  font-size: 65px;\n  cursor: pointer;\n  border: 2px dotted #f1f1f1;\n  display: block !important;\n}\n.wangEditor-drop-panel .upload-icon-container:hover,\n.txt-toolbar .upload-icon-container:hover {\n  color: #666;\n  border-color: #ccc;\n}\n.wangEditor-modal {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  background-color: #fff;\n  border-top: 1px solid #f1f1f1;\n  box-shadow: 1px 3px 3px #999;\n  border-top: 1px\\9 solid\\9 #ccc\\9;\n  border-left: 1px\\9 solid\\9 #ccc\\9;\n  border-bottom: 1px\\9 solid\\9 #999\\9;\n  border-right: 1px\\9 solid\\9 #999\\9;\n}\n.wangEditor-modal .wangEditor-modal-close {\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin-top: -25px;\n  margin-right: -25px;\n  font-size: 1.5em;\n  color: #666;\n  cursor: pointer;\n}\n@font-face {\n  font-family: 'icomoon';\n  src: url(" + __webpack_require__("sP74") + ");\n  src: url(" + __webpack_require__("ZB9v") + "?#iefix-qdfu1s) format('embedded-opentype'), url(" + __webpack_require__("bjMF") + ") format('truetype'), url(" + __webpack_require__("Vdmf") + ") format('woff'), url(" + __webpack_require__("SY6W") + "#icomoon) format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n[class^=\"wangeditor-menu-img-\"],\n[class*=\" wangeditor-menu-img-\"] {\n  font-family: 'icomoon';\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.wangeditor-menu-img-link:before {\n  content: \"\\E800\";\n}\n.wangeditor-menu-img-unlink:before {\n  content: \"\\E801\";\n}\n.wangeditor-menu-img-code:before {\n  content: \"\\E802\";\n}\n.wangeditor-menu-img-cancel:before {\n  content: \"\\E803\";\n}\n.wangeditor-menu-img-terminal:before {\n  content: \"\\E804\";\n}\n.wangeditor-menu-img-angle-down:before {\n  content: \"\\E805\";\n}\n.wangeditor-menu-img-font:before {\n  content: \"\\E806\";\n}\n.wangeditor-menu-img-bold:before {\n  content: \"\\E807\";\n}\n.wangeditor-menu-img-italic:before {\n  content: \"\\E808\";\n}\n.wangeditor-menu-img-header:before {\n  content: \"\\E809\";\n}\n.wangeditor-menu-img-align-left:before {\n  content: \"\\E80A\";\n}\n.wangeditor-menu-img-align-center:before {\n  content: \"\\E80B\";\n}\n.wangeditor-menu-img-align-right:before {\n  content: \"\\E80C\";\n}\n.wangeditor-menu-img-list-bullet:before {\n  content: \"\\E80D\";\n}\n.wangeditor-menu-img-indent-left:before {\n  content: \"\\E80E\";\n}\n.wangeditor-menu-img-indent-right:before {\n  content: \"\\E80F\";\n}\n.wangeditor-menu-img-list-numbered:before {\n  content: \"\\E810\";\n}\n.wangeditor-menu-img-underline:before {\n  content: \"\\E811\";\n}\n.wangeditor-menu-img-table:before {\n  content: \"\\E812\";\n}\n.wangeditor-menu-img-eraser:before {\n  content: \"\\E813\";\n}\n.wangeditor-menu-img-text-height:before {\n  content: \"\\E814\";\n}\n.wangeditor-menu-img-brush:before {\n  content: \"\\E815\";\n}\n.wangeditor-menu-img-pencil:before {\n  content: \"\\E816\";\n}\n.wangeditor-menu-img-minus:before {\n  content: \"\\E817\";\n}\n.wangeditor-menu-img-picture:before {\n  content: \"\\E818\";\n}\n.wangeditor-menu-img-file-image:before {\n  content: \"\\E819\";\n}\n.wangeditor-menu-img-cw:before {\n  content: \"\\E81A\";\n}\n.wangeditor-menu-img-ccw:before {\n  content: \"\\E81B\";\n}\n.wangeditor-menu-img-music:before {\n  content: \"\\E911\";\n}\n.wangeditor-menu-img-play:before {\n  content: \"\\E912\";\n}\n.wangeditor-menu-img-location:before {\n  content: \"\\E947\";\n}\n.wangeditor-menu-img-happy:before {\n  content: \"\\E9DF\";\n}\n.wangeditor-menu-img-sigma:before {\n  content: \"\\EA67\";\n}\n.wangeditor-menu-img-enlarge2:before {\n  content: \"\\E98B\";\n}\n.wangeditor-menu-img-shrink2:before {\n  content: \"\\E98C\";\n}\n.wangeditor-menu-img-newspaper:before {\n  content: \"\\E904\";\n}\n.wangeditor-menu-img-camera:before {\n  content: \"\\E90F\";\n}\n.wangeditor-menu-img-video-camera:before {\n  content: \"\\E914\";\n}\n.wangeditor-menu-img-file-zip:before {\n  content: \"\\E92B\";\n}\n.wangeditor-menu-img-stack:before {\n  content: \"\\E92E\";\n}\n.wangeditor-menu-img-credit-card:before {\n  content: \"\\E93F\";\n}\n.wangeditor-menu-img-address-book:before {\n  content: \"\\E944\";\n}\n.wangeditor-menu-img-envelop:before {\n  content: \"\\E945\";\n}\n.wangeditor-menu-img-drawer:before {\n  content: \"\\E95C\";\n}\n.wangeditor-menu-img-download:before {\n  content: \"\\E960\";\n}\n.wangeditor-menu-img-upload:before {\n  content: \"\\E961\";\n}\n.wangeditor-menu-img-lock:before {\n  content: \"\\E98F\";\n}\n.wangeditor-menu-img-unlocked:before {\n  content: \"\\E990\";\n}\n.wangeditor-menu-img-wrench:before {\n  content: \"\\E991\";\n}\n.wangeditor-menu-img-eye:before {\n  content: \"\\E9CE\";\n}\n.wangeditor-menu-img-eye-blocked:before {\n  content: \"\\E9D1\";\n}\n.wangeditor-menu-img-command:before {\n  content: \"\\EA4E\";\n}\n.wangeditor-menu-img-font2:before {\n  content: \"\\EA5C\";\n}\n.wangeditor-menu-img-libreoffice:before {\n  content: \"\\EADE\";\n}\n.wangeditor-menu-img-quotes-left:before {\n  content: \"\\E977\";\n}\n.wangeditor-menu-img-strikethrough:before {\n  content: \"\\EA65\";\n}\n.wangeditor-menu-img-desktop:before {\n  content: \"\\F108\";\n}\n.wangeditor-menu-img-tablet:before {\n  content: \"\\F10A\";\n}\n.wangeditor-menu-img-search-plus:before {\n  content: \"\\F00E\";\n}\n.wangeditor-menu-img-search-minus:before {\n  content: \"\\F010\";\n}\n.wangeditor-menu-img-trash-o:before {\n  content: \"\\F014\";\n}\n.wangeditor-menu-img-align-justify:before {\n  content: \"\\F039\";\n}\n.wangeditor-menu-img-arrows-v:before {\n  content: \"\\F07D\";\n}\n.wangeditor-menu-img-sigma2:before {\n  content: \"\\EA68\";\n}\n.wangeditor-menu-img-omega:before {\n  content: \"\\E900\";\n}\n.wangeditor-menu-img-cancel-circle:before {\n  content: \"\\E901\";\n}\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  color: #333;\n  background: #f8f8f8;\n  -webkit-text-size-adjust: none;\n}\n.hljs-comment,\n.diff .hljs-header {\n  color: #998;\n  font-style: italic;\n}\n.hljs-keyword,\n.css .rule .hljs-keyword,\n.hljs-winutils,\n.nginx .hljs-title,\n.hljs-subst,\n.hljs-request,\n.hljs-status {\n  color: #333;\n  font-weight: bold;\n}\n.hljs-number,\n.hljs-hexcolor,\n.ruby .hljs-constant {\n  color: #008080;\n}\n.hljs-string,\n.hljs-tag .hljs-value,\n.hljs-doctag,\n.tex .hljs-formula {\n  color: #d14;\n}\n.hljs-title,\n.hljs-id,\n.scss .hljs-preprocessor {\n  color: #900;\n  font-weight: bold;\n}\n.hljs-list .hljs-keyword,\n.hljs-subst {\n  font-weight: normal;\n}\n.hljs-class .hljs-title,\n.hljs-type,\n.vhdl .hljs-literal,\n.tex .hljs-command {\n  color: #458;\n  font-weight: bold;\n}\n.hljs-tag,\n.hljs-tag .hljs-title,\n.hljs-rule .hljs-property,\n.django .hljs-tag .hljs-keyword {\n  color: #000080;\n  font-weight: normal;\n}\n.hljs-attribute,\n.hljs-variable,\n.lisp .hljs-body,\n.hljs-name {\n  color: #008080;\n}\n.hljs-regexp {\n  color: #009926;\n}\n.hljs-symbol,\n.ruby .hljs-symbol .hljs-string,\n.lisp .hljs-keyword,\n.clojure .hljs-keyword,\n.scheme .hljs-keyword,\n.tex .hljs-special,\n.hljs-prompt {\n  color: #990073;\n}\n.hljs-built_in {\n  color: #0086b3;\n}\n.hljs-preprocessor,\n.hljs-pragma,\n.hljs-pi,\n.hljs-doctype,\n.hljs-shebang,\n.hljs-cdata {\n  color: #999;\n  font-weight: bold;\n}\n.hljs-deletion {\n  background: #fdd;\n}\n.hljs-addition {\n  background: #dfd;\n}\n.diff .hljs-change {\n  background: #0086b3;\n}\n.hljs-chunk {\n  color: #aaa;\n}\n", ""]);

// exports


/***/ }),

/***/ "DuR2":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "EKta":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ "EuP9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__("EKta")
var ieee754 = __webpack_require__("ujcs")
var isArray = __webpack_require__("sOR5")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "FZ+f":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("EuP9").Buffer))

/***/ }),

/***/ "SY6W":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/fonts/icomoon.svg";

/***/ }),

/***/ "Vdmf":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/fonts/icomoon.woff";

/***/ }),

/***/ "ZB9v":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/fonts/icomoon.eot";

/***/ }),

/***/ "bjMF":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/fonts/icomoon.ttf";

/***/ }),

/***/ "eZkf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by 米饭 on 2017-03-15.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var wangEditor = __webpack_require__("1Ufw");
exports.default = angular.module('wangEditorDirective', [])
    .directive('contentEditable', contentEditable)
    .name;
function contentEditable() {
    return {
        restrict: 'A',
        require: '?ngModel',
        replace: false,
        link: function (scope, element, attrs, ngModel) {
            // 初始化 编辑器内容
            if (!ngModel) {
                return;
            }
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || '');
            };
            element.on('blur keyup change', function () {
                scope.$apply(readViewText);
            });
            function readViewText() {
                var html = element.html();
                if (attrs.stripBr && html === '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
            // 创建编辑器
            var editor = new wangEditor(element);
            editor.config.menus = [
                'bold', 'italic', 'strikethrough', 'head', '|',
                'quote', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|',
                'link', 'table', 'img', 'insertcode', '|',
                'undo', 'redo', 'eraser', '|',
                'source'
            ];
            editor.config.menuFixed = 50;
            editor.create();
        }
    };
}


/***/ }),

/***/ "fjbf":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__("quY5");

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "quY5":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "sOR5":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "sP74":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/fonts/icomoon.eot";

/***/ }),

/***/ "ujcs":
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "x7Ro":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Cgxu");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("fjbf")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./wangEditor.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./wangEditor.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

},[2]);