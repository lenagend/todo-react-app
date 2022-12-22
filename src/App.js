import React from "react";
import logo from './logo.svg';
import './App.css';
import Todo from './Todo'
import {Paper, List, Container} from "@material-ui/core";
import AddTodo from "./AddTodo";
import { call } from "./service/ApiService";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items : [
        {id: "0", title: "hello world!", done: true},
        {id: "1", title: "hello world! 2", done: false},
      ],
    };
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data })
    );
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render(){
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update}/>  
        ))}
        </List>
      </Paper>
    );

    return(
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>  
    )
  }
}

export default App;