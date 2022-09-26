import React, { useEffect, useRef, useState } from 'react';
import styles from './PlusPage.module.css';
import RecordRTC, { invokeSaveAsDialog } from 'recordrtc';
import dummy from '../assets/sound/dummy.mp3';

function PlusPage() {
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [pause, setPause] = useState(false);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);
  const [number, setNumber] = useState(null);
  const [waitButton, setWaitButton] = useState(false);
  const [changeCam, setChangeCam] = useState('user');
  const [mp3, setMp3] = useState(null);

  const handleRecording = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        frameRate: 30,
        facingMode: changeCam,
      },
      audio: false,
    });

    if (blob) {
      setBlob(null);
    }
    setStream(mediaStream);
    recorderRef.current = new RecordRTC(mediaStream, {
      type: 'video',
      mimeType: 'video/webm;codecs=vp9',
    });
    recorderRef.current.startRecording();
    mp3.currentTime = 0;
    mp3.play();
    setToggleBtn(true);
    setWaitButton(true);
  };

  const handlePause = () => {
    recorderRef.current.pauseRecording();
    setToggleBtn(false);
    setPause(true);
    mp3.pause();
    setWaitButton(false);
  };

  const handleResume = () => {
    recorderRef.current.resumeRecording();
    setToggleBtn(true);
    mp3.play();
    setWaitButton(true);
  };

  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
      refVideo.current.srcObject = null;
    });
    mp3.pause();
    setWaitButton(false);
    setNumber(15);
  };

  const handleSave = () => {
    invokeSaveAsDialog(blob);
  };

  const handleDirection = () => {
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    if (changeCam === 'user') {
      console.log('유저유저');
      setChangeCam({ exact: 'environment' });
      let mediaStream;
      const start = async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            frameRate: 30,
            facingMode: { exact: 'environment' },
          },
          audio: false,
        });
        setStream(mediaStream);
        refVideo.current.srcObject = mediaStream;
        console.log('망했다');
      };
      start();
    } else {
      console.log('후면후면');
      setChangeCam('user');
      let mediaStream;
      const start = async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            frameRate: 30,
            facingMode: 'user',
          },
          audio: false,
        });
        setStream(mediaStream);
        refVideo.current.srcObject = mediaStream;
        console.log(refVideo.current.srcObject);
      };
      start();
    }
  };

  useEffect(() => {
    if (!refVideo.current) {
      return;
    }
    refVideo.current.srcObject = stream;
  }, [stream, refVideo]);

  useEffect(() => {
    let mediaStream;

    const start = async () => {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          frameRate: 30,
          facingMode: 'user',
        },
        audio: false,
      });
      setStream(mediaStream);
    };
    start();
    setNumber(15);
    setMp3(new Audio(dummy));
    return () => {
      if (stream) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
      if (mp3) {
        mp3.pause();
      }
    };
  }, []);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => {
          setNumber(15);
          setWaitButton(false);
          clearInterval(id);
        };
      }
    }, [delay]);
  };

  useInterval(
    () => {
      if (waitButton) {
        setNumber((number - 0.1).toFixed(1));
      }
    },
    number < 0 ? null : 100
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.coverBox}>
        <div style={{ flex: 1, flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <div style={{ backgroundColor: 'white' }}>프로그레스바</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ backgroundColor: 'white' }}>챌린지 선택</div>
          </div>
        </div>
        <div style={{ flex: 9, flexDirection: 'row' }}></div>
        {!blob ? (
          toggleBtn ? (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'white',
                  marginBottom: 10,
                }}
              >
                {number}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: 2,
                  justifyContent: 'center',
                }}
              >
                <button className={styles.pauseBtn} onClick={handlePause}></button>
              </div>

              <button onClick={handleStop}>보내기</button>
            </>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'white',
                  marginBottom: 10,
                }}
              >
                {number}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: 2,
                  justifyContent: 'center',
                }}
              >
                <button
                  className={styles.recordBtn}
                  onClick={pause ? handleResume : handleRecording}
                ></button>
              </div>
              {number < 15 ? <button onClick={handleStop}>보내기</button> : null}
              <button onClick={handleDirection}>전환</button>
            </>
          )
        ) : (
          ''
        )}
      </div>
      {blob ? (
        <video
          src={URL.createObjectURL(blob)}
          autoPlay
          loop
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <video autoPlay ref={refVideo} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
}

export default PlusPage;
