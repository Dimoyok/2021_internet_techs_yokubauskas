
import React from 'react';
import SupList from "./SupList";

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            supplies: [],
            supCount: 0.
        };
        this.hideAndCleanInput = this.hideAndCleanInput.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.onCreateSupplyList = this.onCreateSupplyList.bind(this);
        this.onAddList = this.onAddList.bind(this);
    }

    hideAndCleanInput = () => {
        const input = document.getElementById("add-supplylist-input");
        input.style.display = "none";
        input.value = "";

        document.getElementById("sb-supplylist-add-supplylist")
            .style.display = "inherit";
    }

    onAddList = ({ key }) => {
        const re = /^[0-9]{2}.[0-9]{2}.[0-9]{4}$/;
        const date = document.getElementById("add-supplylist-input").value
        if(re.test(date))
            this.setState({
                supplies: [...this.state.supplies, {
                    id: this.state.supCount,
                    date, 
                }],
                supCount: this.state.supCount + 1
            });

        this.hideAndCleanInput();
    }

    onInputKeyDown = ({ key }) => {
        if (key === "Enter") {
            this.onAddList({ key })
        }
        if (key === "Escape") {
            this.hideAndCleanInput();
        }
    }


    onCreateSupplyList = (event) => {
        const input = document.getElementById("add-supplylist-input");
        event.target.style.display = 'none';
        input.style.display = "inherit";
        input.focus();
    }

    render() {
        console.log(this.pagecontent);
        return (
            <main>
                {
                    this.state.supplies.map(supply => (
                        <SupList
                            id={supply.id}
                            date={supply.date}
                        />
                    ))
                }
                <div class="sb-supplylist">
                    <div>
                        <button type="button" id="sb-supplylist-add-supplylist" onClick={this.onCreateSupplyList}>
                            [+] Добавить поставку
                        </button>
                        <input
                            type="text"
                            placeholder="Дата поставки"
                            id="add-supplylist-input"
                            onKeyDown={this.onInputKeyDown}
                            onBlur={this.onAddList}
                        />
                    </div>
                </div>
            </main>
          );

      }

    
    
    
}