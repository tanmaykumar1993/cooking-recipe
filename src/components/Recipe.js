import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Header from './Header';
import $ from 'jquery';

const API_KEY = process.env.REACT_APP_API_KEY;
const cors_url = process.env.REACT_APP_CORS_ANYWHERE_URL;
 // eslint-disable-next-line
const env_mode =  process.env.REACT_APP_STAGE;

class Recipe extends Component {

  state = {
    activeRecipe: { },
    length:-1
  }

  componentWillMount = async () => {     
     const recipeId = this.props.match.params.id;
     const api_call = await fetch(`${cors_url}http://food2fork.com/api/get?key=${API_KEY}&rId=${recipeId}`);
     const data = await api_call.json();
     //if(data.recipe.length <= 0) return (<Redirect to='/error'/>);
     this.setState({activeRecipe: data.recipe, length:data.recipe.length});
     $('#preloader').fadeOut('slow',function(){$(this).remove();});
     //console.log(this.state);
  }

  componentDidMount() {
  }

  dcdChar(input) {
    if (input === undefined ) return 'Loading...';
    var y = document.createElement('textarea');
    y.innerHTML = input;
    return y.value;
  }

  render() {
    const recipe = this.state.activeRecipe;
    return (
        <div> 
            {this.state.length === 0?  <Redirect to='/error'/> :"" }
            <Header/>
        <div className="container mx-auto px-auto">
        <div id="preloader"></div>
            { 
                
                <div className="row" >
                    <div className="col-md-6">
                        <img 
                        className="active-recipe__img loader" 
                        src={recipe.image_url} alt={recipe.title ? recipe.title : "Loading..."}/>
                    </div>
                    <div className="col-md-6" >
                        <div className="active-recipe" >            
                            <h3 className="active-recipe__title" >{ this.dcdChar.bind(this)(recipe.title)}</h3>
                            <h4 className="active-recipe__publisher">
                            Publisher: <span>{ recipe.publisher }</span>
                            </h4>
                            <p className="active-recipe__website">Website: 
                            <span><a target="new" href={recipe.publisher_url}>{recipe.publisher_url}</a></span>
                            </p >
                            <h4 className="active-recipe__publisher">Ingredients:</h4>
                            <p className="active-recipe__ingredients">   </p>                     
                                <ul>{
                                    Object.keys(recipe).length <= 0? "Loading..." : 
                                    recipe.ingredients.map((item, index )=> (
                                        <li key={item+index}>{item}</li>
                                    ))
                                }</ul>
                            
                            <button className="active-recipe__button mb-4">
                            <Link to="/">Go Home</Link>
                            </button>
                            <button className="active-recipe__button">
                            <a target="new" href={recipe.source_url}>Get Direction</a>
                            </button>
                        </div>
                    </div>
                </div>

            }
        </div>
    </div>
    );
  }
}
export default  Recipe;