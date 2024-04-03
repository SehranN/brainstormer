import json
import random
import sys
import PromptGenerator as prompt

def rearranger(words):
    
    arrangments = []
    for i in range(10):
        random.shuffle(words)
        arrangment = prompt(words)
        arrangments.append(arrangment)
    return random.choice(arrangments)

if len(sys.argv) > 2:
    function_name = sys.argv[1]
    parameter = sys.argv[2]
    
    if function_name == 'rearrangment':
        print(json.dumps(rearranger(parameter)))
        
    else:
        print(f"Unknown function: {function_name}")
      