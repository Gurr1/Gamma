import React from "react";
import { Route, Switch } from "react-router-dom";
import ShowActivationCodeDetails from "./screens/show-activation-code-details";
import ShowAllActivationCodes from "./screens/show-all-activation-codes";

const ActivationCodes = () => (
    <Switch>
        <Route
            path="/activation-codes"
            exact
            component={ShowAllActivationCodes}
        />
        <Route
            path="/activation-codes/:id"
            exact
            component={ShowActivationCodeDetails}
        />
    </Switch>
);

export default ActivationCodes;
