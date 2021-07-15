const fs = require('fs');
const path = require('path');

const b20 = `${__dirname}/20-00`;
const g18 = `${__dirname}/18-00`;

function personSwitch(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log(err);
        }
        console.log(files);
        files.forEach((value) => {
            fs.readFile(path.join(dir, value), (err1, data) => {
                if (err1) {
                    console.log(err1);
                    return;
                }
                const person = JSON.parse(data);
                console.log(person.gender);
                if (person.gender === 'female') {
                    fs.rename(path.join(dir, value), path.join(g18, value), (err2) => {
                        if (err2) {
                            console.log(err2);
                        }
                    });
                }
                if (person.gender === 'male') {
                    fs.rename(path.join(dir, value), path.join(b20, value), (err3) => {
                        if (err3) {
                            console.log(err3);
                        }
                    });
                }
            });
        });
    });
}

personSwitch(b20);
personSwitch(g18);
