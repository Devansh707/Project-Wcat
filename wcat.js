let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);
// let fileName = inputArr[0];
// content += fs.readFileSync(fileName);
// console.log(content);

let filesArr = inputArr;
let optionsArr = [];
let newFilesArr = [];
// console.log(filesArr);

for(let i = 0; i < filesArr.length; i++) {
    let firstChar = filesArr[i].charAt(0);
    if( firstChar == "-" ){
        optionsArr.push(filesArr[i]);
    } else{
        newFilesArr.push(filesArr[i]);
    }
}
// console.log("Options Arr = ", optionsArr);
// console.log("Files Arr = ", newFilesArr);


for(let i = 0; i < newFilesArr.length; i++) {
    let ans = fs.existsSync(newFilesArr[i]);
    if( ans == false) {
        // console.log(newFilesArr[i] + " File does not exist");
        // console.log(newFilesArr[i] + " This File has been removed");
        let rem = newFilesArr.splice(i, 1);
        // console.log("\n", rem + " This is the culprit", "\n");😁
        //  fs.unlinkSync(filesArr[i]); -> This is method is used to remove an existing file.
    }
}
// console.log(filesArr);
let content = "";
console.log("New length of Files Array = " , newFilesArr.length );
console.log("\n");
for(let i=0; i<newFilesArr.length; i++) {
    content += fs.readFileSync(newFilesArr[i]) + "\r\n";
}
console.log(content);
// *****************************3. -s implementation ***************
// -s checks 
let contentArr = content.split("\r\n");
let ifS_Present = optionsArr.includes("-s");
if(ifS_Present) {
    for(let i = 1; i < contentArr.length; i++) {
        if(contentArr[i] == "" && contentArr[i - 1] == ""){
            contentArr[i] = null;
        } else if( contentArr[i] == "" && contentArr[ i - 1] == null ){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i = 0; i < contentArr.length; i++) {
        if(contentArr[i] != null ){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
    console.log(contentArr.join("\n"));
}

// **********************check for -n and -b ************
let finalOption = "";
let indexOfN = optionsArr.indexOf("-n");
let indexOfB = optionsArr.indexOf("-b");

if( indexOfN > -1 && indexOfB > -1) {
    // Both are present
    if(indexOfN < indexOfB) {
        // Index of N is smaller than index of B so gets first priority
        finalOption = "-n";
    } else if (indexOfB < indexOfN){
        // Index of B is smaller than index of N so gets first priority
        finalOption = "-b";         
    }
} else {
    // Only one of the two is present 
    if(indexOfN > -1){
        finalOption = "-n";

    } else if (indexOfB > -1){
        finalOption = "-b";         

    }
}
console.log("final option = ", finalOption);
if( finalOption == "-n" ){
    modifyContentByN(contentArr)
    
} else if ( finalOption == "-b" ) {
    modifyContentByB(contentArr);
}
function modifyContentByN(contentArr){
    for(let i = 0; i < contentArr.length; i++){
        contentArr[i] = (i + 1) + ". " + contentArr[i];
    }
}

function modifyContentByB(contentArr){
    let count = 1;
    for(let i = 0 ; i < contentArr.length; i++) {
        if( contentArr[i] != "" ){
            contentArr[i] = count + ". " + contentArr[i];
            count++;
        }
    }
}
console.log(contentArr.join("\r\n"));