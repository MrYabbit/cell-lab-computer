import * as actions from "../actions";
import { connect } from "react-redux";
import * as components from "../components/Renderer";

export const Renderer = connect(
    function (state) {
        return {
            // Data
        }
    },
    function (dispatch) {
        return {
            // Actions
        }
    }
)(components.Renderer);
