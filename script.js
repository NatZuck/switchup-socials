const keyNat = "IGQVJYck5qSEsyZAHcxV0QyZA19tRDFPUDdGOFllYjBCMFB1SkVKMXhjbDBZAMHVRTVRsb2JFWmp3MjA2Q05sM3NuWEo1VlRYUklobF9uTnpPWFRrZAmVTdGN4bV9UYnZAGbURCQUdZAX2IzM0NvYzBsbUpFQgZDZD"
const key = "IGQVJVOXZAFRUh3ZAWVfUVhsVEtsQjQxS3o2TFFvRXEyTzRmNVgweENXNDQ5T0RWN2dtWUtwVjEtNUNTZAWxsU1pXdF9pX1N0WERuZAG4wTnFtSkZAlcU5PcFlpVFFYVHlCVGVNLWtOUUtoazVJY3UyYWFoVQZDZD"

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

    for (let i = 0; i < data.length; i++) {
        const link = data[i].media_url
        const permalink = data[i].permalink
        const caption = data[i].caption

        const div = document.createElement("div")
        div.className = "post"
        const row = document.createElement("div")
        row.className = "row"
        


        row.innerHTML = `
        <a class="post" href="${permalink}" >
            <img class="image" src=${link}>
            <span class="caption_text">${caption}</span>
        </a>

        `
        mediaWrapper.appendChild(div)
        div.appendChild(row)

        const image = document.createElement("img")  
        image.setAttribute("src", link)
        image.className = "img"
        
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

