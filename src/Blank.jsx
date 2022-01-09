import React from 'react';

class Blank extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "Деталь",
            count: 0,
            price: 0
        };

        this.onDelete = this.onDelete.bind(this);
        this.onEditField = this.onEditField.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.onEditField = this.onEditField.bind(this);
    }

    hideAndCleanInput = ({ target }) => {
        let ch = -1;
        
        if(target.className.includes("sb-supplylist-supply-text-input"))
            ch = 0;
        if(target.className.includes("sb-supplylist-supply-count-input"))
            ch = 1;
        if(target.className.includes("sb-supplylist-supply-price-input"))
            ch = 2;

        const elem = document
            .getElementById(`supply-${this.props.parent.props.id}-${this.props.id}`)
            .children[ch];
        elem.lastChild.style.display = "none";
        elem.lastChild.value = "";

        elem.firstChild.style.display = "inherit";
    }

    onApplyField = ({ target }) => {
        let ch = -1;

        if(target.className.includes("sb-supplylist-supply-text-input"))
            ch = 0;
        if(target.className.includes("sb-supplylist-supply-count-input"))
            ch = 1;
        if(target.className.includes("sb-supplylist-supply-price-input"))
            ch = 2;

        const val = document
        .getElementById(`supply-${this.props.parent.props.id}-${this.props.id}`)
        .children[ch].lastChild.value;
        
        if(val)
        {
            if(ch === 0)
                this.setState({name: val})
            else if(ch === 1 && val >= 0)
                this.setState({count: val})
            else if(ch === 2 && val >= 0)
                this.setState({price: val})
        }
        this.hideAndCleanInput({ target });
    }

    onInputKeyDown = ({ key, target }) => {
        if (key === "Enter") {
            this.onApplyField({ target });
        }
        if (key === "Escape") {
            this.hideAndCleanInput({ target });
        }
    }

    onEditField = ({target}) => {
        let ch = -1;

        if(target.className.includes("sb-supplylist-supply-text-field"))
            ch = 0;
        if(target.className.includes("sb-supplylist-supply-count-field"))
            ch = 1;
        if(target.className.includes("sb-supplylist-supply-price-field"))
            ch = 2;
        
        const input = document
            .getElementById(`supply-${this.props.parent.props.id}-${this.props.id}`)
            .children[ch].lastChild;
        target.style.display = 'none';
        input.style.display = "inherit";
        input.focus();
    }

    onDelete = () => {
        const p = this.props.parent;
        let blanks = p.state.blanks.filter((blank) => blank.id !== this.props.id);
        let bCount = 0;
        blanks.forEach((blank) => {
            blank.id = bCount;
            bCount += 1;
        })

        p.setState({
            blanks: blanks,
            blankCount: bCount
        }); 
            
    }

    render() {
        const myId = `supply-${this.props.parent.props.id}-${this.props.id}`;
        return (
            <li class="sb-supplylist-supply" id={myId}>
                <div class="sb-supplylist-supply-text sb-supplylist-supply-clickable">
                    <span class="sb-supplylist-supply-text-field" onClick={this.onEditField}>
                        {this.state.name}
                    </span>
                    <input
                        type="text"
                        placeholder="Деталь"
                        class="sb-supplylist-supply-text-input sb-supply-field"
                        onKeyDown={this.onInputKeyDown}
                        onBlur={this.onApplyField}
                        maxLength="10"
                    />
                </div>
                <span class="sb-supplylist-supply-count sb-supplylist-supply-clickable">
                    <span class="sb-supplylist-supply-count-field" onClick={this.onEditField}>
                        {this.state.count}
                    </span>
                    <input
                        type="number"
                        placeholder=""
                        class="sb-supplylist-supply-count-input sb-supply-field"
                        onKeyDown={this.onInputKeyDown}
                        onBlur={this.onApplyField}
                        maxLength="4"
                    />
                </span>
                <span class="sb-supplylist-supply-price sb-supplylist-supply-clickable">
                    <span class="sb-supplylist-supply-price-field" onClick={this.onEditField}>
                        {this.state.price}
                    </span>
                    <input
                        type="number"
                        placeholder=""
                        class="sb-supplylist-supply-price-input sb-supply-field"
                        onKeyDown={this.onInputKeyDown}
                        onBlur={this.onApplyField}
                        maxLength="4"
                    />
                </span>
                <span class="sb-supplylist-supply-total sb-supplylist-supply-clickable">
                    {this.state.count*this.state.price}
                </span>
                <div class="sb-supplylist-supply-controls">
                  <button type="button" class="sb-supplylist-supply-controls-button del-button" onClick={this.onDelete}></button>
                </div>
            </li>
        );
    }
}


export default Blank;