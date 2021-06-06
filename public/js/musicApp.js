window.onload = () => {
  init();
}

const init = () => {
  doApi()
}

const doApi = async() => {
  let url = "http://localhost:3000/music"
  try{
  let resp = await fetch(url);
  let data = await resp.json();
  console.log(data);
  createMusic(data);
  }
  catch(err){
    console.log(err);
  }
}

const createMusic = (_ar) => {
  _ar.map(item => {
    let music = new Song("#id_row",item);
    music.render();
  })
}