/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Tower Defense
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const lostheart = "l"
const heart = "h"
const coin = "c"

const flag = "f"
const portal = "p"
const tower = "t"

const explosion = "e"
const smoke = "s"

const healthbar = "u"
const lmonster = "m"
const rmonster = "n"


const floor = "0"
const xpath = "1"
const ypath = "2"
const dlpath = "3"
const drpath = "4"
const ulpath = "5"
const urpath = "6"

setLegend(
  [lostheart, bitmap`
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
  [coin, bitmap`
................
................
................
.........CCC....
........C669C...
.......C66966C..
.......CC966CC..
...CCC.C6CCC6C..
..C669CCC669CC..
.C66966C6CCC6C..
.CC966CCC669CC..
.C6CCC6C6CCC6C..
..C669C.C669C...
...CCC...CCC....
................
................`],
  
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

  [healthbar, bitmap`
................
...0000000000...
..033333444440..
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
................
................`],
  [lmonster, bitmap`
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
  [rmonster, bitmap`
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
  [tower, bitmap`
1LLLLLLLLLLLLLL1
LL000000009000LL
L00090090000090L
L09000003003000L
L00030303030000L
L90030030000090L
L03003111103300L
L00330L93L00030L
L00000093030000L
L03030193103309L
L90001L93L10000L
L00901093010090L
L0000L1111L0000L
L00000LLLL00000L
LL000000000000LL
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
  [xpath, bitmap`
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
  [ypath, bitmap`
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
  [dlpath, bitmap`
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
  [drpath, bitmap`
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
  [ulpath, bitmap`
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
  [urpath, bitmap`
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
.......lhh
...esc....
.f1111113.
.......t2.
u41111115.
m2t.......
.6111111p.
..........`
]

setBackground("0")
setMap(levels[level])

setPushables({
  [player]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

afterInput(() => {

})