'use client'

import React, { useEffect, useRef } from 'react'
import * as faceapi from '@vladmandic/face-api'

export default function WebcamFaceTracker() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined

    async function setup() {
      const MODEL_URL = '/models'
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)

      const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
      if (videoRef.current) {
        videoRef.current.srcObject = stream

        videoRef.current.onloadedmetadata = () => {
          videoRef.current && videoRef.current.play()
        }

        videoRef.current.addEventListener('play', () => {
          const canvas = canvasRef.current
          const video = videoRef.current

          if (!canvas || !video) return

          canvas.width = video.videoWidth
          canvas.height = video.videoHeight

          faceapi.matchDimensions(canvas, {
            width: video.videoWidth,
            height: video.videoHeight,
          })

          intervalId = setInterval(async () => {
            const detections = await faceapi
              .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
              .withFaceExpressions()

            const resizedDetections = faceapi.resizeResults(detections, {
              width: video.videoWidth,
              height: video.videoHeight,
            })

            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              faceapi.draw.drawDetections(canvas, resizedDetections)
              faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
            }
          }, 100)
        })
      }
    }

    setup()

    return () => {
      clearInterval(intervalId)
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 640,
        margin: '0 auto',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
};