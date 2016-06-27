# Resume 2 Go
### A portfolio site template.

###Summary
resume2go is a resume tempate site that will allow the owner to customize their own resume and make changes using an interactive content dashboard.

Only one user can be registered at a time. The user may have multiple portfolios saved and can select one for display at a time.

##Installation

### Get Node.js
```bash
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install nodejs
```

### Get mongoDB
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### Get g++
```bash
# g++ is a dependency for bcrypt (password encryption library)
sudo apt-get install g++
```

### Get forever (Optional)
```bash
# forever is a tool to keep scripts up forever. it will restart scripts if they go down.
# https://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/
sudo npm install -g forever
```

## Setup
```bash
git clone https://github.com/verdude/resume2go
cd resume2go
npm install
forever bin/www
```
