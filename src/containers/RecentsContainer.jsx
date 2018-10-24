import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import { Paginator } from 'zooniverse-react-components';

import { config } from '../config';
import Title from '../components/Title';
import SubjectCard from '../components/SubjectCard';

class RecentsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      meta: null,
      recents: []
    };

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.fetchRecents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchRecents();
    }
  }

  onPageChange(page) {
    this.fetchRecents(page);
  }

  fetchRecents(page = 1) {
    const { user } = this.props;
    const query = {
      project_id: config.projectId,
      sort: '-created_at',
      page,
      page_size: 3
    };

    if (user && user.get) {
      user.get('recents', query).then(recents => {
        this.setState({ meta: recents[0].getMeta(), recents });
      });
    }
  }

  render() {
    return (
      <Box>
        <Title>Your Recent Classifications</Title>
        <Box direction="row" justify="around" responsive>
          {this.state.recents.length > 0 &&
            this.state.recents.map(recent => (
              <SubjectCard key={recent.id} subject={recent} />
            ))}
        </Box>
        {this.state.meta &&
          this.state.meta.page_count > 1 && (
            <Paginator
              page={this.state.meta.page}
              pageCount={this.state.meta.page_count}
              onPageChange={this.onPageChange}
            />
          )}
      </Box>
    );
  }
}

RecentsContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func
  })
};

RecentsContainer.defaultProps = {
  user: null
};

export default RecentsContainer;
