import * as actions from "../actions";
import { connect } from "react-redux";
import * as components from "../components/PlayerBadge";

export const PlayerBadge = connect(
    function (state) { // this one sets data from storage this component shows (when they change this component reloads)
        return {
            username: state.username,
        }
    },
    function (dispatch) { // this sets actions that this component can call
        return {
            changeUsername: (username) => dispatch(actions.changeUsername(username))
        }
    }
)(components.PlayerBadge);