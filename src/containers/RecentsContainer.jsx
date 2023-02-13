import PropTypes from 'prop-types';
import React from 'react';
import Anchor from 'grommet/components/Anchor';
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
      recents: null
    };

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.fetchRecents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.explorer !== this.props.explorer) {
      this.fetchRecents();
    }
  }

  onPageChange(page) {
    this.fetchRecents(page);
  }

  fetchRecents(page = 1) {
    const { explorer } = this.props;
    if (explorer && explorer.get) {
      const query = {
        project_id: config.projectId,
        sort: '-created_at',
        page,
        page_size: 3
      };

      explorer
        .get('recents', query)
        .then((recents) => {
          if (recents.length) {
            this.setState({ meta: recents[0].getMeta(), recents });
          } else {
            this.setState({ meta: null, recents: null });
            console.warn('Recents empty.');
          }
        })
        .catch(() => {
          if (console) {
            console.warn('Failed to fetch recents.');
          }
        });
    } else {
      this.setState({ meta: null, recents: null });
    }
  }

  render() {
    let firstPage;
    let lastPage;
    if (this.state.meta) {
      firstPage = Math.max(1, this.state.meta.page);
      lastPage = Math.min(this.state.meta.page_count, firstPage + 9);
    }

    const { project } = this.props;

    return (
      <Box pad="medium">
        <Title>
          <Anchor
            className="title-anchor"
            href={`${config.zooniverse}/projects/${
              project ? project.slug : ''
            }/recents`}
          >
            Your Recent Classifications
          </Anchor>
        </Title>
        <Box direction="row" flex justify="around">
          {this.state.recents &&
            this.state.recents.map((recent) => (
              <SubjectCard key={recent.id} subject={recent} />
            ))}
        </Box>
        {this.state.meta && this.state.meta.page_count > 1 && (
          <Paginator
            itemCount
            page={this.state.meta.page}
            pageCount={lastPage}
            onPageChange={this.onPageChange}
            totalItems={`TOTAL ${this.state.meta.page_count.toLocaleString()}`}
          />
        )}
      </Box>
    );
  }
}

RecentsContainer.propTypes = {
  explorer: PropTypes.shape({
    get: PropTypes.func
  }),
  project: PropTypes.shape({
    slug: PropTypes.string
  })
};

RecentsContainer.defaultProps = {
  explorer: null,
  project: {
    slug: ''
  }
};

export default RecentsContainer;
