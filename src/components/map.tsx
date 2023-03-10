import useStars from "@/hooks/useStars"

export default function Map() {
  const stars = useStars()
  return (
    <div>
      gwiazdy:
      <div>
        {stars && JSON.stringify(stars)}
      </div>
      <canvas></canvas>
    </div>
  )
}
