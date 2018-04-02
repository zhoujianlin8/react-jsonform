'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zhou on 17/10/23.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
// 解析json dom 单纯的渲染模式


var Engine = function (_Component) {
    _inherits(Engine, _Component);

    function Engine() {
        var _ref;

        _classCallCheck(this, Engine);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(this, (_ref = Engine.__proto__ || Object.getPrototypeOf(Engine)).call.apply(_ref, [this].concat(props)));
    }

    _createClass(Engine, [{
        key: 'extend',
        value: function extend() {
            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var target2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            for (var i in target2) {
                target[i] = target2[i];
            }
            return target;
        }
    }, {
        key: 'isArray',
        value: function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
    }, {
        key: 'render',
        value: function render() {
            return this.renderItem(this.props.state);
        }
    }, {
        key: 'getItemProps',
        value: function getItemProps() {
            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var isCom = arguments[1];

            if (this.props.getItemProps) return this.props.getItemProps(obj, isCom);
            var props = {};
            var prop = this.props.props;
            for (var key in obj) {
                if (key && key !== 'type' && key !== 'children') {
                    (function () {
                        var type = obj[key];
                        if (type && /^on[A-Z]/g.test(key)) {
                            //使用fire模式
                            if (typeof type === 'string') {
                                props[key] = function () {
                                    for (var _len2 = arguments.length, env = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                        env[_key2] = arguments[_key2];
                                    }

                                    prop.fire && prop.fire.apply(prop, [type].concat(env));
                                };
                            } else {
                                props[key] = type;
                            }
                        }
                    })();
                }
            }
            props = this.extend(props, prop);
            return props;
        }
    }, {
        key: 'renderItem',
        value: function renderItem() {
            var _this2 = this;

            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var args = [];
            var type = obj.type;
            if (type) {
                var typeItem = this.components[type];
                var props = this.getItemProps(obj, typeItem);
                //控制不输出
                if (props === null) return null;
                if (typeItem) {
                    args.push(typeItem, props);
                    //nodeText
                } else if (type === 'text') {
                    return obj.children;
                } else if (/^[a-z]+$/g.test(type)) {
                    args.push(type, props);
                } else {
                    console.log('type: ' + type + ' not found, please add Engine components', obj);
                    return null;
                }
                if (this.isArray(obj.children)) {
                    obj.children.forEach(function (item) {
                        if (_react2.default.isValidElement(item)) {
                            args.push(item);
                        } else {
                            var itemRender = _this2.renderItem(item);
                            itemRender !== null && args.push(itemRender);
                        }
                    });
                } else if (['string', 'number', 'boolean'].indexOf(_typeof(obj.children)) !== -1) {
                    args.push(obj.children);
                }
                return _react2.default.createElement.apply(_react2.default, args);
            } else {
                console.log('type not exist', obj);
                return null;
            }
        }
    }, {
        key: 'components',
        get: function get() {
            return this.props.components || {};
        }
    }]);

    return Engine;
}(_react.Component);

Engine.defaultProps = {
    state: {}, //{type: 'div',children: [{type: 'span',children:[]}]} json-dom
    props: {},
    components: {}, //注册的组件
    getItemProps: null
};
exports.default = Engine;