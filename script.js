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
    
    // const data = await fetch(url)
    // const profile = await data.json()

    // displayProfileData(profile)

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
    
    // const data = await fetch(url)
    // const profile = await data.json()

    // displayMedia(profile)

}

getMedia()




/**
 * ----------------- FACEBOOK -----------------
*/
const keyFB = ""

// Get and display IG PROFILE
const displayProfileDataFb = (profileData) => {
    const id = profileData.id
    const username = profileData.name 

    const idSpan = document.getElementById("id_fb")
    const nameSpan = document.getElementById("username_fb")

    idSpan.innerText = id
    nameSpan.innerText = username
}
const getProfileFb = async () => {
    const url = `https://graph.facebook.com/me?fields=id,name&access_token=${keyFB}`
    const data = await fetch(url)
    const profile = await data.json()

    displayProfileDataFb(profile)

}
// getProfileFb()


// Get and display FB MEDIA
const displayMediaFb = async (object) => {
    const mediaWrapper = document.getElementById("media_wrapper_fb")
    const row = document.createElement("div")
    row.className = "row"
    mediaWrapper.appendChild(row)

    
    
    // for (let i = 0; i < object.posts.data.length; i++) {
    //     const post = object.posts.data[i]

    //     const url = `https://graph.facebook.com/${post.id}?fields=permalink_url,caption,description,link,name,object_id,source,type&access_token=${keyFB}`
    //     const data = await fetch(url)
    //     const postData = await data.json()
    //     console.log(postData);

    //     const postDiv = document.createElement("div")
    //     postDiv.className = "post_fb post"
    //     postDiv.innerHTML = `
    //     <a class="post_link_fb post_link" target="_blank" href="${postData.permalink_url}" >
    //         <p class="text">Text</p>
    //     </a>`
    //     row.appendChild(postDiv)
    // }

}

const getMediaFb = async () => {
    const url = `https://graph.facebook.com/me?fields=name,posts&access_token=${keyFB}`
    // const data = await fetch(url)
    // const profile = await data.json()

    // displayMediaFb(profile)
}

getMediaFb()




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
    console.log(`Autherization Code: ${code}`);

const url = "https://open.tiktokapis.com/v2/oauth/token/"
const header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache'
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
        method: 'POST',
        headers: header,
        body: JSON.parse(body)
    })

    data = await response.json()
    console.log(data);

    const accessToken = data.access_token
    console.log(`Access Token: ${accessToken}`);
} 

getAccessToken()
