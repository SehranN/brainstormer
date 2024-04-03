import json
import random
import sys
import nltk
nltk.download('wordnet')
from nltk.corpus import wordnet


def synon(words):
    output = []
    for syn in wordnet.synsets(words):
        for I in syn.lemmas():
            output.append(I.name())
    return output

def anton(words):
    output = []
    for syn in wordnet.synsets(words):
        for lemma in syn.lemmas():
            for antonym in lemma.antonyms():
                output.append(antonym.name())
                
    return output

def hyp(words):
    output = []
    for syn in wordnet.synsets(words):
                
        hypo = lambda s: s.hyponyms()
        hyper = lambda s: s.hypernyms()
        
        for synsets in syn.closure(hypo, depth=5):
            output.append(synsets.lemmas()[0].name())
        
        for synsets in syn.closure(hyper, depth=5):
            output.append(synsets.lemmas()[0].name())
            
    return output

def mer(word):
    output = []
    for syn in wordnet.synsets(word):

        for part_holonym in syn.part_holonyms():
            output.append(part_holonym.lemmas()[0].name())
            
        for substance_holonym in syn.substance_holonyms():
            output.append(substance_holonym.lemmas()[0].name())

        for part_meronym in syn.part_meronyms():
            output.append(part_meronym.lemmas()[0].name())
            
        for substance_meronym in syn.substance_meronyms():
            output.append(substance_meronym.lemmas()[0].name())
    
    return output

def domain(word):
    output = []
    for syns in wordnet.synsets(word):
        
        for domains in syns.topic_domains():
            output.append(domains.lemmas()[0].name())
        for domains in syns.region_domains():
            output.append(domains.lemmas()[0].name())
        for domains in syns.usage_domains():
            output.append(domains.lemmas()[0].name())
    return output

def extra(word):
    output = []
    for syn in wordnet.synsets(word):
    
        for entailment in syn.entailments():
                output.append(entailment.lemmas()[0].name())

        for attribute in syn.attributes():
                output.append(attribute.lemmas()[0].name())

        for cause in syn.causes():
            output.append(cause.lemmas()[0].name())
                
    return output

def combiner(*arrays):
    merged_array = []
    for array in arrays:
        merged_array.extend(array)
        
    merged_array = list(set(merged_array))
    return sorted(merged_array)
   
   
def randomizer(words):
    word = random.choice(words)
    
    functions = [synon, anton, hyp, mer, domain, extra]
    
    randomFunction = random.choice(functions)
    
    output = randomFunction(word)
    
    return output
     

def wordFinder(words):
    
    splitWord = words.split(",")
    synonyms = []
    for i in range(len(splitWord)):
        
        synono = synon(splitWord[i])
        antono = anton(splitWord[i])
        hypo = hyp(splitWord[i])
        mero = mer(splitWord[i])
        
        synonyms = combiner(synonyms, synono, antono, hypo, mero)
    
    synonyms = list(set(synonyms))
    
    while(len(synonyms) <= 20):
        newWords = randomizer(synonyms)
        synonyms = combiner(synonyms, newWords)
        synonyms = list(set(synonyms)) 

    return synonyms


def getMeaning(word):
    meaning = []

    synsets = word.synsets(word)

    for synset in synsets:
        for definition in synset.defintions():
            meaning.append(definition)

    return meaning


if len(sys.argv) > 2:
    function_name = sys.argv[1]
    parameter = sys.argv[2]
    
    
    if function_name == 'wordFinder':
        print(json.dumps(wordFinder(parameter)))
        
    elif function_name == 'meaning':
        print(json.dumps(getMeaning(parameter)))
    
    else:
        print(f"Unknown function: {function_name}")
        



