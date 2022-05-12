// triangulation metrics
import { TRIANGULATION } from './triangulations';
const NUM_KEYPOINTS = 468;
const NUM_IRIS_KEYPOINTS = 5;

function distance(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

export function drawBoundaries(predictions, ctx) {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const bottomRight = prediction.boundingBox.bottomRight;
      const topLeft = prediction.boundingBox.topLeft;
      const faceInViewConfidence = prediction.faceInViewConfidence;

      ctx.beginPath();
      ctx.lineWidth = '4';
      ctx.strokeStyle = faceInViewConfidence < 0.99 ? 'red' : 'green';
      ctx.rect(
        topLeft[0],
        topLeft[1],
        bottomRight[0] - topLeft[0],
        bottomRight[1] - topLeft[1]
      );
      ctx.stroke();
    });
  }
}

export const drawMesh = (predictions, ctx, images, canvas, video) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      console.log('drawMesh');
      // const prediction = predictions[0];
      const keypoints = prediction.scaledMesh;
      const leftEyeLower0 = prediction.annotations.leftEyeLower0;
      const leftEyeUpper0 = prediction.annotations.leftEyeUpper0;

      // add green red boundary
      const bottomRight = prediction.boundingBox.bottomRight;
      const topLeft = prediction.boundingBox.topLeft;
      const faceInViewConfidence = prediction.faceInViewConfidence;

      // drawing dots
      //   loop(keypoints);
      const lowerLeft = leftEyeLower0.map((item, idx) => {
        let x1 = item[0],
          y1 = item[1];
        return [x1, y1];
      });
      //   console.log('lower left', lowerLeft);
      const upperLeft = leftEyeUpper0.map((item, idx) => {
        let x1 = item[0],
          y1 = item[1];
        return [x1, y1];
      });
      //   console.log('upper left ', upperLeft);
      let centerLeft = [];
      for (let i = 2; i < upperLeft.length - 2; i++) {
        let dx = (upperLeft[i][0] + lowerLeft[i][0]) / 2;
        let dy = (upperLeft[i][1] + lowerLeft[i][1]) / 2;
        centerLeft.push([dx, dy]);
      }
      console.log('center left ... ', centerLeft);
      //   ctx.drawImage(video, 0, 0);

      // var img = new Image();
      // img.onload = async function() {           // add async handler
      // when loaded, draw image (this)
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // calcualting brightness
      var colorSum = 0;
      var data = imageData.data;
      var r, g, b, avg;
      for (var x = 0, len = data.length; x < len; x += 4) {
        r = data[x];
        g = data[x + 1];
        b = data[x + 2];
        avg = Math.floor((r + g + b) / 3);
        colorSum += avg;
      }
      //   brightness = 10000;
      let brightness = Math.floor(colorSum / (canvas.width * canvas.height));
      //   console.log(brightness, 'brightness');

      ctx.putImageData(contrastImage(imageData, 0.98), 0, 0);
      //   imageData = tf.image.adjust_brightness(
      //     imageData, delta = -0.9
      //     )
      // prediction = await predictions(imageData);
      // drawLensToCanvas(prediction[0], lensImage, ctx, brightness);

      if (keypoints.length > NUM_KEYPOINTS) {
        ctx.fillStyle = 'WHITE';
        ctx.lineWidth = 1;
        const leftCenter = keypoints[NUM_KEYPOINTS];
        // adding 5 to get better performance
        const leftDiameterY =
          distance(keypoints[NUM_KEYPOINTS + 4], keypoints[NUM_KEYPOINTS + 2]) +
          3.5;
        const leftDiameterX =
          distance(keypoints[NUM_KEYPOINTS + 3], keypoints[NUM_KEYPOINTS + 1]) +
          3.5;

        let lux0 = prediction.annotations.leftEyeUpper0[0][0];
        let luy0 = prediction.annotations.leftEyeUpper0[0][1];

        let lux1 = prediction.annotations.leftEyeUpper0[1][0];
        let luy1 = prediction.annotations.leftEyeUpper0[1][1];

        let lux2 = prediction.annotations.leftEyeUpper0[2][0];
        let luy2 = prediction.annotations.leftEyeUpper0[2][1];

        let lux3 = prediction.annotations.leftEyeUpper0[3][0];
        let luy3 = prediction.annotations.leftEyeUpper0[3][1];

        let lux4 = prediction.annotations.leftEyeUpper0[4][0];
        let luy4 = prediction.annotations.leftEyeUpper0[4][1];

        let lux5 = prediction.annotations.leftEyeUpper0[5][0];
        let luy5 = prediction.annotations.leftEyeUpper0[5][1];

        let lux6 = prediction.annotations.leftEyeUpper0[6][0];
        let luy6 = prediction.annotations.leftEyeUpper0[6][1];

        let llx0 = prediction.annotations.leftEyeLower0[0][0];
        let lly0 = prediction.annotations.leftEyeLower0[0][1];

        let llx1 = prediction.annotations.leftEyeLower0[1][0];
        let lly1 = prediction.annotations.leftEyeLower0[1][1];

        let llx2 = prediction.annotations.leftEyeLower0[2][0];
        let lly2 = prediction.annotations.leftEyeLower0[2][1];

        let llx3 = prediction.annotations.leftEyeLower0[3][0];
        let lly3 = prediction.annotations.leftEyeLower0[3][1];

        let llx4 = prediction.annotations.leftEyeLower0[4][0];
        let lly4 = prediction.annotations.leftEyeLower0[4][1];

        let llx5 = prediction.annotations.leftEyeLower0[5][0];
        let lly5 = prediction.annotations.leftEyeLower0[5][1];

        let llx6 = prediction.annotations.leftEyeLower0[6][0];
        let lly6 = prediction.annotations.leftEyeLower0[6][1];

        let llx7 = prediction.annotations.leftEyeLower0[7][0];
        let lly7 = prediction.annotations.leftEyeLower0[7][1];

        let llx8 = prediction.annotations.leftEyeLower0[8][0];
        let lly8 = prediction.annotations.leftEyeLower0[8][1];

        ctx.beginPath();
        ctx.moveTo(lux0, luy0);
        ctx.quadraticCurveTo(lux1, luy1, lux2, luy2);
        ctx.quadraticCurveTo(lux3, luy3, lux4, luy4);
        ctx.quadraticCurveTo(lux5, luy5, lux6, luy6);
        ctx.quadraticCurveTo(llx8, lly8, llx7, lly7);
        ctx.quadraticCurveTo(llx6, lly6, llx5, lly5);
        ctx.quadraticCurveTo(llx4, lly4, llx3, lly3);
        ctx.quadraticCurveTo(llx2, lly2, llx1, lly1);
        ctx.quadraticCurveTo(llx0, lly0, lux0, luy0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.save();
        ctx.clip();

        // To Adjust the transparency of the lens image
        // This linear function is subject to modifications based on experimentation
        // ctx.globalAlpha = 1000 * 8/2000;
        const leftImg = new Image();
        leftImg.src = images.leftEye;
        console.log(images.leftEye);
        console.log(leftImg);
        if (leftImg) {
          ctx.drawImage(
            leftImg,
            leftCenter[0] - leftDiameterX / 2,
            leftCenter[1] - leftDiameterY / 2,
            leftDiameterX,
            leftDiameterY
          );
        }
        ctx.restore();
        ctx.save();

        if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
          const rightCenter = keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS];

          const rightDiameterY =
            distance(
              keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2],
              keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]
            ) + 3.5;
          const rightDiameterX =
            distance(
              keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3],
              keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]
            ) + 3.5;

          let rux0 = prediction.annotations.rightEyeUpper0[0][0];
          let ruy0 = prediction.annotations.rightEyeUpper0[0][1];

          let rux1 = prediction.annotations.rightEyeUpper0[1][0];
          let ruy1 = prediction.annotations.rightEyeUpper0[1][1];

          let rux2 = prediction.annotations.rightEyeUpper0[2][0];
          let ruy2 = prediction.annotations.rightEyeUpper0[2][1];

          let rux3 = prediction.annotations.rightEyeUpper0[3][0];
          let ruy3 = prediction.annotations.rightEyeUpper0[3][1];

          let rux4 = prediction.annotations.rightEyeUpper0[4][0];
          let ruy4 = prediction.annotations.rightEyeUpper0[4][1];

          let rux5 = prediction.annotations.rightEyeUpper0[5][0];
          let ruy5 = prediction.annotations.rightEyeUpper0[5][1];

          let rux6 = prediction.annotations.rightEyeUpper0[6][0];
          let ruy6 = prediction.annotations.rightEyeUpper0[6][1];

          let rlx0 = prediction.annotations.rightEyeLower0[0][0];
          let rly0 = prediction.annotations.rightEyeLower0[0][1];

          let rlx1 = prediction.annotations.rightEyeLower0[1][0];
          let rly1 = prediction.annotations.rightEyeLower0[1][1];

          let rlx2 = prediction.annotations.rightEyeLower0[2][0];
          let rly2 = prediction.annotations.rightEyeLower0[2][1];

          let rlx3 = prediction.annotations.rightEyeLower0[3][0];
          let rly3 = prediction.annotations.rightEyeLower0[3][1];

          let rlx4 = prediction.annotations.rightEyeLower0[4][0];
          let rly4 = prediction.annotations.rightEyeLower0[4][1];

          let rlx5 = prediction.annotations.rightEyeLower0[5][0];
          let rly5 = prediction.annotations.rightEyeLower0[5][1];

          let rlx6 = prediction.annotations.rightEyeLower0[6][0];
          let rly6 = prediction.annotations.rightEyeLower0[6][1];

          let rlx7 = prediction.annotations.rightEyeLower0[7][0];
          let rly7 = prediction.annotations.rightEyeLower0[7][1];

          let rlx8 = prediction.annotations.rightEyeLower0[8][0];
          let rly8 = prediction.annotations.rightEyeLower0[8][1];

          //   ctx.save();
          ctx.beginPath();
          ctx.moveTo(rux0, ruy0);
          ctx.quadraticCurveTo(rux1, ruy1, rux2, ruy2);
          ctx.quadraticCurveTo(rux3, ruy3, rux4, ruy4);
          ctx.quadraticCurveTo(rux5, ruy5, rux6, ruy6);
          ctx.quadraticCurveTo(rlx8, rly8, rlx7, rly7);
          ctx.quadraticCurveTo(rlx6, rly6, rlx5, rly5);
          ctx.quadraticCurveTo(rlx4, rly4, rlx3, rly3);
          ctx.quadraticCurveTo(rlx2, rly2, rlx1, rly1);
          ctx.quadraticCurveTo(rlx0, rly0, rux0, ruy0);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.save();
          ctx.clip();

          // To Adjust the transparency of the lens image
          // This linear function is subject to modifications based on experimentation
          // ctx.globalAlpha = 1000 * 8/2000;
          const rightImg = new Image();
          rightImg.src = images.rightEye;
          if (rightImg) {
            ctx.drawImage(
              rightImg,
              rightCenter[0] - rightDiameterX / 2,
              rightCenter[1] - rightDiameterY / 2,
              rightDiameterX,
              rightDiameterY
            );
          }
          ctx.restore();
        }
      }
      // };
      // img.src = personImage; //
      // applying brightness

      if (parseInt(brightness) > 90) {
        canvas.style.filter = 'brightness(1)'; //
      } else if (parseInt(brightness) === 0) {
        canvas.style.filter = `brightness(60)`;
      } else {
        canvas.style.filter = `brightness(${Math.max(
          90 / parseInt(brightness),
          1.4
        )})`;
      }
      // ctx.save()
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.drawImage(video, 0, 0)
      // ctx.restore()
    });
  }
};

function contrastImage(imgData, contrast) {
  //input range [-100..100]
  var d = imgData.data;
  contrast = contrast / 100 + 1; //convert to decimal & shift range: [0..2]
  var intercept = 128 * (1 - contrast);
  for (var i = 0; i < d.length; i += 4) {
    //r,g,b,a
    d[i] = d[i] * contrast + intercept;
    d[i + 1] = d[i + 1] * contrast + intercept;
    d[i + 2] = d[i + 2] * contrast + intercept;
  }
  return imgData;
}
