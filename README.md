ReactJs-Phonegap
================

A boilerplate ReactJS-Phonegap App

![screenshot](https://raw.githubusercontent.com/kjda/ReactJs-Phonegap/master/screenshot0.jpg)

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
 npm run setup
 gulp create
 gulp build-app
```

* Run it
```
$ gulp serve
```

* Point your [Phonegap Developer App][1] to the suggested URL

That's it!

* While developing:
```
$ cd ReactJs-Phonegap/app
 gulp
```

this will rebuild the app once you edit the source code

to edit target Phonegap Directory, PORT, or Phonegap Plugins look at app/gulpfile.js


Server
======
The server part is just sitting there as a motivation!


[1]: https://github.com/phonegap/phonegap-app-developer
