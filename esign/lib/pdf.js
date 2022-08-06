
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const { readFile, writeFile, readdir } = require('fs/promises');
const path = require('path');
const fontkit = require('@pdf-lib/fontkit');
const config = require('../config');
const fetch = require('node-fetch')

const modifyPDF = async(input, output, signature, recieverName) => {

    try {
        
        console.log("asdasdas", input, output, signature)

        const pdfDoc = await PDFDocument.load( await readFile(input.dir + input.name) );

        const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf'
        const fontBytes = await fetch(url).then(res => res.arrayBuffer())
        pdfDoc.registerFontkit(fontkit)
        const customFont = await pdfDoc.embedFont(fontBytes)
        // Modify / Fill out the form

        const pages = pdfDoc.getPages();
        const firstPg = pages[0];

        await firstPg.drawText( recieverName +"\n"+ signature, {
            x : 65,
            y : 160,
            size : 20,
            color : rgb(0.2, 0.84, 0.67),
            font: customFont,
        })

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);

        console.log("PDF created");

    } catch (error) {
        
        console.log("ERROR", error);

    }

}

module.exports = {
    modifyPDF
}