/**
 * ----------------- INSTAGRAM -----------------
*/
const keyIG = ""

// Get and display IG PROFILE
const displayProfileData = (profileData) => {
    const id = profileData.id
    const username = profileData.username 

    const idSpan = document.getElementById("id_ig")
    const nameSpan = document.getElementById("username_ig")

    idSpan.innerText = id
    nameSpan.innerText = username
}
const getProfile = async () => {
    const url = `https://graph.instagram.com/me?fields=id,username&access_token=${keyIG}`
    
    const data = await fetch(url)
    const profile = await data.json()

    displayProfileData(profile)

}

getProfile()


// Get and display IG MEDIA
const displayMedia = (object) => {
    const mediaWrapper = document.getElementById("media_wrapper_ig")
    const data = object.data

    const row = document.createElement("div")
    row.className = "row"
    mediaWrapper.appendChild(row)

    for (let i = 0; i < 10; i++) {
        const link = data[i].media_url
        const permalink = data[i].permalink
        const caption = data[i].caption
        const post = document.createElement("div")
        post.className = "post_ig post"
        post.innerHTML = `
        <a class="post_link_ig post_link" target="_blank" href="${permalink}" >
            <img class="image" src=${link}>
            <p class="caption_text">${caption}</p>
        </a>`
        row.appendChild(post)
    }

}

const getMedia = async () => {

    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url,is_shared_to_feed&access_token=${keyIG}`
    
    const data = await fetch(url)
    const profile = await data.json()

    displayMedia(profile)

}

getMedia()




/**
 * ----------------- FACEBOOK -----------------
*/

// SDK
window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));



  //  API --------------------------------------------------

const getSinglePostsFb = async (accessToken, postsArray) => {

    for (let i = 0; i < postsArray.length; i++) {
        const postId = postsArray[i].id;
        
        const url = `https://graph.facebook.com/${postId}?fields=actions,call_to_action,caption,child_attachments,created_time,is_hidden,is_published,link,message,message_tags,permalink_url,privacy,shares,source,type&access_token=${accessToken}`
        const data = await fetch(url)
        const post = await data.json()

        console.log(post.created_time);

        const mediaWrapper = document.getElementById("media_wrapper_fb")
        const row = document.createElement("div")
        row.className = "row"
        mediaWrapper.appendChild(row)
        const postDiv = document.createElement("div")
        postDiv.className = "post_fb post"
        postDiv.innerHTML = `
        <a class="post_link_fb post_link" target="_blank" href="${post.permalink_url}" >
            <p class="text">Text</p>
        </a>`
        row.appendChild(postDiv)
    }
}

  const getPostsFb = async (accessToken) => {
      const url = `https://graph.facebook.com/me?fields=posts&access_token=${accessToken}`
      const data = await fetch(url)
      const posts = await data.json()

      
      const postsArray = posts.posts.data
      console.log(postsArray);
      getSinglePostsFb(accessToken, postsArray)
      
  }

   FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;
        console.log(accessToken);


       getPostsFb(accessToken)


      } 
      else {
          console.log('not connected');
      }
    } );




/**
 * ----------------- LINKEDIN -----------------
*/
const getMediaLinkedin = async () => {
}

getMediaLinkedin()


/**
 * Example call to fetch the member profile for the authorized member.
 * The 3-legged member access token should include the 'r_liteprofile' scope, which
 * is part of the Sign In With LinkedIn API product.
 */


// async function main() {
    
//   const restliClient = new RestliClient();
//   restliClient.setDebugParams({ enabled: true });
//   const accessToken = import.meta.env.VITE_ACCESS_TOKEN || '';

//   /**
//    * Basic usage
//    */
//   let response = await restliClient.get({
//     resourcePath: '/me',
//     accessToken
//   });
//   console.log('Basic usage:', response.data);

// //   /**
// //    * With field projection to limit fields returned
// //    */
// //   response = await restliClient.get({
// //     resourcePath: '/me',
// //     additionalConfig: {
// //         connection: 'close'
// //     },
// //     queryParams: {
// //       fields: 'id,firstName,lastName'
// //     },
// //     accessToken
// //   });
// //   console.log('With field projections:', response.data);

// //   /**
// //    * With decoration of displayImage
// //    */
// //   response = await restliClient.get({
// //     resourcePath: '/me',
// //     queryParams: {
// //       projection: '(id,firstName,lastName,profilePicture(displayImage~:playableStreams))'
// //     },
// //     accessToken
// //   });
// //   console.log('With decoration:', response.data);
// }

// main()
//   .then(() => {
//     console.log('Completed');
//   })
//   .catch((error) => {
//     console.log(`Error encountered: ${error.message}`);
//   });





/**
 * ----------------- TIKTOK -----------------
*/
const queryString = window.location.search
const params = new URLSearchParams(queryString)
const code = params.get('code')
    console.log(`Authorization Code: ${code}`);

const url = "https://open.tiktokapis.com/v2/oauth/token/"
const header = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
const body = {
    'client_key': 'aw4uv5g4eat1jc2m',
    'client_secret': '2bc9e6ae30e0ccf31e7ff25bdc21b1e0',
    'code': `${code}`,
    'grant_type': 'authorization_code',
    'redirect_uri': 'https://switchup-socials.vercel.app'
}

const getAccessToken = async () => {
    const response = await fetch(url, {
        method    : "POST",
        mode      : "no-cors",
        cache     : "no-cache",
        headers   : {
            "Content-Type"  : "application/json"
            },
        redirect  : "follow",
        body      : JSON.stringify( body ),

        // method: 'POST',
        // mode: 'cors',
        // cache: 'no-cache',
        // credentials: 'same-origin',
        // headers: header,
        // body: body
    })

    data = await response.json()
    console.log(data);

    const accessToken = data.access_token
    console.log(`Access Token: ${accessToken}`);
} 

// getAccessToken()