ReactJs-Phonegap
================

A boilerplate ReactJS-Phonegap App (+With [ReactFlux][1])

UI using [React-TopcoatUI][2]


Demo
====
http://kjda.github.io/ReactJs-Phonegap/

How to use?
===========

* Install Phonegap 
```
$ sudo npm install phonegap -g
```

* clone this repo
```
$ git clone https://github.com/kjda/ReactJs-Phonegap.git
```

* Set it up
```
$ cd ReactJs-Phonegap/app
$  npm install
$  bower install
$  gulp create
$  gulp build-app
```

* Run it
```
$ gulp serve
```

* Point your [Phonegap Developer App][3] to the suggested URL

That's it!

* While developing:
```
$ cd ReactJs-Phonegap/app
$ webpack -w
```

this will rebuild the app automatically every time you edit the source code

Build configurations are located in app/build.configs.js

[1]: //github.com/kjda/ReactFlux
[2]: //github.com/kjda/react-topui
[3]: //github.com/phonegap/phonegap-app-developer
