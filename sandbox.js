const form = document.querySelector('.addForm');
const table = document.querySelector('.table');
const allAmount = document.querySelectorAll('.tab-output-amount');
let result = document.querySelector('.result');
const totalButton = document.querySelector('.total-btn button');
const addBudget = document.querySelector('.add-budget');
const editBudget = document.querySelector('.edit-budget');
const feedback = document.querySelector('.feedback');
const budgetButtons = document.querySelector('.budget-buttons');
const editBox = document.querySelector('.edit-box-form');
const editBoxContainer = document.querySelector('.edit-box');


let  budgetInput = null;
let budgetDate = null;
let finalDateOutput = null;
let future = null;
let now = new Date();


let regexCheck =/^[0-9]+$/;




addBudget.addEventListener('submit', (e)=>{
 e.preventDefault();
  budgetInput = addBudget.budget.value.trim();
  //budgetInput.dataset.budgetInput;
  budgetDate =  addBudget.budgetDate.value;
 future = new Date(budgetDate);
  finalDateOutput = dateFns.distanceInWords(now,future )
   

   if(regexCheck.test(budgetInput)){
    
      addBudget.innerHTML = ` <div class="budget-input">
    #${budgetInput} for ${finalDateOutput}
  </div>`;

   } else{
     alert('Not a number');
   }

   
  
 

 editBudget.style.display = 'block';
  
});
//adding comas to numbers
// function getCommaNumbers(num){
//   var n = Number(num);
//   let value = n.toLocaleString("en");
//   return value;
// }



budgetButtons.addEventListener('click',(e)=>{
  // console.log(e)
//budgetInput = ''

if(e.target.nodeName == "BUTTON"){
  console.log('edit button clicked');

  budgetButtons.style.display = 'none';
  editBoxContainer.style.display = 'grid';

//  addBudget.innerHTML = ` <div class="budget-input">
//   #${budgetInput} for ${finalDateOutput}
// </div>`;

};

});

editBox.addEventListener('submit', e=>{
  e.preventDefault();
  let editBudgetInput =editBox.edit.value.trim();
  
 let editDateInput =  editBox.editDate.value;

   budgetInput = editBudgetInput;
    budgetDate = editDateInput;
    future = new Date(budgetDate);
    finalDateOutput = dateFns.distanceInWords(now,future );

 if(regexCheck.test(budgetInput)){
    
  editBox.innerHTML = ` <div class="budget-input">
#${editBudgetInput} for ${finalDateOutput}
</div>
<button class="edit-budget">Edit Budget</button>
`;

} else{
 alert('Not a number');
}

 //editBudgetInput.defaultValue = budgetInput;

 document.querySelector('.edit-budget').style.display = 'block';
});



const updateExpanse = (name,date,amount)=>{
    
if(regexCheck.test(amount)){
  const html = `
  <tr>
  <td class="tab-output-name">${name}</td>
  <td class="tab-output-date">${date}</td>
  <td class="tab-output-amount">${amount}</td>
  <td class="tab-output-delete"><button class="delete">X</button></td>
 </tr>
  `;
 
  table.innerHTML += html;
  
 
} else {
  alert('Not a number')
}

 
};

form.addEventListener('submit',e =>{

   e.preventDefault();
   const name = form.name.value.trim();
   const amount = form.amount.value.trim();
   const date = form.date.value;

   if(name.length && amount.length && date.length){
    updateExpanse(name,date,amount);
    form.reset();
   }
updateTotal();

  //  if(feedback.textContent){
  //    feedback.remove();
  //  }

   
});

table.addEventListener('click', e=>{

  if(e.target.classList.contains('delete')){
      e.target.parentElement.parentElement.remove();
  }

});

//result output




function updateTotal(){

  
    const amounts = document.getElementsByClassName('tab-output-amount');
    const amountsArr =Array.from(amounts);
    let total = 0;
    amountsArr.forEach((arr)=>{

        if(arr.textContent){

            let numbers = parseInt(arr.textContent)
            total += numbers;
            
            let html2 =`
            <div class="result">
            <p>Omo you done spend reach <span>#${total}</span></p>
            </div>
            `;
            result.innerHTML = html2;
        }
       
});

if(budgetInput == null){
  feedback.style.display = 'none';
}else if(total <= 0.5*budgetInput){
  feedback.style.color= 'green';
  feedback.innerHTML = ` You are very much within budget boss!!!`;
} else if(total <= 0.8*budgetInput){
  feedback.style.color= 'orange';
  feedback.innerHTML = ` You are more than half way into your budget alaye, watch it!!!`;
}else if(total > budgetInput){
  feedback.style.color= 'red';
  feedback.innerHTML = ` werey you done pass budget, Abi you wan do ritual?!!!`;
} 


};


//console.log(budgetInput);

