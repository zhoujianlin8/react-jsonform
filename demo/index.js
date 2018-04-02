import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Form from '../src/index';
import Input from "../src/components/input";
import List from "../src/components/list";
import Item from "../src/components/item";
class Demo extends Component{
    static defaultProps = {};
    constructor(props){
        super(props);
        this.state = {
            formData: {
            }
        }
    }
    render(){
        const jsonForm = [
            {
                name: 'asas',
                type: 'Input',
                label: 'hello',
                required: true,
            }, {
                name: 'list1',
                type: 'List',
                label: 'hello',
                repeat: 2,
                item: [{
                        name: 'name',
                        type: 'Input',
                        label: 'hello',
                        required: true,
                },{
                    name: 'age',
                    type: 'Input',
                    label: 'hello',
                    required: true,
                }]
            },{
                name: 'list2',
                type: 'List',
                label: 'hello',
                item: [{
                    name: 'name1',
                    type: 'Input',
                    label: 'hello',
                    required: true,
                },{
                    name: 'age',
                    type: 'Input',
                    label: 'hello',
                    required: true,
                }]
            },{
                name: 'obj',
                type: 'Item',
                label: 'hello',
                item: [{
                    name: 'name',
                    type: 'Input',
                    label: 'hello',
                    required: true,
                },{
                    name: 'age',
                    type: 'Input',
                    label: 'hello',
                    required: true,
                }]
            },{
                name: 'obj2',
                type: 'Item',
                label: 'hello1',
                if: "$formData.asas === '1'",
                item: [{
                    name: 'name',
                    type: 'Input',
                    label: 'hello2',
                    required: true,
                },{
                    name: 'age',
                    type: 'Input',
                    label: 'hello',
                    required: true,
                }]
            },{
                type: 'Submit'
            },{
                type: 'Cancel'
            }
        ];
        /*return (<Form title="xxxx" action="xxx" method="post" url="xxxx" inline formData={{}}>
            <Input name="xxx" label="aaass" className="xxx" />
            <Input name="xx" label="ccss" className="xxx" />
            <Input name="xxx" label="aaa" className="xxx" format = '' required type="text" if="formData.a===12"/>
            <List label="aaa" name="as" >
                <Input name="xxx" label="aaass" className="xxx" />
                <Input name="xx" label="ccss" className="xxx" />
                <Input name="xxx" label="aaa" className="xxx" format = '' required type="text"/>
            </List>
            <Item label="sasasasa" name="csasa" className="as">
                <Input name="xxx" label="aaass" className="xxx" />
            </Item>
            <div>{formData.age}asas</div>

            <Submit className="xxxx">提交</Submit>
            <Reset>重置</Reset>
        </Form>)*/
        return (<Form jsonForm = {jsonForm} formData = {this.state.formData}  onSubmit={''} onFormDataChange = {this.onChange.bind(this)}/>)
    }
    onChange(e){
        this.setState({formData: e});
    }
}

ReactDOM.render(<Demo />, document.getElementById('container'));
