FROM nginx:1.23.0-alpine

COPY build /usr/share/nginx/html/
COPY run-scripts/* /

ADD nginx/default.template /etc/nginx/conf.d/

CMD /bin/sh -c "/bin/sh /setup.sh && exec nginx -g 'daemon off;'"