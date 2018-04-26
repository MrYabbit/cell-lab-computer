import * as actions from "../actions";
import { connect } from "react-redux";
import * as components from "../components/Simulation";

export const Simulation = connect (
    function (state) {
        return {
            // Data
        };
    },
    function (dispatcher) {
        return {
            // Actions
        }
    }
)(components.Simulation);