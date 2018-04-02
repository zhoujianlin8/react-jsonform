/**
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
import React,{Component} from 'react';
import Engine from './components/engine';
import Message from 'message-event';
import ComponentObj from './components/index';
import {checkIf} from './util';
let components = {};
const ValidKey = 'Valid';
class ReactJsonFrom extends Component {
    static defaultProps = {
        formData: {},
        jsonForm: [],
        onFormDataChange: null,
       // errors: {}, //错误信息
       // onSubmit: ()=>{} ［{}］
    };
    constructor(...props){
        super(...props);
        this.message = new Message();
        this.getItemProps = ::this.getItemProps;
        const on = this.message.on;
        //支持直接通过props去拦截
        this.message.on = (type,...prop)=>{
            const newType = type;
            if(type && typeof type === 'string'){
                type = type.replace('on','');
                type = type.charAt(0).toUpperCase() + type.slice(1);
                type = 'on'+type; //添加on
                props[type] && props[type](...prop);
            }
            on.apply(this.message,[newType,...prop]);
            return ()=> {
                this.message.off(newType,...props)
            }
        };
    }
    render(){
        const {jsonForm = []} = this.props;
        const stateprops = {
            type: 'form',
            children: jsonForm
        };
        return (<Engine components = {components} state = {stateprops} getItemProps = {this.getItemProps}/>)
    }

    //验证状态
    checkValid(){
        const listeners = this.message._listeners[ValidKey];
        let arr = [];
        listeners.forEach((fn)=>{
            fn && arr.push(fn());
        });
        return new Promise.all(arr);
    }

    getItemProps(obj = {}, isCom) {
        let props = {};
        const formData = this.props.formData || {};
        const fire = this.message.fire.bind(this.message);
        const on = this.message.on.bind(this.message);
        const value = formData[obj.name];
        if(!checkIf(obj.if,formData,value)){
            return null
        }
        for (const key in obj) {
            if (key && key !== 'type' && key !== 'children') {
                const type = obj[key];
                if (type && /^on[A-Z]/g.test(key)) {
                    //使用fire模式
                    if (typeof type === 'string') {
                        props[key] = (...env)=> {
                            fire(type, obj, ...env);
                        }
                    } else {
                        props[key] = type;
                    }
                } else {
                    props[key] = obj[key]
                }
            }
        }
        if(isCom){
            props.value = value;
            props.setValue = (value, cb)=> {
                if(props.name){
                    formData[props.name] = value;
                    if(this.props.onFormDataChange){
                        this.props.onFormDataChange(formData,cb);
                    }else{
                        this.setState({},cb)
                    }
                }else{
                    console.log('name not found')
                }
            };
            props.fire = fire;
            props.$components = components;
            props.formData = formData;
            props.on = on;
        }
        return props
    }
    componentWillUnmount(){
        this.message = null;
    }
}
export default ReactJsonFrom;

//注册components
const register = function (obj = {}, value) {
    if (typeof obj === 'string' && value) {
        components[obj] = value
    }
    if (obj && typeof obj === 'object') {
        components = Object.assign(components, obj);
    }
};
//注册
register(ComponentObj);
export {register}
