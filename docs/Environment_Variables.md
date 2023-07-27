## Update Environment Variables

**Only update the values where indicated**

Orchestration server env variables for SaaS WA:

```sh
EXPRESS_SERVER=localhost
EXPRESS_PORT=3001
SSL_CERT=./certs/localhost.crt
SSL_KEY=./certs/localhost.key

# variables to connect to Watson Instance
# your SERVICEURL may be different if your Assistant is using a location other than Dallas (ie api.us-east)
WATSON_ASSISTANT_SERVICEURL=https://api.us-south.assistant.watson.cloud.ibm.com
WATSON_ASSISTANT_VERSION=2021-11-27

######################### UPDATE #########################
# Update with correct values from your Watson Assistant instance
# For Watson Actions use Draft Environment ID
WATSON_ASSISTANT_APIKEY=<Watson Assistant API Key>
WATSON_ASSISTANT_DRAFT_ENVIRONMENT_ID=<Waton Draft Environment ID>
##########################################################
```

Orchestration server env variables for CP4D WA:

```sh
CP4D
WATSON_ASSISTANT_CP4D=true
WATSON_ASSISTANT_SERVICEURL=https://<Host>/assistant/cpd-instance-wa/instances/<Instance Number>/api
WATSON_ASSISTANT_VERSION=2021-11-27
WATSON_ASSISTANT_DRAFT_ENVIRONMENT_ID=
WATSON_ASSISTANT_USERNAME=<CP4D Username>
WATSON_ASSISTANT_PASSWORD=<CP4D Password>
WATSON_ASSISTANT_CP4D_URL=https://<Host>/icp4d-api/v1/authorize
```

When using NS with **CP4D Watson Discovery**, the API call can be so short, the response will cut off the intermediate message. If you find yourself in this position, update these two variables:

```sh
# Delay for NS response to give time for intermediate response to complete (CP4D response times are very short)
ADD_DELAY_TO_NS_RESPONSE=true
# If your avatar is still cutting off the intermediate message, lower this value.
WORDS_PER_MINUTE_DELAY=150
```


React UI env variables

```sh
# there are more configuration values in /src/config.js such as colors and background
# env vars that are passed in to the react app need to be prefixed with REACT_APP_

# API key from DDNA Studio (https://soulmachines-support.atlassian.net/wiki/spaces/SSAS/pages/1320058919/Connecting+Using+API+Keys)
REACT_APP_API_KEY=<Soul Machines API Key>
# enable if using an orchestration server usually for non-native NLP or custom backend logic (true or false)
REACT_APP_ORCHESTRATION_MODE=true
# Proxy Server for link preview
REACT_APP_PROXY_SERVER='http://localhost:8080'
# Backup Image for 
REACT_APP_PREVIEW_LINK_BACKUP='https://cos-sm-truist.s3.us-east.cloud-object-storage.appdomain.cloud/IBM_logo%C2%AE_pos_RGB.gif'

# node environment (DEV or PROD)
NODE_ENV=dev

# local development server will serve app from this port
PORT=3000

# without this flag, any eslint errors will prevent the app from building (true or false)
ESLINT_NO_DEV_ERRORS=true

# true if prod mode - will hide the microphone mute button (true or false)
REACT_APP_PROD=false

# url to our reset conversation endpoint
REACT_APP_ORCHESTRATION_URL="https://localhost:3001"
```

Proxy server env variables
```sh
CORSANYWHERE_BLACKLIST=
CORSANYWHERE_WHITELIST=
CORSANYWHERE_RATELIMIT=
```
