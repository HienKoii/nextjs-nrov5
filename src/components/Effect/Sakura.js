import { useEffect } from "react";

const SakuraEffect = () => {
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    let stop, staticx;
    let img = new Image();
    img.src = "/imgs/11808a.png"; // Thay đường dẫn ảnh hoa sakura

    function Sakura(x, y, s, r, fn) {
      this.x = x;
      this.y = y;
      this.s = s;
      this.r = r;
      this.fn = fn;
    }

    Sakura.prototype.draw = function (cxt) {
      cxt.save();
      cxt.translate(this.x, this.y);
      cxt.rotate(this.r);
      cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s);
      cxt.restore();
    };

    Sakura.prototype.update = function () {
      this.x = this.fn.x(this.x, this.y);
      this.y = this.fn.y(this.y, this.y);
      this.r = this.fn.r(this.r);
      if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom("fnr");
        if (Math.random() > 0.4) {
          this.x = getRandom("x");
          this.y = 0;
          this.s = getRandom("s");
          this.r = getRandom("r");
        } else {
          this.x = window.innerWidth;
          this.y = getRandom("y");
          this.s = getRandom("s");
          this.r = getRandom("r");
        }
      }
    };

    function getRandom(option) {
      let ret, random;
      switch (option) {
        case "x":
          ret = Math.random() * window.innerWidth;
          break;
        case "y":
          ret = Math.random() * window.innerHeight;
          break;
        case "s":
          ret = Math.random();
          break;
        case "r":
          ret = Math.random() * 5;
          break;
        case "fnx":
          random = -0.5 + Math.random() * 1;
          ret = (x) => x + 0.5 * random - 1;
          break;
        case "fny":
          random = 0.5 + Math.random() * 0.5;
          ret = (x, y) => y + random;
          break;
        case "fnr":
          random = Math.random() * 0.01;
          ret = (r) => r + random;
          break;
      }
      return ret;
    }

    function startSakura() {
      const canvas = document.createElement("canvas");
      canvas.id = "canvas_sakura";
      canvas.style.position = "fixed";
      canvas.style.left = "0";
      canvas.style.top = "0";
      canvas.style.pointerEvents = "none";
      document.body.appendChild(canvas);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cxt = canvas.getContext("2d");

      let sakuraList = [];
      for (let i = 0; i < 50; i++) {
        let sakura = new Sakura(getRandom("x"), getRandom("y"), getRandom("s"), getRandom("r"), { x: getRandom("fnx"), y: getRandom("fny"), r: getRandom("fnr") });
        sakura.draw(cxt);
        sakuraList.push(sakura);
      }

      function animate() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        sakuraList.forEach((s) => {
          s.update();
          s.draw(cxt);
        });
        stop = requestAnimationFrame(animate);
      }
      stop = requestAnimationFrame(animate);
    }

    img.onload = startSakura;

    function cleanup() {
      const canvas = document.getElementById("canvas_sakura");
      if (canvas) {
        canvas.remove();
        window.cancelAnimationFrame(stop);
      }
    }

    window.onresize = () => {
      const canvas = document.getElementById("canvas_sakura");
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    return cleanup;
  }, []);

  return null; // Không cần render gì cả
};

export default SakuraEffect;
