import parseCSV from "./csv-parser.js";
import cleanObject from "./utils/object-cleaner.js";
import generatePDFTemplate from "./utils/generate-object.js";
import fillTestPdf from "./pdfFiller.js";

const data = await parseCSV()

const cleanData = cleanObject(data[0])

const finalObject = generatePDFTemplate(cleanData)

await fillTestPdf(finalObject)

console.log("Done")
