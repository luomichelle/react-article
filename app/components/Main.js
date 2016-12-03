// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router')

// Create the Main component
var Main = React.createClass({

	render: function(){

		return(
			/*We can only render a single div. So we need to group everything inside of this main-container one*/
			<div className="main-container">


				<div className="container">
					{/*Navbar*/}
					<nav className="navbar navbar-default" role="navigation">
						<div className="container-fluid">
							<div className="navbar-header">
								<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
								<a className="navbar-brand" href="#">NYT-React</a>
							</div>
					
							<div className="collapse navbar-collapse navbar-ex1-collapse">
								<ul className="nav navbar-nav navbar-right">
									<li><a href="#/search">Search</a></li>
									<li><a href="#/saved">Saved Articles</a></li>
								</ul>
							</div>
						</div>
					</nav>

					{/*Jumbotron*/}
					<div className="jumbotron">
						<h2 className="text-center"><strong>(ReactJS) New York Times Article Scrubber</strong></h2>
						<h3 className="text-center">Search for and save articles of interest.</h3>
					</div>


					{/*Here we will load the sub components (Search or Saved */}
					{/*These sub-components are getting passed as this.props.children*/}
					{this.props.children}

					<footer>
						<hr />
						<p className="pull-right"><i className="fa fa-github" aria-hidden="true"></i> Proudly built using React.js</p>
					</footer>
				</div>



			</div>
		)
	}
});

// Export the module back to the route
module.exports = Main;