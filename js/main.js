const video = document.getElementById('video')


Promise.all(
    [
        faceapi.loadMtcnnModel('../models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('../models')
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
    setInterval(async () => {
       const detections = await faceapi.detectAllFaces(video, new faceapi.MtcnnOptions()).withFaceLandmarks() 
       console.log(detections.length  )
        point_36_x = detections[0]['landmarks']['_positions'][36]['_x']
        point_36_y = detections[0]['landmarks']['_positions'][36]['_y']
       console.log(point_36_x )
       console.log(point_36_y )
        
})})