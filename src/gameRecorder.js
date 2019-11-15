// const constraints = { audio: true, video: true };
// navigator.mediaDevices
//   .getDisplayMedia(constraints)
//   .then(function(stream) {
//     const video = document.querySelector('video');
//     video.srcObject = stream;

//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.start();

//     console.log(mediaRecorder);
//     setTimeout(() => {
//       // mediaRecorder.requestData();
//       mediaRecorder.stop();
//     }, 6000);
//     console.log(mediaRecorder);
//     let chunks = [];
//     mediaRecorder.ondataavailable = event => {
//       console.log(event.data);
//       chunks.push(event.data);
//       // console.log(chunks);
//       // console.log(new Blob(chunks, { type: "video/webm"}));
//     };

//     mediaRecorder.addEventListener('stop', () => {
//       const recording = new Blob(chunks, {
//         type: 'audio/mpeg',
//       });

//       const blobUrl = URL.createObjectURL(recording);
//       console.log(recording, blobUrl);
//       const anchor = document.createElement('a');
//       anchor.setAttribute('href', blobUrl);
//       const now = new Date();
//       anchor.setAttribute(
//         'download',
//         `recording-${now.getFullYear()}-${(now.getMonth() + 1)
//           .toString()
//           .padStart(2, '0')}-${now
//           .getDay()
//           .toString()
//           .padStart(2, '0')}--${now
//           .getHours()
//           .toString()
//           .padStart(2, '0')}-${now
//           .getMinutes()
//           .toString()
//           .padStart(2, '0')}-${now
//           .getSeconds()
//           .toString()
//           .padStart(2, '0')}.webm`
//       );
//       anchor.innerText = 'Download';
//       document.body.appendChild(anchor);

//       const video = document.createElement('audio');
//       const source = document.createElement('source');
//       video.setAttribute('controls', '');
//       video.setAttribute('width', 600);
//       source.setAttribute('src', blobUrl);
//       source.setAttribute('type', 'audio/mpeg');

//       video.appendChild(source);
//       document.body.appendChild(video);
//     });

//     video.onloadedmetadata = function(e) {
//       video.play();
//     };
//   })
//   .catch(function(err) {
//     console.log('Error in getting stream', err);
//   });

window.addEventListener('load', function() {
  document.getElementById('login').onclick = () => {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => console.log(res));
  };

  document.getElementById('matches').onclick = () => {
    console.log(document.cookie);
    console.log(getCookie('anti-csrf-token'));

    fetch('http://localhost:8080/matches', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': getCookie('anti-csrf-token'),
      },
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };
});

getCookie = input => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const splits = cookies[i].split(/=(.+)/);
    const name = splits[0];
    const value = splits[1];
    if (name.trim() === input) {
      return value;
    } else if (value === input) {
      return name;
    }
  }
  return '';
};
