"use client"

import { useState, useRef } from "react"
import ReactCrop, { type Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { RotateCw, ZoomIn } from "lucide-react"

interface LogoCropperProps {
  imageUrl: string
  onCropComplete: (croppedImageUrl: string) => void
  onCancel: () => void
  open: boolean
}

export function LogoCropper({ imageUrl, onCropComplete, onCancel, open }: LogoCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  })
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleCropComplete = () => {
    if (!imgRef.current) return

    const canvas = document.createElement("canvas")
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY
    const cropWidth = crop.width * scaleX
    const cropHeight = crop.height * scaleY

    // Set canvas dimensions to the cropped size
    canvas.width = cropWidth
    canvas.height = cropHeight

    // Create a temporary canvas for rotation and scaling
    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")
    if (!tempCtx) return

    // Set temp canvas to the original image size
    tempCanvas.width = imgRef.current.naturalWidth
    tempCanvas.height = imgRef.current.naturalHeight

    // Draw the original image on the temp canvas with rotation and scaling
    tempCtx.save()
    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2)
    tempCtx.rotate((rotation * Math.PI) / 180)
    tempCtx.scale(scale, scale)
    tempCtx.drawImage(
      imgRef.current,
      -imgRef.current.naturalWidth / 2,
      -imgRef.current.naturalHeight / 2,
      imgRef.current.naturalWidth,
      imgRef.current.naturalHeight,
    )
    tempCtx.restore()

    // Draw the cropped portion from the temp canvas to the final canvas
    ctx.drawImage(tempCanvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

    // Convert canvas to data URL
    const croppedImageUrl = canvas.toDataURL("image/png")
    onCropComplete(croppedImageUrl)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-3xl w-[90vw]">
        <DialogHeader>
          <DialogTitle>Crop and Adjust Your Logo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex justify-center bg-gray-50 rounded-lg p-4 overflow-hidden">
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1} circularCrop className="max-h-[50vh]">
              <img
                ref={imgRef}
                src={imageUrl || "/placeholder.svg"}
                alt="Logo to crop"
                style={{
                  transform: `rotate(${rotation}deg) scale(${scale})`,
                  maxHeight: "50vh",
                  maxWidth: "100%",
                }}
              />
            </ReactCrop>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Rotation</label>
                <span className="text-xs text-gray-500">{rotation}°</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCw size={16} className="text-gray-500" />
                <Slider
                  value={[rotation]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={(value) => setRotation(value[0])}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Zoom</label>
                <span className="text-xs text-gray-500">{scale.toFixed(1)}x</span>
              </div>
              <div className="flex items-center gap-2">
                <ZoomIn size={16} className="text-gray-500" />
                <Slider
                  value={[scale * 10]}
                  min={5}
                  max={20}
                  step={1}
                  onValueChange={(value) => setScale(value[0] / 10)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleCropComplete}>Apply</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
