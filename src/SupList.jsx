import React from 'react';
import Blank from "./Blank";

class Stage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blanks: [],
            blankCount: 0.
        };

        this.onCreateBlank = this.onCreateBlank.bind(this);
    }

    onCreateBlank = (event) => {
        this.setState({
            blanks: [...this.state.blanks, {
                id: this.state.blankCount, 
                parent: this,
            }],
            blankCount: this.state.blankCount + 1
        });
    }

    render() {

        let elems_head = null;
        let elems_blanks = null;

        if(this.state.blankCount > 0) 
        {
            elems_head = (
                <div class="sb-supplylist-heads">
                    <span class="sb-supplylist-supply-text">
                        Заготовка
                    </span>
                    <span class="sb-supplylist-supply-count">
                        Количество
                    </span>
                    <span class="sb-supplylist-supply-price">
                        Цена за шт.
                    </span>
                    <span class="sb-supplylist-supply-total">
                        Общая цена
                    </span>
                    <div class="sb-supplylist-supply-controls"></div>
                </div>
            )

            elems_blanks = (
                <ul class="sb-supplylist-supplies">
                    {
                        this.state.blanks.map(blank => (
                            <Blank
                                id={blank.id}
                                parent={blank.parent}
                            />
                        ))
                    }
                </ul>
            )
        }

        return (
            <div class="sb-supplylist" id={this.props.id}>
                <header class="sb-supplylist-header">
                    От <span class="sb-supplylist-supply-data">{this.props.date}</span>
                </header>
                {elems_head}
                {elems_blanks}
                <footer class="sb-supplylist-footer">
                    <button type="button" class="sb-supplylist-add-supply" onClick={this.onCreateBlank}>
                        [+] Добавить партию
                    </button>
                </footer>
            </div>
        );
    }
}


export default Stage;