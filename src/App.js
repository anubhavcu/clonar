import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './App.scss';
import { drawBoundaries, drawMesh } from './utilities';
// import redLens from './images/redLens.png';
import lenses from './Lenses';

const App = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const interval = useRef(null);
  const face = useRef(null);
  //   const [loading, setLoading] = useState(false)
  const [currentLens, setCurrentLens] = useState(
    lenses[Object.keys(lenses)[0]]
  );
  const detect = useCallback(
    async (model) => {
      if (webcamRef.current === null || canvasRef.current === null) return;
      if (
        typeof webcamRef.current !== 'undefined' &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth || 640;
        const videoHeight = webcamRef.current.video.videoHeight || 480;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });

        try {
          face.current = await model.estimateFaces({
            input: video,
            scale: 0.8,
          });
        } catch (err) {
          console.log('model detection error ', err);
        } finally {
          // console.log(face);
          // ctx.canvas.width = videoWidth;
          // ctx.canvas.height = videoHeight;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // get consistent width and height of canvas
          ctx.canvas.width =
            videoWidth || document.body.getBoundingClientRect().width;
          ctx.canvas.height =
            videoHeight || document.body.getBoundingClientRect().height;
          // draw video on canvas
          ctx.drawImage(video, 0, 0);

          // draw face-in-view boundaries
          drawBoundaries(face.current, ctx);

          let images = { leftEye: currentLens, rightEye: currentLens };
          drawMesh(face.current, ctx, images, canvas, video);
        }
      }
    },
    [currentLens]
  );
  // triggers the predictions
  const runFaceMesh = useCallback(
    (model) => {
      if (interval.current) clearInterval(interval.current);
      interval.current = setInterval(() => {
        detect(model);
      }, 40);
    },
    [detect]
  );

  // load modal on mount or if user captured image change
  useEffect(() => {
    async function loadModel() {
      let model;
      try {
        await tf.setBackend('webgl');
        // await tf.setBackend('wasm');
        if (!model)
          model = await faceLandmarksDetection.load(
            faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
            { maxFaces: 1 }
          );
        console.log(model);
      } catch (err) {
        console.log('Modal load error', err);
      } finally {
        runFaceMesh(model);
      }
    }
    loadModel();
  }, [runFaceMesh, webcamRef]);

  // draws video feed on canvas
  //   const drawCanvas = () => {
  //     if (webcamRef.current === null || canvasRef.current === null) return;

  //     if (
  //       typeof webcamRef.current !== 'undefined' &&
  //       webcamRef.current !== null &&
  //       webcamRef.current.video.readyState === 4
  //     ) {
  //       const video = webcamRef.current.video;

  //       const ctx = canvasRef.current.getContext('2d', { alpha: false });
  //       ctx.canvas.width = 640;
  //       ctx.canvas.height = 480;
  //       ctx.drawImage(video, 0, 0);
  //     }
  //   };

  //   setInterval(() => {
  //     drawCanvas();
  //   }, 40);

  return (
    <div className='App'>
      <h2>CLONAR</h2>
      <Webcam
        muted={false}
        ref={webcamRef}
        // mirrored
        screenshotFormat='image/jpeg'
        preload='auto'
      />
      <canvas ref={canvasRef} />

      <div className='lens-container'>
        {Object.keys(lenses).map((item, idx) => (
          <div
            className='lens-image'
            key={idx}
            onClick={() => {
              console.log('current lens ', lenses[item]);
              const elem = document.getElementById('elem');
              if (elem) {
                console.log('elem hai', elem);
                elem.parentNode.removeChild(elem);
              }
              setCurrentLens(lenses[item]);
            }}
          >
            <img
              src={lenses[item]}
              alt='img'
              // onClick={setCurrentLens(lenses[item])}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
