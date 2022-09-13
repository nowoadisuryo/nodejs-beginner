import * as fs from 'fs';

// Create and Read file
// fs.writeFile('example.txt', 'Hello world.', (err) => {
//     if (err) console.log(err);
//     else {
//         console.log('File successfully created.')
//         fs.readFile('example.txt', 'utf8', (err, file) => {
//             if (err) console.log(err);
//             else console.log(file);
//         });
//     };
// })

//Rename
// fs.rename('example.txt', 'example2.txt', (err) => {
//     if (err) console.log(err)
//     else console.log('Successfully rename the file.');
// })

// Append
// fs.appendFile('example2.txt', '\nI am Nowo.', (err) => {
//     if (err) console.log(err)
//     else console.log('Successfully appended the file.');
// })

// Delete
// fs.unlink('example2.txt', (err) => {
//     if (err) console.log(err)
//     else console.log('Successfully deleted the file.');
// })

// -------------------
// Work with folder

// fs.mkdir('tutorial', (err) => {
//     if (err) console.log(err)
//     else {
//         fs.writeFile('./tutorial/example.txt', 'Hello world.', (err) => {
//             if (err) console.log(err)
//             else {
//                 console.log('Successfully created file inside tutorial folder.');
//             }
//         })
//     }
// });

// fs.unlink('./tutorial/example.txt', (err) => {
//     if (err) console.log(err)
//     else console.log('Successfully deleted the file.');
// })

// fs.rmdir('./tutorial', (err) => {
//     if (err) console.log(err)
//     else console.log('Successfully deleted the folder.');
// })

fs.readdir('tutorial', (err, files) => {
    if (err) console.log(err)
    else {
        for (const file of files) {
            fs.unlink('./tutorial/' + file, (err) => {
                if (err) console.log(err)
                else {
                    console.log('Successfully deleted file.');
                }
            })
        }
    }
})