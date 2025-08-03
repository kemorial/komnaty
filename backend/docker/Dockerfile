FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git\
    curl\
    zip\
    unzip

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

RUN install-php-extensions pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir  ./framework ./framework/sessions

WORKDIR /var/www
