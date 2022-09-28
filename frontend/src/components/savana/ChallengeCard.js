import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import {
  RiZoomInFill,
  RiMessage3Line,
  RiHeart2Fill,
  RiHeart2Line,
  RiShareFill,
  RiBearSmileFill,
} from 'react-icons/ri';
import swal from 'sweetalert';
import Sheet from 'react-modal-sheet';
import SavanaComment from './SavanaComment';

function ProgressBar(props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const newValue = props.width * props.percent;
    setValue(newValue);
  }, [props.width, props.percent]);
  return (
    <div className={props.styles.progressDiv} style={{ width: props.width }}>
      <div style={{ width: `${value}px` }} className={props.styles.progress} />
    </div>
  );
}

function ChallengeCard(props) {
  // 마우스 오버 상태
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [like, setLike] = useState(false);

  function copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    swal('링크 복사가 완료되었습니다');
  }

  const likeButtonClick = () => {
    setLike(!like);
  };

  return (
    <div
      className={props.styles.cardWrapper}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className={props.styles.coverBox}>
        <div className={props.styles.blankBox}></div>

        <div className={props.styles.iconBox}>
          <a href="/challenge/${challengeId}">
            <RiZoomInFill className={props.styles.clickIcon}></RiZoomInFill>
          </a>
          <div>
            <a onClick={likeButtonClick}>
              {like ? (
                <RiHeart2Line className={props.styles.clickIcon}></RiHeart2Line>
              ) : (
                <RiHeart2Fill className={props.styles.likeIcon}></RiHeart2Fill>
              )}
            </a>
            <div className={props.styles.iconCount}>32</div>
          </div>
          <div>
            <a onClick={() => setOpen(true)} class="button">
              <RiMessage3Line className={props.styles.clickIcon}></RiMessage3Line>
              <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container style={{ height: '500px' }}>
                  <Sheet.Header />
                  <Sheet.Content style={{ margin: '20px' }}>
                    <SavanaComment></SavanaComment>
                  </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
              </Sheet>
            </a>
            <div className={props.styles.iconCount}>25</div>
          </div>

          <a>
            <RiShareFill className={props.styles.clickIcon} onClick={copy}></RiShareFill>
          </a>
          <a href="/donation">
            <RiBearSmileFill className={props.styles.clickIcon}></RiBearSmileFill>
          </a>
        </div>
        <div className={props.styles.infoBox}>
          <div className={props.styles.infoTop}>
            <div className={props.styles.infoText}>나연이랑 연탄팝팝!</div>
          </div>
          <ProgressBar styles={props.styles} width={350} percent={0.7}></ProgressBar>
          <div className={props.styles.infoBot}>
            <span className={props.styles.infoText}>251명</span>
            <span className={props.styles.infoText}>70%</span>
          </div>
        </div>
      </div>
      <ReactPlayer
        className={props.styles.reactPlayer}
        config={{
          youtube: {
            playerVars: { modestbranding: 1, mute: 1 },
          },
        }}
        url="https://www.youtube.com/watch?v=fgaLAomg68c"
        width="100%"
        height="100%"
        playing={hover}
        controls={false}
        loop={true}
      />
    </div>
  );
}

export default ChallengeCard;
