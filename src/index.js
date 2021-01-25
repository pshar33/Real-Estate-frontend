import React from 'react';
import ReactDOM from 'react-dom';



class PersonDashboard extends React.Component {

    state = {

        persons: [

            {

                id: 1,
				first_name: 'Bob',
				last_name: 'Barker',
				email: 'bobbarker@gmail.com',
				contacted: 'yes',
				notes: 'interested in real estate',
				time_created: 'NA',
				time_updated: 'NA'

            },

            {

                id: 2,
				first_name: 'Susan',
				last_name: 'Bones',
				email: 'susanbones@gmail.com',
				contacted: 'yes',
				notes: 'not interested in real estate',
				time_created: 'NA',
				time_updated: 'NA'

            }

	  ]
	}



/*
	state = {

        persons: []

    }
    componentDidMount() {

        fetch('http://localhost:8000/api/persons/')

            .then(response => response.json())

            .then(data => {

                this.setState({persons: data});

            });

    }  
 */ 

createNewPerson = (person) => {

      fetch('http://localhost:8000/api/persons/', {

        method: 'POST',

        headers: {

                'Content-Type': 'application/json',

        },

        body: JSON.stringify(person),

    })

    .then(response => response.json())

    .then(person => {

        this.setState({persons: this.state.persons.concat([person])});

    });

  }


updatePerson = (newPerson) => {

    fetch(`http://localhost:8000/api/persons/${newPerson.id}/`, {

        method: 'PUT',

        headers: {

                'Content-Type': 'application/json',

        },

        body: JSON.stringify(newPerson),

    }).then(response => response.json())

    .then(newPerson => {

        const newPersons = this.state.persons.map(person => {

            if(person.id === newPerson.id) {

                return Object.assign({}, newPerson)

            } else {

                return person;

            }

        });

        this.setState({persons: newPersons});

    });
  
}

	deletePerson = (personId) => {

    fetch(`http://localhost:8000/api/persons/${personId}/`, {

        method: 'DELETE',

        headers: {

            'Content-Type': 'application/json',

        },

    })

    .then(() => {

        this.setState({persons: this.state.persons.filter(person => person.id !== personId)})

    });
}

  render()	
	{

      return (

          <main className="d-flex justify-content-center my-4">

              <div  className="col-5">

                  <PersonList

                      persons={this.state.persons}

                      onDeleteClick={this.deletePerson}

                      onUpdateClick={this.updatePerson}

                  ></PersonList>

                  <ToggleablePersonForm

                      onPersonCreate={this.createNewPerson}

                  ></ToggleablePersonForm>

              </div>

          </main>

      )

	}

}


class PersonList extends React.Component {

  render() {

    const persons = this.props.persons.map(person => (

      <EditablePerson

        id={person.id}

        first_name={person.first_name}

		last_name={person.last_name}

		email={person.email}

		contacted={person.contacted}

		notes={person.notes}

		time_created={person.time_created}

		time_updated={person.time_updated}

        onDeleteClick={this.props.onDeleteClick}

        onUpdateClick={this.props.onUpdateClick}

      ></EditablePerson>

    ));

    return (

      <div>

        {persons}

      </div>

    );

  }

}


class EditablePerson extends React.Component {

  state = {

    inEditMode: false

  };

  enterEditMode = () => {

    this.setState({inEditMode: true});

 }

 leaveEditMode = () => {

    this.setState({inEditMode: false});

 }

  handleDelete = () => {

    this.props.onDeleteClick(this.props.id);

  }

  handleUpdate = (person) => {

    this.leaveEditMode()

    person.id = this.props.id;

    this.props.onUpdateClick(person);

  }

  render() {

    const component = () => {

      if(this.state.inEditMode) {

        return (

          <PersonForm

            id={this.props.id}

            first_name={this.props.first_name}

            last_name={this.props.last_name}

			email={this.props.email}
			
			contacted={this.props.contacted}

			notes={this.props.notes}

			time_created={this.props.time_created}

			time_updated={this.props.time_updated}

            onCancelClick={this.leaveEditMode}

            onFormSubmit={this.handleUpdate}

          />

        );

      }

      return (

        <Person

		  first_name={this.props.first_name}

          last_name={this.props.last_name}

	      email={this.props.email}
			
		  contacted={this.props.contacted}

		  notes={this.props.notes}

		  time_created={this.props.time_created}

		  time_updated={this.props.time_updated}
		  
		  onEditClick={this.enterEditMode}

          onDeleteClick={this.handleDelete}

        />

      )

    }

    return (

      <div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >

        {component()}

      </div>

    )

  }

}


class Person extends React.Component {

  render() {

    return (

      <div className="card">

        <div className="card-header d-flex justify-content-between">

          <span>

            <strong>Name: </strong>{this.props.first_name}&nbsp;{this.props.last_name}

          </span>

          <div>

            <span onClick={this.props.onEditClick} className="mr-2"><i className="far fa-edit"></i></span>

            <span onClick={this.props.onDeleteClick}><i className="fas fa-trash"></i></span>

          </div>

        </div>

        <div className="card-body">

          {this.props.email}
             <br />
		  {this.props.notes}
            <br />
		  {this.props.contacted}
<br />
		  {this.props.time_created}
<br />
		  {this.props.time_updated}

        </div>

    	</div>

	);

	}

}

class PersonForm extends React.Component {

  state = {

    first_name: this.props.first_name || '',

    last_name: this.props.last_name || '',

	email: this.props.email || '',

	notes: this.props.notes || '',
	
	contacted: this.props.contacted || '',

	time_created: this.props.time_created || '',

	time_updated: this.props.time_updated || ''

  }

  handleFormSubmit = (evt) => {

	evt.preventDefault();
	
    this.props.onFormSubmit({...this.state});

  }

  handleFirstNameUpdate = (evt) => {

    this.setState({first_name: evt.target.value});

  }
 handleLastNameUpdate = (evt) => {

    this.setState({last_name: evt.target.value});

  }

   handleEmailUpdate = (evt) => {

    this.setState({email: evt.target.value});

  }


  handleNotesUpdate = (evt) => {

    this.setState({notes: evt.target.value});

  }

   handleContactedUpdate = (evt) => {

    this.setState({contacted: evt.target.value});

  }

   handleTimeCreatedUpdate = (evt) => {

    this.setState({time_created: evt.target.value});

  }

  handleTimeUpdatedUpdate = (evt) => {

    this.setState({time_updated: evt.target.value});

  }

  render() {

    const buttonText = this.props.id ? 'Update Person': 'Create Person';

    return (

      <form onSubmit={this.handleFormSubmit}>

        <div className="form-group">

          <label>

            First Name

          </label>

          <input type="text" placeholder="First name"

            value={this.state.first_name} onChange={this.handleFirstNameUpdate}

            className="form-control"

          />

        </div>

        <div className="form-group">

          <label>

            Last Name

          </label>

          <input type="text" placeholder="Last name"

            value={this.state.last_name} onChange={this.handleLastNameUpdate}

            className="form-control"

          />

        </div>

<div className="form-group">

          <label>

            Email

          </label>

          <input type="text" placeholder="Email"

            value={this.state.email} onChange={this.handleEmailUpdate}

            className="form-control"

          />

        </div>

 <div className="form-group">

          <label>

            Notes

          </label>

          <textarea className="form-control" placeholder="Enter notes"

            rows="5" value={this.state.notes}

            onChange={this.handleNotesUpdate}

          >

            {this.state.notes}

          </textarea>

        </div>


<div className="form-group">

          <label>

            Contacted

          </label>

          <input type="text" placeholder="Were the leads contacted?"

            value={this.state.contacted} onChange={this.handleContactedUpdate}

            className="form-control"

          />

        </div>



       

<div className="form-group">

          <label>

            Time Created

          </label>

          <input type="text" placeholder="Time Created"

            value={this.state.time_created} onChange={this.handleTimeCreatedUpdate}

            className="form-control"

          />

        </div>


<div className="form-group">

          <label>

            Time Updated

          </label>

          <input type="text" placeholder="Time Updated"

            value={this.state.time_updated} onChange={this.handleTimeUpdatedUpdate}

            className="form-control"

          />

        </div>


        <div className="form-group d-flex justify-content-between">

          <button type="submit" className="btn btn-md btn-primary">

            {buttonText}

          </button>

          <button type="button" className="btn btn-md btn-secondary" onClick={this.props.onCancelClick}>

            Cancel

          </button>

        </div>

      </form>

    )

  }

}



class ToggleablePersonForm extends React.Component {

  state = {

    inCreateMode: false

  }

  handleCreateClick = () => {

    this.setState({inCreateMode: true});

  }

  leaveCreateMode = () => {

    this.setState({inCreateMode: false});

  }

  handleCancleClick = () => {

    this.leaveCreateMode();

  }

  handleFormSubmit = (person) => {

    this.leaveCreateMode();

    this.props.onPersonCreate(person);

  }

  render() {

    if (this.state.inCreateMode) {

      return (

        <div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >

          <PersonForm

            onFormSubmit={this.handleFormSubmit}

            onCancelClick={this.handleCancleClick}></PersonForm>

        </div>


      )

    }

    return (

      <button onClick={this.handleCreateClick} className="btn btn-secondary">

        <i className="fas fa-plus"></i>

      </button>

    );

  }

}


ReactDOM.render(<PersonDashboard />, document.getElementById('root'));
