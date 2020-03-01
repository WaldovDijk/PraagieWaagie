import React from 'react'
import firebase from '../firebase'
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Icon,
    Label
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ParticleContainer from '../Components/Containers/ParticleContainer'
export default class Login extends React.Component{
    state = {
        email:"",
        password:"",
        errors:[],
        loading:false,
        auth:firebase.auth(),
        usersRef:firebase.database().ref("users"),
        user: firebase.auth().currentUser,
        provider: new firebase.auth.GoogleAuthProvider()
    }
    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)
    
    handleChange = event =>{
        this.setState({ [ event.target.name ]: event.target.value})
    }

    resetPassword = event =>{
        this.state.auth.sendPasswordResetEmail(this.state.email).then(() =>{
            console.log('Email send')
        }).catch(error =>{
            console.log(error)
        })
    }

    handleSubmit = event =>{
        event.preventDefault()
        if(this.isFormValid(this.state)){
            this.setState({errors:[], loading:true})
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser)
                })
                .catch(err =>{
                    console.error(err)
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading:false
                    })
                })
        }
    }

    isFormValid = ({email, password})=> email && password

    handleInPutError = (errors, inputName) =>{
        return errors.some(error => error.message.toLowerCase().includes(inputName))
        ? "error"
        : ""
    }

    logInGoogle= ()=>{
        firebase.auth().signInWithRedirect(this.state.provider)
        .then((result) =>{
            if(result.credential){
                const token = result.credential.accessToken
                console.log(result)
            }   
        })
    }


    render(){
        const {email, errors, password, loading} = this.state
        return(
            <div>
                <ParticleContainer/>
                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as="h1" icon color="red" textAlign="center">
                            <Icon name="sign-in" color="red"/>
                            Login to GLU-praag
                        </Header>
                        <Form onSubmit={this.handleSubmit} size="large">
                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="e-mail"
                                onChange={this.handleChange}
                                value={email}
                                className={this.handleInPutError(errors, "mail")}
                                type="email"
                            />
                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="password"
                                onChange={this.handleChange}
                                value={password}
                                className={this.handleInPutError(errors, "password")}
                                type="password"
                            />
                            <Button
                                disabled={loading}
                                className={loading ? "loading" : ""}
                                color="white"
                                fluid
                                size="large"
                            >
                                Login
                            </Button>
                            <br/>
                            <Link to="/"><Button fluid size="large">Register</Button></Link>
                            <br/>
                            <Button icon onClick={this.logInGoogle} labelPosition="left">
                                <Icon name="google"/>
                                Login with Google
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}