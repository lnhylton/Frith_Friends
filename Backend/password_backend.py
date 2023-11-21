from argon2 import PasswordHasher

def hash_password(password):
    ph = PasswordHasher()
    # Hash the password with Argon2id
    hash = ph.hash(password)
    return hash

def verify_password(stored_hash, input_password):
    ph = PasswordHasher()
    # Verify if the calculated hash matches the stored hash
    try:
        ph.verify(stored_hash, input_password)
        return True
    except:
        return False
    
# True means that the password needs to be rehashed
def check_hash_date(stored_hash):
    ph = PasswordHasher()
    return ph.check_needs_rehash(stored_hash)

# Example Usage:
# Replace 'user_input_password' with the actual password entered by the user
#user_input_password = 'fakeuser1'
#hashed_password = hash_password(user_input_password)
#print(f'Hashed Password: {hashed_password}')

# Replace 'user_input_password' with the actual password entered by the user
# Replace 'stored_hashed_password' with the password stored in your database
#if verify_password(hashed_password, user_input_password):
#    print('Password is correct')
#else:
#    print('Password is incorrect')
