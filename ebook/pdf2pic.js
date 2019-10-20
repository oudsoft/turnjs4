//pdf2pic.js

const PDF2Pic = require("pdf2pic");
 
const pdf2pic = new PDF2Pic({
  density: 100,           // output pixels per inch
  savename: "Chatbot",   // output file name
  savedir: "./Chatbot/png",    // output file location
  format: "png",          // output file format
  size: "420x595"         // output size in pixels
});
 
pdf2pic.convertBulk("Chatbot/pdf/ChatBot.pdf", -1).then((resolve) => {
  console.log("image converter successfully!");
 
  return resolve;
});