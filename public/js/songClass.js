class Song {
  constructor(_parent, _item) {
    this.parent = _parent;
    this.name = _item.name;
    this.utubeCode = _item.utubeCode;
    this.info = _item.info;
    this._id = _item._id;
  }

  render() {
    let newDiv = document.createElement("div");
    newDiv.className = "col-lg-6 border p-2";
    document.querySelector(this.parent).append(newDiv);

    newDiv.innerHTML += `
     <h2>${this.name}</h2>
      <div>${this.info}</div>
      <iframe width="50%" height="215" src="https://www.youtube.com/embed/${this.utubeCode}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
  }
}