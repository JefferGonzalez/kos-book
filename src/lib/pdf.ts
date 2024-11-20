// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from 'html2pdf.js'

export const generatePDF = async (id: string) => {
  const element = document.getElementById(id)

  if (!element) {
    throw new Error(`Element with id ${id} not found`)
  }

  const options = {
    filename: `${id}.pdf`,
    pagebreak: { mode: ['avoid-all'] },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
  }

  await html2pdf().set(options).from(element).save()
}
