# jumbo Backend Task

### Run Locally

PreRequisite

* docker
* docker-compose

#### Youtube API key generation
- create a project on google cloud
- enable apis and service
- [search for youtube] -> select 'youtube data api v3'
- click on enable api
- click on credentials
- [1st time flow]: select Credential Type as public, you will get api key in 'Your Credentials' step
- [2nd/onward time flow]: click on create credentials button -> select api key, you will get api key from pop up


clone repo

```
git clone https://github.com/moinologics/jumbo-backend-task.git
```

change `.env.docker` accordingly (put YOUTUBE_API_KEY)

run the project

```
docker-compose up --build
```

test the project

```
import postman collection from jumbo.postman_collection.json

existing credentials -> 
	username/email = test@jumbo.com 
	password = secret123

```

## Live Demo

host - https://jumbo.altlink.tk

works with same postman collection, just put it in collection variables HOST
