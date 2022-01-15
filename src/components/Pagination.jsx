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
    let current = _.get(this.props.info, 'page');
    if (_.head(this.state.pages) <= newPage && newPage <= _.tail(this.state.pages) && newPage !== current) {
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
      <nav aria-label='Page navigation' data-testid='pagination'>
        <ul className='pagination'>
          {_.get(this.props.info, 'page') === _.head(this.state.pages)
            ? <li className='page-item disabled' data-testid='pagination-item' onClick={this.handlePrevPage}>
              <span className='page-link'>
                <i className='fas fa-angle-left' />
              </span>
            </li>
            : <li className='page-item' data-testid='pagination-item' onClick={this.handlePrevPage}>
              <span className='page-link'>
                <i className='fas fa-angle-left' />
              </span>
            </li>
          }
          {this.state.pages.map((o, i) => (
            _.get(this.props.info, 'page') === o
              ? <li key={i} className='page-item active' data-testid='pagination-item' onClick={() => this.handleSelectPage(o)}>
                <span className='page-link'>
                  {o}
                </span>
              </li>
              : <li key={i} className='page-item' data-testid='pagination-item' onClick={() => this.handleSelectPage(o)}>
                <span className='page-link'>
                  {o}
                </span>
              </li>
          ))}
          {_.get(this.props.info, 'page') === _.tail(this.state.pages)
            ? <li className='page-item disabled' data-testid='pagination-item' onClick={this.handleNextPage}>
              <span className='page-link'>
                <i className='fas fa-angle-right' />
              </span>
            </li>
            : <li className='page-item' data-testid='pagination-item' onClick={this.handleNextPage}>
              <span className='page-link'>
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
