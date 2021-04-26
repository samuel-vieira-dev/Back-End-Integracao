const bs = require('./_config/bootstrap')

bs()

    //inicio
    const express = require('express');
    const path = require('path'); 
    const multer = require('multer');
    const app1 = express();
    const pastaArquivos = path.resolve(__dirname, './uploads')
    
    const upload = multer({
        storage: multer.diskStorage({
            destination: pastaArquivos,
            filename: (req,file,callback)=> callback(null, file.originalname)
        })
    })
    
app1.use('/arquivos', express.static(pastaArquivos))

app1.post('/file',upload.single('arquivo'),(req,res)=>{
    res.send('Deu tudo certo aqui');
})

app1.listen(3030);