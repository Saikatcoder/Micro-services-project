'use client'
import React, { FC, useEffect, useRef } from 'react'
import videojs from 'video.js'
import "video.js/dist/video-js.css"
import '@videojs/themes/dist/forest/index.css';
import 'videojs-hls-quality-selector'
import 'videojs-hotkeys'

interface VideoPlayerInterface{
    src:string
}

const VideoPlayer :FC<VideoPlayerInterface> = ({src}) => {
  const videoRef  = useRef<HTMLVideoElement | null > (null)

    const options = {
        controls : true,
        fluid:true,
        playbackRates : [0.5, 1, 1.2, 2, 5],
        

    }
    useEffect(()=>{
        if(!videoRef.current)
            return
        
       const player:any = videojs(videoRef.current, options)
        
       player.hlsQualitySelector({
            displayCurrentQuality : true
        })

        player.hotkeys({
            volumeStep : 0.1,
            seekStep : 2,

        })

    
    },[])
    return (
    <div>
        <video
         ref={videoRef}
         className='video-js vjs-default-skin vjs-theme-forest'
        >
            <source src={src} type='application/x-mpegURL'>
            </source>
        </video>
    </div>
  )
}

export default VideoPlayer