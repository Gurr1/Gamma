import React from "react";

class ShowAllClients extends React.Component {
    componentDidMount() {
        this.props.getClients().then(() => {
            this.props.gammaLoadingFinished();
        });
    }

    render() {
        return <div>hej</div>;
    }
}

export default ShowAllClients;
