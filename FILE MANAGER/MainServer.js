const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs');
const { count } = require('console');

app.use(express.static("public")); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/MainPage.html'); 
});


app.post('/submit-form', (req, res) => {
    console.log(req.body) 
    fs.writeFile(`./Data/${req.body.name}.txt`, `${req.body.name}\n${req.body.email}\n${req.body.contact}`, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    res.redirect("/")
});


// app.get('/dataCheck', (req, res) => {
//     res.sendFile(__dirname + '/public/html/DataCheck.html'); 
//     fs.readdir("./Data",'utf8',function (err,files) {
//         let count = 1
//         let dataToInsert = ""
//         files.forEach(e=>{
//             // let MainGrid = document.getElementById("MainGrid")
//             fs.readFile(`./Data/${e}`, 'utf8', (err, data) => {
//                 if (err) {
//                     console.error('Error reading file:', err);
//                 }
//                 let arr = data.split("\n")
//                 dataToInsert += `<div class="grid-item">${count}</div>
//                                     <div class="grid-item">${arr[0]}</div>
//                                     <div class="grid-item">${arr[1]}</div>
//                                     <div class="grid-item">${arr[2]}</div>`
//                 // document.getElementById("MainGrid").insertAdjacentHTML("beforebegin",dataToInsert)
//                 // MainGrid.innerHTML="<h1>poly</h1>"
//                 count  += 1
//             });
//         })
//         res.json({ message : dataToInsert});
//     })
// });




app.get('/loadnewpage',(req,res)=>{
    res.sendFile(__dirname + '/public/html/DataCheck.html');
})


// app.get('/dataCheck',(req,res)=>{
//     fs.readdir("./Data",'utf8',function (err,files) {
//         let count = 1
//         let dataToInsert = []
//         let filedata = ""
//         files.forEach(e=>{
//             fs.readFile(`./Data/${e}`, 'utf8',(err,data)=>{
//                 if (err) {
//                     console.error('Error reading file:', err);
                    
//                 } else {
//                 let arr = data.split("\n")
//                         filedata = `<div class="grid-item">${count}</div>
//                                      <div class="grid-item">${arr[0]}</div>
//                                      <div class="grid-item">${arr[1]}</div>
//                                      <div class="grid-item">${arr[2]}</div>`
//                         count  += 1
//                         resolve(filedata);
//                     }
//                 })
                
//             })

//     })
//     Promise.all(filePromises)
//             .then((results) => {
//                 // Push all file data into the response array
//                 dataToInsert = results;
//                 res.json({ message: dataToInsert });
//             })
//             .catch((error) => {
//                 res.status(500).json({ message: 'Error processing files' });
//             });
// })


app.get('/dataCheck', (req, res) => {
    fs.readdir('./Data', 'utf8', (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading directory' });
        }

        let count = 1;
        let dataToInsert = [];

        // Create an array of promises to read each file asynchronously
        const filePromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                fs.readFile(`./Data/${file}`, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        return reject(err);
                    }

                    // Split file data and create grid item HTML structure
                    let arr = data.split("\n");
                    let fileData = `<div class="grid-item">${count}</div>
                                    <div class="grid-item">${arr[0]}</div>
                                    <div class="grid-item">${arr[1]}</div>
                                    <div class="grid-item">${arr[2]}</div>`;

                    count += 1;
                    resolve(fileData);
                })
            });
        });

        // Wait for all file reading promises to complete
        Promise.all(filePromises)
            .then((results) => {
                // Push all file data into the response array
                dataToInsert = results;
                res.json({ message: dataToInsert });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Error processing files' });
            });
    });
});



app.listen(3000)
