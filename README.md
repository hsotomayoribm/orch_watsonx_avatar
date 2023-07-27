## Soul Machines, WA/WD and NeuralSeek Integration
**IMPORTANT DISCLAIMER**

```
You and the teams are "good to go" to build demos - basic and intricate, and share the demos with the clients.

For Demos:
You will NOT share access to the Digital Avatar or DDNA studio with the client.
You will NOT allow access outside of presenting the demo (NO general internal or external facing usage by the general public or employees)
You do NOT need Expert Labs to do a SOW, as this is part of the partnership agreement.

For POC:
A POC will be a paid implementation (POC pricing) on Expert Labs paper with an SOW, even if it's free engineering work for the POC.
A POC will be "public" facing (internal employees or general public usage) with limited monthly conversations per the POC pricing.
A POC will allow IBM to share the DP and DNNA studio with the client.

```


**For more information please see the original PoX-Asset Repo, which can be found [here.]( https://github.ibm.com/skol-assets/pox-assets-customer-care/tree/main/MVP-13-Soul-Machines )**

---

### Installation and Setup Instructions

- [Live Demo](#live-demo)
- [Install Dependencies](#install-dependencies)
- [DDNA Studio Configuration](#ddna-studio-configuration)
- [Watson Assistant](#watson-assistant)
- [NeuralSeek and Watson Assistant Integration](#neuralseek-and-watson-assistant-integration)
- [Update .env files](#update-environment-variables)
- [Run locally](#run-locally)

**Deploy application to Openshift**

- [Deploy to Openshift](./docs/OCP_Deployment.md)

### Install Dependencies

---

### Live Demo
You can see this demo in action here: <a href="https://ibm.biz/GenAIDemo" target="_blank">https://ibm.biz/GenAIDemo</a>

She has been trained on Watson Discovery and Watson Assistant product pages. Try it out!

---


Install root dependencies

```sh
git clone https://github.ibm.com/David-Levy/sm-neuralseek-ibm.git
cd sm-neuralseek-ibm/
npm install
```

Setup and Install

```sh
npm run setup
```

This will install all dependencies for each of the services (ReactJS UI, Orchestration Server, and Proxy Server),
copy the env.example to an .env file in each directory and create self signed certs for local development.

---

### DDNA Studio Configuration

Create your Digital Avatar before continuing.

Follow <a href="./docs/DDNA_Studio_Setup.md" target="_blank">these instructions.</a>

---

### Watson Assistant

*Upload action found in watson/ to your Watson Assistant as a starting point*

Can be found: ```/watson/Watson-AI-Action.json```

Follow this link for instructions on creating, integrating and usage for <a href="./docs/Watson_Action.md" target="_blank">Watson Assistant Actions here.</a>


You can read more about <a href="./docs/Custom_Component.md" target="_blank">custom card creations here.</a>

---

### NeuralSeek and Watson Assistant Integration

Follow <a href="./docs/NeuralSeek_Integration.md" target="_blank">these instructions.</a>

---

### Update Environment Variables

Follow <a href="./docs/Environment_Variables.md" target="_blank">these instructions.</a>


---

### Run Locally

From the root directory:

```sh
$ npm run dev
```

This should start up all three services.

Navigate to http://localhost:3000. The browser will ask you to accept the application's
use of your microphone and camera. Accept.

**The first time you run the services you will see the following message**:

```sh
Encountered fatal error!

{
  "msg": "generic",
  "err": {
    "name": "controlFailed"
  }
}
```

To resolve:

- Navigate to https://localhost:3001
- If using **Chrome** type "thisisunsafe" in the browser, or click "Advanced..." and then click "Continue".
- If using **Firefox** click the button that says "Advanced..." and then click "Accept Risk and Continue"
- Navigate back to http://localhost:3000 and refresh the page. You should see your Avatar!

---

