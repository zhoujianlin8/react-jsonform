'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _engine = require('./components/engine');

var _engine2 = _interopRequireDefault(_engine);

var _messageEvent = require('message-event');

var _messageEvent2 = _interopRequireDefault(_messageEvent);

var _index = require('./components/index');

var _index2 = _interopRequireDefault(_index);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zhou on 17/3/1.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 总体有个数据提交数据 data = {name:value};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ｛
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      type: 'form'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      data: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *          name1: 'xxxx',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *          name2: 'zxzxzx'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      children: [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *          {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              type: 'List',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              name: 'name1',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              value: $data.name,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              formdata: {};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              defaultValue: 'xxx',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              label: '',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              style: {}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              item: [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                  {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                       type: 'input',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                       name: 's1',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                  },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                  {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                       type: 'input',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                       name: 's2'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                  },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              ]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              // 通过setState可以修改
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *               changeValue(value,cb){
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                   this.extend(obj);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              ...props
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *          },{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              type: 'Object',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              name: 'name2',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              formdata: {};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              defaultValue: 'xxx',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              label: '',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              style: {}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              item: [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                  {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                       type: 'input',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                       name: 's1',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                  },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                  {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                       type: 'input',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                       name: 's2'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                  },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              ]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              // 通过setState可以修改
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *               changeValue(value,cb){
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                   this.extend(obj);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *              ...props
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *          }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      ]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ｝
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var components = {};
var ValidKey = 'Valid';

var ReactJsonFrom = function (_Component) {
    _inherits(ReactJsonFrom, _Component);

    function ReactJsonFrom() {
        var _ref;

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        _classCallCheck(this, ReactJsonFrom);

        var _this = _possibleConstructorReturn(this, (_ref = ReactJsonFrom.__proto__ || Object.getPrototypeOf(ReactJsonFrom)).call.apply(_ref, [this].concat(props)));

        _this.message = new _messageEvent2.default();
        _this.getItemProps = _this.getItemProps.bind(_this);
        var on = _this.message.on;
        //支持直接通过props去拦截
        _this.message.on = function (type) {
            for (var _len2 = arguments.length, prop = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                prop[_key2 - 1] = arguments[_key2];
            }

            var newType = type;
            if (type && typeof type === 'string') {
                type = type.replace('on', '');
                type = type.charAt(0).toUpperCase() + type.slice(1);
                type = 'on' + type; //添加on
                props[type] && props[type].apply(props, prop);
            }
            on.apply(_this.message, [newType].concat(prop));
            return function () {
                var _this$message;

                (_this$message = _this.message).off.apply(_this$message, [newType].concat(props));
            };
        };
        return _this;
    }

    _createClass(ReactJsonFrom, [{
        key: 'render',
        value: function render() {
            var _props$jsonForm = this.props.jsonForm,
                jsonForm = _props$jsonForm === undefined ? [] : _props$jsonForm;

            var stateprops = {
                type: 'form',
                children: jsonForm
            };
            return _react2.default.createElement(_engine2.default, { components: components, state: stateprops, getItemProps: this.getItemProps });
        }

        //验证状态

    }, {
        key: 'checkValid',
        value: function checkValid() {
            var listeners = this.message._listeners[ValidKey];
            var arr = [];
            listeners.forEach(function (fn) {
                fn && arr.push(fn());
            });
            return new Promise.all(arr);
        }
    }, {
        key: 'getItemProps',
        value: function getItemProps() {
            var _this2 = this;

            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var isCom = arguments[1];

            var props = {};
            var formData = this.props.formData || {};
            var fire = this.message.fire.bind(this.message);
            var on = this.message.on.bind(this.message);
            var value = formData[obj.name];
            if (!(0, _util.checkIf)(obj.if, formData, value)) {
                return null;
            }
            for (var key in obj) {
                if (key && key !== 'type' && key !== 'children') {
                    (function () {
                        var type = obj[key];
                        if (type && /^on[A-Z]/g.test(key)) {
                            //使用fire模式
                            if (typeof type === 'string') {
                                props[key] = function () {
                                    for (var _len3 = arguments.length, env = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                                        env[_key3] = arguments[_key3];
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
            if (isCom) {
                props.value = value;
                props.setValue = function (value, cb) {
                    if (props.name) {
                        formData[props.name] = value;
                        if (_this2.props.onFormDataChange) {
                            _this2.props.onFormDataChange(formData, cb);
                        } else {
                            _this2.setState({}, cb);
                        }
                    } else {
                        console.log('name not found');
                    }
                };
                props.fire = fire;
                props.$components = components;
                props.formData = formData;
                props.on = on;
            }
            return props;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.message = null;
        }
    }]);

    return ReactJsonFrom;
}(_react.Component);

ReactJsonFrom.defaultProps = {
    formData: {},
    jsonForm: [],
    onFormDataChange: null
    // errors: {}, //错误信息
    // onSubmit: ()=>{} ［{}］
};
exports.default = ReactJsonFrom;

//注册components

var register = function register() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var value = arguments[1];

    if (typeof obj === 'string' && value) {
        components[obj] = value;
    }
    if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
        components = Object.assign(components, obj);
    }
};
//注册
register(_index2.default);
exports.register = register;