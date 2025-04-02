//prisma/index.js
//import PrismaClient
const { PrismaClient } = require('@prisma/client'); 
//create instance
const prisma = new PrismaClient(); 
//export for use in other files
module.exports = prisma; 
