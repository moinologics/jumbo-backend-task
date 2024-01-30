# jumbo Backend Task

### Run Locally

PreRequisite

* docker
* docker-compose

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
