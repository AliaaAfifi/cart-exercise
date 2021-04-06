const items = [
    {
        id: 1,
        name: 'T-shirt',
        price: 150,
        count: 5,
        love: true,
    },
    {
        id: 2,
        name: 'Table',
        price: 300,
        count: 3,
        love: true,
    },
    {
        id: 3,
        name: 'TV',
        price: 4000,
        count: 1,
        love: false,
    },
    {
        id: 4,
        name: 'Shoes',
        price: 200,
        count: 8,
        love: true,
    },
    {
        id: 5,
        name: 'Cup',
        price: 5,
        count: 0,
        love: false,
    },
    {
      id: 6,
      name: 'Chair',
      price: 1100,
      count: 1,
      love: true,
  },
  {
      id: 7,
      name: 'Bag',
      price: 250,
      count: 2,
      love: false,
  }
];

const createTable = () => {
    var table = document.createElement('table');

    //table head
    var tableHead = document.createElement('thead');
    var row = document.createElement('tr');

    var cell0 = document.createElement('th');
    cell0.innerHTML = 'ID';
    cell0.setAttribute('scope', 'col');

    var cell1 = document.createElement('th');
    cell1.innerHTML = 'Name';
    cell1.setAttribute('scope', 'col');

    var cell2 = document.createElement('th');
    cell2.innerHTML = 'Count';
    cell2.setAttribute('scope', 'col');

    var cell3 = document.createElement('th');
    cell3.innerHTML = 'Price';
    cell3.setAttribute('scope', 'col');

    var cell4 = document.createElement('th');
    cell4.innerHTML = 'Total';
    cell4.setAttribute('scope', 'col');

    var cell5 = document.createElement('th');
    cell5.innerHTML = 'Actions';
    cell5.setAttribute('scope', 'col');

    row.appendChild(cell0);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);

    tableHead.appendChild(row);
    
    //table body
    var tableBody = document.createElement('tbody');
  
    items.forEach(function(rowData) {

      var row = document.createElement('tr');

      var cell0 = document.createElement('th');
      cell0.setAttribute('scope', 'row');

      cell0.appendChild(document.createTextNode(rowData.id));

      var cell1 = document.createElement('td');
      cell1.appendChild(document.createTextNode(rowData.name));

      var cell2 = document.createElement('td');

      cell2.appendChild(document.createTextNode(rowData.count));

      var cell3 = document.createElement('td');
      cell3.appendChild(document.createTextNode(rowData.price));

      var cell4 = document.createElement('td');
      cell4.appendChild(document.createTextNode(parseInt(rowData.price) * parseInt(rowData.count)));

      //Actions cell
      var cell5 = document.createElement('td');
      //<button type="button" class="btn btn-primary">Primary</button>
      var minusBtn = document.createElement('button');
      minusBtn.setAttribute('type', 'button');
      minusBtn.setAttribute('class', 'btn btn-info');
      minusBtn.innerHTML = 'Decrement';
      minusBtn.addEventListener('click', () => {
        decrementItemCount(rowData.id)
      });

      var plusBtn = document.createElement('button');
      plusBtn.setAttribute('type', 'button');
      plusBtn.setAttribute('class', 'btn btn-primary');
      plusBtn.innerHTML = 'Increment';
      plusBtn.addEventListener('click', () => {
        incrementItemCount(rowData.id)
      });

      var deleteBtn = document.createElement('button');
      deleteBtn.setAttribute('type', 'button');
      deleteBtn.setAttribute('class', 'btn btn-dark');
      deleteBtn.innerHTML = 'Delete';
      deleteBtn.addEventListener('click', () => {
        deleteItem(rowData.id);
        // incrementItemCount(rowData.id)
      });

      //<button class="btn btn-danger"><i class="fa fa-heart"></i></button>

      var likeBtn = document.createElement('button');
      likeBtn.setAttribute('type', 'button');

      if(rowData.love == true) {
        likeBtn.setAttribute('class', 'btn btn-danger');
      } else {
        likeBtn.setAttribute('class', 'btn btn-light');
      }
      likeBtn.setAttribute('id', 'like-btn');

      var heartIcon = document.createElement('i');
      heartIcon.setAttribute('class', 'fa fa-heart');

      likeBtn.appendChild(heartIcon);

      likeBtn.addEventListener('click', () => {
        likeItem(rowData.id);
      });

      cell5.appendChild(minusBtn);
      cell5.appendChild(plusBtn);
      cell5.appendChild(deleteBtn);
      cell5.appendChild(likeBtn);
      //end of actions cell

      row.appendChild(cell0);
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell5);
      
      console.log({tableBody});

      if (rowData.count == 0) {
        row.style.display = 'none';
      }

      tableBody.appendChild(row);
      
    });

    var lastRow = document.createElement('tr');

    var _cell0 = document.createElement('td');
    var _cell1 = document.createElement('td');
    var _cell2 = document.createElement('td');
    var _cell3 = document.createElement('td');
    var _cell4 = document.createElement('td');
    _cell4.appendChild(document.createTextNode(calculateCartTotal()));
    var _cell5 = document.createElement('td');

    lastRow.appendChild(_cell0);
    lastRow.appendChild(_cell1);
    lastRow.appendChild(_cell2);
    lastRow.appendChild(_cell3);
    lastRow.appendChild(_cell4);
    lastRow.appendChild(_cell5);

    tableBody.appendChild(lastRow);

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    table.setAttribute('class', 'table');
    document.body.appendChild(table);
  }

  const decrementItemCount = (id) => {

    var table = document.querySelector("table");
   
    var count = table.rows[id].cells[2].innerHTML;
    table.rows[id].cells[2].innerHTML = `${count - 1}`;
    count = table.rows[id].cells[2].innerHTML;
    var price = table.rows[id].cells[3].innerHTML;
    table.rows[id].cells[4].innerHTML = calculateTotalPerItem(count, price);
    updateItemCount(id, count);
    table.rows[items.length + 1].cells[4].innerHTML = calculateCartTotal();

    if (count ==0) {
      recreateTable();
    }
  }

  const incrementItemCount = (id) => {
    var table = document.querySelector("table");
   
    var count = table.rows[id].cells[2].innerHTML;
    table.rows[id].cells[2].innerHTML = `${parseInt(count) + 1}`;
    count = table.rows[id].cells[2].innerHTML;
    var price = table.rows[id].cells[3].innerHTML;
    table.rows[id].cells[4].innerHTML = calculateTotalPerItem(count, price);
    updateItemCount(id, count);
    console.log({items});
    table.rows[items.length + 1].cells[4].innerHTML = calculateCartTotal();

  }

  const calculateTotalPerItem = (count, price) => {
    return (parseInt(count) * parseInt(price));
  }

  const updateItemCount = (id, newCount) => {
      items[parseInt(id) - 1].count = parseInt(newCount);
  }

  const toggleItemLove = (id) => {
    items[parseInt(id) - 1].love = !items[parseInt(id) - 1].love;
  }

  const calculateCartTotal = () => {
      var sum = 0;
      for(var i=0; i<items.length; i++) {
        sum += (items[i].count * items[i].price);
      }
      return sum;
  }

  const deleteItem = (id) => {
    var table = document.querySelector("table");
    table.rows[id].cells[2].innerHTML = '0';

    updateItemCount(id, 0);
    console.log({items});
    table.rows[items.length + 1].cells[4].innerHTML = calculateCartTotal();
    recreateTable();
  }

  const likeItem = (id) => {

    toggleItemLove(id);
    recreateTable();
  }

  const recreateTable = () => {
    var table = document.querySelector("table");
    document.body.removeChild(table);
    createTable();
  }

  createTable();