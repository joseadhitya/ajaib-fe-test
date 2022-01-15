import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      crumbs: [],
    };
  };

  componentDidMount = () => {
    let crumbs = this.getCrumbs(this.props.location.pathname, this.props.routes);
    this.setState({ crumbs: crumbs });
  };

  getCrumbs = (location, routes) => {
    let crumbs = [];
    routes.forEach((o, i) => {
      if (_.isEqual(location, o.path)) {
        // Check if location is exactly path
        crumbs = [{ path: o.path, name: o.name, active: true }];

        // If has children, also includes children on breadcrumb
        if (_.has(o, 'children')) {
          o.children.forEach((p, j) => {
            crumbs = [...crumbs, { path: p.path, name: p.name, active: false }];
          });
        };
      } else if (_.startsWith(location, o.path)) {
        // If not exact, then check if location contains the path
        crumbs = [{ path: o.path, name: o.name, active: false }];

        // Then repeat the check for the children
        if (_.has(o, 'children')) {
          location = _.trimStart(location, o.path);
          location = '/' + _.trimStart(location, '/');
          let childCrumbs = this.getCrumbs(location, o.children);
          crumbs = [...crumbs, ...childCrumbs];
        };
      };
    });
    return crumbs;
  };

  render() {
    return (
      <nav aria-label='breadcrumb' data-testid='breadcrumb'>
        <ol className='breadcrumb'>
          {this.state.crumbs.map((o, i) => (
            o.active === true
              ? <Link key={i} className='breadcrumb-item active' to={o.path} data-testid='breadcrumb-item' >{o.name}</Link>
              : <Link key={i} className='breadcrumb-item' to={o.path} data-testid='breadcrumb-item' >{o.name}</Link>
          ))}
        </ol>
      </nav>
    );
  };
};

export default Breadcrumb;
