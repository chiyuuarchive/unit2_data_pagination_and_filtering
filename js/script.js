/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


// == List of variables ==
//9 Student cards per page as instructed.
const itemsPerPage = 9;   

//The ancestor element "header" of the search bar button (label>button).
const header = document.querySelector("header");

//The ancestor element "ul" of the page number buttons (ul>li>button)
const linkList = document.querySelector("ul.link-list");

//The "ul" element with "student-list" class that holds "li" elements of the students.
const studentList = document.querySelector("ul.student-list");


// == List of Functions ==

/**
 * [A function that creates elements]
 *
 * @param {[string]} param1 - [name of the tag element]
 * @param {[string]} param2 - [property of the element]
 * @param {[string]} param2 - [input property]
 * @returns {[string]} [a string of the element with a opening and closing tag + property]
 */
function createElement (elementName, prop, input) {
   const element = document.createElement(elementName);
   element[prop] = input;
   
   return element

}

/**
 * [A function that creates and append the search bar to the "header" element]
 */
function searchBar () {
   header.innerHTML = "";

   //re-create the deleted "h2" element.
   const h2 = createElement("h2", "textContent", "Students");

   //Create elements for the search bar.
   const label = createElement("label");
   label.className = "student-search";
   label.htmlFor="search"
   
   const span = createElement("span");
   const input = createElement("input","id", "search");
   input.placeholder = "Search by name...";

   const button = createElement("button", "type", "button");
   button.innerHTML = `<img src="img/icn-search.svg" alt="Search icon">`
   
   //Append "h2" and "label" elements inside the "header" element.
   header.appendChild(h2);
   let labelHtml = header.appendChild(label);
   
   //Append "span", "input" and "button" elements inside the "label" element.
   labelHtml.appendChild(span);
   labelHtml.appendChild(input);
   labelHtml.appendChild(button);
   
   return

}

/**
 * [A function that generates and inserts template literals for each students to the html file.]
 *
 * @param {[array]} param1 - [array with content and format according to data.js]
 * @param {[number]} param2 - [page number]
 */
function showPage(list, page) {
   studentList.innerHTML = "";
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   for (let i = 0; i < list.length; i++) {
    
      if (i >= startIndex && i < endIndex) {
         let studentItem = `
         <li class ="student-item cf">
            <div class ="student-details">
               <img class ="avatar" src=${list[i].picture.large} alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class ="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
         `;

         studentList.insertAdjacentHTML("beforeend",studentItem);

      }
      
   }

   return
}

/**
 * [A function that creates the buttons and append to the selected "ul" element. Further, the function invokes the "showPage" function and also provide an event listener for the users to switch pages with the generated page buttons.]
 *
 * @param {[array]} param1 - [array with content and format according to data.js]
 */
function addPagination (list) {
   linkList.innerHTML = "";
   const numOfPages = Math.ceil(list.length/itemsPerPage);
   let pageButton = [];

   for (let i = 0; i < numOfPages; i++) {
      let li = createElement("li");
      pageButton[i] = createElement("button", "textContent", `${i+1}`);

      linkList.appendChild(li).appendChild(pageButton[i]);
   }


   //Load the first page:
   showPage(list, 1);
   
   //When the first page are loaded, set the class of the first "button" element to "active".
   pageButton[0].className = "active";  


   //Event listener for the page number buttons. 
   linkList.addEventListener("click", (e) => {
      const activeButton = e.target;
      const pageIndex = activeButton.textContent;
      
      if (activeButton.tagName == "BUTTON") {
         const previousButton = document.querySelector("button.active");
         previousButton.className = "";
   
         activeButton.className = "active";
         showPage(list,pageIndex)
         
      }
   
   });

  return

}

/**
 * [A function that compares input string from search bar with the "name" properties provided by the array in data.js]
 *
 * @param {[array]} param1 - [a one-dim array with input values retrieved from the "keyup" event listener]
 * @returns {[array]} [an array with objects that matches with the input values]
 */
function matchNames (input) {
   let matchedName = [];
   for (let i = 0; i < data.length; i++) {
      let fullName = `${data[i].name.first} ${data[i].name.last}`;

      if (fullName.toLowerCase().includes(input.toLowerCase())) {
         matchedName.push(data[i]);  

      }
   }

   return matchedName

}

/**
 * [A function that sends a "No Result" message when the function "matcnNames" returns an empty array.]
 */
function noResult () {
   studentList.innerHTML = "";
   linkList.innerHTML = "";

   const noResultMessage = createElement("li","textContent","No results");

   studentList.appendChild(noResultMessage);

   return

}


// == Call functions ==
//Load the search bar for the page:
searchBar();

//Load the webpage:
addPagination(data);


// == Event listener for the search bar button ==
header.addEventListener("keyup", () => {
   const input = document.querySelector("input").value;
   const matchedNames = matchNames(input);

   if (matchedNames.length == 0) {
      noResult();
   }

   else{
      addPagination(matchedNames);
   }

});
