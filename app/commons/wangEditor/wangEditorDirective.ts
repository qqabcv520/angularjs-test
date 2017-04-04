/**
 * Created by 米饭 on 2017-03-15.
 */



import * as angular from 'angular';

import wangEditor = require('./js/wangEditor');


export default angular.module('wangEditorDirective', [])
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
                let html = element.html();
                if (attrs.stripBr && html === '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }

            // 创建编辑器
            let editor = new wangEditor(element);
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
    }
}

