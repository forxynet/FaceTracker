import WebcamFaceTracker from './components/FaceTracker'

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: 30 }}>
      <h1>Gerçek Zamanlı Mimik Analizi</h1>
      <WebcamFaceTracker />
    </div>
  )
}
