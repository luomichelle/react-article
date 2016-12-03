// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router')

// Include the Helper (for the saved recall)
var helpers = require('../utils/helpers');

console.log("Loaded newest");
// Create the Main component
var Main = React.createClass({

	getInitialState: function(){
		return {
			newestArticles: ""
		}
	},

	componentDidMount: function(){

		helpers.getSaved()
			.then(function(articleData){
				this.setState({
					newestArticle: articleData.data
				});
				console.log("saved results", articleData.data);
			}.bind(this))
	},

	// /*This code handles the sending of the search terms to the parent Search component*/
	handleClick: function(item, event){
		console.log("CLICKED");
		console.log(item);

		// Delete the list!
		helpers.deleteSaved(item.title, item.date, item.url)
			.then(function(data){

			// Get the revised list!
			helpers.getSaved()
				.then(function(articleData){
					this.setState({
						newestArticle: articleData.data
					});
					console.log("saved results", articleData.data);
				}.bind(this))



			}.bind(this))
	},

	render: function(){

		if (this.state.newestArticle == "") {
			return(

				<li className="list-group-item">

					<h3>
					  	<span><em>Save your first article...</em></span>
					</h3>

			  	</li>

			)
		}

		else {

			var articles = this.state.newestArticle.map(function(article, index){

				return(

						<div key={index}>

						  <li className="list-group-item" >

							<h3>
							  	<span><em>{article.title}</em></span>
								<span className="btn-group pull-right" >
									<a href={article.url} target="_blank"><button className="btn btn-default ">View Article</button></a>
									<button className="btn btn-primary" onClick={this.handleClick.bind(this, article)}>Delete</button>
								</span>
							</h3>
							<p>Date Published: {article.date}</p>


						  </li>

						</div>
				)

			}.bind(this))

		}


		return(
			<div className="main-container">
				<div className="row">
					<div className="col-lg-12">

						<div className="panel panel-primary">
							<div className="panel-heading">
								<h1 className="panel-title"><strong><i className="fa fa-download" aria-hidden="true"></i> New! </strong></h1>
							</div>
							<div className="panel-body">
								<ul className="list-group">
								Trump Does something
								</ul>
							</div>
						</div>

					</div>
				</div>


			</div>

		)
	}
});

// Export the module back to the route
module.exports = Main;
