/**
 * Created by zhou on 17/10/19.
 */
import React,{Component} from 'react';
import Engine from './engine';
class List extends Component{
    static defaultProps = {
        row: null,
        minRow: 1,
        maxRow: null,
        isAdd: false, //是否增加
        isDel: false, //是否支持删除
        isMove: false, //是否移动
        //value: [],
        item: [],
        on: ()=>{},
        fire: ()=>{},
        setValue: ()=>{},
        formData: {}
    };
    constructor(props){
        super(props);
    }
    renderItem(state,data = {},index){
        let {formData,$components = {},fire,on,setValue,value} = this.props;
        value = value || [];
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

            props.label = null;
            if(isCom){
                props.value = obj.name ? data[obj.name]: data;
                props.setValue = (val, cb)=> {
                    if(obj.name){
                        value[index] = value[index] || {};
                        value[index][obj.name] = val;
                    }else{
                        value[index] = val;
                    }
                    setValue(value,cb);
                };
                props.fire = fire;
                props.$components = $components;
                //监听是
                props.on = on;
                props.formData = formData;
            }
            return props
        }
        return (<Engine components = {$components} state = {state} getItemProps = {getItemProps}/>);
    }
    renderOperation(i,isAdd,isDel,isMove,minRow,maxRow,n){
        const disableAdd = (maxRow && n >=maxRow);
        const disabledDel =  (n===1 || (minRow && n <= minRow));
        const disabledUp = (i===0);
        const disabledDown = (i===n);
        return (<div className="form-list-item-operation">
            {isAdd ?<span className={'btn-add' + (disableAdd ? ' disabled':'')} onClick={this.operationClick.bind(this,'add',i,disableAdd)}></span>: null}
            {isDel ?<span className={'btn-del'+ (disabledDel ? ' disabled':'')}> onClick={this.operationClick.bind(this,'del',i,disabledDel)}</span>: null}
            {isMove ?<span className={'btn-up'+(disabledUp ? ' disabled':'')} onClick={this.operationClick.bind(this,'up',i,disabledUp)}></span>: null}
            {isMove ?<span className={'btn-down'+(disabledDown ? ' disabled':'')} onClick={this.operationClick.bind(this,'down',i,disabledDown)}></span>: null}
        </div>)
    }
    operationClick(type,i,b){
        if(b){
            return;
        }
        let cur;
        let value = this.props.value || [];
        if(type === 'add'){
            value.splice(i+1,0,null)
        }else if(type === 'del'){
            value.splice(i,1)
        }else if(type === 'up'){
            cur = value[i];
            value[i] = value[i-1];
            value[i-1] = cur;
        }else if(type === 'down'){
            cur = value[i];
            value[i] = value[i+1];
            value[i+1] = cur;
        }
        this.props.setValue(value)
    }

    render(){
        let {item = [],value,row,minRow,maxRow,className,operationName,isAdd,isDel,isMove,title} = this.props;
        value = value || [];
        const n = Math.max(row,minRow,1,item.length);
        let isOperation = isAdd || isDel || isMove;
        const that = this;
        let childrens = [];
        for (let i = 0;i<n;i++){
            let newItem = item;
            if(isOperation){
                newItem = item.concat([(that.renderOperation)(i,isAdd,isDel,isMove,minRow,maxRow,n)]);
            }
            childrens.push(this.renderItem({type: 'div',className: 'form-list-item', children: newItem},value[i] || {},i))
        }
        let headers = [];
        item.forEach(function (it) {
            headers.push(<span className="form-list-th">{it.label || ''}</span>)
        });
        if(item.length && isOperation){
            headers.push(<span className="form-list-th form-list-operation">{operationName || '操作'}</span>)
        }

        return (<div className={"form-list" + (className? ' '+className: '')}>
            {title ? <h3 className="form-list-title">{title}</h3>: null}
            <div className="form-list-header">{headers}</div>
            <div className="form-list-body">{childrens}</div>
        </div>)
    }
}
export default List
