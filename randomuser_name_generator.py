import random
import string

def generate_username(length=8):

    username = ''
    for i in range(length):
        username += random.choice(string.ascii_lowercase)
    return username
