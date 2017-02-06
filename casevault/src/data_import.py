import adal

context = adal.AuthenticationContext('https://login.microsoftonline.com/fs180.onmicrosoft.com')
RESOURCE = 'f123a339-be25-420f-a843-ecad0938a050'
token = context.acquire_token_with_username_password (
    RESOURCE,
    "test@fs180.onmicrosoft.com", 
    "Green2015!",
    "f123a339-be25-420f-a843-ecad0938a050")
