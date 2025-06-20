(function () {
  function getColor(name, p) {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return p.color(`hsl(${val})`);
  }

  const sketch = (p) => {
    p.setup = function () {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.noLoop();
      window.addEventListener('resize', () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        drawPattern();
      });
      document.addEventListener('theme-change', drawPattern);
      drawPattern();
    };

    function drawPattern() {
      p.clear();
      const fillCol = getColor('--accent', p);
      const strokeCol = getColor('--foreground', p);
      p.fill(fillCol);
      p.stroke(strokeCol);
      p.strokeWeight(1);

      const scale = 40;
      const tileW = 6 * scale;
      const tileH = 4 * hr3 * scale;
      for (let y = -tileH; y < p.height + tileH; y += tileH) {
        for (let x = -tileW; x < p.width + tileW; x += tileW) {
          drawHat(x, y, scale, 0);
          drawHat(x + tileW / 2, y + tileH / 2, scale, Math.PI);
        }
      }
    }

    function drawHat(x, y, s, rot) {
      p.push();
      p.translate(x, y);
      p.rotate(rot);
      p.beginShape();
      for (const pt of hat_outline) {
        p.vertex(pt.x * s, pt.y * s);
      }
      p.endShape(p.CLOSE);
      p.pop();
    }
  };

  new p5(sketch);
})();
