import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const generatePDF = async (id: string) => {
  const element = document.getElementById(id)

  if (!element) {
    throw new Error(`Element with id ${id} not found`)
  }

  const pdf = new jsPDF('p', 'mm', [297, 210])
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  const canvas = await html2canvas(element, {
    scale: 2
  })

  const canvasHeight = canvas.height
  const canvasWidth = canvas.width

  const ratio = pdfWidth / canvasWidth

  const scaledCanvasHeight = canvasHeight * ratio

  let currentHeight = 0

  while (currentHeight < scaledCanvasHeight) {
    const pageHeight = Math.min(pdfHeight, scaledCanvasHeight - currentHeight)

    const partialCanvas = document.createElement('canvas')
    partialCanvas.width = canvasWidth
    partialCanvas.height = pageHeight / ratio

    const ctx = partialCanvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(
        canvas,
        0,
        currentHeight / ratio,
        canvasWidth,
        pageHeight / ratio,
        0,
        0,
        canvasWidth,
        pageHeight / ratio
      )
    }

    const partialImageData = partialCanvas.toDataURL('image/png')

    pdf.addImage(partialImageData, 'PNG', 0, 0, pdfWidth, pageHeight)

    currentHeight += pageHeight

    if (currentHeight < scaledCanvasHeight) {
      pdf.addPage()
    }
  }

  pdf.save(`${id}.pdf`)
}
