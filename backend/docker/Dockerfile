FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git\
    curl\
    zip\
    unzip

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

RUN install-php-extensions pdo pdo_mysql

WORKDIR /var/www
