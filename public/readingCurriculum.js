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


var e_vowel_words = ['set', 'bet', 'met', 'ted', 'bed', 'med', 'set', 'red']

var i_vowel_words = ['dip', 'sip', 'sit', 'bit', 'bid', 'fit', 'it', 'did', 'bid', 'lid', 'lip', 'rip', 'big']

var o_vowel_words = ['sob', 'not', 'nod', 'bob', 'rob', 'rod', 'cop', 'cot', 'cob', 'tot', 'doc', 'lot', 'rot', 'pot', 'dot', 'tom', 'pop', 'hop', 'mop', 'mom']

var u_vowel_words = ['cut', 'cup', 'mud', 'pup', 'tub', 'bus', 'bud', 'but', 'dud']




var superset = at_words + am_words + ad_words + ap_ab_words + e_vowel_words + i_vowel_words + o_vowel_words + u_vowel_words; 


readingCurriculum = [
  long_consonants, short_consonants_1, 
  two_letter_words, 
  at_words, am_words, ad_words, ap_ab_words, e_vowel_words, i_vowel_words,
  o_vowel_words,
  u_vowel_words,
  superset
]



