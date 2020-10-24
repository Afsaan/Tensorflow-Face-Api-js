const video = document.getElementById('video')


Promise.all(
    [
        faceapi.loadMtcnnModel('static/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('static/models')
    ]

).then(start_video)

function start_video(){
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

const mtcnnForwardParams = {
    // number of scaled versions of the input image passed through the CNN
    // of the first stage, lower numbers will result in lower inference time,
    // but will also be less accurate
    maxNumScales: 10,
    // scale factor used to calculate the scale steps of the image
    // pyramid used in stage 1
    scaleFactor: 0.709,
    // the score threshold values used to filter the bounding
    // boxes of stage 1, 2 and 3
    scoreThresholds: [0.6, 0.7, 0.7],
    // mininum face size to expect, the higher the faster processing will be,
    // but smaller faces won't be detected
    minFaceSize: 50
  }
// start_video()


video.addEventListener('play', () =>
{
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width: video.width , height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
       const detections = await faceapi.detectAllFaces(video, new faceapi.MtcnnOptions(mtcnnForwardParams))
       console.log(detections.length  )
       const resized_detection = faceapi.resizeResults(detections, displaySize)
       canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)
       faceapi.draw.drawDetections(canvas , resized_detection )
        },100 )

})