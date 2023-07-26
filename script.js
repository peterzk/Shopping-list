const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');



function addItem(e){
  e.preventDefault()

  const newItem = itemInput.value;

  // Validate input
  if (newItem === ''){
    alert('Please add an item');
    return;
  }

  // create list item

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);

  checkUI();

  itemInput.value = '';

}


// Function for creating the button and icon

function createButton(classes){
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// Function for creating the icon

function createIcon(classes){
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;

}

// Function for removing item

function removeItem(e){
   if(e.target.parentElement.classList.contains('remove-item')){
    if (confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove()

      checkUI();
    }
   }
}

// Function for clearing all the items

function clearItems(){
  while (itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

// Function to check whether there are list items in UI
function checkUI(){

  const items = itemList.querySelectorAll('li');
  if (items.length === 0){
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else{
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};


// Event Listeners

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);


checkUI();