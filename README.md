# Resume 2 Go
### A portfolio site template.

### Summary
resume2go is a resume template site that will allow the owner to customize their own resume and make changes using an interactive content dashboard.

Only one user can be registered at a time. The user may have multiple portfolios saved and can select one for display at a time.

resume2go runs on the MEAN stack.

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

### Get g++
```bash
sudo apt-get install g++
```

### Get forever
```bash
sudo npm install -g forever
```

## Install on redhat

### Get git
```bash
sudo yum install git
```

### Get mongodb

Create a repo file for yum
```bash
sudo touch /etc/yum.repos.d/mongodb-org-3.2.repo
```

Copy the following into the file we just created
```vim
[mongodb-org-3.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.2.asc
```

Then install directly through yum
```bash
sudo yum install -y mongodb-org
```

### Get nodejs, g++ and forever
```bash
sudo su
curl --silent --location https://rpm.nodesource.com/setup | bash -
yum install -y nodejs
yum install gcc-c++
npm install -g forever
exit # exit su mode
```

## Setup for all distros
```bash
git clone https://github.com/verdude/resume2go
cd resume2go
npm install
forever start bin/www
```
