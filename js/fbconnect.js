
//  designbuildplay. FB CONNECT.
// ------------------------------


window.fbAsyncInit = function() {

  //var nav = getElementById("nav");

  // FB APP details
  FB.init({
      appId      : '547209855371516', // App ID
      channelUrl : 'http://designbuildplay.co.uk/projects/facebook/page/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
  });
  
  // FB Connection  
  FB.Event.subscribe('auth.authResponseChange', function(response) 
  	{
   	 if (response.status === 'connected') 
    	{
    		document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";
    		//SUCCESS	
    	}	 
  	else if (response.status === 'not_authorized') 
      {
      	document.getElementById("message").innerHTML +=  "<br>Failed to Connect";
  		  //FAILED
      } else 
      {
      	document.getElementById("message").innerHTML +=  "<br>Logged Out";
      	//UNKNOWN ERROR
      }
  	});	
	
  };
    

  function Login()
	 {
		FB.login(function(response) {
		   if (response.authResponse) 
		   {
		    	getUserInfo();
  			} else 
  			{
  	    	 console.log('User cancelled login or did not fully authorize.');
   			}
		 },{scope: 'email,user_photos,user_videos'});
	}


  // GRAB USER DETAILS ------------------------------------
  function getUserInfo() {
	  
	  FB.api('/me', function(response) {

    	  var str="<b>Name</b> : " +response.name+"<br>";
    	  	  str +="<b>Link: </b>"+response.link+"<br>";
    	  	  str +="<b>Username: </b> "+response.username+"<br>";
    	  	  str +="<b>id: </b>"+response.id+"<br>";
    	  	  str +="<b>Email: </b> "+response.email+"<br>";
    	  	  document.getElementById("status").innerHTML=str;

          //nav.style.display = "inline";
          document.getElementById("nav").style.display = "inline";
          document.getElementById("content").style.display = "inline";

    	  	 getPhoto()
    	  	 getAlbumPhotos()
    });

  }


  // GRAB USER PROFILE ------------------------------------
	function getPhoto()
	{
	  FB.api('/me/picture?type=large', function(response) {

		  var str="<br/><p class='margT poloroid boxed profilepix rotateImg'><img src='"+response.data.url+"'/></p> ";
	  	  document.getElementById("status").innerHTML+=str;
	  	  	    
    	});
	}


	// GRAB ALBUM LISR ------------------------------------
	function getAlbumPhotos(){
            FB.api('/me/albums',  function(resp) {
                //Log.info('Albums', resp);
                var ul = document.getElementById('albums');

                for (var i=0, l=resp.data.length; i<l; i++){
                    var
                        album = resp.data[i],
                        li = document.createElement('li'),
                        a = document.createElement('a'),
                        cover = '/'+album.id + '/picture',
                        photos = '/' + album.id +'/photos';
                       

                    a.innerHTML = album.name;
                    a.href = "#" //album.link;
                    li.id = "picli" + i;
                    li.appendChild(a);
                    ul.appendChild(li);

                    // var liClick = document.getElementById("picli" + i);
                    // liClick.onClick = getPics()

                   
                }

                console.log(resp)
                 getPics()
            });
        };

  function getPics(album){
      console.log("album is " + album)

  }

  // Retreives all of the users photos ----------------------------------------
  function getAllPics(){

    	console.log("show all ")

          FB.api('/me/albums?fields=id,name', function(response) {
          console.log(response.data.length);

          for (var i = 0; i < response.data.length; i++) {

            var album = response.data[i];

            FB.api('/' + album.id + '/photos', function(photos) {

              if (photos && photos.data && photos.data.length) {

                for (var j = 0; j < photos.data.length; j++) {

                  var photo = photos.data[j];

                  // photo.picture contain the link to picture
                  // photo.source contain the link to full size image

                  var fbimg = $('ul#albumspic').append('<li class=" boxed rotateImg zoompic"><img class="poloroid" src="' + photo.picture +'" /></li>');

                  fbimg.onclick = function() {
                    //this.parentNode.removeChild(this);
                    console.log("bitch is like'...")
                    // document.getElementById(info.id).src = this.src;
                    // document.getElementById(info.id).style.width = "220px";
                    // document.getElementById(info.id).style.height = "126px";
                  };

                  console.log(i)
                }

              }
            });

          }
        });
    }


  //FB Logout -----------------------------------------------------------------
	function Logout()
	{
		FB.logout(function(){document.location.reload();});
	}


  // Load the SDK asynchronously ----------------------------------------------
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
  }(document));
