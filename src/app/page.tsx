'use client'


import dynamic from 'next/dynamic'

const WebcamFaceTracker = dynamic(() => import('./components/FaceTracker'), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>,
})

export default function WebcamPageClient() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Canlı Yüz Takibi</h1>
      <WebcamFaceTracker />
    </main>
  )
}
