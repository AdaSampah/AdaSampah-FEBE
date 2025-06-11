let currentStream;
let streaming = false;
let width = 640;
let height = 0;

let videoElement;
let selectCameraElement;
let canvasElement;
let takePictureButton;
let cameraCancelled = false;

export function addNewStream(stream) {
  if (!Array.isArray(window.currentStreams)) {
    window.currentStreams = [stream];
    return;
  }

  window.currentStreams = [...window.currentStreams, stream];
}

export function stopAllStreams() {
  if (!Array.isArray(window.currentStreams)) {
    window.currentStreams = [];
    return;
  }

  window.currentStreams.forEach((stream) => {
    // Tambahkan pengecekan stream && typeof stream.getTracks === 'function'
    if (stream && typeof stream.getTracks === "function" && stream.active) {
      stream.getTracks().forEach((track) => track.stop());
    }
  });
  // Setelah stop, kosongkan array agar tidak error di pemanggilan berikutnya
  window.currentStreams = [];
}

function initialListener() {
  videoElement.oncanplay = () => {
    if (streaming) {
      return;
    }

    height = (videoElement.videoHeight * width) / videoElement.videoWidth;

    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);

    streaming = true;
  };

  selectCameraElement.onchange = async () => {
    await stop();
    await launch();
  };
}

async function populateDeviceList(stream) {
  try {
    if (!(stream instanceof MediaStream)) {
      return Promise.reject(Error("MediaStream not found!"));
    }

    const { deviceId } = stream.getVideoTracks()[0].getSettings();

    const enumeratedDevices = await navigator.mediaDevices.enumerateDevices();
    const list = enumeratedDevices.filter((device) => {
      return device.kind === "videoinput";
    });

    const html = list.reduce((accumulator, device, currentIndex) => {
      // Tambahkan fallback label 'Front' jika deviceId mengandung 'front'
      let label = device.label || `Camera ${currentIndex + 1}`;
      if (!device.label && device.deviceId && /front/i.test(device.deviceId)) {
        label = "Front Camera";
      }
      return accumulator.concat(`
        <option
          value="${device.deviceId}"
          ${deviceId === device.deviceId ? "selected" : ""}
        >
          ${label}
        </option>
      `);
    }, "");

    selectCameraElement.innerHTML = html;
  } catch (error) {
    console.error("populateDeviceList: error:", error);
  }
}

async function getStream() {
  try {
    const deviceId =
      !streaming && !selectCameraElement.value
        ? undefined
        : { exact: selectCameraElement.value };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        aspectRatio: 4 / 3,
        deviceId,
      },
    });

    // Show available camera after camera permission granted
    await populateDeviceList(stream);

    return stream;
  } catch (error) {
    console.error("getStream: error:", error);
    return null;
  }
}

export async function launch() {
  cameraCancelled = false;
  const stream = await getStream();
  if (cameraCancelled) {
    // Jika sudah dibatalkan, stop stream dan jangan set ke video
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    return;
  }
  currentStream = stream;

  // Record all MediaStream in global context
  addNewStream(currentStream);

  videoElement.srcObject = currentStream;
  videoElement.play();

  clearCanvas();
}

export function stop() {
  cameraCancelled = true;
  if (videoElement) {
    videoElement.srcObject = null;
    streaming = false;
  }

  if (currentStream instanceof MediaStream) {
    currentStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  clearCanvas();
}

function clearCanvas() {
  if (!canvasElement) return; // Tambahkan pengecekan ini
  const context = canvasElement.getContext("2d");
  context.fillStyle = "#AAAAAA";
  context.fillRect(0, 0, canvasElement.width, canvasElement.height);
}

export async function takePicture(mirror = false) {
  if (!(width && height)) {
    return null;
  }

  const context = canvasElement.getContext("2d");

  canvasElement.width = width;
  canvasElement.height = height;

  context.save();
  if (mirror) {
    context.translate(width, 0);
    context.scale(-1, 1);
  }
  context.drawImage(videoElement, 0, 0, width, height);
  context.restore();

  return await new Promise((resolve) => {
    canvasElement.toBlob((blob) => resolve(blob));
  });
}

export function addCheeseButtonListener(selector, callback) {
  takePictureButton = document.querySelector(selector);
  takePictureButton.onclick = callback;
}

export function initializeCamera({ video, cameraSelect, canvas }) {
  videoElement = video;
  selectCameraElement = cameraSelect;
  canvasElement = canvas;
  cameraCancelled = false;
  initialListener();
}
