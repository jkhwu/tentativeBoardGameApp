import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './EventListItem.css';

function EventListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/events/${props.event.slug}-${props.event.cuid}`} >
          {props.event.eventName}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.user.fullName}</p>
      <p className={styles['post-desc']}>{props.event.game}</p>
      <p className={styles['post-desc']}>{props.event.scheduledDate}</p>
      <p className={styles['post-desc']}>0/{props.event.slots}</p>
      <p className={styles['post-desc']}>{props.event.notes}</p>
      <hr className={styles.divider} />
    </div>
  );
}

EventListItem.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
    scheduledDate: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // Not In Use - Rob, will delete after testing.
};

export default EventListItem;
