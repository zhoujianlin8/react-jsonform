'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Date = exports.Cancel = exports.Reset = exports.Submit = exports.Email = exports.Passworld = exports.Color = exports.Url = exports.Hidden = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zhou on 17/10/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input() {
        var _ref;

        _classCallCheck(this, Input);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(props)));

        _this.onChange = _this.onChange.bind(_this);
        _this.removeListen = _this.listen();
        return _this;
    }

    _createClass(Input, [{
        key: 'listen',
        value: function listen() {
            var ValidOff = this.props.on('Valid', function () {});
            var ResetOff = this.props.on('Reset', function () {});
            return function () {
                ValidOff();
                ResetOff();
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                value = _props.value,
                inputType = _props.inputType,
                className = _props.className,
                style = _props.style,
                disabled = _props.disabled,
                label = _props.label;

            return _react2.default.createElement(
                'div',
                { className: 'input-item' },
                label ? _react2.default.createElement(
                    'label',
                    { className: 'input-label' },
                    label
                ) : null,
                _react2.default.createElement('input', { type: inputType, value: value || '', onChange: this.onChange, className: 'input' + (className ? ' ' + className : ''), style: style, disabled: disabled })
            );
        }
        //是否更新

    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.props.value !== nextProps.value;
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            this.props.setValue(e.target.value);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removeListen();
        }
    }]);

    return Input;
}(_react.Component);

Input.defaultProps = {
    value: null,
    fire: function fire() {},
    setValue: function setValue() {},
    on: function on() {},
    format: null, //格式校验
    inputType: 'text'
};


function Hidden(props) {
    return _react2.default.createElement('input', { value: props.value, type: 'hidden' });
}

function Url(props) {
    props.format = props.format || 'url';
    return _react2.default.createElement(Input, props);
}

function Color(props) {
    props.format = props.format || 'color';
    props.inputType = 'color';
    return _react2.default.createElement(Input, props);
}

function Passworld(props) {
    props.inputType = 'passworld';
    return _react2.default.createElement(Input, props);
}
function Email(props) {
    props.format = props.format || 'email';
    props.inputType = 'text';
    return _react2.default.createElement(Input, props);
}

function Date(props) {
    props.format = props.format || 'date';
    props.inputType = 'date';
    return _react2.default.createElement(Input, props);
}

function Submit(props) {
    var value = props.value || props.children || '提交';
    return _react2.default.createElement('input', { disabled: props.disabled, style: props.style, type: 'submit', className: props.className, value: value, onClick: function onClick(e) {
            e.preventDefault();props.fire('Submit');
        } });
}

function Reset(props) {
    var value = props.value || props.children || '重置';
    return _react2.default.createElement('input', { disabled: props.disabled, style: props.style, type: 'reset', className: props.className, value: value, onClick: function onClick(e) {
            e.preventDefault();props.fire('Reset');
        } });
}

function Cancel(props) {
    var value = props.value || props.children || '取消';
    return _react2.default.createElement(
        'button',
        { disabled: props.disabled, style: props.style, className: "cancel" + (props.className ? ' ' + props.className : ''), onClick: function onClick(e) {
                e.preventDefault();props.fire('Cancel');
            } },
        value
    );
}

exports.default = Input;
exports.Hidden = Hidden;
exports.Url = Url;
exports.Color = Color;
exports.Passworld = Passworld;
exports.Email = Email;
exports.Submit = Submit;
exports.Reset = Reset;
exports.Cancel = Cancel;
exports.Date = Date;