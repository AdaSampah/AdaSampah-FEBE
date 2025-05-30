  let currentStream;
  let streaming = false;
  let width = 640;
  let height = 0;

  let videoElement;
  let selectCameraElement;
  let canvasElement;
  let takePictureButton;

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
      if (stream.active) {
        stream.getTracks().forEach((track) => track.stop());
      }
    });
  }

  function initialListener() {
    videoElement.oncanplay = () => {
      if (streaming) {
        return;
      }

      height = (videoElement.videoHeight * width) / videoElement.videoWidth;

      canvasElement.setAttribute('width', width);
      canvasElement.setAttribute('height', height);

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
        return Promise.reject(Error('MediaStream not found!'));
      }

      const { deviceId } = stream.getVideoTracks()[0].getSettings();

      const enumeratedDevices = await navigator.mediaDevices.enumerateDevices();
      const list = enumeratedDevices.filter((device) => {
        return device.kind === 'videoinput';
      });

      const html = list.reduce((accumulator, device, currentIndex) => {
        return accumulator.concat(`
          <option
            value="${device.deviceId}"
            ${deviceId === device.deviceId ? 'selected' : ''}
          >
            ${device.label || `Camera ${currentIndex + 1}`}
          </option>
        `);
      }, '');

      selectCameraElement.innerHTML = html;
    } catch (error) {
      console.error('populateDeviceList: error:', error);
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
      console.error('getStream: error:', error);
      return null;
    }
  }

  export async function launch() {
    currentStream = await getStream();

    // Record all MediaStream in global context
    addNewStream(currentStream);

    videoElement.srcObject = currentStream;
    videoElement.play();

    clearCanvas();
  }

  export function stop() {
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
    const context = canvasElement.getContext('2d');
    context.fillStyle = '#AAAAAA';
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);
  }

  export async function takePicture() {
    if (!(width && height)) {
      return null;
    }

    const context = canvasElement.getContext('2d');

    canvasElement.width = width;
    canvasElement.height = height;

    context.drawImage(videoElement, 0, 0, width, height);

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

    initialListener();
  }
