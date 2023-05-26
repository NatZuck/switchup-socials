const key = ""

// Get and display PROFILE
const displayProfileData = (profileData) => {
    const id = profileData.id
    const username = profileData.username 

    const idSpan = document.getElementById("id")
    const nameSpan = document.getElementById("username")

    idSpan.innerText = id
    nameSpan.innerText = username
}
const getProfile = async () => {
    const url = `https://graph.instagram.com/me?fields=id,username&access_token=${key}`
    
    const data = await fetch(url)
    const profile = await data.json()

    console.log(profile);
    displayProfileData(profile)

}

getProfile()



// Get and display MEDIA
const displayMedia = (object) => {
    const mediaWrapper = document.getElementById("media-wrapper")
    const data = object.data

    const row = document.createElement("div")
    row.className = "row"
    mediaWrapper.appendChild(row)

    for (let i = 0; i < 10; i++) {
        const link = data[i].media_url
        const permalink = data[i].permalink
        const caption = data[i].caption
        const post = document.createElement("div")
        post.className = "post"
        post.innerHTML = `
        <a class="post_link" href="${permalink}" >
            <img class="image" src=${link}>
            <p class="caption_text">${caption}</p>
        </a>`
        row.appendChild(post)
    }

}

const getMedia = async () => {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url,is_shared_to_feed&access_token=${key}`
    
    const data = await fetch(url)
    const profile = await data.json()

    console.log(profile);

    displayMedia(profile)

}

getMedia()

