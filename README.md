# Resume 2 Go
### A portfolio site template.

###Summary
resume2go is a resume template site that will allow the owner to customize their own resume and make changes using an interactive content dashboard.

Only one user can be registered at a time. The user may have multiple portfolios saved and can select one for display at a time.

## Install on debian based distro

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

<<<<<<< HEAD
## Install on redhat

### Get git
```bash
sudo yum install git
```

### Install mongodb

Create a repo file for yum
```bash
sudo touch /etc/yum.repos.d/mongodb-org-3.2.repo
```

Copy the following into the file we just created

[mongodb-org-3.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.2.asc


Then install directly through yum
```bash
sudo yum install -y mongodb-org
```


### Install nodejs and some dependencies
```bash
sudo su
curl --silent --location https://rpm.nodesource.com/setup | bash -
yum install -y nodejs
yum install gcc-c++
npm install -g forever
exit # exit su mode
```

### Set up the app
=======
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
>>>>>>> 7c2ddd75ded32ea7484bf3856faf721a7cd02ec4
```bash
git clone https://github.com/verdude/resume2go
cd resume2go
npm install
<<<<<<< HEAD
forever start bin/www
=======
forever bin/www
>>>>>>> 7c2ddd75ded32ea7484bf3856faf721a7cd02ec4
```
