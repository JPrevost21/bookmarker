// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

    // Save bookmark
    function saveBookmark(e) {
        // Get values from
        var siteName = document.getElementById('siteName').value;
        var siteUrl = document.getElementById('siteURL').value;

        if(!validateForm(siteName, siteUrl)){
            return false;
        }

        var bookmark = {
            name: siteName,
            url: siteURL
        }

        // Tests if bookmarks is null
        if(localStorage.getItem('bookmarks') === null){
            // Init array
            var bookmarks = [];
            // Add to array
            bookmarks.push(bookmark);
            // Add to LocalStorage
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
        document.getElementById('myForm').reset();

        // Re-fetch bookmarks
        fetchBookmarks();

        // Prevent form from submitting
        e.preventDefault();
    }

    //Delete bookmark
    function deleteBookmark(url){
        // Get bookmark
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Loop through bookmark
        for(var i = 0; i < bookmarks.length; i++){
            if(bookmarks[i].url == url){
                // Remove from array
                bookmarks.splice(i,1);

            }
        }
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        // Re-fetch bookmarks
        fetchBookmarks();
    }

    // Fetch bookmarks
    function fetchBookmarks() {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Get output ID
        var bookmarkResults = document.getElementById('bookmarkResults');

        // Build output
        bookmarkResults.innerHTML = '';
        for(var i = 0; i < bookmarks.length; i++){
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;

            bookmarkResults.innerHTML += '<div class="well">'+
                                         '<h3>'+name+ 
                                         ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                         ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                         '</h3>'+
                                         '<div>';
        }
    }
    // Validate form
    function validateForm(siteName, siteUrl){
        if(!siteName || !siteUrl){
            alert('Please fill in the form');
            return false;
        }

        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        if(!siteUrl.match(regex)){
            alert('Please use a valid url');
            return false;
        }

        return true;
    }