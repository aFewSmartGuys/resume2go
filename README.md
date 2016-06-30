# Resume 2 Go
### A portfolio site template.

## Install on debian based distro

### Get Node.js
```bash
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install nodejs
sudo apt-get install npm #if it has not already been installed
```

### Get mongoDB
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

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
```bash
git clone https://github.com/verdude/resume2go
cd resume2go
npm install
forever start bin/www
```
