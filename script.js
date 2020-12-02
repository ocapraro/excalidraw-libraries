const fetchJSONFile = (path, callback) => {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
};

fetchJSONFile('libs.json', (libs) => {
  const template = document.getElementById('template');
  for (lib of libs) {
    const divLib = document.createElement('div');
    divLib.classList.add('lib');
    let inner = template.innerHTML;

    const source = `libs/${lib.source}`;
    inner = inner.replace('{name}', lib.name);
    inner = inner.replace('{description}', lib.description);
    inner = inner.replace('{source}', source);
    inner = inner.replace('{url}', lib.url);
    inner = inner.replace('{author}', lib.author);
    inner = inner.replace(
      '{addToLib}',
      `https://excalidraw.com/?addLibrary=${location.href.replace(
        'index.html',
        '',
      )}${source}`,
    );
    divLib.innerHTML = inner;
    template.after(divLib);
  }
});
