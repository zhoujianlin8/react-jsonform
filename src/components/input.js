/**
 * Created by zhou on 17/10/19.
 */
import React,{Component} from 'react';
class Input extends Component{
    static defaultProps = {
        value: null,
        fire: ()=>{},
        setValue: ()=>{},
        on: ()=>{},
        format: null, //格式校验
        inputType: 'text',
    };
    constructor(...props){
        super(...props);
        this.onChange = ::this.onChange;
        this.removeListen = this.listen();
    }
    listen(){
        const ValidOff = this.props.on('Valid',function () {

        });
        const ResetOff = this.props.on('Reset', function () {

        });
        return function () {
            ValidOff();
            ResetOff();
        }
    }
    render(){
        const {value,inputType,className,style,disabled,label} = this.props;
        return (<div className="input-item">
            {label ? <label className="input-label">{label}</label>: null}
            <input type={inputType} value={value || ''} onChange={this.onChange} className={'input' + (className ? ' '+className: '')} style={style} disabled={disabled}/>
        </div>)
    }
    //是否更新
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.value !== nextProps.value
    }
    onChange(e){
        this.props.setValue(e.target.value)
    }

    componentWillUnmount(){
        this.removeListen();
    }
}

function Hidden(props) {
    return (<input value={props.value} type="hidden"/>)
}

function Url(props) {
    props.format = props.format || 'url';
    return (<Input {...props}/>)
}

function Color(props) {
    props.format = props.format || 'color';
    props.inputType = 'color';
    return (<Input {...props}/>)
}

function Passworld(props) {
    props.inputType = 'passworld';
    return (<Input {...props}/>)
}
function Email(props) {
    props.format = props.format || 'email';
    props.inputType = 'text';
    return (<Input {...props}/>)
}

function Date(props) {
    props.format = props.format || 'date';
    props.inputType = 'date';
    return (<Input {...props}/>)
}

function Submit(props) {
    const value = props.value || props.children || '提交';
    return (<input disabled = {props.disabled} style={props.style} type="submit" className={props.className} value={value} onClick={(e)=>{e.preventDefault(); props.fire('Submit')}}/>)
}

function Reset(props) {
    const value = props.value || props.children || '重置';
    return (<input disabled = {props.disabled}  style={props.style} type="reset" className={props.className} value={value} onClick={(e)=>{ e.preventDefault(); props.fire('Reset')}}/>)
}

function Cancel(props) {
    const value = props.value || props.children || '取消';
    return (<button disabled = {props.disabled} style={props.style} className={"cancel" + (props.className ? ' '+props.className: '')} onClick={(e)=>{e.preventDefault(); props.fire('Cancel')}}>{value}</button>)
}

export default Input;
export {
    Hidden,
    Url,
    Color,
    Passworld,
    Email,
    Submit,
    Reset,
    Cancel,
    Date
}
