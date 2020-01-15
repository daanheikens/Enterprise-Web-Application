#!/usr/bin/env bash
## Maintainer: Daan Heikens
## Version: 0.3
## THIS SCRIPT IS USED TO SYNC DEPENDENCIES
## IMPORTANT!!!! RUN SCRIPT AS ROOT USER in  order to collect the correct permissions

## EXAMPLES ##

## Example for installing a apt package and provide yes:
## apt-get -y install <package>

## Example to echo a message:
## echo "<message>"

## Example declaring a variable:
## variable = "Somestring"

sudo echo -e "Auto deployment script started executing.... \e[32mGreen"

sudo echo -e "Updating dependencies \e[32mGreen"
## Run dependencies update
sudo apt update -y

sudo echo -e "Installing required installation dependencies \e[32mGreen"
## Install dirmanager
sudo apt install dirmngr --install-recommends -y

## Install GPIO library
sudo apt install python-gpiozero -y

sudo apt-get install python-rpi.gpio python3-rpi.gpio -y

## Install software properties for development
sudo apt install software-properties-common -y

## Install xbindkeys for custom shortcuts
sudo apt install xbindkeys -y

sudo echo -e "Selecteer correcte java sdk \e[32mGreen"
sudo yes 0 | update-alternatives --config java
sudo echo -e "Selecteer correcte java sdk voor compiler \e[32mGreen"
sudo yes 0 | update-alternatives --config javac

sudo echo -e "Installeer Apache Maven voor package management... \e[32mGreen"
sudo apt-get install maven -y

sudo echo "Installeer GPS services"
sudo apt-get install gpsd -y
sudo apt-get install gpsd-clients python-gps -y

sudo echo -e "Installeer apache webserver \e[32mGreen"
## Install the apache2 webserver
sudo apt install apache2 -y
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_balancer
sudo a2enmod ssl

sudo touch /etc/apache2/sites-available/pfis.conf
sudo cat > /etc/apache2/sites-available/pfis.conf << EOF
<VirtualHost *:80>
	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	ServerName pfis.loc.org
	ServerAlias www.pfis.loc.org
	ServerAdmin heikend@hva.nl

	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf
	
	# Add proxy configuration
	ProxyRequests off
	ProxyPass / http://localhost:8080
	ProxyPassReverse / http://localhost:8080
	
</VirtualHost>
EOF

sudo a2ensite /etc/apache2/sites-available/pfis.conf

sudo echo -e "MySQL database installeren\e[32mGreen"
## Install mysql server and client
sudo apt install mysql-server mysql-client -y

sudo apt-get install phpmyadmin -y

## Configure database
sudo echo -e "Initialiseren van de database \e[32mGreen"
sudo mysql -h "localhost" < "init.sql"

sudo echo -e "Tomcat user aanmaken \e[32mGreen"
## Add tomcat user
sudo useradd -r -m -U -d /opt/tomcat -s /bin/false tomcat

sudo echo -e "Tomcat installeren \e[32mGreen"
## Unpack tomcat
sudo tar xf apache-tomcat-9*.tar.gz -C /opt/tomcat
## Create a symlink
sudo ln -s /opt/tomcat/apache-tomcat-9.0.16 /opt/tomcat/latest

sudo echo -e "Tomcat permissions corrigeren \e[32mGreen"
## Set permissions
sudo chown -RH tomcat: /opt/tomcat/latest
sudo sh -c 'chmod +x /opt/tomcat/latest/bin/*.sh'

sudo echo -e "Tomcat configuratie bestand schrijven \e[32mGreen"
## Write tomcat configuration file
sudo touch /etc/systemd/system/tomcat.service
sudo cat > /etc/systemd/system/tomcat.service << EOF
[Unit]
Description=Tomcat 9 servlet container
After=network.target

[Service]
Type=forking

User=tomcat
Group=tomcat

Environment="JAVA_HOME="/usr/lib/jvm/default-java"
Environment="JAVA_OPTS=-Djava.security.egd=file:///dev/urandom -Djava.awt.headless=true"

Environment="CATALINA_BASE=/opt/tomcat/latest"
Environment="CATALINA_HOME=/opt/tomcat/latest"
Environment="CATALINA_PID=/opt/tomcat/latest/temp/tomcat.pid"
Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC"

ExecStart=/opt/tomcat/latest/bin/startup.sh
ExecStop=/opt/tomcat/latest/bin/shutdown.sh

[Install]
WantedBy=multi-user.target
EOF

if [[ ! -d /opt/tomcat/latest/webapps/home ]]; then
    sudo cp -R /opt/tomcat/latest/webapps/ROOT /opt/tomcat/latest/webapps/home
fi

if [[ -d /opt/tomcat/latest/webapps/BelleAir.PFIS ]]; then
    sudo cp -R /opt/tomcat/latest/webapps/BelleAir.PFIS ROOT
fi

sudo echo -e "Tomcat manager gebruiker configureren \e[32mGreen"
## Add tomcat users
sudo touch /opt/tomcat/latest/conf/tomcat-users.xml
sudo cat > /opt/tomcat/latest/conf/tomcat-users.xml << EOF
<tomcat-users>
<!--
    Comments
-->
   <role rolename="admin-gui"/>
   <role rolename="manager-gui"/>
   <user username="admin" password="admin" roles="admin-gui,manager-gui"/>
</tomcat-users>
EOF

sudo echo -e "Services restarten \e[32mGreen"
## Restart the services
sudo systemctl restart tomcat
sudo systemctl restart apache2
sudo systemctl restart mysql

## Create some log files for the background processes
sudo touch /var/log/GPS-socket.log
sudo touch /var/log/gpsfake.log
sudo touch /var/log/button-listener.log
sudo touch /var/log/hostapd-trigger.log

echo -e "Auto deployment script finished! PFIS is now ready! \e[32mGreen"
