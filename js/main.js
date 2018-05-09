//listen for form submit

document.getElementById('myform').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e)
{
	// Prevent form from submitting
  e.preventDefault();
  
	//get form values
	var sitename = document.getElementById('sitename').value;
	var siteurl = document.getElementById('siteurl').value;
	if(!validateForm(sitename, siteurl)){
    return false;
  }

	var bookmark = {
	name: sitename,
	url: siteurl
	}

	/*
	//local storage test
	localStorage.setItem('test','Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	
	*/

	  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.myform.reset();

  // Re-fetch bookmarks
  fetchBookmarks();

}

// Delete bookmark
function deletetBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
	//get bookmarks form localstorage

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//get output id

	var bookmarksResults=document.getElementById('bookmarksResults');
	//build output
	bookmarksResults.innerHTML='';
	if(bookmarks.length!=null)
	{

	for(var i = 0 ; i<bookmarks.length;i++)
	{
		var name= bookmarks[i].name;
		var url=bookmarks[i].url;
		bookmarksResults.innerHTML += '<div class ="well">'+'<h3>'+name+' <a class ="btn btn-default" target="_blank" href="'+url+'">Visit </a>'+
		'<a onclick="deletetBookmark(\''+url+'\')" class ="btn btn-danger"  href="#">Delete </a> '+ '</h3>'+'</div>';
	}
}
}
	// Validate Form
function validateForm(sitename, siteurl){
  if(!sitename || !siteurl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteurl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
