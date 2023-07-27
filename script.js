const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function displayItems(){
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item =>addItemToDOM(item));

  checkUI();
}

function onAddItemSubmit(e){
  e.preventDefault()

  const newItem = itemInput.value;

  // Validate input
  if (newItem === ''){
    alert('Please add an item');
    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = '';

}

function addItemToDOM(item){
  // create list item

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
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


// function to add to local storage

function addItemToStorage(item){
  const itemsFromStorage = getItemsFromStorage();

  // add new item to array
  itemsFromStorage.push(item);

  // covert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// getting items from storage

function getItemsFromStorage(){
  let itemsFromStorage;

  if (localStorage.getItem('items')===null){
    itemsFromStorage = [];
  } else{
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));

  }
  return itemsFromStorage;
};
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

// function for the filter input

function filterItems(e){
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1){
      item.style.display = 'flex';
    } else{
      item.style.display = 'none';
    }
    
  });

  
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

// Initialize app

function init(){
  // Event Listeners

  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', removeItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();
