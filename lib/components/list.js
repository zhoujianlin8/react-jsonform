'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zhou on 17/10/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var List = function (_Component) {
    _inherits(List, _Component);

    function List(props) {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));
    }

    _createClass(List, [{
        key: 'renderItem',
        value: function renderItem(state) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var index = arguments[2];
            var _props = this.props,
                formData = _props.formData,
                _props$$components = _props.$components,
                $components = _props$$components === undefined ? {} : _props$$components,
                fire = _props.fire,
                on = _props.on,
                setValue = _props.setValue,
                value = _props.value;

            value = value || [];
            function getItemProps(obj, isCom) {
                var props = {};
                for (var key in obj) {
                    if (key && key !== 'type' && key !== 'children') {
                        (function () {
                            var type = obj[key];
                            if (type && /^on[A-Z]/g.test(key)) {
                                //使用fire模式
                                if (typeof type === 'string') {
                                    props[key] = function () {
                                        for (var _len = arguments.length, env = Array(_len), _key = 0; _key < _len; _key++) {
                                            env[_key] = arguments[_key];
                                        }

                                        fire.apply(undefined, [type, obj].concat(env));
                                    };
                                } else {
                                    props[key] = type;
                                }
                            } else {
                                props[key] = obj[key];
                            }
                        })();
                    }
                }

                props.label = null;
                if (isCom) {
                    props.value = obj.name ? data[obj.name] : data;
                    props.setValue = function (val, cb) {
                        if (obj.name) {
                            value[index] = value[index] || {};
                            value[index][obj.name] = val;
                        } else {
                            value[index] = val;
                        }
                        setValue(value, cb);
                    };
                    props.fire = fire;
                    props.$components = $components;
                    //监听是
                    props.on = on;
                    props.formData = formData;
                }
                return props;
            }
            return _react2.default.createElement(_engine2.default, { components: $components, state: state, getItemProps: getItemProps });
        }
    }, {
        key: 'renderOperation',
        value: function renderOperation(i, isAdd, isDel, isMove, minRow, maxRow, n) {
            var disableAdd = maxRow && n >= maxRow;
            var disabledDel = n === 1 || minRow && n <= minRow;
            var disabledUp = i === 0;
            var disabledDown = i === n;
            return _react2.default.createElement(
                'div',
                { className: 'form-list-item-operation' },
                isAdd ? _react2.default.createElement('span', { className: 'btn-add' + (disableAdd ? ' disabled' : ''), onClick: this.operationClick.bind(this, 'add', i, disableAdd) }) : null,
                isDel ? _react2.default.createElement(
                    'span',
                    { className: 'btn-del' + (disabledDel ? ' disabled' : '') },
                    ' onClick=',
                    this.operationClick.bind(this, 'del', i, disabledDel)
                ) : null,
                isMove ? _react2.default.createElement('span', { className: 'btn-up' + (disabledUp ? ' disabled' : ''), onClick: this.operationClick.bind(this, 'up', i, disabledUp) }) : null,
                isMove ? _react2.default.createElement('span', { className: 'btn-down' + (disabledDown ? ' disabled' : ''), onClick: this.operationClick.bind(this, 'down', i, disabledDown) }) : null
            );
        }
    }, {
        key: 'operationClick',
        value: function operationClick(type, i, b) {
            if (b) {
                return;
            }
            var cur = void 0;
            var value = this.props.value || [];
            if (type === 'add') {
                value.splice(i + 1, 0, null);
            } else if (type === 'del') {
                value.splice(i, 1);
            } else if (type === 'up') {
                cur = value[i];
                value[i] = value[i - 1];
                value[i - 1] = cur;
            } else if (type === 'down') {
                cur = value[i];
                value[i] = value[i + 1];
                value[i + 1] = cur;
            }
            this.props.setValue(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                _props2$item = _props2.item,
                item = _props2$item === undefined ? [] : _props2$item,
                value = _props2.value,
                row = _props2.row,
                minRow = _props2.minRow,
                maxRow = _props2.maxRow,
                className = _props2.className,
                operationName = _props2.operationName,
                isAdd = _props2.isAdd,
                isDel = _props2.isDel,
                isMove = _props2.isMove,
                title = _props2.title;

            value = value || [];
            var n = Math.max(row, minRow, 1, item.length);
            var isOperation = isAdd || isDel || isMove;
            var that = this;
            var childrens = [];
            for (var i = 0; i < n; i++) {
                var newItem = item;
                if (isOperation) {
                    newItem = item.concat([that.renderOperation(i, isAdd, isDel, isMove, minRow, maxRow, n)]);
                }
                childrens.push(this.renderItem({ type: 'div', className: 'form-list-item', children: newItem }, value[i] || {}, i));
            }
            var headers = [];
            item.forEach(function (it) {
                headers.push(_react2.default.createElement(
                    'span',
                    { className: 'form-list-th' },
                    it.label || ''
                ));
            });
            if (item.length && isOperation) {
                headers.push(_react2.default.createElement(
                    'span',
                    { className: 'form-list-th form-list-operation' },
                    operationName || '操作'
                ));
            }

            return _react2.default.createElement(
                'div',
                { className: "form-list" + (className ? ' ' + className : '') },
                title ? _react2.default.createElement(
                    'h3',
                    { className: 'form-list-title' },
                    title
                ) : null,
                _react2.default.createElement(
                    'div',
                    { className: 'form-list-header' },
                    headers
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-list-body' },
                    childrens
                )
            );
        }
    }]);

    return List;
}(_react.Component);

List.defaultProps = {
    row: null,
    minRow: 1,
    maxRow: null,
    isAdd: false, //是否增加
    isDel: false, //是否支持删除
    isMove: false, //是否移动
    //value: [],
    item: [],
    on: function on() {},
    fire: function fire() {},
    setValue: function setValue() {},
    formData: {}
};
exports.default = List;