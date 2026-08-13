import VideoPlayer from '@/components/shared/video-player'
import React from 'react'

const HomeRouter = () => {
  return (
    <div>
      <VideoPlayer
      src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
      />
    </div>
  )
}

export default HomeRouter