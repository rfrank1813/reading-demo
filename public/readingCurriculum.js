// This is the curriculum in order 


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

var i_vowel_words = ['dip', 'sis', 'sip', 'sit', 'bit', 'bid', 'fit', 'it', 'did', 'bid', 'lid']

var superset = at_words + am_words + ad_words + ap_ab_words + e_vowel_words + i_vowel_words; 


readingCurriculum = [
  long_consonants, short_consonants_1, 
  two_letter_words, 
  at_words, am_words, ad_words, ap_ab_words, e_vowel_words, i_vowel_words,
  superset
]


// curriculum_deprecated = [
//   'a',
//   't',
//   'at', 

//   'm',
//   'at',
//   'mat',

//   'c',
//   'at',
//   'cat',

//   's',
//   'at',
//   'sat',

//   'r',
//   'at',
//   'rat',

//   'b',
//   'at',
//   'bat',

//   'f',
//   'at',
//   'fat',

//   'p',
//   'at',
//   'pat',

//   'mat',
//   'cat',
//   'sat',
//   'rat',
//   'fat',
//   'pat',

//   'a',
//   'm',
//   'am',

//   's',
//   'am',
//   'sam',

//   'pam',
//   'dam',
//   'cam',
//   'ram',


//   'a',
//   'd',
//   'ad',

//   'm',
//   'ad',
//   'mad',

//   'sad',
//   'dad',
//   'bad',
//   'fad',
//   'pad',
//   'tad',

//   'i',
//   't',
//   'it',

//   'b',
//   'it',
//   'bit', 

//   'fit',
//   'wit',

//   'big',
//   'fig',
//   'rig',
//   'wig',
//   'jig'

// ]

  
  // 'tan' : ['t~t', 'a~ae', 'n~n'],
  // 'dan' : ['d~d', 'a~ae', 'n~n'],
  // 'ran' : ['r~r', 'a~ae', 'n~n'],
  
  
  // 'mad' : ['m~m', 'a~ae', 'd~d'],
  // 'sad' : ['s~s', 'a~ae', 'd~d'],
  // 'dad' : ['d~d', 'a~ae', 'd~d'],
  // 'bad' : ['b~b', 'a~ae', 'd~d'],
  // 'pad' : ['p~p', 'a~ae', 'd~d'],
  // 'tad' : ['t~t', 'a~ae', 'd~d'],
  
  
  // 'cap' : ['c~k', 'a~ae', 'p~p'],
  // 'sap' : ['s~s', 'a~ae', 'p~p'],
  // 'rap' : ['r~r', 'a~ae', 'p~p'],
  // 'tap' : ['t~t', 'a~ae', 'p~p'],
  // 'map' : ['m~m', 'a~ae', 'p~p'],
  // 'lap' : ['l~l', 'a~ae', 'p~p'],
  // 'nap' : ['n~n', 'a~ae', 'p~p'],
  

  

  
  // 'set' : ['s~s', 'e~eh', 't~t'],
  // 'red' : ['r~r', 'e~eh', 'd~d'],
  // 'ted' : ['t~t', 'e~eh', 'd~d'],
  // 'sep' : ['s~s', 'e~eh', 'p~p'],
  // 'pep' : ['p~p', 'e~eh', 'p~p'],
  // 'rep' : ['r~r', 'e~eh', 'p~p']

