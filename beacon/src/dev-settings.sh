
# configure development environment settings
# run this script to set development environment settings
export MONGO_CONNECTION_STRING=mongodb://mongo:27017
export AUTH_SESSION_SECRET=sdce-casdwecd-scdgcedg-gcddgedcd-sdge

# Auth provider and settings
export AUTH_REDIRECT_URL=http://localhost:5001/api/auth/login
export AUTH_PROVIDER_URL=https://login.microsoftonline.com/{{tenant}}/oauth2/v2.0/authorize
export AUTH_TENANT=fs180.onmicrosoft.com
export AUTH_CLIENT_ID=f123a339-be25-420f-a843-ecad0938a050
export AUTH_PROVIDER_CONFIG=https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration
