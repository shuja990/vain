import React,{Component} from 'react';
import Card from './Card.js'
import Scroll from '../Scroll.js'
import Transfere from './Transfere.js'
class Searche extends Component {
	constructor(props){
		super(props);
		this.state = {
			emailS: '',
			nameS:'',
			emails:'',
			users:[],
			returned: false,
			returnedE: false,
			transferid:'',
			status:false,
			showSearch:false,
			showTransfer:0,
			blockid:'',
			blocked:''
		}
	}
	onSearch = () => {
    fetch('https://boiling-journey-45968.herokuapp.com/profilename', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.nameS
      })
    })
      .then(response => response.json())
      .then(user => {
      	if(user[0].id){
      	this.setState({users:user})
      	this.setState({returned:true})
      }
      else{
      	this.setState({users:[{name:"Name Does Not Exist"}]})
      }
      })
      .catch(err => console.log)
  }
	searchChange = (event) => {
    this.setState({nameS: event.target.value})
  }
  onEmailSearch = () => {
    fetch('https://boiling-journey-45968.herokuapp.com/profile', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.emailS
      })
    })
      .then(response => response.json())
      .then(user => {
      	if(user[0].id){
	      	this.setState({emails:user})
	      	this.setState({returnedE:true})
	     }
	     else{
	     	this.setState({emails:[{name:"Email Does Not Exist"}]})
	     }
      })
      .catch(err => console.log)
  }
	searchEmailChange = (event) => {
    this.setState({emailS: event.target.value})
  }
  onSelect = (ea) =>{
  	this.setState({
  		transferid:ea,
  		blockid:ea
  	})
  }
  onTransfer = (amount,props) =>{
  	fetch('https://boiling-journey-45968.herokuapp.com/admin', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        transferid: this.state.transferid,
        entries:amount
      })
    })
      .then(response => response.json())
      .then(entries => {
      	if(entries){
	      	this.setState({status: true})
	     }
	     else{
	     	this.setState({status: false})
	     }
      })
      .catch(err => console.log)
  }
  onBlock = () => {
  	fetch('http://localhost:3001/blockuser', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        blockid: this.state.blockid,
      })
    })
      .then(response => response.json())
      .then(respone=>{
      	this.setState({blocked:'blocked'})
      })
  }
  changeS = () =>{
  	this.setState({showSearch:true})
  }
  HideS = () =>{
    this.setState({showSearch:false})
  }
  changeT = () =>{
  	this.setState({showTransfer:1})
  }
	render(){
		const {currentId} = this.props;
		let robots = this.state.users;
		let emails = this.state.emails;
		if(this.state.showSearch){
	return(
		<div className='pa2'>
        <input
                onClick={this.HideS}
                className="b ph3 pv2 pr4 input-reset ba b--white black bg-yellow grow pointer f4 dib"
                type="submit"
                value="Hide Search"
              />
			<input 
			type='search'
			className='pa3 ba ma2 b--green bg-lightest-blue' 
			placeholder='search user by name'
			onInput = {this.searchChange}
			/>
			<input
                onClick={this.onSearch}
                className="b ph3 pv2 pr4 input-reset ba b--white white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Search Name"
              />
		<input 
			type='search'
			className='pa3 ml3 ba b--green bg-lightest-blue' 
			placeholder='search user by email'
			onInput = {this.searchEmailChange}
			/>
			<input
                onClick={this.onEmailSearch}
                className="b ph3 ml3 pv2  input-reset ba b--white white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Search Email"
              />
              <Scroll>
            {  this.state.users.length===0
			?<div className="white v-mid"></div>
		
            	:(
            	robots.map((user,i) => {
				return (
					<Card 
					key={i} 
					id={robots[i].id} 
					name ={robots[i].name} 
					email={robots[i].email}
					joined={robots[i].joined}
					phone={robots[i].phone}
					entries={robots[i].entries}
					onSelect={this.onSelect}
					/>
				);
			})
            		)
		}
            {  this.state.emails.length===0
			?<div className="white v-mid"></div>
		
            	:(
            	emails.map((user,i) => {
				return (
					<Card 
					key={i} 
					id={emails[i].id} 
					name ={emails[i].name} 
					email={emails[i].email}
					joined={emails[i].joined}
					phone={emails[i].phone}
					entries={emails[i].entries}
					onBlock={this.onBlock}
					/>
				);
			})
            		)
		}
		<div className="f4 white pa3">User with ID number {this.state.transferid} is Selected</div>
		</Scroll>
		{
			this.state.users.length
		?<input
                className="b ph3 pv2 pa2 ma2 input-reset ba b--white white bg-transparent grow pointer f4 dib"
                type="submit"
                value="Transfer"
              />

         :<div></div>
         }
         <input
                className="b ph3 pv2 pa2 ma2 input-reset ba b--black white bg-red grow pointer f4 dib"
                type="submit"
                value="Block"
                onClick={this.onBlock}
              />
         <Transfere
         	onTransfer={this.onTransfer}
         	status={this.state.status}
         	ent={this.state.entries}
         	onClick={this.changeT}
         />
		</div>
	);
	}
	else{
		return <button class="f3 link dim ph3 pv2 mb2 dib white bg-purple" onClick={this.changeS}>Search User</button>
	 }
	}
}
export default Searche;