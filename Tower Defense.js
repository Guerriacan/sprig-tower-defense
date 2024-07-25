/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Tower Defense
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const select = "a"

const greyHeart = "l"
const heart = "h"
const money = "c"

const flag = "f"
const portal = "p"
const tank = "t"
const bullet = "b"

const explosion = "e"
const smoke = "s"

const health3bar = "z"
const health2bar = "y"
const health1bar = "x"
const health0bar = "w"

const monsterLeft = "m"
const monsterRight = "n"

const floor = "0"
const pathHorizontal = "1"
const pathVertical = "2"
const pathDownLeft = "3"
const pathDownRight = "4"
const pathUpLeft = "5"
const pathUpRight = "6"

const pathTypes = [pathHorizontal, pathVertical, pathDownLeft, pathDownRight, pathUpLeft, pathUpRight]
const healthBarTypes = [health0bar, health1bar, health2bar, health3bar]
const monsterTypes = [monsterLeft, monsterRight]

const TICKMS = 100;

let moneyCount = 9
let gameTickCounter = 0
let monsterSpeed = 500

setLegend(
  [select, bitmap`
2222........2222
2..............2
2..............2
2..............2
................
................
................
................
................
................
................
................
2..............2
2..............2
2..............2
2222........2222`],
  [tank, bitmap`
..00000..00000..
..0FFF0000FFF0..
..0FF444444FF0..
..0LL44DD44LL0..
..0FF4DDDD4FF0..
..0FF4DDDD4FF0..
..0LL4DDDD4LL0..
..0FF4DDDD4FF0..
..0FF4DDDD4FF0..
..0LL44DD44LL0..
..0FF44DD44FF0..
..0FFF0DD0FFF0..
..00000DD00000..
.....00DD00.....
.....0DDDD0.....
.....000000.....`],
  [bullet, bitmap`
................
.....000000.....
.....099960.....
......0960......
.....099690.....
.....096690.....
.....096690.....
.....066990.....
.....000000.....
.....09CC90.....
.....0CCC90.....
.....0CC990.....
......0C90......
......0C90......
.......00.......
................`],
  
  [greyHeart, bitmap`
................
................
................
...000...000....
..0LLL0.0LLL0...
.0L11LL0LL1LL0..
.0L1LLLLL1LLL0..
.0LLLLLLLLLLL0..
.0LL1LLLLLLLL0..
..0LL1LLLLLL0...
...0LLLLLLL0....
....0LLLLL0.....
.....0LLL0......
......0L0.......
.......0........
................`],
  [heart, bitmap`
................
................
................
...000...000....
..03330.03330...
.0322330332330..
.0323333323330..
.0333333333330..
.0332333333330..
..03323333330...
...033333330....
....0333330.....
.....03330......
......030.......
.......0........
................`],
  [money, bitmap`
................
.....00.........
..000CC00.......
...0CCC0........
....0C0.........
...0CCC0........
..0CC6CC0.......
.0C66666C0......
0CC6C6C6C0......
0CC666CCC0......
0CCCC666C0......
0CC6C6C6C0......
.0C66666C0......
.0CCC6CC0.......
..00CCC0........
....000.........`],
  
  [explosion, bitmap`
...00000...0000.
..0333330.03330.
...033993033930.
...003999339930.
.003339699969330
0339996666669930
0399666626666930
0339966222669330
.03396622669930.
..0396666666930.
.033996666969330
0339939969993330
.03933399933300.
.03303339330330.
.030.003330.00..
..0....000......`],
  [smoke, bitmap`
................
...00000........
..0222220.......
.022222220......
.0222222220000..
012222222122220.
0112222212222220
.011122122222220
.001111112222220
0222222112222210
0222222211222210
0122222211121110
011222221111110.
01111121101100..
.01111110.00....
..000000........`],

  [health3bar, bitmap`
................
................
...0000000000...
..044444444440..
...0000000000...
................
................
................
................
................
................
................
................
................
................
................`],
  [health2bar, bitmap`
................
................
...0000000000...
..033334444440..
...0000000000...
................
................
................
................
................
................
................
................
................
................
................`],
  [health1bar, bitmap`
................
................
...0000000000...
..033333344440..
...0000000000...
................
................
................
................
................
................
................
................
................
................
................`],
  [health0bar, bitmap`
................
................
...0000000000...
..033333333330..
...0000000000...
................
................
................
................
................
................
................
................
................
................
................`],

  [monsterLeft, bitmap`
................
................
................
................
................
................
......000.......
.....0FFF00.....
....0FFFFFD0....
...0FFFFFFDD0...
...0F3F3FDDD0...
..0FF3F3FDDDD0..
..0FFFFFDDDDD0..
..00FFDDDDDD00..
...0000000000...
................`],
  [monsterRight, bitmap`
................
................
................
................
................
................
.......000......
.....00FFF0.....
....0DFFFFF0....
...0DDFFFFFF0...
...0DDDF3F3F0...
..0DDDDF3F3FF0..
..0DDDDDFFFFF0..
..00DDDDDDFF00..
...0000000000...
................`],
  
  [flag, bitmap`
1LLLLLLLLLLLLLL1
LLFFFFFFFFFFFFLL
LFFFFFFFFFFFFFFL
LFFFF9C57FF77FFL
LFFFF9C5757777FL
LFFFF9C57777FFFL
LFFFF9C577777FFL
LFFFF9CFFFF77FFL
LFFFF9CFFF77FFFL
LFFF19C1FFFFFFFL
LFF1L9CL1FFFFFFL
LFF1F9CF1FFFFFFL
LFFL1111LFFFFFFL
LFFFLLLLFFFFFFFL
LLFFFFFFFFFFFFLL
1LLLLLLLLLLLLLL1`],
  [portal, bitmap`
1LLLLLLLLLLLLLL1
LL0H008800HH00LL
L0H008HHHHH00H0L
L00H88H8888HH0HL
LH0H8HHHHHH8800L
LHH8HH8888HH880L
L0H8H88HH88HHH8L
L0H8H8HHHH8H8H8L
L8H8H8HHHH8H8H0L
L8HHH88HH88H8H0L
L088HH8888HH8HHL
L0088HHHHHH8H0HL
LH0HH8888H88H00L
L0H00HHHHH800H0L
LL00HH008800H0LL
1LLLLLLLLLLLLLL1`],

  [floor, bitmap`
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L`],
  [pathHorizontal, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
6600006666000066
6600006666000066
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
1111111111111111`],
  [pathVertical, bitmap`
1L000006600000L1
1L000006600000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000006600000L1
1L000006600000L1
1L000006600000L1
1L000006600000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000006600000L1
1L000006600000L1`],
  [pathDownLeft, bitmap`
1111111111111111
LLLLLLLLLLLLLLL1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
60000666600000L1
60000666600000L1
00000006600000L1
00000006600000L1
00000000000000L1
00000000000000L1
00000000000000L1
LL000000000000L1
1L000006600000L1`],
  [pathDownRight, bitmap`
1111111111111111
1LLLLLLLLLLLLLLL
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1L00000666600006
1L00000666600006
1L00000660000000
1L00000660000000
1L00000000000000
1L00000000000000
1L00000000000000
1L000000000000LL
1L000006600000L1`],
  [pathUpLeft, bitmap`
1L000006600000L1
LL000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000006600000L1
00000006600000L1
60000666600000L1
60000666600000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
LLLLLLLLLLLLLLL1
1111111111111111`],
  [pathUpRight, bitmap`
1L000006600000L1
1L000000000000LL
1L00000000000000
1L00000000000000
1L00000000000000
1L00000660000000
1L00000660000000
1L00000666600006
1L00000666600006
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1LLLLLLLLLLLLLLL
1111111111111111`]
)

setSolids([])

let level = 0
const levels = [
  map`
zyxwtes.ch
...mbna...
.f1111113.
.mm..m..2.
.41111115.
.2.nnnnn..
.6111111p.
.mmmmmmm..`
]

setBackground("0")
setMap(levels[level])

setPushables({
  [select]: []
})





onInput("a", () => {
  getFirst(select).x -= 1
})
onInput("d", () => {
  getFirst(select).x += 1
})
onInput("w", () => {
  getFirst(select).y -= 1
})
onInput("s", () => {
  getFirst(select).y += 1
})

onInput("i", () => {
  const spriteType = monsterLeft
  const specificSprite = getTile(getFirst(select).x, getFirst(select).y).find(sprite => sprite.type === spriteType)
  if (specificSprite) {
    specificSprite.remove()
    moneyCount = moneyCount + 1
  }
  else {
    if (moneyCount >= 2) {
      addSprite(getFirst(select).x, getFirst(select).y, spriteType)
      moneyCount = moneyCount - 2
    }
  }
})




afterInput(() => {
})


setInterval(() => {
  if (gameTickCounter < 1400) {
    gameTickCounter += TICKMS
  }
  else {
    gameTickCounter = 0
  }

  clearText()
  addText(moneyCount.toString(), { 
    x: 17,
    y: 1,
    color: color`2`
  })
  addText("3", { 
    x: 19,
    y: 1,
    color: color`2`
  })

  let healthBarSprites = []
  healthBarTypes.forEach(type => {
    healthBarSprites = healthBarSprites.concat(getAll(type))
  })
  healthBarSprites.forEach(sprite => sprite.remove())

  let monsterSprites = []
  monsterTypes.forEach(type => {
    monsterSprites = monsterSprites.concat(getAll(type))
  })
  monsterSprites.forEach(sprite => addSprite(sprite.x, sprite.y, health3bar));
  
}, TICKMS)

