import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

import styles from './styles.module.css';

class Main extends Component {
    state = {
        username: "Usuário",
        messager: "",
        messages: [],
        users: [],
        error: "",
        isLogged: false
    };
    async componentDidMount() {
        //this.registerToSocket();
        const response = await api.get('messages');

        const responseUser = await api.get('users');

        this.setState({ messages: response.data });

        this.setState({ users: responseUser.data });

    }

    handleSubmit = async e => {
        e.preventDefault();
        const { username, messager } = this.state;
        this.setState({ messages: username + ': ' + messager });
    };

    handleUser = (user) => {
        console.log("clicado aki");
        if (!this.state.isLogged) {
            this.setState({
                isLogged: true
            });
            this.setState({ username: user });
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.containerUser}>
                    {this.state.users.map(post => (
                        <button onclick={this.handleUser(post.username)} key={post.id}>{post.username}</button>
                    ))}
                </div>
                <form id={styles.chat} onSubmit={this.handleSubmit}>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="text"
                        value={this.state.username}
                        disabled="disabled"
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                    <div className={styles.messages}>
                        {this.state.messages.map(post => (
                            <div key={post.id}><strong>{post.user_id}</strong> : {post.message}</div>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="digite a mensagem"
                        onChange={e => this.setState({ messager: e.target.value })}
                    />
                    <button className={styles.users} type="submit">Enviar</button>

                    <hr />
                </form>
            </div>
        );
    }
}

export default Main;