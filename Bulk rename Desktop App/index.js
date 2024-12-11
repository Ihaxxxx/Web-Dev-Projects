const fs = require('node:fs');
const path = require('path')
const replaceThis = "John"
const replaceWith = "Mubashir"
const preview = false
const folder = (__dirname)
try {
    fs.readdir(folder, (err, data) => {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            let newFile = path.join(folder,item.replaceAll(replaceThis, replaceWith))
            let oldfile = path.join(folder,item) 
            if (!preview) {

                fs.rename(oldfile,newFile, () => {
                    console.log("Success");
                })
            }else{
                if ("data/" + item !== newFile) {
                    
                 console.log("data/" + item + "will be ranamed to this"+newFile);}
            }
        }
    })
} catch (err) {
    console.error(err);
}
