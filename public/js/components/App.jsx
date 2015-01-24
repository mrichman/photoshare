var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Navbar = React.createClass({
    render: function(){
        return (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-links">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="front"><i className="fa fa-camera"></i> Wallshare</a>
            </div>
            <div className="collapse navbar-collapse" id="navbar-links">
                <ul className="nav navbar-nav navbar-left">
                    <li><Link to="popular"><i className="fa fa-fire"></i> Popular</Link>
                    </li>
                    <li><Link to="latest"><i className="fa fa-clock-o"></i> Latest</Link>
                    </li>
                    <li><a href="tags"><i className="fa fa-tags"></i> Tags</a>
                    </li>
                    <li><a href="upload"><i className="fa fa-upload"></i> Upload</a>
                    </li>
                </ul>
                <form className="navbar-form navbar-left" role="search" name="searchForm" novalidate>
                    <div className="form-group">
                        <input type="text" className="form-control input-sm" placeholder="Search" data-toggle="tooltip" data-placement="bottom" title="Prefix search with '#' for tags and '@' for users" required />
                        <button type="submit" className="btn btn-default btn-sm"><i className="fa fa-search"></i>
                        </button>
                    </div>
                </form>

                <ul className="nav navbar-nav navbar-right">
                    <li href="login"><a href=""><i className="fa fa-log-in"></i> Login</a>
                    </li>
                    <li href="signup"><a href="#/signup"><i className="fa fa-user"></i> Signup</a>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown">
                            <img  />&nbsp;danjac <i className="caret"></i>
                        </a>
                        <ul className="dropdown-menu" role="menu">
                            <li><a href="">My photos</a>
                            </li>
                            <li><a href="#/changepass">Change my password</a>
                            </li>
                            <li><a href="">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
    }

});

var App = React.createClass({
    render: function() {
        return (
    <div>
        <Navbar />
        <div className="container-fluid">
        <RouteHandler />
        </div>
    </div>
        );
    }

});

module.exports = App;