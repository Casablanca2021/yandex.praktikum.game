FROM nginx:alpine

ARG PORT

RUN echo $PORT

COPY nginx/conf.d/default.conf /etc/nginx/conf.d/
COPY . /var/www

WORKDIR /var/www

RUN apk add alpine-sdk
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add --update npm --no-cache && \
    npm install && \
    npm run build

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
