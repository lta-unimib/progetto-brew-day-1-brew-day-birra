import React from "react";

class RecipeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.nameTextChanged = this.nameTextChanged.bind(this);
        this.descriptionTextChanged = this.descriptionTextChanged.bind(this);
        this.state = {
            name: props.name,
            description: props.description
        };
    }

    nameTextChanged(event) {
        this.setState({
            name: event.target.value
        });
    }

    descriptionTextChanged(event) {
        this.setState({
            description: event.target.value
        });
    }

    render() {
        return (
            <div>
                <p>Nome:</p>
                <textarea id="nameTextArea" value={this.state.name} onChange={this.nameTextChanged}></textarea>
                <p>Descrizione:</p>
                <textarea id="descriptionTextArea" value={this.state.description} onChange={this.descriptionTextChanged}></textarea>
            </div>
        );
    }
}

export default RecipeEdit;
