let nouveauLivre = document.querySelector(".h2");

let titrePage = document.querySelector(".h1");

const container = document.getElementById("myBooks");

const maPochListe = document.getElementById("poch-list");

// Ajouter le bouton livre "Ajouter un livre"

function creationAjoutBouton() {
  const container = document.getElementById("myBooks");

  let addBookButton = document.createElement("div");
  addBookButton.id = "addBookBtn";
  addBookButton.innerHTML = `<div class="addBookDiv">

      <button onclick="creationFormulaire()" type="button" class="addBookButton"> Ajouter un livre </button>

    </div>`;

  addBookButton.hidden = false;

  container.appendChild(addBookButton);

// Permet de positionner le bouton juste après le .h2
  nouveauLivre.after(addBookButton);
}

creationAjoutBouton();

//Add all events listner
function createAllEventListner() {
  document.getElementById("searchButton").addEventListener(
    "click",
    function () {
      displaySearchBook();
      clearPochlist();
      if (document.getElementById("maPochList")) {
        document.getElementById("maPochList").hidden = false;
      }
      if (document.getElementById("poch-List")) {
        document.getElementById("poch-List").hidden = false;
      }
    });

  document.getElementById("cancelButton").addEventListener(
    "click",
    function () {
      cancelSearch();
      displayBookToPochList();
      document.getElementById("results").hidden = true;
    },
  );
}

  // Bouton de recherche livre




function searchbook() 
{

var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    console.log(title)
    console.log(author)



  var url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
  console.log(url+title+'+'+author)
  fetch(url+title+'+'+author)

  .then(function(response) {
    if (response.ok) {
      return response.json(); 
    }
  })

   .then(function(response) {
    console.log(response.items)
    response.items.forEach(element => { 
        
    
    console.log(element.volumeInfo.title)
    console.log(element.volumeInfo.imageLinks)
    console.log(element.id)

   
    
      var book = document.createElement("div");
      book.className = "book";


      
      var img = document.createElement('img');
      img.className = "img";
      img.src = element.volumeInfo.imageLinks

      
       var imglink = element.volumeInfo.imageLinks

       if ( imglink === undefined) {
       img.src = "./unavailable.png"
       } else {
        img.src = element.volumeInfo.imageLinks.smallThumbnail }
     
      
        

      var identifiant = document.createElement('p');
          identifiant.innerText = "Id : " + element.id;
          identifiant.classname= "identifiant";


      var title = document.createElement('h4');
          title.innerText = element.volumeInfo.title;
          title.classname= "title";
          

      var author = document.createElement('p');
          author.innerText = element.volumeInfo.authors;
          author.classname= "author";

      var description = document.createElement('p');
          description.innerText = element.volumeInfo.description;
          description.classname= "hidden";
          
      var bookmark = document.createElement('img');
          bookmark.className = "bookmark";
          bookmark.src = "./bookmark.png"
          

          
          
      book.appendChild(bookmark)
      book.appendChild(img)
      book.appendChild(identifiant)
      book.appendChild(title)
      book.appendChild(author)
      book.appendChild(description)

      document.getElementById('content').appendChild(book)
          
    
    })

 
     
    
  })

 
}



// Ajouter la fonction de recherche du livre

//Ajouter un formulaire de recherche
function creationFormulaire() {
  const addBookDiv = document.querySelector(".addBookDiv");
  addBookDiv.innerHTML = `

  <form id="search-card" onsubmit="searchResults(); return false;">

    <div class="form-group">

      <label class="bookTitle" for="title"> Titre du Livre </label>

      <input class="row-s-8 form-control" type="text" name="title" id="title" placeholder="Titre" > </br>

      <label class="bookAuthor" for="author">Auteur</label>

      <input class="form-control" type="text" name="author" id="author" placeholder="Auteur" >

      <div class="button2"><br>

        <button type="button" id="searchButton" class="searchButton" onclick="searchbook()"> Rechercher </button>

      </div><br>

      <div class="button3">

        <button type="button" id="cancelButton" class="cancelButton"> Annuler </button>

      </div><br>

    </div>

  </form>`;
  }

