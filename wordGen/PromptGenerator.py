import random
import sys
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk.parse.generate import generate
from nltk.parse import RecursiveDescentParser
from nltk.corpus import treebank_chunk
from nltk.corpus import wordnet
import json


def prompt(words):
    
    words =  words.split(",")
    
    expandedWords = []
    
    for word in words:
        expandedWords.append(word)
    
    for word in words:
        synsets = wordnet.synsets(word)
        if synsets:
            expandedWords.append(random.choice(synsets).lemmas()[0].name())
    
    
        
    # Tokenize words
    tokens = word_tokenize(' '.join(expandedWords))
    # Tag POS
    tagged = pos_tag(tokens)
    
    # Extract nouns
    nouns = [word for word, pos in tagged if pos.startswith('N')]
    nouns = " | ".join([f"'{word}'" for word in nouns])
    print(nouns)
    # Extract adj
    adjs = [word for word, pos in tagged if pos.startswith('J')]
    adjs = " | ".join([f"'{word}'" for word in adjs]) if adjs else ''
    
    string = """
        S -> NP VP
        NP -> Det N | N | J N
        VP -> V | V NP
        Det -> 'the' | 'a' | 'an' | 'this' | 'that' | 'those' | 'these' | 'my' | 'your' | 'you' | 'yours' | 'our' | 'his' | 'her' | 'some' | 'any' | 'several' | 'many' | 'few' | 'every' |
        N -> """ + nouns + """\nJ -> """ + adjs + """
        V -> 'is' | 'are' | 'am' | 'at' | 'in' | 'on' | 'was' | 'were' | 'been' | 'being' | 'has' | 'have' | 'had' | 'do' | 'does' | 'did' | 'can' | 'could' | 'may' | 'might' | 'made' | 'run'   | 'jump'  | 'swim'  | 'eat'    | 'write' | 'read'  | 'dance' | 'sing'  | 'talk'  | 'walk'  |'climb' | 'play'  | 'kick'  | 'punch'  | 'drive' | 'build' | 'fly'   | 'cook'  | 'laugh' | 'think' | 'develop' | 'implement' | 'optimize' | 'debug' | 'compile' | 'execute' | 'configure' | 'design' | 'validate' | 'integrate' | 'deploy' | 'analyze' | 'monitor' | 'customize' | 'encrypt' | 'decrypt'
        P -> 'above'    | 'across'   | 'after'    | 'against' | 'along'   | 'among'   | 'around'  | 'as'      | 'at'      | 'before' | 'behind' | 'below' | 'beneath'  | 'beside'   | 'between'  | 'beyond'  | 'but'     | 'by'      | 'concerning' | 'considering' | 'despite' | 'down'   | 'during' | 'except' | 'for'      | 'from'     | 'in'       | 'inside'  | 'into'    | 'like'    | 'near'    | 'of'      | 'off'     | 'on'     | 'onto'   | 'out' | 'outside'  | 'over'     | 'past'     | 'regarding' | 'round' | 'since'   | 'through' | 'throughout' | 'till'   | 'to'     | 'toward' | 'under' | 'underneath' | 'until'  | 'unto'     | 'up'      | 'upon'    | 'with'    | 'within'  | 'without'
    """
       
    
    # Define grammar rules
    grammar = nltk.CFG.fromstring(string)

    # Generate all possible sentences based on the grammar
    sentences = []
    
    for production in generate(grammar):
        sentence = ' '.join(production)
        sentences.append(sentence)
        print(sentence)
    
    sentence_template = random.choice(sentences)
    
    
    #code to improve the sentence
    
    # parser = RecursiveDescentParser(grammar)
    # print(sentence_template)
    # for t in parser.parse(sentence_template.split()):
    #     sentence_template = t
    
    # sentence_template = str(sentence_template)
    
    # # Randomly select words
    # noun = random.choice(nouns)
    # adj = random.choice(adjs) if adjs else ''
    
    
    # noun_index = 0
    # while 'N' in sentence_template:
    #     sentence_template = sentence_template.replace('N', f"{adj} {noun}")
    #     noun_index += 1


    # tree = treebank_chunk(sentence_template)
    # ' '.join([w for w, t in tree.leaves()])
    
    return sentence_template



if len(sys.argv) > 2:
    function_name = sys.argv[1]
    parameter = sys.argv[2]
    
    if function_name == 'prompt':
        print(json.dumps(prompt(parameter)))
        
    
    else:
        print(f"Unknown function: {function_name}")
