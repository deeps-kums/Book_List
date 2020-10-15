//Book constructor
function Book(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}
//UI constructor
function UI(){

}

UI.prototype.addBookToList = function(book){
    const list=document.getElementById('book-list');
    //Create tr element
    const row=document.createElement('tr');
    //Insert cols
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
    //console.log(row);
}

//Show alert
UI.prototype.showAlert=function(message,className){
    //Create div
    const div=document.createElement('div');
    //Add classes
    div.className=`alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container=document.querySelector('.container');
    //Get form
    const form=document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div,form);
    //Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}

//Delete book
UI.prototype.deleteBook = function(target){
    if(target.className==='delete'){
        target.parentElement.parentElement.remove();
    }
}

//Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}

//Event listener
document.getElementById('book-form').addEventListener('submit',
function(e){
   // Get form values
   const title=document.getElementById('title').value;
         author=document.getElementById('author').value;
         isbn=document.getElementById('isbn').value;
   
    //Instantiate the book
   const book=new Book(title,author,isbn);

   //Instantiate UI
   const ui=new UI();

   //Validate
   if(title==='' || author==='' || isbn===''){
       ui.showAlert('Please fill in all the fields','error');
   }else{
        ui.addBookToList(book);
        //show alert
        ui.showAlert('Book Added!','success');
        ui.clearFields();
   }

   
   //console.log(book);

    e.preventDefault();
});

//event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
    //console.log(123);
    const ui=new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed!','success');
    e.preventDefault();
})