FROM octohost/nodejs-nginx
ADD ./package.json /app/package.json
WORKDIR /app
RUN npm install
# add steps separately to make build run faster
ADD ./app /app/app
ADD ./gulpfile.js /app/gulpfile.js
ADD ./bower.json /app/bower.json
RUN npm install gulp-cli -g

RUN gulp build
RUN mkdir /srv/www/generated-folder-here
RUN cp -r ./dist/* /srv/www/generated-folder-here/

EXPOSE 80

CMD 'nginx'