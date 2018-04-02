/**
 * Created by zhou on 17/10/19.
 */
import React,{Component} from 'react';
import Engine from './engine';
class Item extends Component{
    static defaultProps = {
        //value: , //
        item: [],
        fire: ()=>{},
        on: ()=>{},
        setValue: ()=>{},
        formData: {}
    };
    constructor(props){
        super(props);
    }
    renderItem(state,data){
        data = data || {};
        const {formData,$components = {},fire,on,setValue} = this.props;
        function getItemProps(obj,isCom) {
            let props = {};
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
                props.value = obj.name ? data[obj.name]: data;
                props.setValue = (val, cb)=> {
                    if(obj.name){
                        data[obj.name] = val;
                    }else{
                        data = val;
                    }
                    setValue(data,cb);
                };
                props.fire = fire;
                props.$components = $components;
                props.on = on;
                props.formData = formData;
            }
            return props
        }
        return (<Engine components = {$components} state = {state}  getItemProps = {getItemProps}/>);
    }
    render(){
        const {item = {},value,className} = this.props;
        return this.renderItem({type: 'div',children: item,className: 'object-item' + (className ? ' '+className: '')},value)
    }
}
export default Item
