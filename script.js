document.body.innerHTML=`
<div class="container text-center">
<h1 class="mt-4" style="color:#4600b9;" >Predict the nationality of the name</h1><hr>
<input size="40" class="mt-3" type="text" id="name" placeholder="Enter the name"></input><svg class="m-2" onclick="searchfunction()" style="cursor:pointer;" xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg><br><br>
<input type="button" value="Search" id="search" onclick="searchfunction()" class="btn btn-primary"></input>
<input type="button" value="Reset" id="reset" onclick="resetfunction()" class="btn btn-danger"></input><br><br>
<h1> <mark id="text_typed"></mark></h1>
<div id="spin" class="spinner-border m-auto" role="status"></div>
<div id="result" class="d-flex justify-content-center"></div>
</div>`

let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

// console.log(regionNames.of('IN'))


document.getElementById('spin').style.display='none';
document.getElementById('text_typed').style.display="none";
searchfunction=async()=>{
    let name_value=document.getElementById('name').value;
    document.getElementById('result').innerHTML='';
   document.getElementById('text_typed').innerHTML="";
    if (name_value==""||name_value==0) {
        alert('Please enter valid name');
    }else if(name_value.includes(" ")){
        alert("spaces are not allowed");
    }else{
        try {
            document.getElementById('text_typed').style.display="block";
            document.getElementById('text_typed').innerHTML=document.getElementById('name').value;
                let url =`https://api.nationalize.io/?name=${name_value}`;
         
                 document.getElementById('spin').style.display='block';
        
                let promise=await fetch(url);
                let data=await promise.json();
                // console.log(data);
               
                    document.getElementById('spin').style.display='none';
            
                document.getElementById('result').innerHTML=`
                <div class="card " style="width:50vw;" >
                <div class="card-body">
                <h3 class="mb-3">Predicted TOP 1 </h3>
                    <h5 class="mb-3">Country:${regionNames.of(data.country[0].country_id)}</h5>
                    <p>Country Code :${ data.country[0].country_id }</p>
                    <p>Probability :${ data.country[0].probability}</p><hr>
                <h3 class="mb-3">Predicted TOP 2 </h3>
                    <h5 class="mb-3">Country:${regionNames.of(data.country[1].country_id)}</h5>
                    <p>Country Code :${ data.country[1].country_id }</p>
                    <p>Probability :${ data.country[1].probability}</p>
                </div>
              </div>`
            }
        
        catch(error) {
         document.getElementById('result').innerHTML=`The name You entered does not match with our records<br>
         Please try another one!!!`;
        }
       
    }
}
resetfunction=()=>{
document.getElementById('text_typed').style.display="none";

   document.getElementById('name').value="";
   document.getElementById('result').innerHTML='';
   document.getElementById('text_typed').innerHTML="";
}
 




