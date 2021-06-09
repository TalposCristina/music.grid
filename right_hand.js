export default class RightHand {
  constructor(grid) {
    this.grid = grid;
  }

  isCellPressed(cell) {
    const clientRect = cell.getBoundingClientRect();
    const indexFingerX = this.indexFingerTip.x * 780 + 20;
    const indexFingerY = this.indexFingerTip.y * 439 + 20;
    const cellX = clientRect.x;
    const cellY = clientRect.y;
    if (cell.classList.contains('recently-activated-by-touch')) return;
    return (
      indexFingerX > cellX && indexFingerX < clientRect.right &&
      indexFingerY > cellY && indexFingerY < clientRect.bottom
    )
  }

  updateLandmarks(landmarks) {
    this.landmarks = landmarks;
  }

  showRaisedFingers() {
    let raisedFingers = 0;
    const landmarks = this.landmarks;
    if (landmarks) {
      for (let i = 2; i <=5; i++) {
        const fingerTip = landmarks[4 * i];
        const fingerDIP = landmarks[4 * i - 1];
        if (fingerTip.y < fingerDIP.y) {
          raisedFingers++;
        }
      }
      if (landmarks[4].x > landmarks[3].x) {
        raisedFingers++;
      }
    }
    document.querySelector('#raisedFingers').innerText = `Number of raised fingers: ${raisedFingers}`;
  }

  computeDistance(fingerTip, fingerMCP) {
    const { x: x1, y: y1 } = fingerTip;
    const { x: x2, y: y2 } = fingerMCP;
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }

  showRaisedFingersAlternativeVersion() {
    let raisedFingers = 0;
    const landmarks = this.landmarks;
    if (landmarks) {
      for (let i = 1; i <= 5; i++) {
        const fingerTip = landmarks[4 * i];
        const fingerMCP = landmarks[4 * i - 3];
        let distance = 0;
        fingerTip && fingerMCP && (distance = this.computeDistance(fingerTip, fingerMCP));
        if (distance > 0.1) {
          raisedFingers++;
        }
      }
    }
    document.querySelector('#raisedFingers').innerText = `Number of raised fingers: ${raisedFingers}`;
  }

  draw(ctx) {
    this.indexFingerTip = this.landmarks && this.landmarks[8];
    if (this.indexFingerTip) {
      const isPressed = this.indexFingerTip.z < -0.1;
      ctx.beginPath();
      ctx.fillStyle = isPressed ? 'green' : 'orange';
      ctx.arc(
        this.indexFingerTip.x * 780,
        this.indexFingerTip.y * 439,
        10,
        0,
        2 * Math.PI
      )
      ctx.fill();
      ctx.stroke();

      if (isPressed) {
        this.grid.cells.forEach((cell) => {
          if (this.isCellPressed(cell)) {
            this.grid.toggleCellState(cell);
            cell.classList.add('recently-activated-by-touch');
            setTimeout(() => {
              cell.classList.remove('recently-activated-by-touch');
            }, 400)
          }
        })
      }
    }
  }
}