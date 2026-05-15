const ImageKit = require("imagekit")

const storageInstance = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL
})

const uploadFileToIk = (file, fileName)=>{
    return storageInstance.upload({
        file,
        fileName,
        folder:"challenge"
    });
}

module.exports = {
    storageInstance, 
    uploadFileToIk
}