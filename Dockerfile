FROM nginx:alpine

ARG PORT

RUN echo $PORT

COPY nginx/conf.d/default.conf /etc/nginx/conf.d/
COPY . /var/www

WORKDIR /var/www

RUN apk add --no-cache --virtual .gyp \
            python \
            make \
            g++ \
    apk add --update npm --no-cache && \
    npm install && \
    npm run build

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
