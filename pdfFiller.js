// pdfFiller.js
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { promises as fs } from 'fs';

async function fillTestPdf(fieldValues) {
    try {
        // Load test.pdf
        const pdfBytes = await fs.readFile('letter_template.pdf');
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();

        // First, let's see what fields are available
        const fields = form.getFields();
        console.log('Available fields in letter_template.pdf:');
        fields.forEach(field => {
            console.log(`- ${field.getName()} (${field.constructor.name})`);
        });

        const courier = await pdfDoc.embedFont(StandardFonts.Courier)
        // Fill the fields
        Object.entries(fieldValues).forEach(([fieldName, value]) => {
            try {
                const field = form.getField(fieldName);
                switch (field.constructor.name) {
                    case 'PDFTextField':
                        field.setText(String(value));
                        field.setFontSize(10); // Set default font size to 12px
                        break;
                    case 'PDFCheckBox':
                        value ? field.check() : field.uncheck();
                        break;
                    case 'PDFRadioGroup':
                    case 'PDFDropdown':
                        field.select(value);
                        field.setFontSize(12); // Set default font size to 12px
                        break;
                }
                if(field.constructor.name === 'PDFTextField') {
                    field.updateAppearances(courier)
                }
            } catch (error) {
                console.warn(`Couldn't fill field "${fieldName}":`, error.message);
            }
        });

        // Save the filled PDF
        const filledPdfBytes = await pdfDoc.save();
        await fs.writeFile('filled_letter_template.pdf', filledPdfBytes);
        console.log('PDF saved as filled_letter_template.pdf');
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('no such file')) {
            console.error('Make sure letter_template.pdf exists in the current directory!');
        }
    }
}


export default fillTestPdf;
