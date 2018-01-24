# ZimNews API Javascript SDK

Official documentation available at <https://zimnews-api.firebaseapp.com>

## Installation

Node.js
```
npm i --save zimnews-api
```

Browser
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/zimnews-api/index.js">
```

## Usage

```javascript
var ZimNews = require('zimnews-api'),
    zn = new ZimNews("api_key");
```
### ES6 Import

```javascript
import ZimNews from 'zimnews-api'
let zm = new ZimNews("api_key");
```

You can get your API Key from [the documentation site](https://zimnews-api.firebaseapp.com/#/api-key).

## Methods

### .getNews(options)

Promise which returns an array of Stories.

### .getSources(options)

Promise which returns an array of Sources.

### .getCategories(options)

Promise which returns an array of Categories.

## Options

| Option        | Required      | Default  | 
| ------------- |:-------------:| -----:|
| limit - number of items returned        | No | 25 |
| category - of stories to return.     | No       |   All |
| source - name of source to return. [See docs for list of sources.](https://zimnews-api.firebaseapp.com/#/sources) | No      |    All |

## Examples

### With async/await

```javascript
(async ()=>{
    let stories = await zm.getNews({limit:10,category:'Business'})
    console.log(stories);
})()
```

### With Promises

```javascript
zm.getNews({limit:10,category:'Entertainment'}).then(stories=>{
    console.log(stories);
}).catch(e=>{
    console.log(e);
})
```
