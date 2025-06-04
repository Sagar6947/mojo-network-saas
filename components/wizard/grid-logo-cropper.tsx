"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RotateCw, ZoomIn, Grid3X3, Move } from "lucide-react"

interface GridLogoCropperProps {
  imageUrl: string
  onCropComplete: (croppedImageUrl: string) => void
  onCancel: () => void
  open: boolean
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export function GridLogoCropper({ imageUrl, onCropComplete, onCancel, open }: GridLogoCropperProps) {
  const [cropArea, setCropArea] = useState<CropArea>({ x: 50, y: 50, width: 200, height: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [showGrid, setShowGrid] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const image = imageRef.current
    const container = containerRef.current

    if (!canvas || !image || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const containerRect = container.getBoundingClientRect()
    canvas.width = containerRect.width
    canvas.height = containerRect.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate image dimensions to fit container while maintaining aspect ratio
    const imageAspect = image.naturalWidth / image.naturalHeight
    const containerAspect = canvas.width / canvas.height

    let drawWidth, drawHeight, offsetX, offsetY

    if (imageAspect > containerAspect) {
      drawHeight = canvas.height * scale
      drawWidth = drawHeight * imageAspect
      offsetX = (canvas.width - drawWidth) / 2
      offsetY = (canvas.height - drawHeight) / 2
    } else {
      drawWidth = canvas.width * scale
      drawHeight = drawWidth / imageAspect
      offsetX = (canvas.width - drawWidth) / 2
      offsetY = (canvas.height - drawHeight) / 2
    }

    // Save context for rotation
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    // Draw image
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
    ctx.restore()

    // Draw grid overlay
    if (showGrid) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 1

      // Draw grid lines
      for (let i = 1; i < 3; i++) {
        // Vertical lines
        ctx.beginPath()
        ctx.moveTo((canvas.width / 3) * i, 0)
        ctx.lineTo((canvas.width / 3) * i, canvas.height)
        ctx.stroke()

        // Horizontal lines
        ctx.beginPath()
        ctx.moveTo(0, (canvas.height / 3) * i)
        ctx.lineTo(canvas.width, (canvas.height / 3) * i)
        ctx.stroke()
      }
    }

    // Draw crop area
    ctx.strokeStyle = "#8b5cf6"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)
    ctx.setLineDash([])

    // Draw crop area overlay (darken outside area)
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"

    // Top
    ctx.fillRect(0, 0, canvas.width, cropArea.y)
    // Bottom
    ctx.fillRect(0, cropArea.y + cropArea.height, canvas.width, canvas.height - cropArea.y - cropArea.height)
    // Left
    ctx.fillRect(0, cropArea.y, cropArea.x, cropArea.height)
    // Right
    ctx.fillRect(cropArea.x + cropArea.width, cropArea.y, canvas.width - cropArea.x - cropArea.width, cropArea.height)

    // Draw resize handles
    const handleSize = 8
    ctx.fillStyle = "#8b5cf6"

    // Corner handles
    const corners = [
      { x: cropArea.x - handleSize / 2, y: cropArea.y - handleSize / 2 },
      { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y - handleSize / 2 },
      { x: cropArea.x - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2 },
      { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2 },
    ]

    corners.forEach((corner) => {
      ctx.fillRect(corner.x, corner.y, handleSize, handleSize)
    })
  }, [cropArea, rotation, scale, showGrid])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if clicking on resize handles
    const handleSize = 8
    const corners = [
      { x: cropArea.x - handleSize / 2, y: cropArea.y - handleSize / 2 },
      { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y - handleSize / 2 },
      { x: cropArea.x - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2 },
      { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2 },
    ]

    const clickedHandle = corners.find(
      (corner) => x >= corner.x && x <= corner.x + handleSize && y >= corner.y && y <= corner.y + handleSize,
    )

    if (clickedHandle) {
      setIsResizing(true)
      setDragStart({ x, y })
      return
    }

    // Check if clicking inside crop area for dragging
    if (x >= cropArea.x && x <= cropArea.x + cropArea.width && y >= cropArea.y && y <= cropArea.y + cropArea.height) {
      setIsDragging(true)
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (isDragging) {
      const newX = Math.max(0, Math.min(x - dragStart.x, canvas.width - cropArea.width))
      const newY = Math.max(0, Math.min(y - dragStart.y, canvas.height - cropArea.height))

      setCropArea((prev) => ({ ...prev, x: newX, y: newY }))
    } else if (isResizing) {
      const deltaX = x - dragStart.x
      const deltaY = y - dragStart.y
      const size = Math.max(50, Math.min(deltaX, deltaY, canvas.width - cropArea.x, canvas.height - cropArea.y))

      setCropArea((prev) => ({ ...prev, width: size, height: size }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  const handleCropComplete = () => {
    const canvas = canvasRef.current
    const image = imageRef.current

    if (!canvas || !image) return

    // Create a new canvas for the cropped image
    const cropCanvas = document.createElement("canvas")
    const cropCtx = cropCanvas.getContext("2d")

    if (!cropCtx) return

    // Set crop canvas to square dimensions
    const cropSize = 300 // Final logo size
    cropCanvas.width = cropSize
    cropCanvas.height = cropSize

    // Calculate the actual image coordinates relative to the original image
    const containerRect = canvas.getBoundingClientRect()
    const scaleX = image.naturalWidth / (containerRect.width * scale)
    const scaleY = image.naturalHeight / (containerRect.height * scale)

    const sourceX = cropArea.x * scaleX
    const sourceY = cropArea.y * scaleY
    const sourceWidth = cropArea.width * scaleX
    const sourceHeight = cropArea.height * scaleY

    // Apply rotation if needed
    if (rotation !== 0) {
      cropCtx.save()
      cropCtx.translate(cropSize / 2, cropSize / 2)
      cropCtx.rotate((rotation * Math.PI) / 180)
      cropCtx.translate(-cropSize / 2, -cropSize / 2)
    }

    // Draw the cropped portion
    cropCtx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, cropSize, cropSize)

    if (rotation !== 0) {
      cropCtx.restore()
    }

    // Convert to data URL
    const croppedImageUrl = cropCanvas.toDataURL("image/png", 0.9)
    onCropComplete(croppedImageUrl)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5" />
            Crop and Adjust Your Logo
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6 h-[70vh]">
          {/* Image editing area */}
          <div className="flex-1 flex flex-col">
            <div
              ref={containerRef}
              className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative border-2 border-dashed border-gray-300"
              style={{ minHeight: "400px" }}
            >
              <img
                ref={imageRef}
                src={imageUrl || "/placeholder.svg"}
                alt="Logo to crop"
                className="hidden"
                onLoad={drawCanvas}
              />
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />

              {/* Instructions overlay */}
              <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Move className="h-3 w-3" />
                  Drag to move crop area
                </div>
                <div>Drag corners to resize</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                  className={showGrid ? "bg-purple-50 border-purple-200" : ""}
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  {showGrid ? "Hide Grid" : "Show Grid"}
                </Button>
              </div>

              <div className="space-y-3">
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
                      max={30}
                      step={1}
                      onValueChange={(value) => setScale(value[0] / 10)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Tips:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Drag the purple box to position your logo</li>
                  <li>• Drag corners to resize the crop area</li>
                  <li>• Use grid lines to align your logo perfectly</li>
                  <li>• Adjust zoom and rotation for best fit</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCropComplete} className="flex-1">
                Apply Crop
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
