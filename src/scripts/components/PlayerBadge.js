import React, { Component } from "react";

export class PlayerBadgeEdditable extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: props.username // this here reflects local changes - doesn't save string in inputbox to global storage
        };

        this.changeUsername = (event) => {
            this.setState({
                username: event.target.value
            });
        };

        this.handleSubmit = (event) => {
           event.preventDefault();
           this.props.changeUsername(this.state.username); // this function is supplied by container
        };
    }

    render() {
        return (
            <form>
                <input type={"text"} value={this.state.username} onChange={this.changeUsername}/>
                <input type={"submit"} value={"Change"} onClick={this.handleSubmit}/>
            </form>
        );
    }
}

export class PlayerBadge extends  Component {
    constructor (props) {
        super(props);
        this.state = {
            editable: false
        };

        this.allowEditing = () => {
            this.setState({
                editable: true
            });
        };

        this.disableEditing = () => {
            this.setState({
                editable: false
            })
        };
    }

    render () {
        if (this.state.editable) {
            return <PlayerBadgeEdditable username={this.props.username} changeUsername={
                        (username) => {
                            this.props.changeUsername(username); this.disableEditing();
                        }
                    }/> // since PlayerBadgeEditable hasn't its own container we have to pass everything
        } else {
            return <p onClick={this.allowEditing}>Username: {this.props.username}</p>
        }
    }
}
