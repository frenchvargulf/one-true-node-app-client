import React, {Component} from 'react';
import './App.css';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      id: "",
      alias: "",
      type: "",
      breed: "",
      size: "",
      sex: "",
      lifeStyle: "",
      intrests: "",
      show: false,
      add: false,
      editable: false,
      img: true,
    }
  }

  handleAliasChange(event){
    
    this.setState({
      alias: event.target.value,
    })
    console.log(event.target.value)
  }
  handleTypeChange(event){
    this.setState({
      type: event.target.value,
    })
  }
  handleBreedChange(event){
    this.setState({
      breed: event.target.value,
    })
  }
  handleSizeChange(event){
    this.setState({
      size: event.target.value,
    })
  }
  handleSexChange(event){
    this.setState({
      sex: event.target.value,
    })
  }
  handleLifeStyleChange(event){
    this.setState({
      lifeStyle: event.target.value,
    })
  }

  handleIntrestsChange(event){
    this.setState({
      intrests: event.target.value,
    })
  }

  update(e, dog){
    

    
      this.setState({
        editable: !this.state.editable,
        id: dog._id,
      })
    

    if (this.state.editable === true){
      fetch( `https://glacial-sands-91888.herokuapp.com/api/dogs/${dog._id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "alias": this.state.alias,
           "type": this.state.type,
           "breed": this.state.breed,
           "size": this.state.size,
           "sex": this.state.sex,
           "lifeStyle": this.state.lifeStyle,
           "intests": this.state.intrests,
        })
      
      }
      
      )  
    
      
      .then(res => {
        console.log(res)
          return JSON.stringify(res);
      })
      .then(res => {
        console.log(dog._id)
        this.getDataFromDb()
        console.log(this.state.data)
      })
      .catch( err => {
          console.log('Błąd!', err);
      });
    
    } 

    this.setState({
      alias: "",
      type: "",
      breed: "",
      size: "",
      sex: "",
      lifeStyle: "",
      intests: "",
    })

 
    
  }


  handleSubmit(event) {
    event.preventDefault();


    fetch(`https://glacial-sands-91888.herokuapp.com/api/dogs/`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
         "alias": this.state.alias,
         "type": this.state.type,
         "breed": this.state.breed,
         "size": this.state.size,
         "sex": this.state.sex,
         "lifeStyle": this.state.lifeStyle,
         "intests": this.state.intrests,
        })
    })
    this.getDataFromDb()
  }

  delete(e, dog){
    console.log(dog)
    fetch(`https://glacial-sands-91888.herokuapp.com/api/dogs/${dog._id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: dog._id})
        })
  
        .then(res => {
          console.log(res)
            return JSON.stringify(res);
        })
        .then(res => {
          console.log(dog._id)
          this.setState({
            data: this.state.data.filter(x=> x._id != dog._id),
          })
          console.log(this.state.data)
        })
        .catch( err => {
            console.log('Błąd!', err);
        });
        
  }

  getDataFromDb = () => {
    fetch('https://glacial-sands-91888.herokuapp.com/api/dogs')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        this.setState({ 
          data: res? res:null, 
        });
      })
  }

  componentWillUnmount(){
    Promise.resolve()
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  handleAdd(){
    this.setState({
      add: !this.state.add,
      show: false,
      img: this.state.add?true:false,
    })
  }

  handleShow(){
    this.setState({
      show: !this.state.show,
      add: false,
      img: this.state.show?true:false,
    })
  }


  render(){
    return (
      <div className="App">
        <div className="container">
          <h1 className="title">One True Pet</h1>
          
          <nav>
            <ul className="page-nav-list">
              <li><button onClick={(e)=>this.handleAdd(e)} className="ADD">Add Pets</button></li>
              <li><button onClick={(e)=>this.handleShow(e)} className="SHOW">Show pets</button></li>
            </ul>
          </nav>
          
          { this.state.img? <svg className="paw-svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paw" className="svg-inline--fa fa-paw fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z"></path></svg>
            : null
          }

          { this.state.add? (<div className="form-container">
            <div className="adding-cnt">
              <h2>Add a new pet</h2>
            </div>
            <div className="form">
              <form>
                <div className="form-el-cnt"><label> Name <input type="text"onChange={(e) => this.handleAliasChange(e)}></input></label><br></br></div>
                <div className="form-el-cnt"><label> Type <input type="text"onChange={(e) => this.handleTypeChange(e)}></input> </label><br></br></div>
                <div className="form-el-cnt"><label> Breed <input type="text"onChange={(e) => this.handleBreedChange(e)}></input> </label><br></br></div>
                <div className="form-el-cnt"><label> Size <input type="text"onChange={(e) => this.handleSizeChange(e)}></input></label><br></br></div>
                <div className="form-el-cnt"><label> Sex <input type="text"onChange={(e) => this.handleSexChange(e)}></input></label><br></br></div>
                <div className="form-el-cnt"><label> Life style <input type="text"onChange={(e) => this.handleLifeStyleChange(e)}></input></label><br></br></div>
                <div className="form-el-cnt"><label> Intrests <input type="text"onChange={(e) => this.handleIntrestsChange(e)}></input></label><br></br></div>
                <button className="add-pet-btn" onClick={(e)=>this.handleSubmit(e)}>Add Your Pet</button>
              </form>
            </div>
          </div>):null}

          { this.state.show? (
          <div className="list-container">
            <ul className="list">
              {
                this.state.data? this.state.data.map( (dog) => {
                  console.log(dog)
                  return <li className="list-element" key={dog._id}>
                          {this.state.editable && this.state.id===dog._id? <input placeholder={dog.alias?dog.alias:"Enter name"} id={dog._id} type="text" onChange={(e)=>this.handleAliasChange(e)}></input> : <p> <span>Name</span> {dog.alias}</p>}
                          {this.state.editable && this.state.id===dog._id? <input placeholder={dog.type?dog.type:"Enter type"} id={dog._id} type="text"onChange={(e)=>this.handleTypeChange(e)}></input> : <p onChange={(e)=>this.handleTypeChange(e)}> <span>Type</span> {dog.type} </p>}
                          {this.state.editable && this.state.id===dog._id? <input placeholder={dog.breed?dog.breed:"Enter breed"} id={dog._id} type="text"onChange={(e)=>this.handleBreedChange(e)}></input> : <p onChange={(e)=>this.handleBreedChange(e)}> <span>Breed</span> {dog.breed}</p>}
                          {this.state.editable && this.state.id===dog._id? <input placeholder={dog.size?dog.size:"Enter size"} id={dog._id} type="text"onChange={(e)=>this.handleSizeChange(e)}></input> : <p onChange={(e)=>this.handleSizeChange(e)}> <span>Size</span> {dog.size} </p>}
                          {this.state.editable && this.state.id===dog._id? <input placeholder={dog.sex?dog.sex:"Enter sex"}id={dog._id} type="text"onChange={(e)=>this.handleSexChange(e)}></input> : <p onChange={(e)=>this.handleSexChange(e)}> <span>Sex</span> {dog.sex}</p>}
                          {this.state.editable && this.state.id===dog._id? <input placeholder={dog.lifeStyle?dog.lifeStyle:"Enter lifestyle"}id={dog._id} type="text"onChange={(e)=>this.handleLifeStyleChange(e)}></input> : <p onChange={(e)=>this.handleLifeStyleChange(e)}> <span>Life style</span> {dog.lifeStyle}</p>}
                          {this.state.editable && this.state.id===dog._id? <input placeholder={dog.intrests?dog.intrests:"Enter intrests"}id={dog._id} type="text"onChange={(e)=>this.handleIntrestsChange(e)}></input> : <p onChange={(e)=>this.handleIntrestsChange(e)}> <span>Intrests</span> {dog.intrests}</p>}
                           
                          <div className="element-options">
                            <button className="edit" onClick={(e)=>this.update(e, dog)}>Edytuj</button>
                            <button className="delete" onClick={(e)=>this.delete(e, dog)}>Usuń</button>
                          </div>
                        </li>
                }):null
              }
            </ul>
          </div>
          ):null}
        
        
        
        </div>
      </div>
    );
  }

}

export default App;
