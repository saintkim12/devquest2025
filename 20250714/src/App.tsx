import { useMemo, useState } from 'react'
import './App.css'

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function App() {
  const [keyword, setKeyword] = useState('')
  const [itemList] = useState(
    [
      { "title": "apple", "tags": ["fruit", "red", "sweet"] },
      { "title": "banana", "tags": ["fruit", "yellow", "tropical"] },
      { "title": "cat", "tags": ["animal", "pet", "feline"] },
      { "title": "dog", "tags": ["animal", "pet", "loyal"] },
      { "title": "elephant", "tags": ["animal", "large", "wild"] },
      { "title": "fish", "tags": ["animal", "water", "aquatic"] },
      { "title": "grape", "tags": ["fruit", "purple", "vine"] },
      { "title": "hat", "tags": ["clothing", "headwear", "accessory"] },
      { "title": "ice", "tags": ["cold", "frozen", "water"] },
      { "title": "jungle", "tags": ["forest", "wildlife", "dense"] },
      { "title": "kite", "tags": ["toy", "wind", "flying"] },
      { "title": "lemon", "tags": ["fruit", "yellow", "sour"] },
      { "title": "monkey", "tags": ["animal", "jungle", "playful"] },
      { "title": "notebook", "tags": ["stationery", "paper", "writing"] },
      { "title": "orange", "tags": ["fruit", "citrus", "vitamin"] },
      { "title": "pencil", "tags": ["writing", "drawing", "graphite"] },
      { "title": "queen", "tags": ["royalty", "female", "monarch"] },
      { "title": "robot", "tags": ["machine", "technology", "AI"] },
      { "title": "sun", "tags": ["star", "bright", "sky"] },
      { "title": "tree", "tags": ["plant", "nature", "forest"] },
      { "title": "umbrella", "tags": ["rain", "weather", "cover"] },
      { "title": "violin", "tags": ["instrument", "music", "string"] },
      { "title": "whale", "tags": ["animal", "ocean", "large"] },
      { "title": "xylophone", "tags": ["instrument", "music", "wood"] },
      { "title": "yogurt", "tags": ["food", "dairy", "creamy"] },
      { "title": "zebra", "tags": ["animal", "stripes", "wild"] },
      { "title": "airplane", "tags": ["transport", "flying", "travel"] },
      { "title": "ball", "tags": ["toy", "round", "game"] },
      { "title": "camera", "tags": ["photography", "lens", "picture"] },
      { "title": "drum", "tags": ["instrument", "music", "beat"] },
      { "title": "egg", "tags": ["food", "protein", "breakfast"] },
      { "title": "flag", "tags": ["symbol", "country", "banner"] },
      { "title": "glove", "tags": ["clothing", "hand", "winter"] },
      { "title": "hill", "tags": ["landform", "nature", "elevation"] },
      { "title": "ink", "tags": ["writing", "pen", "liquid"] },
      { "title": "jacket", "tags": ["clothing", "outerwear", "warm"] },
      { "title": "key", "tags": ["lock", "metal", "tool"] },
      { "title": "lamp", "tags": ["light", "electric", "desk"] },
      { "title": "moon", "tags": ["space", "night", "satellite"] },
      { "title": "nest", "tags": ["birds", "eggs", "home"] },
      { "title": "owl", "tags": ["bird", "night", "wise"] },
      { "title": "pizza", "tags": ["food", "cheese", "italian"] },
      { "title": "quiet", "tags": ["silent", "calm", "peaceful"] },
      { "title": "rain", "tags": ["weather", "wet", "cloud"] },
      { "title": "sock", "tags": ["clothing", "foot", "pair"] },
      { "title": "tiger", "tags": ["animal", "wild", "stripe"] },
      { "title": "uniform", "tags": ["clothing", "school", "work"] },
      { "title": "vase", "tags": ["decor", "flowers", "glass"] },
      { "title": "water", "tags": ["drink", "liquid", "essential"] },
      { "title": "x-ray", "tags": ["medical", "scan", "bones"] },
      { "title": "yard", "tags": ["garden", "grass", "outside"] },
      { "title": "zipper", "tags": ["clothing", "fastener", "metal"] },
      { "title": "anchor", "tags": ["boat", "metal", "heavy"] },
      { "title": "bridge", "tags": ["structure", "river", "connect"] },
      { "title": "cloud", "tags": ["sky", "weather", "white"] },
      { "title": "desert", "tags": ["sand", "dry", "hot"] },
      { "title": "engine", "tags": ["machine", "power", "vehicle"] },
      { "title": "feather", "tags": ["bird", "light", "soft"] },
      { "title": "garden", "tags": ["plants", "flowers", "nature"] },
      { "title": "hammer", "tags": ["tool", "nail", "metal"] },
      { "title": "island", "tags": ["land", "water", "beach"] },
      { "title": "jewel", "tags": ["gem", "precious", "shine"] },
      { "title": "kangaroo", "tags": ["animal", "australia", "jump"] },
      { "title": "ladder", "tags": ["climb", "tool", "steps"] },
      { "title": "mirror", "tags": ["reflection", "glass", "bathroom"] },
      { "title": "needle", "tags": ["sewing", "sharp", "thread"] },
      { "title": "ocean", "tags": ["water", "blue", "wave"] },
      { "title": "puzzle", "tags": ["game", "pieces", "solve"] },
      { "title": "quilt", "tags": ["blanket", "warm", "fabric"] },
      { "title": "rocket", "tags": ["space", "launch", "fast"] },
      { "title": "star", "tags": ["sky", "bright", "night"] },
      { "title": "train", "tags": ["transport", "tracks", "engine"] },
      { "title": "urchin", "tags": ["sea", "spiky", "marine"] },
      { "title": "vulture", "tags": ["bird", "scavenger", "wild"] },
      { "title": "wheel", "tags": ["round", "vehicle", "spin"] },
      { "title": "xenon", "tags": ["gas", "element", "light"] },
      { "title": "yarn", "tags": ["knitting", "thread", "wool"] },
      { "title": "zoo", "tags": ["animals", "exhibit", "visit"] },
      { "title": "ant", "tags": ["insect", "small", "colony"] },
      { "title": "bread", "tags": ["food", "bake", "wheat"] },
      { "title": "circle", "tags": ["shape", "round", "geometry"] },
      { "title": "dance", "tags": ["movement", "music", "rhythm"] },
      { "title": "earth", "tags": ["planet", "world", "nature"] },
      { "title": "forest", "tags": ["trees", "wild", "green"] },
      { "title": "ghost", "tags": ["spirit", "scary", "invisible"] },
      { "title": "horse", "tags": ["animal", "ride", "farm"] },
      { "title": "idea", "tags": ["thought", "brain", "creative"] },
      { "title": "king", "tags": ["royalty", "male", "ruler"] },
      { "title": "line", "tags": ["shape", "draw", "straight"] },
      { "title": "mountain", "tags": ["peak", "nature", "climb"] },
      { "title": "number", "tags": ["math", "count", "digit"] },
      { "title": "object", "tags": ["thing", "item", "noun"] },
      { "title": "plant", "tags": ["green", "grow", "nature"] },
      { "title": "question", "tags": ["ask", "inquiry", "curious"] },
      { "title": "road", "tags": ["path", "drive", "asphalt"] },
      { "title": "stone", "tags": ["rock", "hard", "natural"] },
      { "title": "tent", "tags": ["camp", "outdoor", "shelter"] },
      { "title": "unit", "tags": ["measure", "part", "whole"] },
      { "title": "voice", "tags": ["sound", "speak", "vocal"] },
      { "title": "window", "tags": ["glass", "view", "open"] },
      { "title": "axe", "tags": ["tool", "wood", "chop"] },
      { "title": "year", "tags": ["time", "calendar", "12 months"] },
      { "title": "zone", "tags": ["area", "region", "space"] }
    ]
  )

  const displayItemList = useMemo(() => {
    if (!keyword) return itemList
    else {
      return itemList.filter(o => {
        const regexp = new RegExp(escapeRegExp(keyword), 'g')
        if (regexp.test(o.title)) return true
        else if (Array.isArray(o.tags) && o.tags.some(t => regexp.test(t))) return true
        else return false
      })
    }
  }, [itemList, keyword])

  return (
    <>
      <div>
        <input value={keyword} onInput={(e) => setKeyword((e.target as HTMLInputElement).value)} />
      </div>
      <p>
        keyword: {keyword}
      </p>
      <div>
        {displayItemList.map(o => (
          <div>
            <span>{o.title}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
