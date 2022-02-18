// This is the curriculum in order 
// Basically Level One -- 3 letter words with all consonants and vowel sounds

// I think what you want to do is define Levels.
// So like level 1, level 2, etc. 
// Define those here.
// Then use a query param on the teacher side to choose the level. 
// Have a page that displays all the levels. 
// When you click one it loads the reading page with the correct list. 

// First, make the curriculum a hash with levels.
// Then make the correct curriculum load based on query param
// That's v1. 

// Next, you want a "random" option. 
// Each level should be a linear sequence
// But when random is activated, it will mix them all up. 

// Another thing -- the 'sets' idea is not necessary. 
// Could scrap it if you just have good linear curriculums
// I think having a name for the level will be helpful so we should do a hash 
// Actually, keep sets. It's a nice way to do things. 
// The random variable can just override
// And you need to handle the case where the set is only one item 


var long_consonants = ['m', 's', 'n', 'r']

var short_consonants_1 = ['b', 'c', 'd', 'f', 'h', 'l', 't', 'w']

var short_consonants_2 = ['g', 'j', 'k', 'v' , 'y', 'z']

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



// Long vowel sounds
var a_e = ['cake', 'snake', 'bake', 'lake', 'fake', 'make', 'wake', 'shake', 'hate', 'mate', 'shame', 'lame', 'same', 'cave', 'brave', 'wave', 'cape', 'made']

var e_e = ['pete']

var i_e = ['shine', 'wine', 'dine', 'swine', 'twine', 'vine', 'like', ]

var o_e = ['bone', 'stone', 'woke', 'note', 'poke', 'code', 'robe', 'nope', 'vote', 'hope', 'smoke', 'broke', 'stroke', 'cove', 'robe', 'slope', 'dope' ]

var u_e = ['dude', 'rude', 'dupe', 'duke', 'tune', 'flute', 'june']

var ay = ['say', 'play', 'hay', 'day', 'may', 'way']


// Sight words
var sight_words_1 = [

'the', 
'and', 
'a', 
'to', 
'said', 
'in', 
'he', 
'I', 
'of', 
'it'
]

var sight_words_2 = [
  'was', 
  'you', 
  'they', 
  'on', 
  'she', 
  'is', 
  'for', 
  'at', 
  'his', 
  'but'
]
 
// that, 
// with, 
// all, 
// we, 
// can, 
// are, 
// up, 
// had, 
// my, 
// her, what, there, out, this, have, went, be, like, some, so, not, then, were, go, little, as, no, mum, one, them, do, me, down, dad, big, when, it's, see, looked, very, look, don't, come, will, into, back, from, children, him, Mr, get, just, now, came, oh, about, got, their, people, your, put, could, house, old, too, by, day, made, time, I'm, if, help, Mrs, called, here, off, asked, saw, make, an







var level_1 = [
  long_consonants, short_consonants_1, 
  two_letter_words, 
  at_words, am_words, ad_words, ap_ab_words, e_vowel_words, i_vowel_words,
  o_vowel_words,
  u_vowel_words
]

var level_2 = [digraphs_1, ee_words, oo_words, ea_words, ch_words, sk_words, ck_words, sh_words, ng_words ]

var level_3 = [a_e, e_e, i_e, o_e, u_e, ay];

var level_4 = level_1.concat(level_2, level_3);





readingCurriculum = [];

readingCurriculum.push({
  description: "Consonants, 2 letter, and 3 letter words",
  content: level_1
},
{
  description: "Words with ee, ea, ch, sh, st, oo.",
  content: level_2
},
{
  description: "Words with long vowel sounds like cake, plus 'ay' sounds",
  content: level_3 
},
{
  description: "All phonics words mixed together",
  content: level_4
},
{
  description: "Sight words",
  content: [sight_words_1, sight_words_2]
}
);

readingCurriculum;





