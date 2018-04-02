/**
 * Created by zhou on 17/10/23.
 */
// 解析json dom 单纯的渲染模式
import React, {Component} from 'react';
class Engine extends Component {
    static defaultProps = {
        state: {}, //{type: 'div',children: [{type: 'span',children:[]}]} json-dom
        props: {},
        components: {}, //注册的组件
        getItemProps: null,
    };
    constructor(...props){
         super(...props);
     }

    extend(target = {}, target2 = {}) {
        for (const i in target2) {
            target[i] = target2[i]
        }
        return target;
    }

    isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    render() {
        return this.renderItem(this.props.state);
    }
    getItemProps (obj = {},isCom){
        if(this.props.getItemProps) return this.props.getItemProps(obj,isCom);
        let props = {};
        const prop = this.props.props;
        for(const key in obj){
            if(key && key !== 'type' && key !== 'children'){
                const type = obj[key];
                if(type && /^on[A-Z]/g.test(key)){
                    //使用fire模式
                    if(typeof type === 'string'){
                        props[key] = (...env)=>{
                            prop.fire && prop.fire(type,...env);
                        }
                    }else{
                        props[key] = type;
                    }
                }
            }
        }
        props = this.extend(props,prop);
        return props
    }
    get components(){
        return this.props.components || {}
    }
    renderItem(obj = {}) {
        let args = [];
        const type = obj.type;
        if(type){
            const typeItem = this.components[type];
            let props = this.getItemProps(obj,typeItem);
            //控制不输出
            if(props === null) return null;
            if(typeItem){
                args.push(typeItem, props);
                //nodeText
            }else if(type === 'text'){
                return obj.children;
            }else if(/^[a-z]+$/g.test(type)) {
                args.push(type, props);
            }else{
                console.log(`type: ${type} not found, please add Engine components`,obj);
                return null;
            }
            if (this.isArray(obj.children)) {
                obj.children.forEach((item)=> {
                    if(React.isValidElement(item)){
                        args.push(item)
                    }else{
                        const itemRender = this.renderItem(item);
                        (itemRender !== null) && args.push(itemRender);
                    }
                })
            }else if(['string', 'number', 'boolean'].indexOf(typeof obj.children) !== -1){
                args.push(obj.children);
            }
            return React.createElement.apply(React, args);
        }else{
            console.log('type not exist',obj);
            return null
        }
    }
}
export default Engine;
