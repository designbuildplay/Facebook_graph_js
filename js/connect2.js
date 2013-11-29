 var loggedIn = false;        

            function loginFacebook() 
            {
                //initializes the facebook API
            }        




            function loadAlbums()
            {            
                    FB.init({
                    appId  : '547209855371516',
                    status : true, // check login status
                    cookie : true, // enable cookies to allow the server to access the session
                    xfbml  : true  // parse XFBML
              });





FB.login(function(response)
{
if (response.authResponse)
 {

//Logged in and accepted permissions!

       document.getElementById("status").innerHTML = "Getting album information from your Facebook profile";
                var counter = 0;

      // Start Normal API
                FB.api('/me/albums', function(response) 
                {


                  var d=response.data;



                  for (var i=0, l=d.length; i<l; i++)
                    {
                        addOption(response["data"][i].name,response["data"][i].id);
                        counter++;


                    }
                    document.getElementById("status").innerHTML = "There are "+ counter +" albums in your Facebook profile";
                });


                 //end of  Normal API

        document.getElementById("albumBtn").style.visibility="hidden";   



}
},{scope:'read_stream,publish_stream,offline_access,user_photos,friends_photos,user_photo_video_tags,friends_photo_video_tags'});


            }

            //Adds a new option into the drop down box
            function addOption(opText,opVal) 
            {
                var v = document.getElementById("albumsList");             
                v.innerHTML += '<br/><a  href="facebookphotos.aspx?album='+opVal+'&name='+opText+'">'+opText+'</a>';               
            }

            function init() 
            {
                var v1 = document.getElementById("albumBtn");
                v1.onclick = loadAlbums;
                // v1.style.visibility= "hidden";             
            }

//calls init function once all the resources are loaded
 window.addEventListener("load",init,true);
 