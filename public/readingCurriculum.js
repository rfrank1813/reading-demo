// This is the curriculum in order 
// Basically Level One -- 3 letter words with all consonants and vowel sounds


var long_consonants = ['m', 's', 'n', 'r']

var short_consonants_1 = ['b', 'c', 'd', 'f', 'h', 'l', 't', 'w']

var short_consonants_2 = ['g', 'j', 'k', 'v' , 'y', 'z']

var weird_consonans = ['x', 'q']

var two_letter_words = ['at', 'am', 'it', 'ed', 'ad']

var at_words = ['mat', 'cat', 'rat', 'fat', 'pat', 'sat' ]


var am_words = ['sam', 'pam', 'ram', 'cam', 'dam', 'bam', 'ham']

var ad_words = ['mad', 'sad', 'bad', 'dad', 'fad', 'had', 'tad', 'fad']

var ap_ab_words = [
  'cap' ,
  'sap' ,
  'rap' ,
  'tap' ,
  'map' ,
  'lap' ,
  'nap' ,
  'cab' ,
  'lab' ,
  'tab'
]


var e_vowel_words = ['set', 'bet', 'met', 'ted', 'bed', 'set', 'red' ]

var i_vowel_words = ['dip', 'sip', 'sit', 'bit', 'bid', 'fit', 'it', 'did', 'bid', 'lid', 'lip', 'rip', 'big']

var o_vowel_words = ['sob', 'not', 'nod', 'bob', 'rob', 'rod', 'cop', 'cot', 'cob', 'tot', 'doc', 'lot', 'rot', 'pot', 'dot', 'tom', 'pop', 'hop', 'mop', 'mom']

var u_vowel_words = ['cut', 'cup', 'mud', 'pup', 'tub', 'bus', 'bud', 'but', 'dud']


var digraphs = ['ch', 'sk', 'ck', 'ng', 'sh', 'th', 'st', 'sp', 'ee', 'oo' ]

var ee_words = ['peek', 'beef', 'sheet', 'weed', 'keep', 'steep', 'jeep', 'bee', 'see', 'sheep', 'peep', 'keep', 'reed', 'reef', 'free', 'seek', 'teen', ]

var oo_words = ['food', 'poop', 'scoop', 'loop', 'pool']

var ea_words = ['leap', 'weak', 'seal', 'neat', 'beast', 'real', 'jeans', 'beach', 'deal', 'read', 'cream', 'heat', 'scream', 'peach', 'bead', 'neat', 'meat', 'cheat', 'beat', 'team', 'treat', 'steam', 'beam', 'seat' ]

var ch_words = ['chip', 'chat', 'chump', 'much', 'rich', 'chap', 'chop', 'lunch', 'chess', 'punch', 'pinch', 'munch', 'hunch'  ]

var sk_words = ['skunk', 'skill', 'skit', 'risk', 'task', 'mask', 'desk', 'disk', 'ask'  ]

var ck_words = ['back', 'lack', 'smack', 'track', 'wack', 'snack', 'lock', 'lick', 'tick', 'muck']

var ng_words = ['sing', 'bing', 'thing', 'wing', 'ding', 'king', 'ring']

var sh_words = ['ship', 'dish',  'trash', 'crash', 'brush', 'shot', 'shut', 'sham', 'shed', 'gosh', 'rash', 'wish', 'shop', 'dish', 'dash']


// Next up: 
// oo, ee, ea, ch, sh, st
// Up to 4 letter words with each of those
var digraphs_1 = ['ee', 'ea', 'ch', 'sh', 'st', 'oo']


level_2 = [digraphs_1, ee_words, oo_words, ea_words, ch_words, sk_words, ck_words, sh_words, ng_words ]

// Level 2 -- All the words mi
level_1_test = two_letter_words.concat(at_words, am_words, ap_ab_words, e_vowel_words, i_vowel_words, o_vowel_words, u_vowel_words); 


level_1 = [
  long_consonants, short_consonants_1, 
  two_letter_words, 
  at_words, am_words, ad_words, ap_ab_words, e_vowel_words, i_vowel_words,
  o_vowel_words,
  u_vowel_words
]


// 
readingCurriculum = level_2;


