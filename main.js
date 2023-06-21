let nouveauLivre = document.querySelector(".h2");
let titrePage = document.querySelector(".h1");
const container = document.getElementById("myBooks");
const maPochListe = document.getElementById("poch-list");

// Recuperation liste livres favoris

recupListFav()

// Ajouter le bouton livre "Ajouter un livre"

function creationAjoutBouton() {
  const container = document.getElementById("myBooks");

  let addBookButton = document.createElement("div");
    addBookButton.id = "addBookBtn";
    addBookButton.innerHTML = `<div class="addBookDiv"><button onclick="creationFormulaire()" type="button" class="addBookButton"> Ajouter un livre </button>
                               </div>`;
    addBookButton.hidden = false;

  container.appendChild(addBookButton);

// Permet de positionner le bouton juste après le .h2
  nouveauLivre.after(addBookButton);
}

creationAjoutBouton();

function createAllEventListner() {
  document.getElementById("searchButton").addEventListener(
   "click",
    function () {
                  displaySearchBook();
                  
                  if (document.getElementById("maPochList")) {
                  document.getElementById("maPochList").hidden = false;
                }
      if (document.getElementById("poch-List")) {
       document.getElementById("poch-List").hidden = false;
      }
    });

  document.getElementById("cancelButton")
  
  .addEventListener(
         "click",
              function () {
          
                           location.reload(); 
                  
                           },
                   );
}
  // Bouton de recherche livre

function searchbook() 
{
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
  
    fetch(url+title+'+'+author)

     .then
    (function(response) 
    
      {
         if (response.ok) 
            {
                return response.json(); 
            }
      }     
    )

     .then 
      
    (function(response) 
      {
        response.items.forEach
        
        (element => 

          { 
             var book = document.createElement("div");
             book.className = "book";
             var img = document.createElement('img');
             img.className = "img";
             img.src = element.volumeInfo.imageLinks
             var imglink = element.volumeInfo.imageLinks

                 if ( imglink === undefined) 

                     {
                       img.src = "./unavailable.png"
                     } 

                 else 
              
                     {
                       img.src = element.volumeInfo.imageLinks.smallThumbnail 
                     }
     
      
              var identifiant = document.createElement('p');
              identifiant.innerText = "Id : " + element.id;
              
              var title = document.createElement('h4');
              title.innerText = element.volumeInfo.title;
        
              var author = document.createElement('p');
              author.innerText = element.volumeInfo.authors;
              author.classname= "author";

              var description = document.createElement("p");
              description.innerText = element.volumeInfo.description;
              description.classList.add("maxlenght");

              if ( element.volumeInfo.description === undefined) 

                     {
                       description.innerText = 'Aucune description trouvée pour ce livre.'
                     } 

                 else 
              
                     {
                       description.innerText = element.volumeInfo.description; 
                     }
          
              var bookmark = document.createElement('img');
          
              bookmark.setAttribute('onclick','addToFavorites("'+ element.id +'")');  

              bookmark.id = element.id
              bookmark.className = "bookmark";
              bookmark.src = "./bookmark.png"
       
          
              book.appendChild(bookmark)
              book.appendChild(img)
              book.appendChild(identifiant)
              book.appendChild(title)
              book.appendChild(author)
              book.appendChild(description)
              


              document.getElementById('content').appendChild(book)  
          }
        )
      }
    ) 
}

//fonction pour ajouter un livre en favori
function addToFavorites(id) 

{    
    // Verification si le livre existe dans les favoris
    if(localStorage.getItem(id) === null)
    
    { 
       localStorage.setItem (id,id);

       // ajout de la fonction "supprimer des favoris" sur l icone corbeille
       var newimage = "./corbeille.png";
       var oldimage = document.getElementById(id);
       oldimage.setAttribute("src", newimage);
       oldimage.setAttribute('onclick','deleteToFavorites("id")');
    }

    else

    {
      alert ("Ce livre existe déjà dans vos favoris");
    }
   
}

//Ajouter un formulaire de recherche
function creationFormulaire() 

{
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

function recupListFav() 
  
{

 keys = Object.keys(localStorage)
 keys.forEach 
    
  (element => 
   
    {
        var url = 'https://www.googleapis.com/books/v1/volumes/'+element
        fetch(url)

        .then
           
          (function(response) 
             {
               if (response.ok) 
           
                {
                 return response.json(); 
                }
             }
          )
          
        .then
            
        (function(response) 
           {
              var book = document.createElement("div");
              book.className = "book";

              var img = document.createElement('img');
              img.className = "img";
              img.src = response.volumeInfo.imageLinks

      
              var imglink = response.volumeInfo.imageLinks

                 if ( imglink === undefined) 
                  {
                   img.src = "./unavailable.png"
                  } 
                  
                  else 
                  {
                   img.src = response.volumeInfo.imageLinks.smallThumbnail 
                  }

              var identifiant = document.createElement('p');
              identifiant.innerText = "Id : " + response.id;
    
              var title = document.createElement('h4');
              title.innerText = response.volumeInfo.title;
        

              var author = document.createElement('p');
              author.innerText = response.volumeInfo.authors;
              author.classname= "author";

              var description = document.createElement("p");
              description.innerText = response.volumeInfo.description;
              description.classList.add("maxlenght");

              var bookmark = document.createElement('img');
          
              bookmark.setAttribute('onclick','deleteToFavorites("'+ response.id + ' ")');
          

              bookmark.className = "deletebookmark";
              bookmark.src = "./corbeille.png"

              book.appendChild(bookmark)
              book.appendChild(img)
              book.appendChild(identifiant)
              book.appendChild(title)
              book.appendChild(author)
              book.appendChild(description)

              document.getElementById('content').appendChild(book)
           }   
        )
    }
  )
}

  //fonction pour supprimer un livre en favori
  
function deleteToFavorites(id) 
{    
  localStorage.removeItem(id.trim());
  location.reload();
}


