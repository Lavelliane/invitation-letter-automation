// listFields.js
import { PDFDocument } from 'pdf-lib';
import { promises as fs } from 'fs';

async function listFields() {
    try {
        const pdfBytes = await fs.readFile('test.pdf');
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        
        console.log('\nFields in test.pdf:');
        fields.forEach(field => {
            console.log(`Field: ${field.getName()}`);
            console.log(`Type: ${field.constructor.name}`);
            console.log('---');
        });
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('no such file')) {
            console.error('Make sure test.pdf exists in the current directory!');
        }
    }
}

listFields();