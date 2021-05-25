
const videoElement = document.getElementById('video-input');
const canvasElement = document.getElementById('canvas-output');
const canvasCtx = canvasElement.getContext('2d');

const holistic = new Holistic({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
}})

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        result.image, 0, 0, canvasElement.width, canvasElement.height);
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
        {color: '#CC0000', lineWidth: 5});
    drawLandmarks(canvasCtx, results.leftHandLandmarks,
        {color: '#00FF00', lineWidth: 2});
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
        {color: '#00CC00', lineWidth:5});
    drawLandmarks(canvasCtx, results.rightHandLandmarks,
        {color:"#FF0000", lineWidth:2});
    canvasCtx.restore();
  }

holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  holistic.onResults(onResults);

  const camera = new Camera(
      videoElement, {
          onFrame: async() => {
              await holistic.send({image: videoElement});
          },
          width: 780,
          height: 450
      }
  )
  camera.start();