#/bin/sh

envsubst "`env | awk -F = '{printf \" \\\\$%s\", $1}'`" < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf
cp /usr/share/nginx/html/index.html /usr/share/nginx/html/index2.html 
envsubst "`env | awk -F = '{printf \" \\\\$%s\", $1}'`" < /usr/share/nginx/html/index2.html > /usr/share/nginx/html/index.html
