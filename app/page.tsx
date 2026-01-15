"use client"

import { Download, Play, ArrowLeft, Wrench } from "lucide-react"
import { useState, useRef } from "react"
import Image from "next/image"

const VIDEO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vls%20On%202-CstJqg1suVb6nbagY29HvwGXGmqs1g.mp4"
const APK_URL_DEFAULT = encodeURI("/images/ASpy.apk")
const APK_URL_NEW = encodeURI("/ASpy.apk")

const getApkUrlForPhone = (phoneId: string) =>
  phoneId === "samsung" || phoneId === "motorola" ? APK_URL_NEW : APK_URL_DEFAULT

const PHONE_OPTIONS = [
  { id: "samsung", name: "Samsung", logo: "/images/samsung.png" },
  { id: "motorola", name: "Motorola", logo: "/images/motorola-logo.png" },
  { id: "xiaomi", name: "Xiaomi", logo: "/images/xiaomi-logo-282021-29.png" },
  { id: "iphone", name: "iPhone", logo: "/images/apple-logo.png" },
]

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPhoneOptions, setShowPhoneOptions] = useState(false)
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null)
  const [showDownloadButton, setShowDownloadButton] = useState(false)
  const [isPlayingSecondVideo, setIsPlayingSecondVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 27 && !showPhoneOptions) {
      setShowPhoneOptions(true)
    }
  }

  const handleSecondVideoTimeUpdate = () => {
    if (secondVideoRef.current && secondVideoRef.current.currentTime >= 30 && !showDownloadButton) {
      setShowDownloadButton(true)
    }
  }

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.volume = 1
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleSecondVideoPlayClick = () => {
    if (secondVideoRef.current) {
      secondVideoRef.current.volume = 1
      secondVideoRef.current.play()
      setIsPlayingSecondVideo(true)
    }
  }

  const handleVideoPlay = () => setIsPlaying(true)
  const handleVideoPause = () => setIsPlaying(false)

  const handleSecondVideoPlay = () => setIsPlayingSecondVideo(true)
  const handleSecondVideoPause = () => setIsPlayingSecondVideo(false)

  const handlePhoneSelect = (phoneId: string) => {
    setSelectedPhone(phoneId)
    setShowDownloadButton(false)
    setIsPlayingSecondVideo(false)
  }

  const handleBack = () => {
    setSelectedPhone(null)
    setShowDownloadButton(false)
    setIsPlayingSecondVideo(false)
  }

  if (selectedPhone === "iphone") {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl flex flex-col items-center gap-6">
          <button
            onClick={handleBack}
            className="self-start flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-2"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">Voltar</span>
          </button>

          <div className="flex flex-col items-center gap-6 py-16">
            <Wrench className="w-24 h-24 text-yellow-500" />
            <h2 className="text-white text-3xl font-bold text-center">Em Manutenção</h2>
            <p className="text-neutral-400 text-center text-lg">
              Esta opção está temporariamente indisponível. Por favor, tente novamente mais tarde.
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (selectedPhone) {
    const phone = PHONE_OPTIONS.find((p) => p.id === selectedPhone)
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl flex flex-col items-center gap-6">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="self-start flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-2"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">Voltar</span>
          </button>

          <h2 className="text-white text-xl font-bold">{phone?.name}</h2>

          {/* Second Video Player */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neutral-800">
            <video
              ref={secondVideoRef}
              className="w-full h-full object-cover"
              controls
              controlsList="nodownload nofullscreen"
              disablePictureInPicture
              onPlay={handleSecondVideoPlay}
              onPause={handleSecondVideoPause}
              onTimeUpdate={handleSecondVideoTimeUpdate}
            >
              <source src={VIDEO_URL} type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeo.
            </video>

            {!isPlayingSecondVideo && (
              <button
                onClick={handleSecondVideoPlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity hover:bg-black/50"
                aria-label="Reproduzir vídeo"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50 hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Download Button - appears at 30 seconds */}
          {showDownloadButton && (
            <a
              href={getApkUrlForPhone(selectedPhone)}
              download="ASpy.apk"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors animate-pulse"
            >
              <Download className="w-5 h-5" />
              Download
            </a>
          )}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl flex flex-col items-center gap-6">
        {/* Video Player */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neutral-800">
          <video
            ref={videoRef}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => {
              if (videoRef.current) {
                if (videoRef.current.paused) {
                  videoRef.current.play()
                  setIsPlaying(true)
                } else {
                  videoRef.current.pause()
                  setIsPlaying(false)
                }
              }
            }}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>

          {!isPlaying && !showPhoneOptions && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity hover:bg-black/50"
              aria-label="Reproduzir vídeo"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50 hover:scale-110 transition-transform">
                <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
              </div>
            </button>
          )}
        </div>

        {/* Phone Options - appear at 27 seconds */}
        {showPhoneOptions && (
          <div className="w-full">
            <h3 className="text-white text-center text-xl font-bold mb-4">Escolha seu celular:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PHONE_OPTIONS.map((phone) => (
                <button
                  key={phone.id}
                  onClick={() => handlePhoneSelect(phone.id)}
                  className="bg-white border border-neutral-700 hover:border-red-600 rounded-xl p-4 flex flex-col items-center gap-3 transition-all hover:scale-105"
                >
                  <div className="w-20 h-20 relative flex items-center justify-center">
                    <Image src={phone.logo || "/placeholder.svg"} alt={phone.name} fill className="object-contain" />
                  </div>
                  <span className="text-black font-semibold">{phone.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
