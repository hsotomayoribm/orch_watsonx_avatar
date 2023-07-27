## Openshift Deployment Process

- [Create new project](#create-new-project)
- [Create service account](#add-permissions-to-default-service-account)
- [Proxy server deployment](#orch-server-deployment)
- [Orchestration server deployment](#orch-server-deployment)
- [React UI deployment](#react-ui-deployment)

---

### Create new project

```
$ oc new-project <namespace>
```

---

### Add permissions to Default service account

```
$ oc adm policy add-scc-to-user anyuid -z default
```

---

### Create pull secret for quay.io/icr and add it to the default sa

**Using IBM's ICR**

Set up an API key in IBM Cloud through the IAM tools.

Add a `docker-registry` secret to your project in OpenShift using your API key. Use the email address associated with your IBM Cloud account.

```
oc -n <namespace> create secret docker-registry <secret name> \
--docker-server=us.icr.io \
--docker-username=iamapikey \
--docker-password=<iam api key> \
--docker-email=<ibm email>@ibm.com
```

Link your secret to default pull.

```
oc secrets link default <secret name> --for=pull
```

---

### proxy-server deployment
```
cd proxy-server
docker build -t us.icr.io/<repo>/proxy-server:latest .
docker push us.icr.io/<repo>/proxy-server:latest
```

Create configmap for the proxy server

```
cp ocp/proxy-configmap.example.yaml proxy-configmap.yaml
```

(Optional) Add white/black list vars


```
oc apply -f proxy-configmap.yaml
oc apply -f deployment_config.yaml
```


Check to see it is running:

```
oc get pods
```

Create https route for svc/proxy-server

```
oc create route edge proxy --service proxy-server
oc get routes
```

You should see your proxy route. 

---

### orch-server deployment

```
cd orch-server
docker build -t us.icr.io/<repo>/orch-server:latest .
docker push us.icr.io/<repo>/orch-server:latest
```

Create configmap for orch-server

```
cp orch-configmap.example.yaml orch-configmap.yaml
```

Update ```deployment_config.yaml``` and change the values ```<namespace>``` and ```<image>```

Fill in the following envs in ```orch-configmap.yaml``` and update the value for ```<namespace>```

```
WATSON_ASSISTANT_SERVICEURL=\<Watson Assistant Service URL>
WATSON_ASSISTANT_APIKEY=\<WA API key>
WATSON_ASSISTANT_DRAFT_ENVIRONMENT_ID=\<WA Assistant draft environment ID>
```

Then apply the configmap and deploy.

```
oc apply -f orch-configmap.yaml
oc apply -f deployment_config.yaml
```

Check to see it is running:

```
oc get pods
```

Create https route for svc/orch-server

```
oc create route edge orch-https --service orch-server
oc get routes
```

Copy the route and paste in to browser, should see ```Cannot GET /```

Append ```/health``` to the endpoint, and you should get an object back

```
{
    "status": "UP"
}
```

---

### react-ui deployment

```
cd react-ui
docker build -t us.icr.io/<repo>/react-ui:latest .
docker push us.icr.io/<repo>/react-ui:latest
```

Create configmap for react-ui

```
cp ocp/react-configmap.example.yaml react-configmap.yaml
```

Update ```deployment_config.yaml``` \<namespace> and \<image>

Fill in the following envs in ```react-configmap.yaml``` and update \<namespace>

```
REACT_APP_ORCHESTRATION_URL=\<Orchestration server route>
REACT_APP_PROXY_SERVER=\<Proxy server route>
```

Then apply the configmap and deploy.

```
oc apply -f react-configmap.yaml
oc apply -f deployment_config.yaml
```

Check to see it is running:

```
oc get pods
```

Create https route for svc/react-ui

```
oc create route edge react-https --service react-ui 
oc get routes
```

Copy the route for the react-ui and use that to create a new DDNA Studio API Key. Copy API Key and add to react-configmap 


Edit the existing CM for the react-ui container
```
oc edit cm/react-configmap
```

And update the following value

```
REACT_APP_API_KEY=<Soul Machine API Key>
```

Restart the deployment for the update configmap's values to be applied

```
oc rollout restart deployment/react-ui
```
