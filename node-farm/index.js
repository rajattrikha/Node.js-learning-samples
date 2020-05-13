const fs  =  require('fs');
const http =  require('http');
const url =  require('url');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const templateHome = fs.readFileSync(`${__dirname}/templates/template-home.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const dataObj  = JSON.parse(data);

const replaceHTML = (template,data)=>{
    let output = template.replace(/{%PRODUCTNAME%}/g,data.productName);
    output = output.replace(/{%QUANTITY%}/g,data.quantity);
    output = output.replace(/{%PRICE%}/g,data.price);
    output = output.replace(/{%NUTRIENTS%}/g,data.nutrients);
    output = output.replace(/{%FROM%}/g,data.from);
    output = output.replace(/{%ID%}/g,data.id);
    output = output.replace(/{%IMAGE%}/g,data.image);
    output = output.replace(/{%DESCRIPTION%}/g,data.description);

    if(!data.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
}

const server = http.createServer((req,res)=>{
  
 const {pathname , query} = url.parse(req.url,true);


    //Home page
    if(pathname ==="/home" || pathname ==="/"){
        const  cardsHTML = dataObj.map(element=>replaceHTML(templateCard,element)).join('');
        res.writeHead(200,{"Content-Type":"text/html"});
        const output = templateHome.replace('{%PRODUCT_CARDS%}',cardsHTML);
        res.end(output);
    }

    //Product
    else if(pathname === "/product"){
        res.writeHead(200,{"Content-Type":"text/html"});
        const product  =  dataObj[query.id];
        const output = replaceHTML(templateProduct,product);
        res.end(output); 
    }

    //API
    else if(pathname === "/api"){
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(data);
       

    }

    //ABOUT
    else if(pathname === "/about"){
    res.end("I am chitti the robo. Speed  1 thz memory 1 peta byte");
    }
    
    //NOT FOUND
    else{
    res.writeHead(404,{"Content-Type":"text/html","my-own-header":"hello-world"});
    res.end("<H1>404 Page Not Found!<H1>");
}
})

server.listen(8000,'localhost',()=>{
    console.log("Listening to requests at port 8000");
})
















/*************************Files********************** */ 
// const txtIn = fs.readFile('./txt/startt.txt','utf-8',(err,data1)=>{
//     if(err) return console.log("Error occured! 💥");
//     const txtIn = fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         const txtIn = fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/finawl.txt',`${data2} \n${data3}`,'utf-8',err =>{
//                 if(!err){
//                     console.log('file saved successfully. 😃');
//                 }else{
//                     console.log("Save unsuccessful! 🙄😑");
//                 }
//             });
//         });
//     });
//     });
// console.log("reading File...");
