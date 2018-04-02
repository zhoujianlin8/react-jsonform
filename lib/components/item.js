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


var Item = function (_Component) {
    _inherits(Item, _Component);

    function Item(props) {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));
    }

    _createClass(Item, [{
        key: 'renderItem',
        value: function renderItem(state, data) {
            data = data || {};
            var _props = this.props,
                formData = _props.formData,
                _props$$components = _props.$components,
                $components = _props$$components === undefined ? {} : _props$$components,
                fire = _props.fire,
                on = _props.on,
                setValue = _props.setValue;

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
                if (isCom) {
                    props.value = obj.name ? data[obj.name] : data;
                    props.setValue = function (val, cb) {
                        if (obj.name) {
                            data[obj.name] = val;
                        } else {
                            data = val;
                        }
                        setValue(data, cb);
                    };
                    props.fire = fire;
                    props.$components = $components;
                    props.on = on;
                    props.formData = formData;
                }
                return props;
            }
            return _react2.default.createElement(_engine2.default, { components: $components, state: state, getItemProps: getItemProps });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                _props2$item = _props2.item,
                item = _props2$item === undefined ? {} : _props2$item,
                value = _props2.value,
                className = _props2.className;

            return this.renderItem({ type: 'div', children: item, className: 'object-item' + (className ? ' ' + className : '') }, value);
        }
    }]);

    return Item;
}(_react.Component);

Item.defaultProps = {
    //value: , //
    item: [],
    fire: function fire() {},
    on: function on() {},
    setValue: function setValue() {},
    formData: {}
};
exports.default = Item;