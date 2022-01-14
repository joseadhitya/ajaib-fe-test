import _ from 'lodash';
import React from 'react';

class Pagination extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pages: [],
    };
  };

  componentDidMount = () => {
    this.generatePages();
  };

  componentDidUpdate = (prevProps) => {
    if (!_.isEqual(prevProps.info, this.props.info)) {
      this.generatePages();
    };
  };

  generatePages = () => {
    let maxPage = _.get(this.props.info, 'pageSize');
    let pages = Array.from({ length: maxPage }, (_, i) => i + 1)
    this.setState({ pages: pages });
  };

  handleSelectPage = (newPage) => {
    if (_.head(this.state.pages) <= newPage && newPage <= _.tail(this.state.pages)) {
      _.invoke(this.props, 'onChange', { page: newPage });
    };
  };

  handlePrevPage = () => {
    let current = _.get(this.props.info, 'page');
    if (current && current - 1 >= _.head(this.state.pages)) {
      _.invoke(this.props, 'onChange', { page: current - 1 });
    };
  };

  handleNextPage = () => {
    let current = _.get(this.props.info, 'page');
    if (current && current + 1 <= _.tail(this.state.pages)) {
      _.invoke(this.props, 'onChange', { page: current + 1 });
    };
  };

  render() {
    return (
      <nav aria-label='Page navigation'>
        <ul className='pagination'>
          {_.get(this.props.info, 'page') === _.head(this.state.pages)
            ? <li className='page-item disabled'>
              <span className='page-link' onClick={this.handlePrevPage}>
                <i className='fas fa-angle-left' />
              </span>
            </li>
            : <li className='page-item'>
              <span className='page-link' onClick={this.handlePrevPage}>
                <i className='fas fa-angle-left' />
              </span>
            </li>
          }
          {this.state.pages.map((o, i) => (
            _.get(this.props.info, 'page') === o
              ? <li className='page-item active'>
                <span className='page-link' onClick={() => this.handleSelectPage(o)}>
                  {o}
                </span>
              </li>
              : <li className='page-item'>
                <span className='page-link' onClick={() => this.handleSelectPage(o)}>
                  {o}
                </span>
              </li>
          ))}
          {_.get(this.props.info, 'page') === _.tail(this.state.pages)
            ? <li className='page-item disabled'>
              <span className='page-link' onClick={this.handleNextPage}>
                <i className='fas fa-angle-right' />
              </span>
            </li>
            : <li className='page-item'>
              <span className='page-link' onClick={this.handleNextPage}>
                <i className='fas fa-angle-right' />
              </span>
            </li>
          }
        </ul>
      </nav>
    );
  };
};

export default Pagination;
