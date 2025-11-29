// Appele les inpute
let inptitle = document.getElementById('inptitle');
let inprice = document.getElementById('inprice');
let inptexte = document.getElementById('inptexte');
let inpads = document.getElementById('inpads');
let inpdiscount = document.getElementById('inpdiscount');
let btntotal = document.getElementById('btntotal');
let inpcount = document.getElementById('inpcount');
let inpcategory = document.getElementById('inpcategory');
let btncreate = document.getElementById('btncreate');
let change = 'create';
let tmp;


//Get Total
function getTotal(){
    if(inprice.value != ''){
        let result = (+inprice.value + +inptexte.value + +inpads.value) - +inpdiscount.value; 
        btntotal.innerText = "Total: " + result;
    }else{
        btntotal.innerText = ' ';
    }
}
 
//Create 
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

btncreate.onclick = function(){
    let newProduct = {
        title : inptitle.value,
        price : inprice.value,
        texes : inptexte.value,
        ads : inpads.value,
        discount : inpdiscount.value,
        total : btntotal.innerHTML,
        count:inpcount.value,
        category:inpcategory.value, 
    }

    if(inptitle.value != '' && inprice.value !='' && inpcategory.value !='' && inpcount.value < 100 ){
        if(change === 'create'){
            if(newProduct.count > 1){
                for(let i = 0; i < newProduct.count; i++){
                    dataPro.push(newProduct);
                }
            }else{
                dataPro.push(newProduct);
            }
        }else{
            dataPro[tmp] = newProduct;
            change = 'create';
            btncreate.innerHTML = 'Create';
            inpcount.disabled = false;
        }
    }else{
        clearData();
    }
    //dataPro.push(newProduct);
    localStorage.setItem('product', JSON.stringify(dataPro));
    schowData();
    upDateData();
}

//clear input
function clearData(){
    inptitle.value = '';
    inprice.value = ''; 
    inptexte.value = ''; 
    inpads.value = ''; 
    inpdiscount.value = ''; 
    btntotal.innerHTML = ''; 
    inpcount.value = ''; 
    inpcategory.value = '';     
}

//Read 
function schowData(){
    let table = '';  
    for(let i=0; i < dataPro.length; i++){
        table += `
        <tr>
            <td class="border border-gray-300">${i+1}</td>
            <td class="border border-gray-300">${dataPro[i].title} </td>
            <td class="border border-gray-300">${dataPro[i].price}</td>
            <td class="border border-gray-300">${dataPro[i].texes}</td>
            <td class="border border-gray-300">${dataPro[i].ads}</td>
            <td class="border border-gray-300">${dataPro[i].discount}</td>
            <td class="border border-gray-300">${dataPro[i].total}</td>
            <td class="border border-gray-300">${dataPro[i].category}</td>
            <td class="border border-gray-300"><button onclick="upDateData(${i})"class="px-4 py-1  bg-blue-700  text-white rounded-[50PX]">Update</button></td>
            <td class="border border-gray-300"><button onclick="deleteData(${i})" class="px-4 py-1  bg-red-600  text-white rounded-[50PX]">Delete</button></td>        
        </tr>`;  
    }
    document.getElementById('infoTable').innerHTML = table;

    let btnDeleteAll = document.getElementById('btndeleteall');
    if(dataPro.length == 0){
        btnDeleteAll.disabled = true;
        btnDeleteAll.style.backgroundColor = "#aaa";
    }else{
        btnDeleteAll.disabled = false;
        btnDeleteAll.style.backgroundColor = "bg-blue-700";
    }
}
schowData();


//Delete
function deleteData(id){
    dataPro.splice(id,1);
    localStorage.product = JSON.stringify(dataPro);
    schowData();
}

//Delete All

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    schowData();
}

//Update
function upDateData(id){
    inptitle.value = dataPro[id].title;
    inprice.value = dataPro[id].price;
    inptexte.value = dataPro[id].texes;
    inpads.value = dataPro[id].ads;
    inpdiscount.value = dataPro[id].discount;
    getTotal();
    inpcount.disabled = true;
    // inpcount.style.display = 'none';
    inpcategory.value = dataPro[id].category;
    btncreate.innerHTML = 'Update';
    change = 'update';
    tmp = id;
    scroll({
        top:0,
        behavior:'smooth',
    })
} 

//Search By Title 
let searchMode = 'title';

function getSearch(id){
    let search = document.getElementById('inpsearch');
    if(id === 'btnsearchtitle'){
        searchMode = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMode = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    schowData();
}

function searchData(searchValue){
    let table = '';
    if(searchMode == 'title'){
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(searchValue)){
                
                table += `
                <tr>
                    <td class="border border-gray-300">${i}</td>
                    <td class="border border-gray-300">${dataPro[i].title} </td>
                    <td class="border border-gray-300">${dataPro[i].price}</td>
                    <td class="border border-gray-300">${dataPro[i].texes}</td>
                    <td class="border border-gray-300">${dataPro[i].ads}</td>
                    <td class="border border-gray-300">${dataPro[i].discount}</td>
                    <td class="border border-gray-300">${dataPro[i].total}</td>
                    <td class="border border-gray-300">${dataPro[i].category}</td>
                    <td class="border border-gray-300"><button onclick="upDateData(${i})"class="px-4 py-1  bg-blue-700  text-white rounded-[50PX]">Update</button></td>
                    <td class="border border-gray-300"><button onclick="deleteData(${i})" class="px-4 py-1  bg-red-600  text-white rounded-[50PX]">Delete</button></td>        
                </tr>`;  
            }
        }
    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(searchValue)){
                
                table += `
                <tr>
                    <td class="border border-gray-300">${i}</td>
                    <td class="border border-gray-300">${dataPro[i].title} </td>
                    <td class="border border-gray-300">${dataPro[i].price}</td>
                    <td class="border border-gray-300">${dataPro[i].texes}</td>
                    <td class="border border-gray-300">${dataPro[i].ads}</td>
                    <td class="border border-gray-300">${dataPro[i].discount}</td>
                    <td class="border border-gray-300">${dataPro[i].total}</td>
                    <td class="border border-gray-300">${dataPro[i].category}</td>
                    <td class="border border-gray-300"><button onclick="upDateData(${i})"class="px-4 py-1  bg-blue-700  text-white rounded-[50PX]">Update</button></td>
                    <td class="border border-gray-300"><button onclick="deleteData(${i})" class="px-4 py-1  bg-red-600  text-white rounded-[50PX]">Delete</button></td>        
                </tr>`;  
            }
        }

    }
    document.getElementById('infoTable').innerHTML = table;

}

//Clean Date