import React from 'react';
import ChallengeCard from './ChallengeCard';
function ChallengeList(props) {
  return (
    <div className={`${props.styles.challengeContainer} ${props.styles.hScroll}`}>
      <div>
        {props.data
          ? props.data.map((item, index) => (
              <ChallengeCard styles={props.styles} item={item} index={index} key={item.id} />
            ))
          : ''}
      </div>
    </div>
  );
}

export default ChallengeList;
