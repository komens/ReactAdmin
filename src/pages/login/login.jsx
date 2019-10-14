import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './login.less';
import logo from './images/logo.png';
/*
    登录的路由界面
 */
class Login extends Component {

    handleSubmit = (event) => {
        event.preventDefault();

        const form = this.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                console.log('提交登陆的ajax请求', values);
            } else {
                console.log("校验失败");
            }
        });
        // 获取表单数据
        // const values = form.getFieldsValue();
    }

    /*
        对密码进行自定义验证
     */
    validatepwd = (rule, value, callback) => {
        if(!value) {
            callback('密码不能为空！');
        } else if(value.length < 4) {
            callback("密码长度不能小于4");
        } else if(value.length > 12) {
            callback("密码长度不能大于12");
        } else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码必须是英文、数字或下划线组成")
        } else {
            callback();
        }
    }

    render() {

        // 得到具有强大功能的from对象
        const form = this.props.form;
        const { getFieldDecorator } = form;

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>React 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    // 声明式验证: 直接使用别人定义好的规则进行验证
                                    rules: [
                                        {required: true,whitespace: true, message: '内容不能为空'},
                                        {min: 4, message: '长度最小为4位'},
                                        {max: 12, message: '长度最大为12位'},
                                        {pattern: /^[a-zA-Z0-9]+$/, message: '用户名只能为字母或数字'}
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入账号"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            validator: this.validatepwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}
/*
    包装Form组件，生成一个新的组件
    新组件会像Form组件传一个form属性
 */
const WrappedLogin = Form.create()(Login);
export default WrappedLogin;