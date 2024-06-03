/**
 * Web colors in GLSL
 */
export const glsl_web_colors = /* glsl */ `
  #define aliceblue vec3(240.0 / 255.0, 248.0 / 255.0, 255.0 / 255.0)
  #define antiquewhite vec3(250.0 / 255.0, 235.0 / 255.0, 215.0 / 255.0)
  #define aqua vec3(0.0 / 255.0, 255.0 / 255.0, 255.0 / 255.0)
  #define aquamarine vec3(127.0 / 255.0, 255.0 / 255.0, 212.0 / 255.0)
  #define azure vec3(240.0 / 255.0, 255.0 / 255.0, 255.0 / 255.0)
  #define beige vec3(245.0 / 255.0, 245.0 / 255.0, 220.0 / 255.0)
  #define bisque vec3(255.0 / 255.0, 228.0 / 255.0, 196.0 / 255.0)
  #define black vec3(0.0 / 255.0, 0.0 / 255.0, 0.0 / 255.0)
  #define blanchedalmond vec3(255.0 / 255.0, 235.0 / 255.0, 205.0 / 255.0)
  #define blue vec3(0.0 / 255.0, 0.0 / 255.0, 255.0 / 255.0)
  #define blueviolet vec3(138.0 / 255.0, 43.0 / 255.0, 226.0 / 255.0)
  #define brown vec3(165.0 / 255.0, 42.0 / 255.0, 42.0 / 255.0)
  #define burlywood vec3(222.0 / 255.0, 184.0 / 255.0, 135.0 / 255.0)
  #define cadetblue vec3(95.0 / 255.0, 158.0 / 255.0, 160.0 / 255.0)
  #define chartreuse vec3(127.0 / 255.0, 255.0 / 255.0, 0.0 / 255.0)
  #define chocolate vec3(210.0 / 255.0, 105.0 / 255.0, 30.0 / 255.0)
  #define coral vec3(255.0 / 255.0, 127.0 / 255.0, 80.0 / 255.0)
  #define cornflowerblue vec3(100.0 / 255.0, 149.0 / 255.0, 237.0 / 255.0)
  #define cornsilk vec3(255.0 / 255.0, 248.0 / 255.0, 220.0 / 255.0)
  #define crimson vec3(220.0 / 255.0, 20.0 / 255.0, 60.0 / 255.0)
  #define cyan vec3(0.0 / 255.0, 255.0 / 255.0, 255.0 / 255.0)
  #define darkblue vec3(0.0 / 255.0, 0.0 / 255.0, 139.0 / 255.0)
  #define darkcyan vec3(0.0 / 255.0, 139.0 / 255.0, 139.0 / 255.0)
  #define darkgoldenrod vec3(184.0 / 255.0, 134.0 / 255.0, 11.0 / 255.0)
  #define darkgray vec3(169.0 / 255.0, 169.0 / 255.0, 169.0 / 255.0)
  #define darkgrey vec3(169.0 / 255.0, 169.0 / 255.0, 169.0 / 255.0)
  #define darkgreen vec3(0.0 / 255.0, 100.0 / 255.0, 0.0 / 255.0)
  #define darkkhaki vec3(189.0 / 255.0, 183.0 / 255.0, 107.0 / 255.0)
  #define darkmagenta vec3(139.0 / 255.0, 0.0 / 255.0, 139.0 / 255.0)
  #define darkolivegreen vec3(85.0 / 255.0, 107.0 / 255.0, 47.0 / 255.0)
  #define darkorange vec3(255.0 / 255.0, 140.0 / 255.0, 0.0 / 255.0)
  #define darkorchid vec3(153.0 / 255.0, 50.0 / 255.0, 204.0 / 255.0)
  #define darkred vec3(139.0 / 255.0, 0.0 / 255.0, 0.0 / 255.0)
  #define darksalmon vec3(233.0 / 255.0, 150.0 / 255.0, 122.0 / 255.0)
  #define darkseagreen vec3(143.0 / 255.0, 188.0 / 255.0, 143.0 / 255.0)
  #define darkslateblue vec3(72.0 / 255.0, 61.0 / 255.0, 139.0 / 255.0)
  #define darkslategray vec3(47.0 / 255.0, 79.0 / 255.0, 79.0 / 255.0)
  #define darkslategrey vec3(47.0 / 255.0, 79.0 / 255.0, 79.0 / 255.0)
  #define darkturquoise vec3(0.0 / 255.0, 206.0 / 255.0, 209.0 / 255.0)
  #define darkviolet vec3(148.0 / 255.0, 0.0 / 255.0, 211.0 / 255.0)
  #define deeppink vec3(255.0 / 255.0, 20.0 / 255.0, 147.0 / 255.0)
  #define deepskyblue vec3(0.0 / 255.0, 191.0 / 255.0, 255.0 / 255.0)
  #define dimgray vec3(105.0 / 255.0, 105.0 / 255.0, 105.0 / 255.0)
  #define dimgrey vec3(105.0 / 255.0, 105.0 / 255.0, 105.0 / 255.0)
  #define dodgerblue vec3(30.0 / 255.0, 144.0 / 255.0, 255.0 / 255.0)
  #define firebrick vec3(178.0 / 255.0, 34.0 / 255.0, 34.0 / 255.0)
  #define floralwhite vec3(255.0 / 255.0, 250.0 / 255.0, 240.0 / 255.0)
  #define forestgreen vec3(34.0 / 255.0, 139.0 / 255.0, 34.0 / 255.0)
  #define fuchsia vec3(255.0 / 255.0, 0.0 / 255.0, 255.0 / 255.0)
  #define gainsboro vec3(220.0 / 255.0, 220.0 / 255.0, 220.0 / 255.0)
  #define ghostwhite vec3(248.0 / 255.0, 248.0 / 255.0, 255.0 / 255.0)
  #define gold vec3(255.0 / 255.0, 215.0 / 255.0, 0.0 / 255.0)
  #define goldenrod vec3(218.0 / 255.0, 165.0 / 255.0, 32.0 / 255.0)
  #define gray vec3(128.0 / 255.0, 128.0 / 255.0, 128.0 / 255.0)
  #define grey vec3(128.0 / 255.0, 128.0 / 255.0, 128.0 / 255.0)
  #define green vec3(0.0 / 255.0, 128.0 / 255.0, 0.0 / 255.0)
  #define greenyellow vec3(173.0 / 255.0, 255.0 / 255.0, 47.0 / 255.0)
  #define honeydew vec3(240.0 / 255.0, 255.0 / 255.0, 240.0 / 255.0)
  #define hotpink vec3(255.0 / 255.0, 105.0 / 255.0, 180.0 / 255.0)
  #define indianred vec3(205.0 / 255.0, 92.0 / 255.0, 92.0 / 255.0)
  #define indigo vec3(75.0 / 255.0, 0.0 / 255.0, 130.0 / 255.0)
  #define ivory vec3(255.0 / 255.0, 255.0 / 255.0, 240.0 / 255.0)
  #define khaki vec3(240.0 / 255.0, 230.0 / 255.0, 140.0 / 255.0)
  #define lavender vec3(230.0 / 255.0, 230.0 / 255.0, 250.0 / 255.0)
  #define lavenderblush vec3(255.0 / 255.0, 240.0 / 255.0, 245.0 / 255.0)
  #define lawngreen vec3(124.0 / 255.0, 252.0 / 255.0, 0.0 / 255.0)
  #define lemonchiffon vec3(255.0 / 255.0, 250.0 / 255.0, 205.0 / 255.0)
  #define lightblue vec3(173.0 / 255.0, 216.0 / 255.0, 230.0 / 255.0)
  #define lightcoral vec3(240.0 / 255.0, 128.0 / 255.0, 128.0 / 255.0)
  #define lightcyan vec3(224.0 / 255.0, 255.0 / 255.0, 255.0 / 255.0)
  #define lightgoldenrodyellow vec3(250.0 / 255.0, 250.0 / 255.0, 210.0 / 255.0)
  #define lightgray vec3(211.0 / 255.0, 211.0 / 255.0, 211.0 / 255.0)
  #define lightgrey vec3(211.0 / 255.0, 211.0 / 255.0, 211.0 / 255.0)
  #define lightgreen vec3(144.0 / 255.0, 238.0 / 255.0, 144.0 / 255.0)
  #define lightpink vec3(255.0 / 255.0, 182.0 / 255.0, 193.0 / 255.0)
  #define lightsalmon vec3(255.0 / 255.0, 160.0 / 255.0, 122.0 / 255.0)
  #define lightseagreen vec3(32.0 / 255.0, 178.0 / 255.0, 170.0 / 255.0)
  #define lightskyblue vec3(135.0 / 255.0, 206.0 / 255.0, 250.0 / 255.0)
  #define lightslategray vec3(119.0 / 255.0, 136.0 / 255.0, 153.0 / 255.0)
  #define lightslategrey vec3(119.0 / 255.0, 136.0 / 255.0, 153.0 / 255.0)
  #define lightsteelblue vec3(176.0 / 255.0, 196.0 / 255.0, 222.0 / 255.0)
  #define lightyellow vec3(255.0 / 255.0, 255.0 / 255.0, 224.0 / 255.0)
  #define lime vec3(0.0 / 255.0, 255.0 / 255.0, 0.0 / 255.0)
  #define limegreen vec3(50.0 / 255.0, 205.0 / 255.0, 50.0 / 255.0)
  #define linen vec3(250.0 / 255.0, 240.0 / 255.0, 230.0 / 255.0)
  #define magenta vec3(255.0 / 255.0, 0.0 / 255.0, 255.0 / 255.0)
  #define maroon vec3(128.0 / 255.0, 0.0 / 255.0, 0.0 / 255.0)
  #define mediumaquamarine vec3(102.0 / 255.0, 205.0 / 255.0, 170.0 / 255.0)
  #define mediumblue vec3(0.0 / 255.0, 0.0 / 255.0, 205.0 / 255.0)
  #define mediumorchid vec3(186.0 / 255.0, 85.0 / 255.0, 211.0 / 255.0)
  #define mediumpurple vec3(147.0 / 255.0, 112.0 / 255.0, 219.0 / 255.0)
  #define mediumseagreen vec3(60.0 / 255.0, 179.0 / 255.0, 113.0 / 255.0)
  #define mediumslateblue vec3(123.0 / 255.0, 104.0 / 255.0, 238.0 / 255.0)
  #define mediumspringgreen vec3(0.0 / 255.0, 250.0 / 255.0, 154.0 / 255.0)
  #define mediumturquoise vec3(72.0 / 255.0, 209.0 / 255.0, 204.0 / 255.0)
  #define mediumvioletred vec3(199.0 / 255.0, 21.0 / 255.0, 133.0 / 255.0)
  #define midnightblue vec3(25.0 / 255.0, 25.0 / 255.0, 112.0 / 255.0)
  #define mintcream vec3(245.0 / 255.0, 255.0 / 255.0, 250.0 / 255.0)
  #define mistyrose vec3(255.0 / 255.0, 228.0 / 255.0, 225.0 / 255.0)
  #define moccasin vec3(255.0 / 255.0, 228.0 / 255.0, 181.0 / 255.0)
  #define navajowhite vec3(255.0 / 255.0, 222.0 / 255.0, 173.0 / 255.0)
  #define navy vec3(0.0 / 255.0, 0.0 / 255.0, 128.0 / 255.0)
  #define oldlace vec3(253.0 / 255.0, 245.0 / 255.0, 230.0 / 255.0)
  #define olive vec3(128.0 / 255.0, 128.0 / 255.0, 0.0 / 255.0)
  #define olivedrab vec3(107.0 / 255.0, 142.0 / 255.0, 35.0 / 255.0)
  #define orange vec3(255.0 / 255.0, 165.0 / 255.0, 0.0 / 255.0)
  #define orangered vec3(255.0 / 255.0, 69.0 / 255.0, 0.0 / 255.0)
  #define orchid vec3(218.0 / 255.0, 112.0 / 255.0, 214.0 / 255.0)
  #define palegoldenrod vec3(238.0 / 255.0, 232.0 / 255.0, 170.0 / 255.0)
  #define palegreen vec3(152.0 / 255.0, 251.0 / 255.0, 152.0 / 255.0)
  #define paleturquoise vec3(175.0 / 255.0, 238.0 / 255.0, 238.0 / 255.0)
  #define palevioletred vec3(219.0 / 255.0, 112.0 / 255.0, 147.0 / 255.0)
  #define papayawhip vec3(255.0 / 255.0, 239.0 / 255.0, 213.0 / 255.0)
  #define peachpuff vec3(255.0 / 255.0, 218.0 / 255.0, 185.0 / 255.0)
  #define peru vec3(205.0 / 255.0, 133.0 / 255.0, 63.0 / 255.0)
  #define pink vec3(255.0 / 255.0, 192.0 / 255.0, 203.0 / 255.0)
  #define plum vec3(221.0 / 255.0, 160.0 / 255.0, 221.0 / 255.0)
  #define powderblue vec3(176.0 / 255.0, 224.0 / 255.0, 230.0 / 255.0)
  #define purple vec3(128.0 / 255.0, 0.0 / 255.0, 128.0 / 255.0)
  #define rebeccapurple vec3(102.0 / 255.0, 51.0 / 255.0, 153.0 / 255.0)
  #define red vec3(255.0 / 255.0, 0.0 / 255.0, 0.0 / 255.0)
  #define rosybrown vec3(188.0 / 255.0, 143.0 / 255.0, 143.0 / 255.0)
  #define royalblue vec3(65.0 / 255.0, 105.0 / 255.0, 225.0 / 255.0)
  #define saddlebrown vec3(139.0 / 255.0, 69.0 / 255.0, 19.0 / 255.0)
  #define salmon vec3(250.0 / 255.0, 128.0 / 255.0, 114.0 / 255.0)
  #define sandybrown vec3(244.0 / 255.0, 164.0 / 255.0, 96.0 / 255.0)
  #define seagreen vec3(46.0 / 255.0, 139.0 / 255.0, 87.0 / 255.0)
  #define seashell vec3(255.0 / 255.0, 245.0 / 255.0, 238.0 / 255.0)
  #define sienna vec3(160.0 / 255.0, 82.0 / 255.0, 45.0 / 255.0)
  #define silver vec3(192.0 / 255.0, 192.0 / 255.0, 192.0 / 255.0)
  #define skyblue vec3(135.0 / 255.0, 206.0 / 255.0, 235.0 / 255.0)
  #define slateblue vec3(106.0 / 255.0, 90.0 / 255.0, 205.0 / 255.0)
  #define slategray vec3(112.0 / 255.0, 128.0 / 255.0, 144.0 / 255.0)
  #define slategrey vec3(112.0 / 255.0, 128.0 / 255.0, 144.0 / 255.0)
  #define snow vec3(255.0 / 255.0, 250.0 / 255.0, 250.0 / 255.0)
  #define springgreen vec3(0.0 / 255.0, 255.0 / 255.0, 127.0 / 255.0)
  #define steelblue vec3(70.0 / 255.0, 130.0 / 255.0, 180.0 / 255.0)
  #define tan_color vec3(210.0 / 255.0, 180.0 / 255.0, 140.0 / 255.0); // tan is a reserved wor
  #define teal vec3(0.0 / 255.0, 128.0 / 255.0, 128.0 / 255.0)
  #define thistle vec3(216.0 / 255.0, 191.0 / 255.0, 216.0 / 255.0)
  #define tomato vec3(255.0 / 255.0, 99.0 / 255.0, 71.0 / 255.0)
  #define turquoise vec3(64.0 / 255.0, 224.0 / 255.0, 208.0 / 255.0)
  #define violet vec3(238.0 / 255.0, 130.0 / 255.0, 238.0 / 255.0)
  #define wheat vec3(245.0 / 255.0, 222.0 / 255.0, 179.0 / 255.0)
  #define white vec3(255.0 / 255.0, 255.0 / 255.0, 255.0 / 255.0)
  #define whitesmoke vec3(245.0 / 255.0, 245.0 / 255.0, 245.0 / 255.0)
  #define yellow vec3(255.0 / 255.0, 255.0 / 255.0, 0.0 / 255.0)
  #define yellowgreen vec3(154.0 / 255.0, 205.0 / 255.0, 50.0 / 255.0)
`