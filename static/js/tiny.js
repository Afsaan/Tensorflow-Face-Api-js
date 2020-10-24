const video = document.getElementById('video')


Promise.all(
    [
        faceapi.nets.tinyFaceDetector.loadFromUri('static/models'),
        // faceapi.nets.faceLandmark68Net.loadFromUri('static/models')
    ]

).then(start_video)

function start_video(){
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

// start_video()
video.addEventListener('play', () =>
{
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width: video.width , height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
       const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
       console.log(detections.length  )
       const resized_detection = faceapi.resizeResults(detections, displaySize)
       canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)
       faceapi.draw.drawDetections(canvas , resized_detection )
        },100 )

})