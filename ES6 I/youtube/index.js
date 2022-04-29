let API_KEY = `AIzaSyCfbEqyiZlClkfINkatQpyQ0Bv0rooAjd0`

let searchResultDiv = document.getElementById('video-container')

async function searchVideo() {
  try {
    let userInput = document.querySelector('.search-bar').value
    localStorage.setItem("videosSech" , JSON.stringify(userInput))
    
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${userInput}&part=id%2C+snippet&type=video&maxResults=35`,
    )

    let data = await res.json()
    // console.log(data)
    let videosList = data.items
    // console.log(videosList)
    window.location.href = 'Serach.html'
  } catch (err) {
    console.log(err)
  }
}

const displayData = (videosList) => {
  searchResultDiv.innerHTML = ''
  videosList.forEach((video) => {
    const {
      snippet: {
        thumbnails: {
          medium: { url },
        },
        title,
        channelTitle,
      },
    } = video
    // console.log(video)
    let videoCard = document.createElement('button')
    videoCard.addEventListener('click', function () {
      localStorage.setItem('mediaId',JSON.stringify(video.id))
      window.location.href = "./One.html"
      // Refreshdata(video.id , video.snippet.title ,  video.snippet.channelTitle)
    })

    let img = document.createElement('img')
    img.src = video.snippet.thumbnails.medium.url
   

    let Title = document.createElement('h5')
    Title.innerHTML = video.snippet.title
    Title.setAttribute('class', 'Title')

    let Channel = document.createElement('p')
    Channel.innerHTML = video.snippet.channelTitle
    Channel.setAttribute('class', 'Channel')

    videoCard.append(img, Title, Channel)
    searchResultDiv.append(videoCard)
  })
}
// //---------------------------------------------------------------------------------------------------
// const Refreshdata = (id , title , chaneel) => {
//   searchResultDiv.innerHTML = ''
 
//   let videoCard1 = document.createElement('div')
//   let Iframe = document.createElement('iframe')
//   Iframe.setAttribute('allowfullscreen', true)
//   Iframe.src = `https://www.youtube.com/embed/${id}`

//   let Title = document.createElement('h5')
//   Title.innerHTML = title
//   Title.setAttribute('class', 'Title')

//   let Channel = document.createElement('p')
//   Channel.innerHTML = chaneel
//   Channel.setAttribute('class', 'Channel')

//   videoCard1.append(Iframe, Title, Channel)
//   searchResultDiv.append(videoCard1)
// }
//--------------------------------------------------------------------------------------------------------------------------------------
async function randomdata() {
  try {
    let res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${API_KEY}&type=video&part=snippet&maxResults=35`,
    )

    let data = await res.json()
    // console.log(data)
    let videosList = data.items
    // videosList.Math.random()
    displayData(videosList)
    // console.log(videosList)
  } catch (err) {
    console.log(err)
  }
}
randomdata()
