interface Window {
  removeMouseTrails?: () => void;
}

(() => {
  const cleanupKey = "removeMouseTrails";

  if (window[cleanupKey]) {
    window[cleanupKey]();
  } else {
    window[cleanupKey] = () => {
      delete window[cleanupKey];
      document.body.removeChild(thingsParent);
      cancelAnimationFrame(animationFrameId);
    };

    let mousePositionX = 0,
      mousePositionY = 0;
    const thingsParent = document.body.appendChild(
      document.createElement("div")
    );

    const things = [...Array(5)].map((_x, i) => {
      let thingPositionX = 0,
        thingPositionY = 0;
      const thing = thingsParent.appendChild(document.createElement("div"));
      thing.style.pointerEvents = "none";
      thing.style.borderRadius = "50%";
      thing.style.position = "fixed";
      thing.style.background = `hsl(${((7 - i) * 360) / 7}, 100%, 50%)`;
      thing.style.width = "20px";
      thing.style.height = "20px";

      const speed = 1 / (5 - i + 3);

      return () => {
        thingPositionX += (mousePositionX - thingPositionX) * speed;
        thingPositionY += (mousePositionY - thingPositionY) * speed;

        thing.style.left = `${thingPositionX - 10}px`;
        thing.style.top = `${thingPositionY - 10}px`;
        thing.style.opacity = `${Math.min(
          1,
          ((mousePositionX - thingPositionX) ** 2 +
            (mousePositionY - thingPositionY) ** 2) /
            100
        )}`;
      };
    });

    let animationFrameId: number;

    const scheduleUpdate = () => {
      animationFrameId = requestAnimationFrame((t) => {
        for (const thing of things) {
          thing();
        }

        scheduleUpdate();
      });
    };

    window.addEventListener("mousemove", (event) => {
      mousePositionX = event.clientX;
      mousePositionY = event.clientY;
    });

    scheduleUpdate();
  }
})();
